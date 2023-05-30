import express from 'express';
import { getDb } from '../Data/database.js';

const router = express.Router();
const db = getDb();


router.get('/', async (req, res) => {
  // Search product name
  const name = req.query.q
  const searchQuery = req.query.order
  const sortOrder = req.query.sort

  if (typeof name === 'string') {
    await db.read()
    const filteredProducts = db.data.products.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    )

    // if (filteredProducts.length > 0) {
    //   return res.send(filteredProducts)
    // } else {
    //   res.sendStatus(404)
    // }

    if (searchQuery === 'desc' && sortOrder === 'name' && filteredProducts.length > 0) {
      // Sort filtered products by name in ascending order
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

      res.send(filteredProducts)
    } else {
      res.status(404).send('Not found');
    }

    await db.write()
    return;
  }

  

  // Other search scenarios

  if (searchQuery === 'asc' && sortOrder === 'price') {
    await db.read()
    const sortedProducts = db.data.products.sort((a, b) => a.price - b.price)

    res.send(sortedProducts)
  } else {
    res.status(404).send('Not found')
  }

  await db.write()
})

export default router;
