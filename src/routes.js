const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

routes.get('/login', controllers.AccessController.login)
routes.get('/callback', controllers.AccessController.callback)
routes.post('/refresh', controllers.AccessController.refresh)

routes.get('/tracks', controllers.TrackController.index)
routes.get('/tracks/:id', controllers.TrackController.show)
routes.post('/save_track', controllers.TrackController.store)

module.exports = routes
