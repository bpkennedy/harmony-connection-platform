'use strict'
import { database } from '../src/db'
import { seedDatabase } from '../src/seedDatabaseHelper'

module.exports.up = async function () {
  await seedDatabase(database)
}

module.exports.down = async function () {
}
