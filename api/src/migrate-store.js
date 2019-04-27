export class FirebaseMigrationStore {
  constructor(db) {
    this.db = db
  }
  async load(callback) {
    try {
      let results = []
      const resultSnap = await this.db.collection('migrations').get()
      resultSnap.forEach((doc) => {
        results.push(doc.data())
      })
      if (results.length > 1) {
        return callback(null, results[0])
      }
      console.log('No migrations found.')
      return callback(null, {});
    } catch(error) {
      console.log(error)
      return error
    }
  }
  
  async save(set, callback) {
    const updateSet = {
      migrations: set.migrations,
      lastRun: set.lastRun,
    }
    try {
      const configRef = this.db.collection('migrations').doc('global')
      await configRef.update(JSON.parse(JSON.stringify(updateSet)))
    } catch(error) {
      console.log(error)
    }
    callback()
  }
}
