const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=f41fe40b1570d88dc1d567186b259b46&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=m'
    //console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to forecasting services...', undefined)
        }
        else if (body.error){
            callback('Coordinate error...', undefined)
        }
        else {
            callback(undefined, 
                body.current.weather_descriptions  + ' throughout the day. It is currently ' 
                + body.current.temperature + ' out. It feels like ' + body.current.feelslike 
                + '. The humidy is ' + body.current.humidity + '%.'
            )
        }
    })
}

module.exports  = forecast