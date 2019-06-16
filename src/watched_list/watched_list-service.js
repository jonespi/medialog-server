const xss = require('xss')

const WatchedListService = {
  getMoviesForUser(db, id) {
    return db
      .from('watched_list')
      .select('*')
      .where('user_id', id)
  },

  postWatchedMovieForUser(db, newMovie, user_id) {
    return db('watched_list')
      .insert(newMovie)
      .returning('*')
      .where({user_id})
  },

  serializeMovie(movie) {
    return {
      id,
      user_id,
      title: xss(movie.title), 
      url: xss(movie.url), 
      date_watched: xss(movie.date_watched), 
      recommendation: xss(movie.recommendation) 
    }
  }
}

module.exports = WatchedListService