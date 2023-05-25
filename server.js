// Import
import express from 'express'
import productsRouter from './routes/product.js'
import usersRouter from './routes/user.js'


// Konfigurera server
const port = 1523
const app = express()

// Middleware
app.use('/api', express.json())  // gör så att vi kan använda req.body

// Routes
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)

// starta
app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`)
})