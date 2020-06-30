var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var cors = require('cors');
var loki = require('lokijs')

var db = new loki("db.json", {
    autoload: true,
    autosave: true,
    autosaveInterval: 4000
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/home', function (req, res) {

res.send("success")
})

app.post('/login', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var auth = false
    console.log(req.body.username)
    user = db.getCollection('USER').findObject({
        'username': username,
        'password': password
    })
    if (user != null) {
        auth = true
    }
    
    res.send({ auth: auth })
})

app.listen(9000, function () {
    console.log('server started')
})