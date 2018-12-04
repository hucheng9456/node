const express = require('express');
const mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var dbResult = "";
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

var db= mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "g910f718",
    db : "twitter"
});
db.connect((err) => {
    if(err){
        console.log(err);
    }
    console.log('MySql Connected...');
});

var jsonParser = bodyParser.json();


var urlencodeParser = bodyParser.urlencoded({extended: false});

//calling showData function
app.get('/getTweet', (req,res) =>{
    let sql = "SELECT * FROM post.tweet;";
    let query = db.query(sql, (err, result) =>{
        if(err){
            console.log(err);
        }
        res.setHeader('Content-Type','application/json');
        res.send(JSON.stringify(result));
    });

});

//update like for database
app.post('/updatepost/:id', urlencodeParser, (req, res) => {
    var id = req.params.id;
    id = id.replace(':',"");
    let sql = "SELECT * FROM post.tweet WHERE idtweet ="+id+";";
    let get_like;
    let query = db.query(sql, (err, result) =>{
        if(err){
            console.log(err);
        }
        get_like = result[0].like;
        if(get_like==0){
            get_like =1;
        }else{
            get_like=0;
        }
        let updateLike = "UPDATE post.tweet SET post.tweet.like = "+get_like+" WHERE idtweet ="+id+";";
        console.log(updateLike);
        let queryLike = db.query(updateLike, (err, result) =>{
            if(err){
                console.log(err);
            }
        });
    });
});



app.listen('3000',() =>{
    console.log('Server started on port 3000');
})

