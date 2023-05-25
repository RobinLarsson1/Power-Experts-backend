import express from 'express'
import { getDb } from '../Data/database'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data)
	
})

export default router