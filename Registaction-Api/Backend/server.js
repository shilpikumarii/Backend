require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Proxy endpoint to handle the registration
app.post('/api/register', async (req, res) => {
  try {
    const registrationData = {
      email: "3502210610@example.com",
      name: "Your Name", // Replace with your actual name
      mobileNo: "9999999999", // Replace with your actual mobile number
      githubUsername: "your-github", // Replace with your GitHub username
      rollNo: "3502210610",
      collegeName: "Your College", // Replace with your college name
      accessCode: "xgAsNC"
    };

    const response = await axios.post(
      'http://20.244.56.144/evaluation-service/register',
      registrationData
    );

    res.json(response.data);
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});