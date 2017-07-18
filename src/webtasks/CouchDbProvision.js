const request = require('request-promise-native')
const uuidv4 = require('uuid/v4')

/**
 @param {object} user - The user being created
 @param {string} user.id - user id
 @param {string} user.tenant - Auth0 tenant name
 @param {string} user.username - user name
 @param {string} user.email - email
 @param {boolean} user.emailVerified - is e-mail verified?
 @param {string} user.phoneNumber - phone number
 @param {boolean} user.phoneNumberVerified - is phone number verified?
 @param {object} user.user_metadata - user metadata
 @param {object} user.app_metadata - application metadata
 @param {object} context - Auth0 connection and other context info
 @param {string} context.requestLanguage - language of the client agent
 @param {object} context.connection - information about the Auth0 connection
 @param {object} context.connection.id - connection id
 @param {object} context.connection.name - connection name
 @param {object} context.connection.tenant - connection tenant
 @param {object} context.webtask - webtask context
 @param {object} context.webtask.secrets - webtask secrets
 @param {function} callback - function (error, response)
 */
module.exports = function(user, context, callback) {
  const databases = ['accounts', 'transactions', 'tags', 'settings']
  const couchDB = user.app_metadata.couchDB || {}
  const host = context.webtask.secrets['CouchHost']
  var cookie

  login()
    .then(provisionUser)
    .then(() => Promise.all(databases.map(provisionDatabase)))
    .then(() => {
      user.app_metadata.couchDB = couchDB
      callback(null, { user })
    })
    .catch(err => callback(err))

  function login() {
    return request({
      method: 'POST',
      uri: `${host}/_session`,
      json: true,
      body: {
        name: context.webtask.secrets['CouchAdminUser'],
        password: context.webtask.secrets['CouchAdminPass']
      },
      resolveWithFullResponse: true
    }).then(response => {
      cookie = response.headers['set-cookie']
    })
  }

  function provisionUser() {
    if (couchDB.username) return new Promise(resolve => resolve())

    const name = 'u' + uuidv4()
    const password = uuidv4()

    return request({
      method: 'PUT',
      uri: `${host}/_users/org.couchdb.user:${name}`,
      json: true,
      headers: { cookie },
      body: { name, password, roles: [], type: 'user' },
      resolveWithFullResponse: true
    }).then(response => {
      if (response.statusCode !== 201) throw new Error('Could not create user')

      couchDB.username = name
      couchDB.password = password
    })
  }

  function provisionDatabase(name) {
    if (couchDB[name]) return new Promise(resolve => resolve())

    const databaseUri = `${host}/${name}_${couchDB.username}`
    return request({
      method: 'PUT',
      headers: { cookie },
      uri: databaseUri,
      json: true
    })
      .then(response => {
        if (!response.ok) throw new Error('Could not create database')
      })
      .then(() =>
        request({
          method: 'PUT',
          uri: `${databaseUri}/_security`,
          json: true,
          headers: { cookie },
          body: {
            admins: { names: [], roles: [] },
            members: { names: [couchDB.username], roles: [] }
          }
        })
      )
      .then(response => {
        if (!response.ok) throw new Error('Could not set database security')

        couchDB[name] = databaseUri
      })
  }
}
