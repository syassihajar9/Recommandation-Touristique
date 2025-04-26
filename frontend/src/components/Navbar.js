import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Nouvelle state pour gérer le chargement
  const [error, setError] = useState(null); // Nouvelle state pour gérer les erreurs

  // Vérification de l'état de connexion
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // 🔥 Appel API météo pour Marrakech via le backend Django
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/recommendations/weather/Marrakech/');
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données météo");
        }
        const data = await response.json();
        setWeather({
          temp: data.temp,
          icon: data.icon,
          description: data.description,
        });
        setIsLoading(false);  // Météo chargée
      } catch (error) {
        setError(error.message);  // Gérer l'erreur
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Guide Marrakech</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Accueil</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/recommandations">Recommandations</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carte">Carte</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chatbot">Chatbot</NavLink>
            </li>

            {/* Affichage météo */}
            <li className="nav-item d-flex align-items-center text-white mx-3">
              {isLoading ? (
                <span>Chargement...</span> // Animation de chargement
              ) : error ? (
                <span>Erreur météo: {error}</span> // Affichage erreur si météo échoue
              ) : (
                weather && (
                  <>
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                      alt={weather.description}
                      style={{ width: "30px", height: "30px", marginRight: "5px" }}
                    />
                    <span>
                      Marrakech {weather.temp}°C, {weather.description}
                    </span>
                  </>
                )
              )}
            </li>

            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn btn-outline-light ms-3" onClick={handleLogout}>
                  Se déconnecter
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
