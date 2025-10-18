// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Login() {
  // ✅ This is the corrected line.
  // It uses array destructuring to get the setToken function.
  const [, setToken] = useAuth()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setError(null)
      // ✅ Now this works because setToken is a function.
      setToken(data.token)
      navigate('/')
    },
    onError: (err) => {
      setError(err.message || 'Failed to login. Please check your credentials.')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    loginMutation.mutate()
  }

  // --- Style Objects for a Cleaner Look ---
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    fontFamily: 'sans-serif',
  }

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
  }

  const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  }

  const inputStyle = {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  }

  const buttonStyle = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    opacity: loginMutation.isPending ? 0.7 : 1,
  }

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
  }

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <Link to='/' style={{ textAlign: 'center', marginBottom: '1rem' }}>
          ← Back to main page
        </Link>

        <h2 style={{ textAlign: 'center', margin: '0 0 1rem' }}>Login</h2>

        <div style={inputGroupStyle}>
          <label htmlFor='login-username'>Username</label>
          <input
            id='login-username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label htmlFor='login-password'>Password</label>
          <input
            id='login-password'
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
          value={loginMutation.isPending ? 'Logging in...' : 'Log In'}
          disabled={!username || !password || loginMutation.isPending}
          style={buttonStyle}
        />

        <p style={{ textAlign: 'center', margin: '1rem 0 0' }}>
          Do not have an account? <Link to='/signup'>Sign up</Link>
        </p>
      </form>
    </div>
  )
}