// Import
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import productsRouter from './routes/product.js'
import usersRouter from './routes/user.js'
import searchRouter from './routes/search.js'
import cors from 'cors'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// Konfigurera server
const port = process.env.PORT || 9555
const app = express()

// Middleware
app.use(cors())
app.use('/api', express.json())  // gör så att vi kan använda req.body
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next()
})

const __dirname = dirname(fileURLToPath(import.meta.url))
const pathToStaticFolder = join(__dirname, '../dist')
app.use(express.static(pathToStaticFolder))

// API
app.get('/api/movies', (req, res) => {
    // Obs! I en mer komplett app hämtar vi datan från databasen
    res.send([
        { id: 'a', title: 'Inception' },
        { id: 'b', title: 'The Shawshank Redemption' },
        { id: 'c', title: 'The Drak Knight' },
        { id: 'd', title: 'The Grand Budapest Hotel' },
    ])
})

// Routes
app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/search', searchRouter)


// starta
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})