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

app.post('/', function (req, res) {
   
})

app.post('/login', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var auth = false
    user = db.getCollection('USER').find({
        'username': username,
        'password': password
    })
    if (user.length != 0) {
        auth = true
    }

    res.send({ auth: auth })
})

app.post('/thread', function (req, res) {
    var thread_id = req.body.thread_id
    result = db.getCollection('THREADS').find({
        'thread_id': parseInt(thread_id)
    })
    res.send({ result: result })
})

app.post('/upvote', function (req, res) {
    var thread_id = req.body.thread_id
    var index = req.body.index
    console.log(
        thread_id, index
    )
    var thread = db.getCollection('THREADS')
    var comment = thread.find({
        'thread_id': parseInt(thread_id)
    })
    console.log(comment[0].comments[index - 1].upVote += 1)
    thread.update(comment)
})

app.post('/downvote', function (req, res) {
    var thread_id = req.body.thread_id
    var index = req.body.index
    console.log(
        thread_id, index
    )
    var thread = db.getCollection('THREADS')
    var comment = thread.find({
        'thread_id': parseInt(thread_id)
    })
    console.log(comment[0].comments[index - 1].downVote += 1)
    thread.update(comment)
})

app.post('/newreply', function (req, res) {    
    var newcomment = {
        index: parseInt(req.body.index),
        reply: req.body.reply,
        replier: req.body.replier,
        doc: new Date(Date.now()).toLocaleString().split(',')[0],
        downVote: 0,
        upVote: 0
    }
    var thread_id = parseInt(req.body.thread_id)
    console.log(req.body)

    var thread = db.getCollection('THREADS')
    var tempThread = thread.find({
        'thread_id': parseInt(thread_id)
    })
    var x = tempThread[0].comments[tempThread[0].comments.length-1].index
    if(x!=req.body.index){
    tempThread[0].comments.push(newcomment)
    thread.update(tempThread[0])
    }
    console.log("adsa");
    
})

app.listen(9000, function () {
    console.log('server started')
})