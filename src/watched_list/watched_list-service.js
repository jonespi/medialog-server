const xss = require('xss')

const WatchedListService = {
  getMoviesForUser(db, id) {
    return db
      .from('watched_list')
      .select('*')
      .where('user_id', id)
  },

  postWatchedMovieForUser(db, newMovie) {
    return db('watched_list')
      .insert(newMovie)
      .returning('*')
      .then(([movie]) => movie)
  },

  serializeMovie(movie) {
    return {
      id: movie.id,
      user_id: movie.user_id,
      title: xss(movie.title), 
      url: xss(movie.url), 
      date_watched: xss(movie.date_watched), 
      recommendation: xss(movie.recommendation) 
    }
  }
}

module.exports = WatchedListService