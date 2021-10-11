const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {  
    res.render('index', {  
        title: 'Weather App',
        name: 'Freddie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Freddie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is a help message...',
        title: 'Help',
        name: 'Freddie'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address! Try another search...'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast (latitude, longitude, (error, forecastString) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecastString
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Freddie',
        message: 'Help page not found...'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Freddie',
        message: 'Page not found...'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})




