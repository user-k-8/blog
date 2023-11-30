const express = require('express');
const fs = require('fs');
const bodyParser =require('body-parser');
const fsPromises = require('fs').promises;
const multer = require('multer');
const path = require('path');

const router = express.Router();

const postsDB = {
    posts: require('../data/posts.json'),
    setUsers: function (data) { this.posts = data }
}

let post = require('../data/posts.json');

const upload = multer({dest:'./uploads'});

//get all posts
router.get('/api/allposts', (req, res) => {
    res.send(post)
})

//add post
router.post('/api/upload', upload.array('images', 2), async (req, res) => {

   // Create JSON object
 const newPost = 
    {id:`${postsDB.posts.length+1}`,
    img:"images/MA.png", 
    user_comments:[],
    author: req.body.author, 
    email: req.body.email,
    date: req.body.date,
    title: req.body.title, 
    post: req.body.post,
    blog_img1:"",
    blog_img2: ""
 }

    // Write data to JSON file
    postsDB.setUsers([newPost, ...postsDB.posts]);

    await fsPromises.writeFile('./data/posts.json', JSON.stringify(postsDB.posts), (err)=>{

        if(err){
            console.error('something is wrong - error',err);
            res.status(500).send('error')
        }
        else{
            res.send('updated')
            console.log('updated')
        }
    })
    res.send('data saved successfully.');
  });

//edit post
router.post('/api/editpost', upload.array('images', 2), async (req, res) => {
   
// Create JSON object
   
  const newPost = 
     {id: req.body.id,
     img:"images/MA.png", 
     user_comments: req.body.user_comments,
     author: req.body.author, 
     email: req.body.email,
     date: req.body.date,
     title: req.body.title, 
     post: req.body.post,
     blog_img1: "",
     blog_img2: ""
  }
 
  let allUsers  =  postsDB.posts.filter(item=> item.id != req.body.id);
   
     // Write data to JSON file
     postsDB.setUsers([newPost, ...allUsers]);
 
     await fsPromises.writeFile('./data/posts.json', JSON.stringify(postsDB.posts), (err)=>{
 
         if(err){
             console.error('something is wrong - error',err);
             res.status(500).send('error')
         }
         else{
             res.send('updated')
             console.log('updated')
         }
     })
     res.send('data saved successfully.');
   });

//delete
 router.delete('/api/deletePost', async (req, res)=>{
        
    const newPosts = postsDB.posts.filter(item=> item.id != req.body.id)
   postsDB.setUsers(newPosts)
   await fsPromises.writeFile('./data/posts.json', JSON.stringify(postsDB.posts), (err)=>{

    if(err){
        console.error('error',err);
        res.status(500).send('error')
    }
    else{
        res.send('deleted')
        console.log('deleted')
    }
})
})
module.exports = router
