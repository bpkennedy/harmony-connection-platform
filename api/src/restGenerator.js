import express from 'express'

export const createREST = (db, collectionName) => {

  // ======
  // Create
  // ======
  const create = async (req, res) => {
    const newEntry = req.body
    try {
      const ref = await db.collection(collectionName).add(newEntry)
      await db.collection(collectionName).doc(ref.id).update({ id: ref.id })
      const addedEntry = await db.collection(collectionName).doc(ref.id).get()
      if (!addedEntry.exists) {
        throw new Error('Item not found.')
      }
      res.status(201).send(addedEntry.data())
    } catch(error) {
      console.log(error)
      res.status(400).send(error)
    }
  };
  
  // =========
  // Read all
  // =========
  const readAll = async (req, res) => {
    const allItems = []
    try {
      const snapshot = await db.collection(collectionName).where('deleted', '==', false).get()
      snapshot.forEach(doc => {
        allItems.push(doc.data())
      })
      res.status(200).send(allItems)
    } catch(error) {
      console.log(error)
      res.status(400).send(error)
    }
  };

  // ========
  // Read one
  // ========
  const readOne = async (req, res) => {
    const { id } = req.params;
    try {
      const allItems = []
      const snapshot = await db.collection(collectionName).where('id', '==', id).where('deleted', '==', false).get()
      snapshot.forEach(doc => {
        allItems.push(doc.data())
      })
      if (!allItems[0]) {
        throw new Error('Item not found.')
      }
      res.status(200).send(allItems[0])
    } catch(error) {
      console.log(error)
      res.status(400).send(error)
    }
  };
  
  // ======
  // Update
  // ======
  const update = async (req, res) => {
    const { id } = req.params
    const changedEntry = req.body
    try {
      await db.collection(collectionName).doc(id).update(changedEntry)
      const updatedEntry = await db.collection(collectionName).doc(id).get()
      if (!updatedEntry.exists) {
        throw new Error('Item does not exist.')
      }
      res.status(200).send(updatedEntry.data())
    } catch(error) {
      console.log(error)
      res.status(400).send(error)
    }
  };
  
  // ======
  // Remove
  // ======
  const remove = async (req, res) => {
    const { id } = req.params
    try {
      await db.collection(collectionName).doc(id).update({ deleted: true })
      res.status(200).send('successful deletion')
    } catch(error) {
      console.log(error)
      res.status(400).send(error)
    }
  };

  // ======
  // Routes
  // ======

  let router = express.Router();

  router.post('/', create);
  router.get('/', readAll);
  router.get('/:id', readOne);
  router.put('/:id', update);
  router.delete('/:id', remove);

  return router;

}