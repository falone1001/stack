const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios');
require('dotenv').config()

// ####################################################################################### //

// User body-parser to access req.body
app.use(bodyParser.urlencoded({ extended: false }));
// ####################################################################################### //

// set the view engine to ejs
app.set('view engine', 'ejs');
// ####################################################################################### //

// Running server on port 8080
app.listen(8080);
console.log('Server is listening on port 8080');
// ####################################################################################### //
const apiUrl = process.env.API_URL
// Render index page '/'
app.get('/', function(req, res) {
  res.render('pages/index', {
    data: {
      exists: false,
      name: ''
    }
  });
});
// ####################################################################################### //

// Render login page '/login'
app.get('/login', function(req, res) {
  res.render('pages/login', {
    data: {
      error: false,
      message: ''
    }
  });
});
// ####################################################################################### //

// POST request to /login
app.post('/login', function(req, res) {
  // Get form data
  const user = req.body
  // Send POST request to API 
  axios.post(`${apiUrl}/login`, {
    email: user.email,
    password: user.password
  })
  .then((response) => {
    // Redirect to index page if login is successful
    if (response.status == 200) {
      res.render('pages/index', {
        data: {
          exists: true,
          name: response.data.name
        }
      });
    }
  })
  .catch((error) => {
    // Show error if login unsuccessful
    if (error.response.status == 401){
      res.render('pages/login', {
        data: {
          error: true,
          message: error.response.data.message
        }
      });
    }
  });
});
// ####################################################################################### //

// Render signup page '/signup'
app.get('/signup', function(req, res) {
  res.render('pages/signup', {
    data: {
      error: false,
      message: ''
    }
  });
});
// ####################################################################################### //

// POST request to /signup
app.post('/signup', function(req, res) {
  // Get form data
  const _user = req.body
  // Send POST request to API 
  axios.post(`${apiUrl}/signup`, {
    name: _user.name,
    email: _user.email,
    password: _user.password
  })
  .then((response) => {
    // Redirect if signup successful
    if (response.data.status == 201) {
      res.render('pages/index', {
        data: {
          exists: true,
          name: response.data.name
        }
      });
    }
    if (response.data.status == 409) {
      // Return error if signup unsuccessful
      res.render('pages/signup', {
        data: {
          error: true,
          message: response.data.error
        }
      });
    }
  })
  .catch((error) => {
    console.log(error)
  });
});