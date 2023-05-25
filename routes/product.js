import express from 'express'
import { getDb } from '../Data/database.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.products)

})

router.post('/', async (req, res) => {
	let addProduct = req.body

	await db.read()
	addProduct.id = Math.floor(Math.random() * 100000)
	db.data.products.push(addProduct)
	await db.write()
	res.send({ id: addProduct.id })

})

router.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)
  
    if (isNaN(id) || id < 0) {
        res.sendStatus(400)
        return
    }

    await db.read()
    let findProduct = db.data.products.find(product => product.id === id)
    if(!findProduct) {
        res.sendStatus(404)
        return
    }

    db.data.products = db.data.products.filter(product => product.id !== id)
    await db.write()
    res.sendStatus(200)
  });

router.get('/:id', async (req, res) => {
	let id = Number(req.params.id);
  
	if (!isNaN(id)) {
	  await db.read();
	  const flower = db.data.products.find((p) => p.id === id);
	  if (flower) {
		res.send(flower);
	  } else {
		res.status(404).send('Product not found.');
	  }
	} else {
	  res.status(400).send('Invalid id.');
	}
  });


export default router