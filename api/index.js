const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'akgdujgw3yuq52hh1t327t3hjb'


app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.json()); // to json data on preview
app.use(cookieParser());

// to connect to mongoose database
mongoose.connect('mongodb+srv://blog:tQZDug8kYUUnBL1I@cluster0.gs9nelp.mongodb.net/')

// endpoint for registration
app.post('/register', async (req, res) => {
  const {username, password} = req.body;
  try{
    const userDoc = await User.create({
      username, 
      password: bcrypt.hashSync(password, salt),
    })
    res.json(userDoc);
  } catch(e){
    console.log(e);
    res.status(400).json(e);
  }
  
})

// endpoint for login
app.post('/login', async (req, res)=>{
  const {username, password} = req.body;
  // first search for username in database
  const userDoc = await User.findOne({username}) ;
  // compare password
  const passOk = bcrypt.compareSync(password, userDoc.password); // first is password from login form and secondone is password from database
  if(passOk){
    // logged in
    jwt.sign({username, id:userDoc._id}, secret, {}, (err, token)=>{
      if(err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username
      }); // send preview data as a cookie
    }); // second parameter is secret key
    
  }
  else{
    res.status(400).json('wrong credentials');
  }
})

// end point to check if user is logged in // it just return profile info
app.get('/profile', (req, res)=>{
  // grab the token 
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err, info)=>{
    if(err) throw err;
    res.json(info);
  })
})
// then we need to call /profile endpoint inside header page

app.post('/logout', (req, res)=>{
  // send token as a just empty string
  res.cookie('token', '').json('ok');
})

app.listen(4000);
// mongodb+srv://blog:tQZDug8kYUUnBL1I@cluster0.gs9nelp.mongodb.net/
// tQZDug8kYUUnBL1I

// for every collection inside database we need to create models