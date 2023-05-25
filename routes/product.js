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

router.delete('/:id', async(req, res) => {
	let id = Number(req.params.id)

	await db.read()
	db.data.products = db.data.products.filter(product => product.id !== id)
	await db.write()
	res.sendStatus(200)
})

export default router