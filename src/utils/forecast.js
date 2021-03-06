const request = require('request')
const getKey = require('./getKey')

 // If hosted on heroku, key can be fetched from environment variables first
const darkSkyApiKey =  process.env.DARKSKY_API_KEY || getKey('darkSkyApiKey')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${darkSkyApiKey}/${latitude},${longitude}?units=si`

    request({ url , json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to contact weather service', undefined)
        } else if (body.error) {
            callback(body.error)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature}°C degrees outside with ${(body.currently.humidity * 100)}% humidity. There is a ${(body.currently.precipProbability * 100)}% chance of rain` )
        }
    })
}

module.exports = forecast
