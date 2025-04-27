import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Faq = () => {
  const [lieu, setLieu] = useState("");
  const [budget, setBudget] = useState("");
  const [activites, setActivites] = useState("");
  const [climat, setClimat] = useState("");
  const [transport, setTransport] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      lieu: lieu,
      budget: budget,
      activite: activites,
      climat: climat,
      transport: transport
    };
    

    try {
      const response = await fetch("http://127.0.0.1:8000/api/recommendations/create-recommendation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setMessage("✅ Recommandation enregistrée avec succès !");
        // Réinitialiser le formulaire
        setLieu("");
        setBudget("");
        setActivites("");
        setClimat("");
        setTransport("");
      } else {
        setMessage("❌ Erreur lors de l'enregistrement de la recommandation.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("❌ Erreur serveur !");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">FAQ & Recommandations Personnalisées</h1>

      <form onSubmit={handleSubmit}>
        {/* Ton formulaire est parfait, je ne change rien ici */}
        <div className="mb-3">
          <label htmlFor="lieu" className="form-label">Quel type de lieu souhaitez-vous visiter ?</label>
          <select 
            id="lieu"
            className="form-select"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="Jardin Majorelle">Jardin Majorelle</option>
            <option value="Palais Bahia">Palais Bahia</option>
            <option value="Médina">La Médina</option>
            <option value="Place Jemaa el-Fna">Place Jemaa el-Fna</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="budget" className="form-label">Quel est votre budget ?</label>
          <select 
            id="budget"
            className="form-select"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="gratuit">Gratuit</option>
            <option value="payant">Payant</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="activites" className="form-label">Quel type d'activités préférez-vous ?</label>
          <select 
            id="activites"
            className="form-select"
            value={activites}
            onChange={(e) => setActivites(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="culturel">Culturel</option>
            <option value="shopping">Shopping</option>
            <option value="aventure">Aventure</option>
            <option value="détente">Détente</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="climat" className="form-label">Quel type de climat préférez-vous ?</label>
          <select 
            id="climat"
            className="form-select"
            value={climat}
            onChange={(e) => setClimat(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="chaud">Chaud</option>
            <option value="modéré">Modéré</option>
            <option value="frais">Frais</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="transport" className="form-label">Quel type de transport préférez-vous ?</label>
          <select 
            id="transport"
            className="form-select"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="voiture">Voiture</option>
            <option value="transportPublic">Transport Public</option>
            <option value="à pied">À pied</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-4">Envoyer la recommandation</button>
      </form>

      {message && (
        <div className="mt-4 alert alert-info">
          {message}
        </div>
      )}
    </div>
  );
};

export default Faq;
