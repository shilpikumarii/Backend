import React, { useState } from 'react';
import './App.css';

function App() {
  const [registrationData, setRegistrationData] = useState({
    email: "3502210610@example.com",
    name: "Your Name",
    mobileNo: "9999999999",
    githubUsername: "your-github",
    rollNo: "3502210610",
    collegeName: "Your College",
    accessCode: "xgAsNC"
  });
  const [authTokenData, setAuthTokenData] = useState({
    accessCode: "xgAslC"
  });
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [authTokenResponse, setAuthTokenResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('register');

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/register', {
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
      setRegistrationResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAuthToken = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/auth-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authTokenData),
      });

      if (!res.ok) {
        throw new Error('Failed to get authorization token');
      }

      const data = await res.json();
      setAuthTokenResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Evaluation Service API</h1>
        
        <div className="tabs">
          <button 
            className={activeTab === 'register' ? 'active' : ''}
            onClick={() => setActiveTab('register')}
          >
            Registration
          </button>
          <button 
            className={activeTab === 'auth' ? 'active' : ''}
            onClick={() => setActiveTab('auth')}
          >
            Authorization Token
          </button>
        </div>

        {activeTab === 'register' ? (
          <div className="registration-form">
            <h2>Company Registration</h2>
            
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

            {registrationResponse && (
              <div className="response">
                <h3>Registration Successful!</h3>
                <p><strong>Email:</strong> {registrationResponse.email}</p>
                <p><strong>Name:</strong> {registrationResponse.name}</p>
                <p><strong>Roll No:</strong> {registrationResponse.rollNo}</p>
                <p><strong>Client ID:</strong> {registrationResponse.clientID}</p>
                <p><strong>Client Secret:</strong> {registrationResponse.clientSecret}</p>
                <p className="warning">IMPORTANT: Save these credentials as you won't be able to retrieve them again!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-form">
            <h2>Get Authorization Token</h2>
            
            <div className="form-group">
              <label>Access Code:</label>
              <input 
                type="text" 
                value={authTokenData.accessCode}
                onChange={(e) => setAuthTokenData({...authTokenData, accessCode: e.target.value})}
              />
            </div>
            
            <button onClick={handleGetAuthToken} disabled={loading}>
              {loading ? 'Getting Token...' : 'Get Authorization Token'}
            </button>

            {authTokenResponse && (
              <div className="response">
                <h3>Authorization Token</h3>
                <p><strong>Token Type:</strong> {authTokenResponse.token_type}</p>
                <p><strong>Access Token:</strong> 
                  <div className="token-box">{authTokenResponse.access_token}</div>
                </p>
                <p><strong>Expires In:</strong> {new Date(authTokenResponse.expires_in * 1000).toLocaleString()}</p>
              </div>
            )}
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </header>
    </div>
  );
}

export default App;