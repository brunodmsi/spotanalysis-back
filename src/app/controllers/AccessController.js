/* eslint-disable camelcase */
/* eslint-disable node/no-deprecated-api */
const querystring = require('querystring')
const request = require('request')

const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:8888/callback'

class AccessController {
  async login (req, res) {
    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'token',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri: REDIRECT_URI,
        state: 123
      })}`
    )
  }

  async callback (req, res) {
    console.log(req.body)
    const token = req.query.token || null
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        access_token: token,
        redirect_uri: REDIRECT_URI,
        token_type: 'Bearer'
      },
      headers: {
        Authorization: `Basic ${new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`
      },
      json: true
    }
    request.post(authOptions, (_err, response, body) => {
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
      res.redirect(`${uri}`)
    })
  }

  async refresh (req, res) {
    const { code } = req.body
    // console.log()
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'refresh_token',
        refresh_token: code
      },
      headers: {
        Authorization: `Basic ${new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')}`
      },
      json: true
    }
    request.post(authOptions, (_err, response, body) => {
      // console.log(response)
    })
  }
}

module.exports = new AccessController()
