import express from 'express'

export default (db, collectionName) => {

  // ======
  // Create
  // ======
  const create = async (req, res) => {
    const newEntry = req.body;
    try {
      const ref = await db.collection[collectionName].add(newEntry)
      const addedEntry = await db.collection[collectionName].get(ref.id)
      res.send(addedEntry).status(201) 
    } catch(error) {
      console.log(error)
      res.send(error).status(400)
    }
  };
  
  // =========
  // Read all
  // =========
  const readAll = async (req, res) => {
    const allItems = []
    try {
      const snapshot = db.collection[collectionName].get()
      snapshot.forEach(doc => {
        allItems.push(doc.data())
      })
      res.send(allItems).status(200)
    } catch(error) {
      console.log(error)
      res.send(error).status(400)
    }
  };

  // ========
  // Read one
  // ========
  const readOne = async (req, res) => {
    const { id } = req.params;
    try {
      const item = db.collection[collectionName].get(id)
      res.send(item).status(200)
    } catch(error) {
      console.log(error)
      res.send(error).status(400)
    }
  };
  
  // ======
  // Update
  // ======
  const update = async (req, res) => {
    const changedEntry = req.body
    try {
      const ref = await db.collection[collectionName].doc(req.body.id).update(changedEntry)
      const updatedEntry = await db.collection[collectionName].get(ref.id)
      res.send(updatedEntry).status(200)
    } catch(error) {
      console.log(error)
      res.send(error).status(400)
    }
  };
  
  // ======
  // Remove
  // ======
  const remove = async (req, res) => {
    const { id } = req.params
    try {
      await db.collection[collectionName].doc(id).delete()
      res.send('successful deletion').status(200)
    } catch(error) {
      console.log(error)
      res.send(error).status(400)
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