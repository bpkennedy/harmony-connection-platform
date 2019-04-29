import axios from 'axios'

const apiPath = 'http://localhost:3000/api/v1/'

export async function apiGet(path) {
  return await axios.get(apiPath + path)
}

export async function apiPost(path, body) {
  return await axios.post(apiPath + path, body)
}

export async function apiPut(path, body) {
  return await axios.put(apiPath + path, body)
}

export async function apiDelete(path) {
  return await axios.delete(apiPath + path)
}

export function setupTest(test) {
  const timeout = 5 * 60 * 1000
  test.timeout(timeout)
  let db, helper
  
  before(async () => {
    const app = require('../src/index.js')
    db = app.database
  })

  after(async () => {
    await helper.seedDatabase(db)
    require('../src/index.js').stop()
    db = null
    helper = null
    delete require.cache[require.resolve('../src/index.js')]
  })

  beforeEach(async () => {
    helper = require('../src/seedDatabaseHelper')
    await helper.seedDatabase(db)
  })
  
  afterEach(async () => {
    await helper.clearDatabase(db)
    delete require.cache[require.resolve('../src/seedDatabaseHelper.js')]
  })
}