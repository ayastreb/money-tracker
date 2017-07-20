function CouchDbProvision(user, context, callback) {
  const request = require('request')
  const uuidv4 = require('uuid').v4
  const databases = ['accounts', 'transactions', 'tags', 'settings']
  var cookie

  user.app_metadata = user.app_metadata || {}
  user.app_metadata.couchDB = user.app_metadata.couchDB || {}

  loginAsAdmin()
    .then(provisionUser)
    .then(() => Promise.all(databases.map(provisionDatabase)))
    .then(() => Promise.all(databases.map(provisionSecurity)))
    .then(() => auth0.users.updateAppMetadata(user.user_id, user.app_metadata))
    .then(() => callback(null, user, context))
    .catch(err => callback(err))

  function loginAsAdmin() {
    return new Promise((resolve, reject) => {
      request(
        {
          method: 'POST',
          uri: `${configuration['CouchHost']}/_session`,
          json: true,
          body: {
            name: configuration['CouchAdminUser'],
            password: configuration['CouchAdminPass']
          }
        },
        (err, response) => {
          if (err) return reject(err)

          cookie = response.headers['set-cookie']
          resolve()
        }
      )
    })
  }

  function provisionUser() {
    return new Promise((resolve, reject) => {
      if (user.app_metadata.couchDB.username) return resolve()

      const name = uuidv4()
      const password = uuidv4()
      request(
        {
          method: 'PUT',
          headers: { cookie },
          uri: `${configuration['CouchHost']}/_users/org.couchdb.user:${name}`,
          json: true,
          body: { name, password, roles: [], type: 'user' }
        },
        (err, response, body) => {
          if (err) return reject(err)
          if (!body.ok) return reject('Could not create user')

          user.app_metadata.couchDB.username = name
          user.app_metadata.couchDB.password = password
          resolve()
        }
      )
    })
  }

  function provisionDatabase(name) {
    return new Promise((resolve, reject) => {
      if (user.app_metadata.couchDB[name]) return resolve()

      request(
        {
          method: 'PUT',
          headers: { cookie },
          uri: databaseUri(name),
          json: true
        },
        (err, response, body) => {
          if (err) return reject(err)
          if (!body.ok) return reject('Could not create database')

          resolve()
        }
      )
    })
  }

  function provisionSecurity(name) {
    return new Promise((resolve, reject) => {
      if (user.app_metadata.couchDB[name]) return resolve()

      request(
        {
          method: 'PUT',
          headers: { cookie },
          uri: `${databaseUri(name)}/_security`,
          json: true,
          body: {
            admins: { names: [], roles: [] },
            members: { names: [user.app_metadata.couchDB.username], roles: [] }
          }
        },
        (err, response, body) => {
          if (err) return reject(err)
          if (!body.ok) return reject('Could not set database security')

          user.app_metadata.couchDB[name] = databaseUri(name)
          resolve()
        }
      )
    })
  }

  function databaseUri(name) {
    return `${configuration['CouchHost']}/${name}_${user.app_metadata.couchDB.username}`
  }
}
