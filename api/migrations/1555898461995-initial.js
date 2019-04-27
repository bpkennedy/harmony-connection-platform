'use strict'
import { database } from '../src/db'
import { seedDatabase, clearDatabase } from '../src/seedDatabaseHelper'

module.exports.up = async function () {
  await seedDatabase(database)
}

module.exports.down = async function () {
  await clearDatabase(database)
}
