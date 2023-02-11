const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose")
const homeStartingContent = "Helllo, I am Rajshu ,welcome to my blog website....!";
const aboutContent = "this is a blog website project ";
const contactContent = "for contact email at : rajshusaurav@gmail.com";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blogWebsiteDB", {useNewUrlParser: true})
const postSchema={
  title:String,
  content: String
};
const Post = mongoose.model("Post",postSchema);

app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{
      homeContent:homeStartingContent ,
      newPosts : posts
      });
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function (req,res) {
  var newPost= new Post({
    title: req.body.newTitle,
    content: req.body.newContent
  });
  newPost.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  
});

app.get("/posts/:postId",function (req,res) {
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
  
});

app.listen(3500, function() {
  console.log("Server started on port 3500");
});
