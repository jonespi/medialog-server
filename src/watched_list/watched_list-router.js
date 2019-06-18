const express = require('express')
const WatchedListService = require('./watched_list-service')
const requireAuth = require('../middleware/jwt-auth')

const watchedListRouter = express.Router()
const bodyParser = express.json()

watchedListRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    WatchedListService.getMoviesForUser(req.app.get('db'), req.user.id)
      .then(usersMovieList => {
        return res
          .status(201)
          .json(usersMovieList)
      })
  })
  .post(bodyParser, (req, res, next) => {
    const { title, image, url, date_watched, recommendation } = req.body
    const newMovie = { 
      user_id: req.user.id, 
      title,
      image, 
      url, 
      date_watched, 
      recommendation 
    }

    for(const [key, value] of Object.entries(newMovie)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing ${key} in request body`
        })
      }
    }

    WatchedListService.postWatchedMovieForUser(req.app.get('db'), newMovie)
      .then(movie => {
        return res
          .status(201)
          .json(WatchedListService.serializeMovie(movie))
      })
      .catch(next)
  })

watchedListRouter
  .route('/:id')
  .all(requireAuth)
  .get((req, res, next) => {
    WatchedListService.getMovieById(req.app.get('db'), req.params.id)
      .then(movie => {
        return res
          .status(200)
          .json(movie)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    WatchedListService.deleteMovie(req.app.get('db'), req.params.id)
      .then(() => {
        return res
          .status(200)
          .json('deleted')
      })
      .catch(next)
  })

module.exports = watchedListRouter;