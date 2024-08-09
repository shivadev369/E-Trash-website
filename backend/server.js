const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const PickupRequest = require('./models/pickupRequest'); // Import your Mongoose model
const User = require('./models/user'); // Import the User model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://shiva:toyotasupra@cluster0.gi5h08r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Endpoint to handle form submission
app.post('/api/pickup-request', async (req, res) => {
  try {
    const newRequest = new PickupRequest(req.body);
    await newRequest.save();
    res.status(201).send('Pickup request saved successfully');
  } catch (error) {
    console.error('Error saving pickup request:', error);
    res.status(500).send('Error saving pickup request');
  }
});

// API Endpoint to handle user registration
app.post('/api/register', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log request body to see what’s being received

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error.message); // Log error message
    res.status(500).send('Error registering user');
  }
});

// API Endpoint to handle user login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
