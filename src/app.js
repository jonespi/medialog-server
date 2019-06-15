require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const watchedListRouter = require('./watched_list/watched_list-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use('/api/users', usersRouter)
app.use('/auth/login', authRouter)
app.use('/api/watch_list', watchedListRouter)

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
    res.status(500).json(response)
  })

module.exports = app