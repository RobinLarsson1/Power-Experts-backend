import express from 'express'
import { getDb } from '../Data/database.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
	await db.read()
	res.send(db.data.users)
	
})

export default router