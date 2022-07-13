const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
   });

app.post("/", function(req,res){


   const query = req.body.CityName;
   const unit =  "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?appid=a057198ab9cd697701fb722702aee6e4&q=" + query + "&units=" +unit;
 
  
   https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp;
        const desc = weatherdata.weather[0].description;
        const icon = weatherdata.weather[0].icon;
        const dd = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
       
        res.write("<h1>The temperature of "+ query + " is " + temp + " degree celcius</h1>");
        res.write( "<h1>The weather decription is " + desc + "</h1>")
        res.write("<img src=" +dd+ ">");
        res.send();
    });
});

});
 





app.listen(3000, function(){
    console.log("Server is up and running at port 3000")
})