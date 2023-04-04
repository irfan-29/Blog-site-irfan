const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set({strictQuery: true});
mongoose.connect("mongodb+srv://admin-irfan:Irf6360944@cluster0.jo7etur.mongodb.net/blogDB");

const homeStartingContent = "Hey there! Welcome to our Blogz - a blog site. Here you can publish your blogs and visit others blogs. ";

const postSchema = new mongoose.Schema({
  author: String,
  title: String,
  content: String
});

const Post = mongoose.model("Post",postSchema);


app.get("/",function(req,res){
  Post.find({}, function(err,postRender){
    if(!err){
        res.render("home",{startingContent: homeStartingContent});
    }
});
});



app.get("/blog",function(req,res){
  Post.find({}, function(err,postRender){
    if(!err){
        res.render("blog",{postContent: postRender});
    }
});
});
app.get("/contact",function(req,res){
  res.render("contact");
});
app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/",function(req,res){
  res.redirect("/compose");
});

app.post("/compose",function(req,res){
  const post = new Post({
    author: req.body.postAuthor,
    title : req.body.postTitle,
    content : req.body.postContent
  });
  post.save();
  res.redirect("/blog");
});

app.post("/back", function(req, res){
  res.redirect("/blog");
});

app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId},function(err,postRender){
    if(!err){
      res.render("post",{keyTitle: postRender.title, keyContent: postRender.content, keyAuthor: postRender.author});
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
