import express from 'express';
import { getDb } from '../Data/database.js';

const router = express.Router();
const db = getDb();

router.get('/', async (req, res) => {
  const name = req.query.name;

  if (typeof name === 'string') {
    await db.read();
    const findProduct = db.data.products.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );

    if (findProduct.length > 0) {
      res.send(findProduct);
      await db.write();
    } else {
      res.status(404).send('not found');
      await db.write();
    }
  }
});

export default router;
