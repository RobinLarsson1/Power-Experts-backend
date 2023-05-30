import express from 'express';
import { getDb } from '../Data/database.js';

const router = express.Router();
const db = getDb();


router.get('/', async (req, res) => {
  // Search procuct name
  const name = req.query.q

  if (typeof name === 'string') {
    await db.read()
    const findProduct = db.data.products.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    )

    if (findProduct.length > 0) {
      res.send(findProduct)
      await db.write()
    } else {
      res.status(404).send('not found');
      await db.write()
    }
  }

  // Search product name by price
  const searchQuery = req.query.order
  const sortOrder = req.query.sort

  if (searchQuery === 'asc' && sortOrder === 'price') {
    await db.read()
    const sortedProducts = db.data.products.sort((a, b) => a.price - b.price)


    res.send(sortedProducts)
    await db.write()
  } else {
    res.status(404).send('Not found')
    await db.write()
  }

  // Search product name from A-Z
  if (typeof name === 'string') {
    await db.read()

    let filteredProducts = db.data.products.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    )

    if (filteredProducts.length > 0) {
      if (sortOrder === 'name' && searchQuery === 'desc') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      } 

      res.send(filteredProducts);
      await db.write();
    } else {
      res.status(404).send('Not found');
      await db.write();
    }
  }
})

export default router;
