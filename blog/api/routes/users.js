const express= require('express');
const router = express.Router()
const fs = require('fs');
const fsPromises = require('fs').promises;
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');

const usersDB = {
    users: require('../data/users.json'),
    setUsers: function (data) { this.users = data }
}

router.post('/register', async (req, res)=>{

   
    const {email, password}= req.body;

   //check for duplilcate usernames in db
   const duplicate  = usersDB.users.find(person => person.email === email);
   if (duplicate) {
   return res.sendStatus(409); //Conflict 
   }else{
    
   
    //encrypt the password//
    const hashedPwd = await bcrypt.hash(password, 10);
    //store the new user
    const newUser = { "email": email, "password": hashedPwd };
    usersDB.setUsers([newUser,...usersDB.users]);
   await fsPromises.writeFile('./data/users.json', JSON.stringify(usersDB.users), (err)=>{

        if(err){
            console.error('error',err);
             res.status(500).send('error')
        }
        else{
            // res.send('updated')
            console.log('user created')
            // res.status(201).json({ 'success': `New user ${user} created!` });
        }
    })
    return res.sendStatus(200)
}
})

router.post('/login',  async (req, res)=>{

    const email = req.body.email;
    const password = req.body.password;
    const foundUser = usersDB.users.find(person => person.email ==email);
  
    if (!foundUser) {
    return res.status(404).send({status: "404"}); //User not found
    }
   // evaluate password 
   const match =  bcrypt.compareSync(password, foundUser.password);

   if (match) {

    console.log('logged in')
    let blogLogin = {userEmail: email, loginStatus:"LoggedIn"};
    return  res.status(200).send(blogLogin)
} else {
  return  res.status(401).send({status: "401"});//unauthorised
}

})


module.exports= router
