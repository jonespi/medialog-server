const WatchedListService = {
  getMoviesForUser(db, id) {
    return db
      .from('watched_list')
      .select('*')
      .where('user_id', id)
  }
}

module.exports = WatchedListService