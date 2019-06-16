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
  cleanTables,
  seedUsers
}
