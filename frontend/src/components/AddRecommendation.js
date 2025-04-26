import React, { useState } from 'react';

function AddRecommendation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Recommandation ajoutée ✅');
        setTitle('');
        setDescription('');
      } else {
        setMessage(data.error || 'Erreur lors de l’ajout.');
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <div>
      <h2>Ajouter une Recommandation</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea><br />

        <button type="submit">Ajouter</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddRecommendation;
