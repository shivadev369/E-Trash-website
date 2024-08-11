const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const nodemailer = require('nodemailer'); // Import Nodemailer
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

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'etrashweb@gmail.com', // Your email address
    pass: 'madx iovz fujy oolc' // Your email password or app-specific password
  }
});

// API Endpoint to handle form submission
app.post('/api/pickup-request', async (req, res) => {
  try {
    const newRequest = new PickupRequest(req.body);
    await newRequest.save();

    // Send confirmation email to the user
    const mailOptions = {
      from: 'etrashweb@gmail.com',
      to: req.body.email,
      subject: 'E-Waste Pickup Confirmation',
      text: `Dear ${req.body.name},

Thank you for scheduling an e-waste pickup with us. Here are the details:
Location: ${req.body.location}
Contact Number: ${req.body.contact}
Type of E-Waste: ${req.body.eWasteType}

We will get back to you soon to confirm the pickup schedule.

Best regards,
E-Waste Management Team`
    };

    await transporter.sendMail(mailOptions);

    res.status(201).send('Pickup request saved successfully and email sent.');
  } catch (error) {
    console.error('Error saving pickup request or sending email:', error);
    res.status(500).send('Error saving pickup request or sending email.');
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
    res.status(200).send('User registered successfully');
  } catch (error) {
    if (error.code === 11000) { 
      res.status(400).send({ code: 11000, message: 'Email already exists' });
    } else {
      res.status(500).send({ message: 'Registration failed' });
    }
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
