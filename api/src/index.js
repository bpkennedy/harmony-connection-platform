import express from 'express'
import path from 'path'
import history from 'connect-history-api-fallback'
import bodyParser from 'body-parser'
import cors from 'cors'
const migrate = require('migrate')
import { initializeDb, deleteFirestore } from './db'
import { FirebaseMigrationStore } from './migrate-store'
import { createREST } from './restGenerator'

const port = process.env.PORT || 3000
const directory = path.join(__dirname, '..', 'public')
const app = express()

export let database

initializeDb(db => {
  database = db
  
  app.use(cors({ origin: true }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  
  app.use('/pages', createREST(db, 'pages'))
  app.use('/activities', createREST(db, 'activities'))
  app.use('/users', createREST(db, 'users'))
  
  migrate.load({
    stateStore: new FirebaseMigrationStore(db),
  }, async (err, set) => {
    if (err) {
      throw err
    }
    await set.up(err => {
      if (err) {
        console.log('Migrations failed to run')
        console.log(err)
        throw err
      }
    })
  })
})

const main = express()
main.use('/api/v1', app)
// main.use(bodyParser.json())
// main.use(bodyParser.urlencoded({ extended: false }))

let staticFileMiddleware = express.static(directory)
main.use(staticFileMiddleware)
main.use(history())
main.use(staticFileMiddleware)
// needs to be called twice per https://github.com/bripkens/connect-history-api-fallback/tree/master/examples/static-files-and-index-rewrite
main.get('/', (req, res) => {
  res.render(directory + '/index.html')
})

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
