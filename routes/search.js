import express from 'express'
import { getDb } from '../Data/database.js'

const router = express.Router()
const db = getDb()

router.get('/:name', async (req, res) => {
	let name = req.params.name

	if((typeof name) === 'string') {
		await db.read();
		let findProduct = db.data.products.filter(product => product.name.toLowerCase().includes(name))
		
		if(findProduct) {
			res.send(findProduct)
			await db.write()
		}
		else {
			res.send('not found')
			await db.write()
		}
	}
})

export default router