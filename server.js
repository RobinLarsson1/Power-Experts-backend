// Import
import express from 'express'
import productsRouter from './routes/product.js'
import usersRouter from './routes/user.js'
import searchRouter from './routes/search.js'
import cors from 'cors'

// Konfigurera server
const port = 1523
const app = express()

// Middleware
app.use(cors())
app.use('/api', express.json())  // gör så att vi kan använda req.body
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})
// Routes
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/search', searchRouter)


// starta
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})