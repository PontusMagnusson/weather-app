const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Configure static resources
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
         title: 'Weather', 
         name: 'Pontus' 
        })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About this app',
        name: 'Pontus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Pontus',
        message: 'This is an example message'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide a valid address' 
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastSummary) => {
            if (error) {
                return res.send({
                    error
                })
            }

            return res.send({
                location,
                summary: forecastSummary
            })
        })
    })
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'Search term must be provided'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'This article does not exist', 
        name: 'Pontus'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Oops, the page you are looking for does not exist, sorry about that.',
        name: 'Pontus'
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})