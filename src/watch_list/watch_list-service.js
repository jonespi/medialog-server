const xss = require('xss')

const WatchListService = {
  getMediaById(db, id) {
    return db('watch_list')
      .select('*')
      .where('id', id)
      .first()
  },

  getMediaForUser(db, user_id) {
    return db
      .from('watch_list')
      .select('*')
      .where('user_id', user_id)
  },

  postWatchedMediaForUser(db, newMedia) {
    return db('watch_list')
      .insert(newMedia)
      .returning('*')
      .then(([movie]) => movie)
  },

  serializeMedia(media) {
    return {
      id: media.id,
      user_id: media.user_id,
      media_type: media.media_type,
      season_num: media.season_num,
      episode_number: media.episode_number,
      episode_name: media.episode_name,
      title: xss(media.title), 
      url: xss(media.url), 
      date_watched: xss(media.date_watched), 
      recommendation: xss(media.recommendation) 
    }
  },

  deleteMedia(db, id) {
    return db('watch_list')
      .where({ id })
      .delete()
  }
}

module.exports = WatchListService