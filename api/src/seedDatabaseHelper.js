const seedPages = [
  {
    id: '2345',
    title: 'Explore God\'s Word',
    content: 'some content goes here.',
    created_by: '1234',
    created_at: new Date(),
    modified_by: '1234',
    modified_at: new Date(),
    deleted: false,
  },
]

const seedUsers = [
  {
    id: '1234',
    first_name: 'Brian',
    last_name: 'Kennedy',
    email: 'bpkennedy@gmail.com',
    role: 'admin',
    profile_image_url:
      'https://steamuserimages-a.akamaihd.net/ugc/918053186553065192/F20C63A555E64AAE971975AFA2B3BA3B227CD080/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
    serving: ['nursery', 'servecomm', 'sound', 'slides', 'greet', 'coffeecommprep', 'elementary', 'prek', 'moneycount']
  }
]

export const seedDatabase = async (db) => {
  try {
    for (const page of seedPages) {
      let batch = db.batch()
      const pageRef = db.collection('pages').doc(page.id)
      batch.set(pageRef, page)
      await batch.commit() //eslint-disable-line no-await-in-loop
    }
    for (const user of seedUsers) {
      let batch = db.batch()
      const userRef = db.collection('users').doc(user.id)
      batch.set(userRef, user)
      await batch.commit() //eslint-disable-line no-await-in-loop
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const clearDatabase = async (db) => {
  try {
    await deleteCollection(db, 'pages', 100)
    await deleteCollection(db, 'users', 100)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateBatch = async (database, collectionName, updateSets) => {
  let batch = database.batch()
  for (const updateSet of updateSets) {
    const ref = database.collection(collectionName).doc(updateSet.id)
    batch.set(ref, updateSet) 
  }
  await batch.commit() //eslint-disable-line no-await-in-loop
}

export const getBatch = async (database, collectionName) => {
  const items = []
  const ref = await database.collection(collectionName).get()
  ref.forEach(doc => {
    items.push(doc.data())
  })
  return items
}

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath)
  var query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject)
  })
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0
      }

      // Delete documents in a batch
      var batch = db.batch()
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref)
      })

      return batch.commit().then(() => { //eslint-disable-line promise/no-nesting
        return snapshot.size
      })
    })
    .then(numDeleted => {
      if (numDeleted === 0) { //eslint-disable-line promise/always-return
        resolve()
        return
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject)
      })
    })
    .catch(reject)
}
