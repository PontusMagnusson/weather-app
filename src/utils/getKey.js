const fs = require('fs')

getKey = (key) => {

    if(!fs.existsSync('./api-keys.json')) {
        return
    }

    const keys = JSON.parse(fs.readFileSync('./api-keys.json'))

    return keys[key]
}

module.exports = getKey
