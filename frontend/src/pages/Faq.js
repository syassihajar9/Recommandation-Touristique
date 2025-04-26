import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Faq = () => {
  const [lieu, setLieu] = useState("");
  const [budget, setBudget] = useState("");
  const [activites, setActivites] = useState("");
  const [climat, setClimat] = useState("");
  const [transport, setTransport] = useState("");
  const [recommandation, setRecommandation] = useState("");

  // Fonction pour soumettre et générer les recommandations
  const handleSubmit = (e) => {
    e.preventDefault();
    let recommandations = [];

    // Logique pour générer les recommandations en fonction des choix
    if (lieu === "jardinMajorelle" && budget === "gratuit" && activites === "détente") {
      recommandations.push("Nous vous recommandons de visiter le Jardin Majorelle pour un moment de détente en plein air.");
    } else if (lieu === "palaisBahiya" && budget === "payant" && activites === "culturel") {
      recommandations.push("Le Palais Bahia est une magnifique destination pour les passionnés d'histoire et d'architecture.");
    } else if (lieu === "médina" && activites === "shopping") {
      recommandations.push("La médina de Marrakech est idéale pour faire du shopping traditionnel. Vous y trouverez des produits faits main.");
    }

    if (climat === "chaud" && transport === "voiture") {
      recommandations.push("Si vous aimez le climat chaud, nous vous recommandons de visiter les jardins et les palais en voiture pour plus de confort.");
    } else if (climat === "frais" && transport === "à pied") {
      recommandations.push("Un climat frais est idéal pour explorer la ville à pied, vous pouvez découvrir la médina et les ruelles anciennes.");
    }

    if (recommandations.length === 0) {
      recommandations.push("Merci pour vos choix ! Nous avons d'autres options pour vous.");
    }

    // Mettre à jour l'état des recommandations
    setRecommandation(recommandations.join(" "));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">FAQ & Recommandations Personnalisées</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="lieu" className="form-label">Quel type de lieu souhaitez-vous visiter ?</label>
          <select 
            id="lieu"
            className="form-select"
            value={lieu}
            onChange={(e) => setLieu(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="jardinMajorelle">Jardin Majorelle</option>
            <option value="palaisBahiya">Palais Bahia</option>
            <option value="médina">La Médina</option>
            <option value="placeJemaa">Place Jemaa el-Fna</option>
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
            <option value="àPied">À pied</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-4">Voir la recommandation</button>
      </form>

      {recommandation && (
        <div className="mt-4 alert alert-info">
          {recommandation}
        </div>
      )}
    </div>
  );
};

export default Faq;
