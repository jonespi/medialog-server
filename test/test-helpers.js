function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'P@ssw0rd',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'P@ssw0rd',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'P@ssw0rd',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'P@ssw0rd',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeWatchedArray() {
  return [
    {
      id: 1,
      user_id: 1,
      title: 'The Avengers',
      image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2//cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
      url: 'http://google.com',
      date_watched: '06-15-2019',
      recommendation: 'recommend'
    },
    {
      id: 2,
      user_id: 2,
      title: 'The Avengers: Endgame',
      image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2//or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      url: 'http://google.com',
      date_watched: '06-15-2019',
      recommendation: 'recommend',
    },
    {
      id: 3,
      user_id: 3,
      title: 'The Avengers: Age of Ultron',
      image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2//t90Y3G8UGQp0f0DrP60wRu9gfrH.jpg",
      url: 'http://google.com',
      date_watched: '06-15-2019',
      recommendation: 'recommend'
    },
    {
      id: 4,
      user_id: 1,
      title: 'Star Wars',
      image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2//btTdmkgIvOi0FFip1sPuZI2oQG6.jpg",
      url: 'http://google.com',
      date_watched: '06-15-2019',
      recommendation: 'recommend'
    }
  ]
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      mls_users,
      watched_list
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
  return db
    .into('mls_users')
    .insert(users)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('mls_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedWatchlist(db, users, movies) {
  return db
    .transaction(async trx => {
      await trx.into('mls_users').insert(users)
      await trx.raw(`SELECT setval('mls_users_id_seq', ?)`, [users[users.length - 1].id])
      await trx.into('watched_list').insert(movies)
      await trx.raw(`SELECT setval('watched_list_id_seq', ?)`, [movies[movies.length -1].id])
      }
    )
}

module.exports = {
  makeUsersArray,
  makeWatchedArray,
  cleanTables,
  seedUsers,
  seedWatchlist
}
