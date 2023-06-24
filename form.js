var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/cyberpunk',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phone": phone,
        "password" : password
    }

    db.collection('registration').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('thank.htm');

})
app.post("/contact",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    

    var data = {
        "name": name,
        "email" : email,
        "message": message,
        
    }

    db.collection('contact').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('offline.htm');

})
app.post("/subscribe",(req,res)=>{
    
    var Email = req.body.Email;
    
    

    var data = {
        
        "Email" : Email,
        
        
    }

    db.collection('contact').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index.htm');

})





app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.htm');
}).listen(5000);


console.log("Listening on PORT 5000");