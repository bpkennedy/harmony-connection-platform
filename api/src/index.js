import express from 'express'
import bodyParser from 'body-parser'
const migrate = require('migrate')
import { initializeDb, deleteFirestore } from './db'
import { FirebaseMigrationStore } from './migrate-store'

const app = express()
const port = 3000
export let database

initializeDb(db => {
  // app.use('/api', routes(db, logger))
  // View all ships
  database = db
  
  app.get('/pages', async (req, res) => {
    let pages = []
    try {
      const pagesSnapshot = await db.collection('pages').get()
      pagesSnapshot.forEach(doc => {
        pages.push(doc.data())
      })
      res.status(200).send(pages)
    } catch(error) {
      res.status(400).send(error)
    }
  })
  
  app.get('/users', async (req, res) => {
    let users = []
    try {
      const usersSnapshot = await db.collection('users').get()
      usersSnapshot.forEach(doc => {
        users.push(doc.data())
      })
      res.status(200).send(users)
    } catch(error) {
      res.status(400).send(error)
    }
  })
  
  migrate.load({
    stateStore: new FirebaseMigrationStore(db),
  }, async (err, set) => {
    if (err) {
      throw err
    }
    await set.up(err => {
      if (err) {
        throw err
      }
      console.log('Migrations successfully ran.')
    })
  })
})

const main = express()
main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }))

const startup = () => {
  return main.listen(port, () => {
    console.log('Listening on port ' + port)
  })
}

export default main

export const stop = async () => {
  await deleteFirestore()
  api.close()
}

export const api = startup(main)
