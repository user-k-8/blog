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
   // Process uploaded images
   const files = req.files;

  const imagePaths = [];
  files.forEach((file)=>{

    const tempPath = file.path;
    console.log(tempPath)
    const ext = file.originalname.split('.').pop();
   
    const targetPath = `./images/${file.filename}.${ext}`;

    fs.rename(tempPath, targetPath, err => {
        if (err) return console.log('Something went wrong');
    
        // res.status(200).json("Image has been uploaded")//
        console.log('image uploaded')
    })
    imagePaths.push(`images/${file.filename}.${ext}`)
  })
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
    blog_img1: imagePaths[0],
    blog_img2: imagePaths[1]
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
    res.send('Files uploaded and data saved successfully.');
  });

  //edit post

router.post('/api/editpost', upload.array('images', 2), async (req, res) => {
    // Process uploaded images
    const files = req.files;
 
   const imagePaths = [];
   files.forEach((file)=>{
 
     const tempPath = file.path;
     const ext = file.originalname.split('.').pop();
     const targetPath = `../client/public/images/${file.filename}.${ext}`;
 
     fs.rename(tempPath, targetPath, err => {
         if (err) return res.status(500).send('Something went wrong');
     
          res.status(200).json("Image has been uploaded")
         console.log('image uploaded')
     })
     imagePaths.push(`images/${file.filename}.${ext}`)
   })
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
     blog_img1: imagePaths[0],
     blog_img2: imagePaths[1]
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
     res.send('Files uploaded and data saved successfully.');
   });

   //delete ///
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
