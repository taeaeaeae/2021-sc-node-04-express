const morgan = require("morgan")
const rfs
const path


const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, '../log')
  })

module.exports = () => {
    return morgan
}