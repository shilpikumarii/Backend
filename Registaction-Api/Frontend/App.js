import React, { useState } from 'react';
import './App.css';

function App() {
  const [registrationData, setRegistrationData] = useState({
    email: "shilpi6201183356@gmail.com",
    name: "Shilpi Kumari",
    mobileNo: "6201183356",
    githubUsername: "https://github.com/shilpikumarii",
    rollNo: "3502210610",
    collegeName: "Aarupadai Veedu Institute Of Technology, Chennai",
    accessCode: "xgAsNC"
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('https://your-backend-url/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!res.ok) {
        throw new Error('Registration failed');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Company Registration</h1>
        
        <div className="registration-form">
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={registrationData.email}
              onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Name:</label>
            <input 
              type="text" 
              value={registrationData.name}
              onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Mobile Number:</label>
            <input 
              type="text" 
              value={registrationData.mobileNo}
              onChange={(e) => setRegistrationData({...registrationData, mobileNo: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>GitHub Username:</label>
            <input 
              type="text" 
              value={registrationData.githubUsername}
              onChange={(e) => setRegistrationData({...registrationData, githubUsername: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Roll Number:</label>
            <input 
              type="text" 
              value={registrationData.rollNo}
              onChange={(e) => setRegistrationData({...registrationData, rollNo: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>College Name:</label>
            <input 
              type="text" 
              value={registrationData.collegeName}
              onChange={(e) => setRegistrationData({...registrationData, collegeName: e.target.value})}
            />
          </div>
          
          <div className="form-group">
            <label>Access Code:</label>
            <input 
              type="text" 
              value={registrationData.accessCode}
              onChange={(e) => setRegistrationData({...registrationData, accessCode: e.target.value})}
            />
          </div>
          
          <button onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {response && (
          <div className="response">
            <h2>Registration Successful!</h2>
            <p><strong>Email:</strong> {response.email}</p>
            <p><strong>Name:</strong> {response.name}</p>
            <p><strong>Roll No:</strong> {response.rollNo}</p>
            <p><strong>Client ID:</strong> {response.clientID}</p>
            <p><strong>Client Secret:</strong> {response.clientSecret}</p>
            <p className="warning">IMPORTANT: Save these credentials as you won't be able to retrieve them again!</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;