
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Store credentials (in production, use a database)
let clientCredentials = null;

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    if (clientCredentials) {
      return res.status(400).json({ error: 'Already registered' });
    }

    const registrationData = {
      email: "shilpi6201183356@gmail.com",
      name: "Shilpi Kumari",
      mobileNo: "6201183356",
      githubUsername: "https://github.com/shilpikumarii",
      rollNo: "3502210610",
      collegeName: "Aarupadai Veedu Institute Of Technology, Chennai",
      accessCode: "xgAsNC"
    };

    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/register',
      registrationData
    );

    // Save credentials for future use
    clientCredentials = {
      clientID: response.data.clientID,
      clientSecret: response.data.clientSecret,
      email: response.data.email,
      name: response.data.name,
      rollNo: response.data.rollNo
    };

    res.json(response.data);
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Authorization token endpoint
app.post('/api/auth-token', async (req, res) => {
  try {
    if (!clientCredentials) {
      return res.status(400).json({ error: 'Not registered yet' });
    }

    const authData = {
      email: clientCredentials.email,
      name: clientCredentials.name,
      rolling: clientCredentials.rollNo,
      accessCode: "xgAslC",
      clientID: clientCredentials.clientID,
      clientSecret: clientCredentials.clientSecret
    };

    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/auth',
      authData
    );

    res.json(response.data);
  } catch (error) {
    console.error('Auth token error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get authorization token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});