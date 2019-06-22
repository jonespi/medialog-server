const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe.only('Auth Endpoints', () => {
  let db

  const testUsers = helpers.makeUsersArray()
  const testUser = testUsers[0]

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

  describe(`POST /api/auth/login`, () => {
    beforeEach('insert users', () => {
      helpers.seedUsers(db, testUsers)
    })

    const requiredFields = ['user_name', 'password']

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        user_name: testUser.user_name,
        password: testUser.password
      }

    it(`responds with 400 required error when ${field} is missing`, () => {
      delete loginAttemptBody[field]

      return supertest(app)
        .post('/api/auth/login')
        .send(loginAttemptBody)
        .expect(400, {
          error: `missing ${field} in request`
        })
    })

    it(`responds with 403 'invalid user_name or password' when bad user_name`, () => {
      const userInvalidUser = { 
        user_name: 'user-not', 
        password: 'existy' 
      }

      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidUser)
        .expect(403, {
          error: `incorrect user_name or password`
        })
    })

    it(`reponds with 403 'invalid user_name or password' when bad password`, () => {
      const userInvalidPass = { 
        user_name: testUser.user_name, 
        password: 'incorrect' 
      }

      return supertest(app)
        .post('/api/auth/login')
        .send(userInvalidPass)
        .expect(403, {
          error: `incorrect user_name or password`
        })
    })

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
        const testUser = {
          user_name: 'testuser1',
          password: 'P@ssw0rd',
        }

        return supertest(app)
          .post('/api/auth/login')
          .send(testUser)
          .expect(200)
      })
  })

  })

})