function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'password',
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
      url: 'http://google.com',
      date_watched: '06-15-2019',
      recommendation: 'recommend'
    },
    {
      id: 2,
      user_id:'2',
      title: 'The Avengers: Endgame',
      url: 'http://google.com',
      date_watched: '06-15-2019',
      recommendation: 'recommend',
    },
    {
      id: 3,
      user_id: 3,
      title: 'The Avengers: Age of Ultron',
      url: 'http://google.com',
      date_watched: '06-15-2019',
      recommendation: 'recommend'
    },
    {
      id: 4,
      user_id: 1,
      title: 'Star Wars',
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

module.exports = {
  makeUsersArray,
  makeWatchedArray,
  cleanTables,
  seedUsers
}
