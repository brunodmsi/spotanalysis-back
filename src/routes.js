const express = require('express')

const routes = express.Router()

const controllers = require('./app/controllers')

routes.get('/login', controllers.AccessController.login)
routes.get('/callback', controllers.AccessController.callback)

module.exports = routes
