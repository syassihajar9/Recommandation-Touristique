import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Assure-toi que Navbar.js est dans le bon dossier
import Accueil from './pages/Accueil';
import Recommandations from './pages/Recommandations';
import Carte from './pages/Carte';
import Chatbot from './pages/Chatbot';
import Register from './pages/Register';
import Faq from './pages/Faq';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/recommandations" element={<Recommandations />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faq" element={<Faq />} />
        {/* Ajout d'une route pour afficher la RecommendationCard */}
      </Routes>
    </Router>
  );
}

export default App;
