const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Medialog Endpoints', () => {
  let db

  const testUsers = helpers.makeUsersArray()

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

  describe(`POST /api/users`, () => {
    beforeEach('insert users', () => {
      helpers.seedUsers(db, testUsers)
    })

    context(`Registration is valid`, () => {
      it(`responds with 200 and username`, () => {
        const testUser = {
          "user_name": "testuser",
          "password": "P@ssw0rd"
        }

        return supertest(app)
          .post('/api/users')
          .send(testUser)
          .expect(201, { "user_name": testUser.user_name})
      })
    })

    context(`User is already in db`, () => {
      it(`responds with 400 and error`, () => {
        const testUser = {
          "user_name": 'test-user-1',
          "password": 'P@ssw0rd'
        }

        return supertest(app)
          .post('/api/users')
          .send(testUser)
          .expect(400, {error: 'username already exists'})
      })
    })    
  })
})