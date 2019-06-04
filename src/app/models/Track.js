const mongoose = require('mongoose')

const TrackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  track_id: {
    type: String,
    required: true
  },
  external_url: {
    type: String,
    required: true
  },
  popularity: {
    type: String,
    required: true
  },
  album: {
    type: Array,
    default: []
  },
  artists: [
    {
      type: Array,
      default: []
    }
  ],
  times_searched: {
    type: Number,
    default: 1
  },
  audio_features: {
    acousticness: {
      type: String,
      required: true
    },
    danceability: {
      type: String,
      required: true
    },
    energy: {
      type: String,
      required: true
    },
    instrumentalness: {
      type: String,
      required: true
    },
    liveness: {
      type: String,
      required: true
    },
    loudness: {
      type: String,
      required: true
    },
    tempo: {
      type: String,
      required: true
    },
    speechiness: {
      type: String,
      required: true
    },
    valence: {
      type: String,
      required: true
    }
  }
})

module.exports = mongoose.model('Track', TrackSchema)
