const express = require('express');
const bcrypt = require('bcrypt'); 
const cors = require('cors');
const dotenv = require('dotenv');

// Controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const recipes = require('./controllers/recipes');

// Models
const Recipe = require('./models/Recipe'); 

// Environment variables setup
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());


const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri); 

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
})();


// Database connection setup
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, {
  })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => res.send('Welcome to the Recipe App'));

app.post('/register', async (req, res) => {
    await register.handleRegister(req, res);
});

app.post('/signin', async (req, res) => {
    await signin.handleSignin(req, res, mongoose, bcrypt);
});

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, mongoose);
});

app.post('/recipes', recipes.handleAddRecipe);
app.get('/recipes/:userId', recipes.handleGetRecipes);
app.delete('/recipes/:id', recipes.handleDeleteRecipe);
app.put('/recipes/:id', recipes.handleUpdateRecipe);

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

