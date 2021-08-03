const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const User = require("./models")

// ####################################################################################### //

// User body-parser to access req.body 
app.use(bodyParser.urlencoded({
  extended: true
}));
// ####################################################################################### //

// Adding json support
app.use(express.json());
// ####################################################################################### //

// MongoDB database setup
mongoose
  .connect("mongodb://root:root@127.0.0.1:27017/hello", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Database')
  })
  .catch((error) => {
    console.log(error)
  })
// ####################################################################################### //

// Run server on port 3000
app.listen(3000, function () {
  console.log('listening on 3000')
})
// ####################################################################################### //

// Dummy route. GET / Returns 'Hello'
app.get('/', (req, res) => {
  res.send('Hello')
});
// ####################################################################################### //

// User login. POST /login : { 'email': 'test@email.com', 'password': 'password' }
app.post('/login', (req, res) => {
  // Store request body
  const theUser = req.body
  // Find user in database and return his data, return error if credentials are wrong
  User.findOne({ email: theUser.email, password: theUser.password })
    .then((theUser) => {
      if (theUser) {
        return res.status(200).json({ name: theUser.name, email: theUser.email })
      } else {
        return res.status(401).json({ message: 'Wrong Credentials' })
      }
    })
    .catch((error) => { res.json(error) })
});
// ####################################################################################### //

// Create user. POST /signup { 'name': 'Test', 'email': 'test@email.com', 'password': 'password' }
app.post('/signup', (req, res) => {
  // Store request body
  const newUser = req.body
  // Check if user's email exists
  User.findOne({ email: newUser.email })
    .then((theUser) => {
      // Return error if user exists
      if (theUser) {
        return res.json({
          status: 409,
          error: 'User already exists'
        })
      }
      // Create the user
      const __user = new User({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      })
      __user.save()
        .then((savedUser) => {
          if (savedUser) {
            return res.json({
              status: 201,
              message: 'User Added',
              name: savedUser.name
            })
          }
        })
        .catch((error) => { return res.json(error) })
    })
    .catch((error) => { res.json(error) })
});