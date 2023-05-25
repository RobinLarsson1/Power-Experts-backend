import express from 'express'

const router = express.Router()

router.get('/users', async (req, res) => {
	await db.read()
})

export default router