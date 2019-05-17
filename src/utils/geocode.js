const request = require('request')
const getKey = require('./getKey')

// If hosted on heroku, key can be fetched from environment variables first
const mapboxApiKey = process.env.MAPBOX_API_KEY || getKey('mapboxApiKey')

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapboxApiKey}`

    console.log(url)

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to contact location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, please try again with a different search term', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
