/* eslint-disable camelcase */
const Track = require('../models/Track')

class TrackController {
  async index (req, res) {
    const track = await Track.find({}).sort('-times_searched')

    return res.json(track)
  }

  async show (req, res) {
    const id = req.query.params

    const track = await Track.findOne({ _id: id })

    return res.json(track)
  }

  async store (req, res) {
    console.log(req.body)
    const { name, id, external_urls, popularity, album, artists } = req.body[0]
    const { acousticness, danceability, energy, instrumentalness } = req.body[1]
    const { liveness, loudness, tempo, speechiness, valence } = req.body[1]

    delete album.available_markets
    delete album.uri
    delete album.href
    delete album.album_type

    if (await Track.findOne({ track_id: id })) {
      const track = await Track.findOne({ track_id: id })
      track.times_searched += 1
      track.save()

      return res.json(track)
    } else {
      const audio_features = {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        loudness,
        tempo,
        speechiness,
        valence
      }
      const track = await Track.create({
        name,
        track_id: id,
        external_url: external_urls.spotify,
        popularity,
        album,
        artists,
        audio_features
      })

      return res.json(track)
    }
  }
}

module.exports = new TrackController()
