const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust to your User model's location

const handleRegister = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid form submission' });
  }

  try {
      const hash = bcrypt.hashSync(password, 10);
      const user = new User({ email, name, hash, joined: new Date() });
      const savedUser = await user.save();
      //res.status(200).json(savedUser);// Return user data on success
      res.status(200).json({
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      });
      
  } catch (err) {
      res.status(400).json({ error: 'Unable to register' });
  }
};

module.exports = { handleRegister };











