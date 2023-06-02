import express from 'express'
import { getDb } from '../Data/database.js'
import { isValidUser, hasID, isValidId } from '../Data/validate.js'

const router = express.Router()
const db = getDb()

router.get('/', async (req, res) => {
    await db.read()
    res.send(db.data.users)
})

router.post('/', async (req, res) => {
    let addUser = req.body

    await db.read()
    addUser.id = Math.floor(Math.random() * 100000)
    db.data.users.push(addUser)
    await db.write()
    res.send({ id: addUser.id })
})

router.delete('/:id', async (req, res) => {
    let id = Number(req.params.id)

    if (isNaN(id) || id < 0) {
        res.sendStatus(400)
        return
    }

    await db.read()
    let findUser = db.data.users.find(user => user.id === id)
    if (!findUser) {
        res.sendStatus(404)
        return
    }

    db.data.users = db.data.users.filter(user => user.id !== id)
    await db.write()
    res.sendStatus(200)
});

router.get('/:id', async (req, res) => {
    let id = Number(req.params.id);

    if (!isNaN(id)) {
        await db.read();
        const user = db.data.users.find((p) => p.id === id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found.');
        }
    } else {
        res.status(400).send('Invalid id.');
    }
});


router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
  
    // Validera body (object)
    if (!isValidUser(req.body)) {
      res.sendStatus(400);
      console.log('log2');
      return;
    }
  
    // Finns användare med samma id?
    // I så fall uppdatera objektet
    await db.read();
    const oldUserIndex = db.data.users.findIndex(user => user.id === id);
    if (oldUserIndex === -1) {
      res.sendStatus(404);
      console.log('log3');
      return;
    }
  
    const updatedUser = req.body;
    updatedUser.id = id;
  
    db.data.users[oldUserIndex] = updatedUser;
    await db.write();
    res.sendStatus(200);
  });
  

export default router