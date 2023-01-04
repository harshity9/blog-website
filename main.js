const express = require("express");
const bodyParser = require("body-parser");

var lodash = require('lodash');



let ejs = require('ejs');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))



let posts = []




 


app.get("/", function(req, res){
    res.render("index",{
       posts: posts
    })
})
app.get("/compose", function (req, res){
    res.render("compose")
})

app.get("/posts/:user", function(req, res){
    const requestedUrl = lodash.lowerCase(req.params.user)
console.log(requestedUrl)
    posts.forEach(function(post){
        const storedUrl = lodash.lowerCase(post.Heading);
        console.log(storedUrl)
        if(requestedUrl=== storedUrl){
            console.log("Mathced")
            res.render("posts", {
                Heading: post.Heading,
                content: post.content
            })
        }
        else{
            console.log("NO mathing")
        }
    })
})


app.post("/compose", function(req, res){


    
console.log(req.body)
posts.push(req.body)

    res.redirect("/")
    
})










app.listen(3000, function (){
    console.log("server started on port 3000")
})