
var express = require('express')
var app = express()
require("dotenv").config();
var bodyParser = require('body-parser')
var cors = require('cors');
var loki = require('lokijs')
var nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
var db = new loki("db.json", {
    autoload: true,
    autosave: true,
    autosaveInterval: 4000
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/home', function (req,res) {
res.send(db.getCollection('THREADS'))
// console.log(db.getCollection('THREADS'))
})
app.post('/register',function (req,res){
    
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    
    if(db.getCollection('USER').findOne({
        'username': username
    }))
    {   console.log("already")
        res.send("Username already exists! Please choose another username")
    }
    else{
        
        res.send("Verification link sent to your email !! ")
    const emailToken =jwt.sign( {username,password,email} ,process.env.JWT_ACC_ACT,{ expiresIn: '1d'});
    
    const data = {
        from : 'noreply@hello.com',
        to : email,
        subject : 'Account Verification mail',
        html :`
        <h2>Please click on the given click to activate your account
            <p>
                <a href=${process.env.CLIENT_URL}/authenticate/${emailToken}>Click here to verify</a>
            </p>
        </h2>
        `

    }     
    

    console.log(data)
    
    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "af3ed853eb291c",
          pass: "ee2b25eb6b53d7"
       
        }

    });
    
    transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    
    transporter.sendMail(data,function(err,res) {
        if(err)
        {
            console.log(err);
            // res.send("Something went wrong!!")
        }
        else{
            console.log('Email Sent');
            // res.send("Email Sent")
        }
    })

    }
    
})

app.get("/authenticate/:token",function (req,res) {
    // console.log(req.params.token)
    jwt.verify(req.params.token,process.env.JWT_ACC_ACT,function (err,decoded) {
        if(err)
        {
            res.send("Something went wrong!!")
        }
        else{
            
            if(Date.now()>decoded.exp*1000)
            {
                console.log(decoded.exp)
                console.log(Date.now())
                res.send("Link Expired ! Please register again")
            }
            else{
                
                db.addCollection('USER').insert({
                    username : decoded.username,
                    password : decoded.password,
                    email : decoded.email,
                    doc : Date.now()

                })
                res.send("Successfully Registered!!")
            }
            
        }

        
    })

})

app.post('/login', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    console.log(req.body)
    var auth = false
    var msg =""
    console.log(req.body.username)
    user = db.getCollection('USER').findObject({
        'username': username,
        'password': password
    })
    if (user != null) {
        
            auth = true
            msg = "Login successful!!"
        
       
    }
    else
    {
        auth : false
        msg = "Invalid Login!"
    }
    console.log(user)
    
    res.send({ auth: auth , msg : msg})
})



app.listen(9000, function () {
    console.log('server started')
})