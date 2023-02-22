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

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const postSchema = new mongoose.Schema({
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
  res.render("contact",{startingContent: contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/",function(req,res){
  res.redirect("/compose");
});

app.post("/compose",function(req,res){
  const post = new Post({
    title : req.body.postTitle,
    content : req.body.postContent
  });
  post.save();
  res.redirect("/");
});

app.post("/back", function(req, res){
  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId},function(err,postRender){
    if(!err){
      res.render("post",{keyTitle: postRender.title, keyContent: postRender.content});
    }
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
