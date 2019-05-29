/* eslint-disable node/no-deprecated-api */
const querystring = require('querystring')
const request = require('request')

const REDIRECT_URI =
  process.env.REDIRECT_URI || 'http://localhost:8888/callback'

class AccessController {
  async login (req, res) {
    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri: REDIRECT_URI
      })}`
    )
  }

  async callback (req, res) {
    const code = req.query.code || null
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code'
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
    request.post(authOptions, (err, response, body) => {
      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
      return res.json({ access_token })
    })
  }
}

module.exports = new AccessController()
