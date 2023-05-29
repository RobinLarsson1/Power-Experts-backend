import express from 'express';
import { getDb } from '../Data/database.js';

const router = express.Router();
const db = getDb();

// Search procuct name
router.get('/', async (req, res) => {
  const name = req.query.q;

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

// Search product name by price
router.get('/', async (req, res) => {
  const sortByPrice = req.query.sort//=price&order=Din sökning;

});

// Search product name from A-Z
router.get('/', async (req, res) => {
  const sortByAz = req.query.q//=bad&sort=name&order=Din sökning;

});


export default router;
