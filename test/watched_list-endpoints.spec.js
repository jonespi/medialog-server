const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Watched List Endpoints', () => {
  let db

  const testUsers = helpers.makeUsersArray()
  const testMovies = helpers.makeWatchedArray()

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

  describe.only(`GET /api/watch_list/`, () => {
    beforeEach('insert users and movies', () => {
      helpers.seedWatchlist(db, testUsers, testMovies)
    })

    context(`User is logged in`, () => {
      it(`responds with 200 and movies list`, () => {
        const testUser = {
          user_name: testUsers[0].user_name,
          password: testUsers[0].password
        }

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
})