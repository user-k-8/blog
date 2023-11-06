const express = require('express');
const cors = require('cors');
const bodyParser =require('body-parser');
const fs = require('fs');
const fsPromises = require('fs').promises;
const multer = require('multer')
const bcrypt = require('bcrypt');
const path = require('path');


const app = express();

  app.use(cors()); // Enable CORS with custom options

const PORT = process.env.PORT || 4000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



const postsRoute = require('./routes/posts')
const commentsRoute = require('./routes/comments')
const usersRoute = require('./routes/users')


app.use('/posts', postsRoute)
app.use('/comments', commentsRoute)

app.use('/api', usersRoute)

app.listen(PORT, () => {
    console.log(`Server running on localhost: ${PORT}`)
})

