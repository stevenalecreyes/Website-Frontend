const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require("../auth");



// Implement your user-related controller functions here
// User registration controller
module.exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {

      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({ email, password: hashedPassword, firstName, lastName });

    await user.save();

    // Create a JWT token for the user
    const token = jwt.sign({ userId: user._id }, 'ECommerceAPI', { expiresIn: '1h' });

    res.status(201).send({ userId: user._id, token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Registration failed' });
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'User not found' });
      }

      bcrypt.compare(password, user.password)
        .then((isPasswordCorrect) => {
          if (!isPasswordCorrect) {
            return res.status(401).send({ message: 'Incorrect password' });
          }

          const token = auth.createAccessToken(user);

          if (!token) {
            return res.status(500).send({ message: 'Token creation failed' });
          }

          res.status(200).send({ userId: user._id, token });
        })
        .catch((err) => {
          console.error('Password comparison error:', err);
          res.status(500).send({ message: 'Internal server error' });
        });
    })
    .catch((err) => {
      console.error('User lookup error:', err);
      res.status(500).send({ message: 'Internal server error' });
    });
};

module.exports.getProfile = (req, res) => {
  User.findById(req.user.id)
    .select('-password') // Exclude the 'password' field from the result
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Include the 'isAdmin' field in the response
      const { _id, firstName, lastName, email, mobileNo, isAdmin } = result;
      
      return res.json({ _id, firstName, lastName, email, mobileNo, isAdmin });
    })
    .catch((err) => res.status(500).json({ error: 'Internal Server Error' }));
};