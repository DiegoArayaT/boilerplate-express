require('dotenv').config()
let express = require('express');
let app = express();


app.use(function middleware(req, res, next){
    var string = req.method + " " + req.path + " - " + req.ip;
    console.log(string);
    next();
})

app.get("/", function(req, res) {
    absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath)
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", function(req, res) {

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        response = "Hello json".toUpperCase();
    } else {
        response = "Hello json";
    }

    res.json({"message": response});
})

app.get('/now', function middleware(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.send({time: req.time});
})




















 module.exports = app;
