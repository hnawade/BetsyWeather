
const express = require('express');
const app = express();
const port = 5000;
const fetch = require("node-fetch");
var forecastArray = { forecast : null }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', forecastArray)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
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
        res.render('index', forecastArray)
      } else {
        const forecastURL = json.properties.forecast
        console.log(forecastURL)
        fetch(forecastURL)
          .then(function(resp) {
            return resp.json()
          }).then (function (json2) {
            if (json2.properties == undefined) {
            } else {
              const firstPeriod = 'It\'s ' + json2.properties.periods[0].temperature + 'º ' + json2.properties.periods[0].temperatureUnit + '\n' + json2.properties.periods[0].detailedForecast
              console.log(firstPeriod)
              res.render('index', {forecast: json2.properties.periods[0]})
            }
          })
      }
    })
  }
)
