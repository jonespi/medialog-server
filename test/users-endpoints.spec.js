const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('User Endpoints', () => {
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

    context(`Password errors`, () => {
      it(`responds with 400 error when password is too short`, () => {
        const testUser = {
          "user_name": "testuser",
          "password": "1234567"
        }

        return supertest(app)
          .post('/api/users')
          .send(testUser)
          .expect(400, {error: 'password must be longer than 8 characters'})
      })

      it(`responds with 400 error when password is too long`, () => {
        const testUser = {
          "user_name": "testuser",
          "password": '*'.repeat(73)
        }

        return supertest(app)
          .post('/api/users')
          .send(testUser)
          .expect(400, {error: 'password must be less than 72 characters'})
      })

      it(`reponds with 400 error when password starts or ends with space`, () => {
        const testUser = {
          "user_name": "testuser",
          "password": ' P@ssw0rd'
        }

        return supertest(app)
          .post('/api/users')
          .send(testUser)
          .expect(400, {error: 'password cannot start or end with empty spaces'})
      })

      it(`responds with 400 error when password is not complex enough`, () => {
        const testUser = {
          "user_name": "testuser",
          "password": 'password'
        }

        return supertest(app)
          .post('/api/users')
          .send(testUser)
          .expect(400, {error: 'password must have an upper case, a lower case, a number, and a special character'})
      })
    })

    context(`User is already in db`, () => {
      it(`responds with 400 and error`, () => {
        const testUser = {
          "user_name": 'testuser1',
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