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
        res.sendStatus(400)
        return
    }
    let id = Number(req.params.id)

    // Validera body ( object)
    if (!isValidProduct(req.body) || !hasID(req.body)) {
        res.sendStatus(400)
        return
    }
    let newProduct = req.body

    // Finns produkt med samma id?
    // I så fall byt ut objektet
    await db.read()
    let oldProductIndex = db.data.products.findIndex(product => product.id === id)
    if (oldProductIndex === -1) {
        res.sendStatus(404)
        return
    }

    db.data.products[oldProductIndex] = newProduct
    await db.write()
    res.sendStatus(200)
})

export default router