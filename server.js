// -----------------------------
// Imports & Setup
// -----------------------------
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const recipes = require('./controllers/recipes');

// -----------------------------
// Database Connection (MySQL)
// -----------------------------
const db = knex({
  client: 'mysql',
  connection: {
    host: 'db5019041392.hosting-data.io',
    user: 'dbu4342742',
    password: 'x!fPxWT-3iL6YTj',
    database: 'dbs14984349',
  },
});

// -----------------------------
// App Initialization
// -----------------------------
const app = express();

// -----------------------------
// Production CORS Configuration
// -----------------------------
app.use(
  cors({
    origin: [
      "https://recipe-app-by-marekograbek.netlify.app", // Production frontend
      "http://localhost:3000" // Local development
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// -----------------------------
// Routes
// -----------------------------

// Test route
app.get('/', (req, res) => {
  res.send("Recipe App API is running");
});

// Auth
app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', (req, res) => { 
  console.log("Register request:", req.body); 
  register.handleRegister(req, res, db, bcrypt); 
});

// Profile
app.get('/profile/:id', (req, res) => 
  profile.handleProfileGet(req, res, db)
);

// Recipes
app.post('/recipes', (req, res) => 
  recipes.handleAddRecipe(req, res, db)
);

app.get('/recipes/:userId', (req, res) => 
  recipes.handleGetRecipes(req, res, db)
);

app.delete('/recipes/:id', (req, res) => 
  recipes.handleDeleteRecipe(req, res, db)
);

app.put('/recipes/:id', (req, res) => 
  recipes.handleUpdateRecipe(req, res, db)
);

// -----------------------------
// Start Server
// -----------------------------
app.listen(3002, () => {
  console.log('API server is running on port 3002');
});

