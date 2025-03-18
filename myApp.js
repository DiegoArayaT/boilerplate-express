require('dotenv').config()
var bodyParser = require('body-parser')

let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({extended: false})) 

app.use(bodyParser.json());

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


app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({echo : word});
  });



  app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    
    res.json({
        name : `${firstName} ${lastName}`
    });
  });


app.post("/name", function(req, res) {
    var firstName = req.body.first;
    var lastName = req.body.last
    var string = firstName + " " + lastName

    res.json({name: string });
})










 module.exports = app;
