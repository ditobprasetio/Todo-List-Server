const { User } = require('../models')
const { getToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class UserController {
  static signup(req, res, next) {
    let { name, email, password } = req.body
    User.create({
      name,
      email,
      password
    })
      .then((user) => {
        let payload = {
          id: user.id,
          name: user.name,
          email: user.email
        }

        let token = getToken(payload)
        res.status(201).json({
          token
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  static signin(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then((user) => {
        if (user) {
          let status = comparePassword(password, user.password)
          if (status) {
            let payload = {
              id: user.id,
              name: user.name,
              email: user.email
            }

            let token = getToken(payload)
            res.status(201).json({
              token
            })
          } else {
            next({ name: 'incorrect email or password' })
          }
        } else {
          next({ name: 'incorrect email or password' })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

module.exports = UserController