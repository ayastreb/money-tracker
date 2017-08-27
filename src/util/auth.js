import { WebAuth } from 'auth0-js'
/**
 * @see https://auth0.com/docs/connections/passwordless/spa-email-code/v8
 */
const auth0 = new WebAuth({
  domain: process.env.REACT_APP_AUTH_DOMAIN,
  clientID: process.env.REACT_APP_AUTH_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT,
  responseType: 'token'
})

export default {
  sendCode,
  verifyCode,
  parseHash,
  getUserInfo
}

function sendCode(email) {
  return new Promise((resolve, reject) => {
    auth0.passwordlessStart(
      {
        connection: 'email',
        send: 'code',
        email
      },
      (error, result) => (error ? reject(error) : resolve(result))
    )
  })
}

function verifyCode(email, verificationCode) {
  return new Promise((resolve, reject) => {
    auth0.passwordlessVerify(
      {
        connection: 'email',
        email,
        verificationCode
      },
      (error, result) => (error ? reject(error) : resolve(result))
    )
  })
}

function parseHash(hash) {
  return new Promise((resolve, reject) => {
    auth0.parseHash(hash, (error, authResult) => {
      if (error) return reject(error)

      resolve(authResult.accessToken)
    })
  })
}

function getUserInfo(accessToken) {
  return new Promise((resolve, reject) => {
    auth0.client.userInfo(accessToken, (error, userInfo) => {
      if (error) return reject(error)

      resolve({ accessToken, couchDB: userInfo.couchDB })
    })
  })
}
