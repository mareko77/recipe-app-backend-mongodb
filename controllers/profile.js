const User = require('../models/User'); 

const handleProfileGet = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json('User not found');
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json('Error getting user');
  }
};

module.exports = {
  handleProfileGet,
};
