const express = require('express')
const WatchedListService = require('./watched_list-service')
const requireAuth = require('../middleware/jwt-auth')

const watchedListRouter = express.Router()
const bodyParser = express.json()

watchedListRouter
  .route('/:user_id')
  .all(requireAuth)
  .get((req, res, next) => {
    console.log(req.body)
    WatchedListService.getMoviesForUser(req.app.get('db'), req.params.user_id)
      .then(movies => {
        res
          .status(201)
          .json(movies)
      })
      .catch(next)
  })

module.exports = watchedListRouter;