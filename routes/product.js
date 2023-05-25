import express from 'express'

const router = express.Router()

router.get('/products', async (req, res) => {
	await db.read()
})

export default router