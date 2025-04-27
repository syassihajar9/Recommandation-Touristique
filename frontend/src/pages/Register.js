// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post('http://127.0.0.1:8000/api/recommendations/register/', {
        username,
        email,
        password,
      });

      // Afficher un message de succès
      setSuccess('Inscription réussie!');
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'inscription : ' + err.response?.data?.detail || 'Veuillez réessayer');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">S'inscrire</button>
      </form>

      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
