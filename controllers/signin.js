const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path as necessary
const handleSignin = async (req, res, mongoose, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email or password missing");
  }

  try {
    const User = mongoose.model('User');
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const isValid = bcrypt.compareSync(password, user.hash);

    if (isValid) {
      return res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        joined: user.joined,
      });
    } else {
      return res.status(400).json("Invalid credentials");
    }
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json("An error occurred while signing in");
  }
};

module.exports = { handleSignin };







