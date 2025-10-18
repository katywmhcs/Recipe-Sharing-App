// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/users.js';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: () => signup({ username, password }),
    onSuccess: () => {
      setError(null);
      navigate('/login');
    },
    onError: (err) => {
      setError(err.message || 'Failed to sign up. Please try another username.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    signupMutation.mutate();
  };

  // --- Style Objects for a Cleaner Look ---
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    fontFamily: 'sans-serif',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#fff',
  };

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    opacity: signupMutation.isPending ? 0.7 : 1,
  };
  
  const errorStyle = {
    color: 'red',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* ✅ Add this back link */}
        <Link to="/" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          ← Back to main page
        </Link>
        
        <h2 style={{ textAlign: 'center', margin: '0 0 1rem' }}>Create Account</h2>
        
        <div style={inputGroupStyle}>
          <label htmlFor='signup-username'>Username</label>
          <input
            id='signup-username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor='signup-password'>Password</label>
          <input
            id='signup-password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        
        {error && <div style={errorStyle}>{error}</div>}

        <input
          type='submit'
          value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
          disabled={!username || !password || signupMutation.isPending}
          style={buttonStyle}
        />
        
        <p style={{ textAlign: 'center', margin: '1rem 0 0' }}>
          Already have an account? <Link to='/login'>Log in</Link>
        </p>
      </form>
    </div>
  );
}