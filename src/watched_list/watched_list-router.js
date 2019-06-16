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
  .post(bodyParser, (req, res, next) => {
    const { title, url, date_watched, recommendation} = req.body
    const newMovie = { 
      user_id: req.params.user_id, 
      title, 
      url, 
      date_watched, 
      recommendation 
    }

    WatchedListService.postWatchedMovieForUser(req.app.get('db', newMovie, newMovie.user_id))
      .then(movie => {
        res
          .status(201)
          .json(WatchedListService.serializeMovie(movie))
      })
      .catch(next)
  })

module.exports = watchedListRouter;