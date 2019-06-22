const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Watch List Endpoints', () => {
  let db

  const testUsers = helpers.makeUsersArray()
  const testMedia = helpers.makeWatchedArray()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/watch_list/`, () => {
    before('seed tables', () => {
      helpers.seedUsers(db, testUsers)
        .then(() => {
          helpers.seedWatchlist(db, testMedia);
        })
    })

    context(`User is logged in`, () => {
      const testUser = {
        user_name: 'testuser1',
        password: 'P@ssw0rd'
      }
      it(`responds with 200 and movies list`, () => {
        return supertest(app)
          .post('/api/auth/login')
          .send(testUser)
          .then(res => {
            return supertest(app)
              .get('/api/watch_list')
              .set('Authorization', `bearer ${res.authToken}`)
              .expect(200)
          })
        })
      })
    })

  describe(`POST /api/watch_list/`, () => {

  })
})