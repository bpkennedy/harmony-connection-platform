import express from 'express'
import admin from 'firebase-admin'

export const createREST = (db, collectionName) => {

  // ======
  // Create
  // ======
  const create = async (req, res) => {
    const newEntry = { 
      ...req.body,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      modified_at: admin.firestore.FieldValue.serverTimestamp(),
    }
    try {
      const ref = await db.collection(collectionName).add(newEntry)
      await updateWithId(db, collectionName, ref.id)
      const newItem = await findItemById(db, collectionName, ref.id)
      res.status(201).send(newItem)
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
      const snapshot = await db.collection(collectionName).where('is_active', '==', true).get()
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
      const existingItem = await findItemById(db, collectionName, id)
      res.status(200).send(existingItem)
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
      let batch = db.batch()
      
      const existingItem = await findItemById(db, collectionName, id)
      const newVersionData = {
        ...existingItem,
        ...changedEntry,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        modified_at: admin.firestore.FieldValue.serverTimestamp(),
        is_active: true,
        version: existingItem.version + 1,
      }
      const newRef = db.collection(collectionName).doc()
      batch.set(newRef, newVersionData)
      
      const oldRef = db.collection(collectionName).doc(id)
      batch.update(oldRef, {
        is_active: false,
        modified_at: admin.firestore.FieldValue.serverTimestamp(),
      })
      
      await batch.commit()
      
      const entry = await findItemById(db, collectionName, id)
      res.status(200).send(entry)
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
      let batch = db.batch()
      
      const existingItem = await findItemById(db, collectionName, id)
      const newVersionData = {
        ...existingItem,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        modified_at: admin.firestore.FieldValue.serverTimestamp(),
        is_active: false,
        version: existingItem.version + 1
      }
      const newRef = db.collection(collectionName).doc()
      batch.set(newRef, newVersionData)
      const oldRef = db.collection(collectionName).doc(id)
      batch.update(oldRef, {
        is_active: false,
        modified_at: admin.firestore.FieldValue.serverTimestamp(),
       })
      
      await batch.commit()
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

const findItemById = async (db, collectionName, id) => {
  const allItems = []
  const snapshot = await db.collection(collectionName).where('id', '==', id).where('is_active', '==', true).get()
  snapshot.forEach(doc => {
    allItems.push(doc.data())
  })
  if (!allItems[0]) {
    throw new Error('Existing Item not found.')
  }
  return allItems[0]
}

const updateWithId = async (db, collectionName, id) => {
  await db.collection(collectionName).doc(id).update({
    id,
    modified_at: admin.firestore.FieldValue.serverTimestamp(),
  })
}