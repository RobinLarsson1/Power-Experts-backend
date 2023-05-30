import express from 'express'
import { getDb } from '../Data/database.js'
import { isValidProduct, generateId, isValidId, hasID } from '../Data/validate.js'

const router = express.Router()
const db = getDb()


router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.products)

})

router.post('/', async (req, res) => {
    let addProduct = req.body

    if (isValidProduct(addProduct)) {

        await db.read()
        addProduct.id = generateId()
        const productWithIdFirst = {
            id: addProduct.id,
            name: addProduct.name,
            price: addProduct.price,
            image: addProduct.image,
            tags: addProduct.tags
        };

        db.data.products.push(productWithIdFirst);
        await db.write()
        res.send({ id: addProduct.id })

    } else {
        res.status(400).send('Invalid product info')
    }
})

router.delete('/:id', async (req, res) => {

    if (!isValidId(req.params.id)) {
        res.status(400).send('Invalid id')
        return
    }

    let id = Number(req.params.id)

    if (isNaN(id) || id < 0) {
        res.status(400).send('Invalid id')
        return
    }

    await db.read()
    let findProduct = db.data.products.find(product => product.id === id)
    if (!findProduct) {
        res.status(404).send('Invalid id')
        return
    }

    db.data.products = db.data.products.filter(product => product.id !== id)
    await db.write()
    res.sendStatus(200)
});



router.get('/:id', async (req, res) => {

    if (!isValidId(req.params.id)) {
        res.status(400).send('Invalid id')
        return
    }


    let id = Number(req.params.id);

    if (!isNaN(id)) {
        await db.read();
        const product = db.data.products.find((p) => p.id === id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send('Product not found.');
        }
    } else {
        res.status(400).send('Invalid id.');
    }
});

router.put('/:id', async (req, res) => {
    // Validera id
    if (!isValidId(req.params.id)) {
        res.sendStatus(400);
        console.log('log 1');
        return;
    }
    const id = Number(req.params.id);

    // Validera body (objekt)
    if (!isValidProduct(req.body)) {
        res.sendStatus(400);
        console.log('log 2');
        return;
    }
    const newProduct = req.body;

    // Finns produkt med samma id?
    // I så fall byt ut objektet
    await db.read();
    const oldProductIndex = db.data.products.findIndex(product => product.id === id);
    if (oldProductIndex === -1) {
        res.sendStatus(404);
        console.log('log 3');
        return;
    }

    // Sätt ID:t i newProduct till det befintliga ID:t
    newProduct.id = id;

    // Uppdatera objektet med önskad ordning på egenskaperna
    const updatedProduct = {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        image: newProduct.image,
        tags: newProduct.tags
    };

    db.data.products[oldProductIndex] = updatedProduct;
    await db.write();
    res.sendStatus(200);
});


export default router