'use strict'
import { database } from '../src/db'
import { getBatch, updateBatch } from '../src/seedDatabaseHelper'

module.exports.up = async function () {
  // update users
  const users = await getBatch(database, 'users')
  for (const user of users) {
    user.version = 1
  }
  await updateBatch(database, 'users', users)
  
  //update pages
  const pages = await getBatch(database, 'pages')
  for (const page of pages) {
    page.version = 1
  }
  await updateBatch(database, 'pages', pages)
}

module.exports.down = async function () {
}
