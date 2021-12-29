//to run use : nodemon src/app.js -e js,hbs

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

// console.log(__dirname);
// console.log(path.join(__dirname,"../public"));

const publicDirectory=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");

const app = express();

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//express through this first look at the request in the public folder
//if it doesnt find then it goes down
app.use(express.static(publicDirectory));

app.get('',(req, res)=>{
    res.render("index",{
        message:"Welcome to Weather App",
        owner:"Nawab"
    });
})

app.get('/about',(req, res)=>{
    res.render("about",{
        message:"About Section",
        owner:"Nawab"
    });
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send("No address given")
    }
    geocode.geocode(req.query.address, (err,data)=>{
        if(err){
            return res.send("Wrong Address");
        }
        const latitude=data.latitude;
        const longitude=data.longitude;
        forecast.forecast(latitude,longitude,(err,data)=>{
            if(err){
                return res.send("can't find data");
            }
            res.send({
                info: data,
            })
        })
    })
})
app.get('/help',(req, res)=>{
    res.render("help",{
        message:"Help Section",
        owner:"Nawab"
    });
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            message:"You must provide a search",
        })
    }
    console.log(req.query);
    res.send({
        product:[]
    })
})

app.get("/about/*",(req,res)=>{
    res.send("Help article not found");
})
app.get("*",(req,res)=>{
    res.send("My 404 Page");
})

app.listen(3000, ()=>{
    console.log("server is up");
})