const fs = require('fs')

getKey = (key) => {

    const keys = JSON.parse(fs.readFileSync('./api-keys.json'))

    return keys[key]
}

module.exports = getKey
