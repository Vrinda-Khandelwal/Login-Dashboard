import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@securelytix\.com$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  useEffect(() => {
    const savedEmail = localStorage.getItem('secureEmail');
    const savedPassword = localStorage.getItem('securePassword');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError('Email must be in format example@securelytix.com');
      return;
    }
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters, with letters and numbers.');
      return;
    }
    setError('');
    if (remember) {
      localStorage.setItem('secureEmail', email);
      localStorage.setItem('securePassword', password);
    } else {
      localStorage.removeItem('secureEmail');
      localStorage.removeItem('securePassword');
    }
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Securelytix Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className='remember-me'>
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(prev => !prev)}
          />
          <label>
          Remember Me
        </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
