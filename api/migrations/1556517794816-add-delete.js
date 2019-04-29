'use strict'
import { database } from '../src/db'
import { getBatch, updateBatch, seedActivities } from '../src/seedDatabaseHelper'

module.exports.up = function (next) {
  // update users
  const users = await getBatch(database, 'users')
  for (const user of users) {
    user.deleted = false
  }
  await updateBatch(database, 'users', users)
  
  //update pages
  const pages = await getBatch(database, 'pages')
  for (const page of pages) {
    page.deleted = false
  }
  await updateBatch(database, 'pages', pages)
  
  //add activities
  await updateBatch(database, 'activities', seedActivities)
}

module.exports.down = function (next) {
  next()
}
