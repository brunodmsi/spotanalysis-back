/* eslint-disable camelcase */
/* eslint-disable node/no-deprecated-api */
const querystring = require('querystring')
const request = require('request')

// const REDIRECT_URI = 'http://localhost:8888/callback'
const REDIRECT_URI = 'https://spotanalysis-back.herokuapp.com/callback'

class AccessController {
  async login (req, res) {
    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'token',
        client_id: 'f47b20a672fa437984c50beaa4379398',
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
          'f47b20a672fa437984c50beaa4379398' +
            ':' +
            'b2f1e9e79d3742ccbb528a64dda9ba8f'
        ).toString('base64')}`
      },
      json: true
    }
    request.post(authOptions, (_err, response, body) => {
      // let uri = 'http://localhost:3000'
      let uri = 'https://spotanalysis-front.herokuapp.com/'
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
          'f47b20a672fa437984c50beaa4379398' +
            ':' +
            'b2f1e9e79d3742ccbb528a64dda9ba8f'
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
