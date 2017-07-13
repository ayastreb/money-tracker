function cloudantProvision(user, context, callback) {
  user.app_metadata = user.app_metadata || {}
  if (user.app_metadata.couchDB) return callback(null, user, context)

  user.app_metadata.couchDB = {
    host: configuration.CloudantHost,
    databases: {},
    key: '',
    password: ''
  }

  const Cloudant = require('cloudant')
  const cloudant = new Cloudant({
    account: configuration.CloudantUser,
    password: configuration.CloudantPassword,
    plugin: 'promises'
  })

  generateApiKey()
    .then(() =>
      Promise.all([
        provision('accounts'),
        provision('settings'),
        provision('tags'),
        provision('transactions')
      ])
    )
    .then(databases => Promise.all(databases.map(db => assignApiKey(db))))
    .then(() => auth0.users.updateAppMetadata(user.user_id, user.app_metadata))
    .then(() => callback(null, user, context))
    .catch(err => {
      console.log('error', err)
      callback(null, user, context)
    })

  function generateApiKey() {
    return new Promise((resolve, reject) => {
      cloudant.generate_api_key((err, api) => {
        if (err) return reject(err)

        user.app_metadata.couchDB.key = api.key
        user.app_metadata.couchDB.password = api.password
        resolve()
      })
    })
  }

  function provision(appDbName) {
    const cloudantDbName = `mt_${user.user_id.split('|')[1]}_${appDbName}`

    return new Promise((resolve, reject) => {
      cloudant.db.get(cloudantDbName, err => {
        if (!err || err.statusCode !== 404) {
          return reject(`database "${cloudantDbName}" already exist`)
        }

        cloudant.db.create(cloudantDbName, err => {
          if (err) return reject(err)

          user.app_metadata.couchDB.databases[appDbName] = cloudantDbName
          resolve(cloudantDbName)
        })
      })
    })
  }

  function assignApiKey(databaseName) {
    return new Promise((resolve, reject) => {
      cloudant.db.use(databaseName).set_security(
        {
          nobody: [],
          [user.app_metadata.couchDB.key]: ['_reader', '_writer', '_replicator']
        },
        err => (err ? reject(err) : resolve(databaseName))
      )
    })
  }
}
