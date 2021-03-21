const axios = require('axios')

class ApiController {
  static getQuotes (req, res, next) {
    axios.get('https://zenquotes.io/api/random')
    .then(({data}) => {
      // console.log(data);
      res.status(200).json(data)
    })
    .catch(next)
  }
}

module.exports = ApiController