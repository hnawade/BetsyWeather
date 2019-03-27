
const express = require('express');
const app = express();
const fetch = require("node-fetch");
var forecastArray = { forecast : null , message : null}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', forecastArray)
})

app.listen(5000, function () {
  console.log('Example app listening on port 5000!')
})


app.post('/', function (req, res) {
  console.log(req.body)
  const y = req.body.longitude;
  const x = req.body.latitude;
  const url = 'https://api.weather.gov/points/' + x + ',' + y
  console.log(url)
  fetch(url)
    .then(function(response) {
      return response.json()
    }).then(function(json){
      if (json.properties == undefined) {
        res.render('index', {forecast : null, message: ""})
      } else {
        const forecastURL = json.properties.forecast
        const zoneForecastURL = json.properties.forecastZone + '/forecast'
        console.log(forecastURL)
        console.log(zoneForecastURL)
        fetch(forecastURL)
          .then(function(resp) {
            return resp.json()
          }).then (function (json2) {
            if (json2.properties == undefined) {
              fetch(zoneForecastURL).then(function(res2) {
                  return res2.json()
                }).then(function(weather) {
                  console.log(weather)
                  if (weather.periods == undefined) {
                    res.render('index', {forecast :"", message : null})
		  } else {
		    res.render('index', { forecast : weather.periods[0], message : ""})
                  }
                })
            } else {
                res.render('index', {forecast: json2.properties.periods[0], message : null})
              }
            })
        }
      })
  }
)
