const express = require('express')
const UsersService = require('./users-service')
const path = require('path')

const usersRouter = express.Router()
const bodyParser = express.json()

usersRouter
  .route('/')
  .post(bodyParser, (req, res, next) => {
    const { password, user_name } = req.body;
    for (const field of ['user_name', 'password']) {
      if (!req.body[field]) {
        return res.status(400).json({error: `missing ${field} in request`});
      }
    }

    const passwordError = UsersService.validatePassword(password)

    if (passwordError) {
      return res.status(400).json({error: passwordError})
    }

    UsersService.hasUserWithUserName(req.app.get('db'), user_name)
      .then(user => {
        if (user) {
          return res.status(400).json({error: 'username already exists'});
        }
        
        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              user_name,
              password: hashedPassword
            }

              return UsersService.insertUser(req.app.get('db'), newUser)
                .then(user => {
                  return res
                    .status(201)
                    .json(UsersService.serializeUser(user))
              })
          })
        })
        .catch(next)
  })

module.exports = usersRouter