const express = require('express');
const router = express.Router();
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const postsDB = {
    posts: require('../data/posts.json'),
    setUsers: function (data) { this.posts = data }
}

router.post('/api/addComment', async (req, res)=>{
   
    let allUsers  =  postsDB.posts.filter(item=> item.post != req.body.post);
    let user= postsDB.posts.filter(item=> item.post== req.body.post);
    user = req.body
  
    postsDB.setUsers([user, ...allUsers])
   
    await fsPromises.writeFile('./data/posts.json', JSON.stringify(postsDB.posts), (err)=>{

        if(err){
            console.error('error',err);
            res.status(500).send('error')
            console.log('error')
        }
        else{
            res.send('updated')
            console.log('updated');
            
        }

    })

   res.send(postsDB.posts)

})


router.delete('/api/deleteComment', async (req, res)=>{
    let allUsers  =  postsDB.posts.filter(item=> item.post != req.body.post);
    let user= postsDB.posts.filter(item=> item.post== req.body.post);
    user = req.body
  
    postsDB.setUsers([user, ...allUsers])
    await fsPromises.writeFile('./data/posts.json', JSON.stringify(postsDB.posts), (err)=>{

        if(err){
            console.error('error',err);
            res.status(500).send('error') 
        }
        else{  
            console.log('updated')
        }
    
})
           res.send(postsDB.posts)   
})

module.exports =router;
