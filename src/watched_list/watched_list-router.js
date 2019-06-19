const express = require('express')
const WatchedListService = require('./watched_list-service')
const requireAuth = require('../middleware/jwt-auth')

const watchedListRouter = express.Router()
const bodyParser = express.json()

watchedListRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    WatchedListService.getMediaForUser(req.app.get('db'), req.user.id)
      .then(usersMediaList => {
        return res
          .status(201)
          .json(usersMediaList)
      })
  })
  .post(bodyParser, (req, res, next) => {
    const { media_type, title, image, url, date_watched, recommendation } = req.body
    
    let newMedia
    if (media_type === 'tv') {
      const { season, episode_number, episode_name } = req.body
      newMedia = {
        media_type: 'tv',
        user_id: req.user.id, 
        title,
        image, 
        url, 
        season,
        episode_number,
        episode_name,
        date_watched, 
        recommendation 
      }
    } else {
      newMedia = { 
        media_type: 'movie',
        user_id: req.user.id, 
        title,
        image, 
        url, 
        date_watched, 
        recommendation 
      }
    }

    for(const [key, value] of Object.entries(newMedia)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing ${key} in request body`
        })
      }
    }

    WatchedListService.postWatchedMediaForUser(req.app.get('db'), newMedia)
      .then(media => {
        return res
          .status(201)
          .json(WatchedListService.serializeMedia(media))
      })
      .catch(next)
  })

watchedListRouter
  .route('/:id')
  .all(requireAuth)
  .get((req, res, next) => {
    WatchedListService.getMediaById(req.app.get('db'), req.params.id)
      .then(media => {
        return res
          .status(200)
          .json(media)
      })
      .catch(next)
  })
  .delete((req, res, next) => {
    WatchedListService.deleteMedia(req.app.get('db'), req.params.id)
      .then(() => {
        return res
          .status(200)
          .json('deleted')
      })
      .catch(next)
  })

module.exports = watchedListRouter;