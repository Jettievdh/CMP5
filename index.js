/*
 * npm init
 * npm install express --save
 * npm install request --save
 * npm install ejs --save
 *
 * node(mon) index.js
 */

var express = require('express');
var request = require('request');
var path = require('path');

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('Node luistert op poort 3000');
});

console.log("Webserver draait");

var data;
request('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek/MapServer/374/query?where=1%3D1&outFields=tident,Naam,Label,Startpunt,Lengte,Toegang,Drinkfonteintjes,Lockers,Openbare_toiletten,Kleedkamers_en_Douches,Ondergrond,Prijs&outSR=4326&f=json',
  function(error, response, body){
    data = JSON.parse(body);

  for(var i=0; i < data.features.length; i++) {
        console.log("Naam: " + data.features[i].attributes.Naam);
        console.log("Locatie: " + data.features[i].attributes.Startpunt);
        console.log("Toegang: " + data.features[i].attributes.Toegang);
        console.log("Ondergrond: " + data.features[i].attributes.Ondergrond);
        console.log("Label: " + data.features[i].attributes.Label);
        console.log("Lengte: " + data.features[i].attributes.Lengte);
        console.log("Drinkfonteintjes: " + data.features[i].attributes.Drinkfonteintjes);
        console.log("Lockers: " + data.features[i].attributes.Lockers);
        console.log("Openbare_toiletten: " + data.features[i].attributes.Openbare_toiletten);
        console.log("Kleedkamers_en_Douches: " + data.features[i].attributes.Kleedkamers_en_Douches);
        console.log("Prijs: " + data.features[i].attributes.Prijs);

        console.log("Coord: " + data.features[i].geometry.paths[0][0][1]);
    }
  }
);

var data;
request('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek/MapServer/636/query?where=1%3D1&outFields=id,naam,straat,huisnummer,postcode&outSR=4326&f=json',
  function(error, response, body){
    data = JSON.parse(body);

    for(var i=0; i < data.features.length; i++) {
        console.log("naam: " + data.features[i].attributes.naam);
        console.log("coord: " + data.features[i].geometry.x + ", " + data.features[i].geometry.y);
        console.log("");
        console.log(data.features[i].attributes);
    }

  }
);

app.get('/', function(req, res){
  res.render('home', {
    //Loopparcours: data
  });
});

app.get('/menu', function(req, res){
  res.render('menu', {
    //Loopparcours: data
  });
});

app.get('/start', function(req, res){
  res.render('start', {
    //Loopparcours: data
  });
});

app.get('/lijst', function(req, res){
  res.render('lijst', {
    Loopparcours2: data
  });
});

app.get('/filter', function(req, res){
  res.render('filter', {
    //Loopparcours: data
  });
});

app.get('/locatie', function(req, res){
  res.render('Locatie', {
    Loopparcours: data
  });
});
