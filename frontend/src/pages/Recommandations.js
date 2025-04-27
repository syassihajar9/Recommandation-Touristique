import React, { useState } from "react";
import Modal from "react-modal";
import { Container, Row, Col, Card, Button, Dropdown, Badge } from "react-bootstrap";
import { StarFill, Star, Heart, HeartFill } from "react-bootstrap-icons";

Modal.setAppElement("#root");

const recommendations = [
  { 
    id: 1, 
    nom: "Jardin Majorelle", 
    description: "Un magnifique jardin botanique conçu par le peintre Jacques Majorelle, puis restauré par Yves Saint Laurent. Abrite une riche collection de plantes exotiques et un musée berbère.", 
    image: "/images/majorel.jpg",
    categorie: "Activité", 
    prix: 150,
    rating: 4.5,
    heures: "8h - 17h30",
    adresse: "Rue Yves Saint Laurent, Marrakech"
  },
  { 
    id: 2, 
    nom: "Place Jemaa el-Fna", 
    description: "Le cœur vibrant de Marrakech avec ses marchands, musiciens et conteurs.", 
    image: "/images/jamaa.jpg", 
    categorie: "Activité", 
    prix: 0,
    rating: 4.7,
    heures: "Toute la journée",
    adresse: "Centre-ville, Marrakech"
  },
  { 
    id: 3, 
    nom: "Palais Bahia", 
    description: "Un palais somptueux du XIXe siècle.", 
    image: "/images/bahiaa.jpg", 
    categorie: "Monument", 
    prix: 100,
    rating: 4.2,
    heures: "8h - 18h",
    adresse: "Quartier Bahia, Marrakech"
  },
  { 
    id: 4, 
    nom: "Riad Dar Anika", 
    description: "Un riad traditionnel à Marrakech.", 
    image: "/images/bahia.jpg", 
    categorie: "Hôtel", 
    prix: 300,
    rating: 4.6,
    heures: "24h",
    adresse: "Derb Anika, Marrakech"
  },
  { 
    id: 5, 
    nom: "Le Tobsil", 
    description: "Un restaurant de cuisine marocaine raffinée.", 
    image: "/images/tobsil.jpg", 
    categorie: "Restaurant", 
    prix: 200,
    rating: 4.5,
    heures: "12h - 23h",
    adresse: "Riad Zitoun Jdid, Marrakech"
  },
  { 
    id: 6, 
    nom: "Le Musée de la Palmeraie", 
    description: "Un musée d'art contemporain et traditionnel berbère dans le cadre magnifique de la Palmeraie.", 
    image: "/images/musee_palmeraie.jpg",
    categorie: "Musée", 
    prix: 50,
    rating: 4.3,
    heures: "9h - 18h",
    adresse: "La Palmeraie, Marrakech"
  },
  { 
    id: 7, 
    nom: "Le Riad Kheirredine", 
    description: "Un riad de luxe offrant une expérience authentique avec des chambres somptueuses et un service impeccable.", 
    image: "/images/riad_kheirredine.jpg",
    categorie: "Hôtel", 
    prix: 1200,
    rating: 4.8,
    heures: "24h",
    adresse: "Derb Kheirredine, Marrakech"
  },
  { 
    id: 8, 
    nom: "Le Jardin Secret", 
    description: "Un jardin calme et paisible situé en plein cœur de la médina de Marrakech, parfait pour une promenade relaxante.", 
    image: "/images/jardin_secret.jpg",
    categorie: "Activité", 
    prix: 70,
    rating: 4.4,
    heures: "9h - 17h",
    adresse: "Rue Mouassine, Marrakech"
  },
  { 
    id: 9, 
    nom: "Le Palais El Badi", 
    description: "Ruines d'un ancien palais impérial, offrant un aperçu de l'architecture et de l'histoire du Maroc.", 
    image: "/images/palais_el_badi.jpg",
    categorie: "Monument", 
    prix: 50,
    rating: 4.1,
    heures: "8h - 18h",
    adresse: "Ksibat Nhass, Marrakech"
  },
  { 
    id: 10, 
    nom: "Le Restaurant Le Foundouk", 
    description: "Un restaurant marocain raffiné, offrant une cuisine traditionnelle dans un cadre élégant et romantique.", 
    image: "/images/le_foundouk.jpg",
    categorie: "Restaurant", 
    prix: 250,
    rating: 4.6,
    heures: "12h - 23h",
    adresse: "Derb Ahl Tadla, Marrakech"
  },
  { 
    id: 11, 
    nom: "Le Souk Semmarine", 
    description: "Un souk coloré et animé, parfait pour découvrir des objets artisanaux, des épices, et des souvenirs traditionnels.", 
    image: "/images/souk_semmarine.jpg",
    categorie: "Activité", 
    prix: 0,
    rating: 4.5,
    heures: "9h - 20h",
    adresse: "Médina, Marrakech"
  },
  { 
    id: 12, 
    nom: "Le Café des Épices", 
    description: "Un café avec une vue magnifique sur les souks et la médina, parfait pour un déjeuner ou un goûter.", 
    image: "/images/cafe_epices.jpg",
    categorie: "Restaurant", 
    prix: 150,
    rating: 4.3,
    heures: "9h - 22h",
    adresse: "Derb Rahba Kedima, Marrakech"
  },
  { 
    id: 13, 
    nom: "Le Royal Mansour Marrakech", 
    description: "Un hôtel de luxe 5 étoiles offrant un service de classe mondiale et un cadre somptueux avec des riads privés.", 
    image: "/images/royal_mansour.jpg",
    categorie: "Hôtel", 
    prix: 3000,
    rating: 4.9,
    heures: "24h",
    adresse: "Rue Abou Abbas El Sebti, Marrakech"
  },
  { 
    id: 14, 
    nom: "La Menara Gardens", 
    description: "Un magnifique jardin avec un grand bassin, offrant une vue imprenable sur les montagnes de l'Atlas.", 
    image: "/images/menara_gardens.jpg",
    categorie: "Activité", 
    prix: 20,
    rating: 4.2,
    heures: "8h - 17h",
    adresse: "Avenue de la Menara, Marrakech"
  },
  { 
    id: 15, 
    nom: "Le Comptoir Darna", 
    description: "Un restaurant-bar chic avec une ambiance marocaine et une excellente cuisine traditionnelle.", 
    image: "/images/comptoir_darna.jpg",
    categorie: "Restaurant", 
    prix: 300,
    rating: 4.7,
    heures: "20h - 2h",
    adresse: "Boulevard Zerktouni, Marrakech"
  }
];


function Recommandations() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentLieu, setCurrentLieu] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const openModal = (lieu) => {
    setCurrentLieu(lieu);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentLieu(null);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const filteredRecommendations = recommendations.filter(recommendation => (
    (categoryFilter === "All" || recommendation.categorie === categoryFilter) &&
    recommendation.prix >= priceFilter
  ));

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarFill key={i} color="gold" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<StarFill key={i} color="gold" />);
      } else {
        stars.push(<Star key={i} color="gold" />);
      }
    }
    
    return stars;
  };

  // Styles
  const styles = {
    container: {
      backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/images/marrakech.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      color: "white",
      padding: "40px 0",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "30px",
      color: "white",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    card: {
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      transition: "transform 0.3s, box-shadow 0.3s",
      height: "100%",
      backgroundColor: "rgba(255,255,255,0.9)",
      color: "#333",
    },
    cardHeader: {
      position: "relative",
    },
    cardImg: {
      height: "200px",
      objectFit: "cover",
    },
    favoriteBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "rgba(0,0,0,0.5)",
      border: "none",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    detailsBtn: {
      width: "100%",
      fontWeight: "bold",
    },
    dropdown: {
      width: "100%",
      textAlign: "left",
    },
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "800px",
      width: "90%",
      padding: "0",
      border: "none",
      borderRadius: "10px",
      overflow: "hidden",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <div style={styles.container}>
      <Container className="my-5">
        <h1 className="text-center mb-4" style={styles.title}>Nos Recommandations</h1>
        
        <Row className="mb-4 justify-content-center">
          <Col md={4} className="mb-2">
            <Dropdown onSelect={(e) => setCategoryFilter(e)}>
              <Dropdown.Toggle variant="dark" id="category-dropdown" style={styles.dropdown}>
                {categoryFilter === "All" ? "Toutes catégories" : categoryFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="All">Toutes catégories</Dropdown.Item>
                <Dropdown.Item eventKey="Activité">Activités</Dropdown.Item>
                <Dropdown.Item eventKey="Hôtel">Hôtels</Dropdown.Item>
                <Dropdown.Item eventKey="Restaurant">Restaurants</Dropdown.Item>
                <Dropdown.Item eventKey="Monument">Monuments</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={4} className="mb-2">
            <Dropdown onSelect={(e) => setPriceFilter(Number(e))}>
              <Dropdown.Toggle variant="dark" id="price-dropdown" style={styles.dropdown}>
                {priceFilter === 0 ? "Tous les prix" : `Prix > ${priceFilter} MAD`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="0">Tous les prix</Dropdown.Item>
                <Dropdown.Item eventKey="100">Prix > 100 MAD</Dropdown.Item>
                <Dropdown.Item eventKey="200">Prix > 200 MAD</Dropdown.Item>
                <Dropdown.Item eventKey="300">Prix > 300 MAD</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          {filteredRecommendations.map((lieu) => (
            <Col key={lieu.id} md={4} className="mb-4">
              <Card style={styles.card}>
                <div style={styles.cardHeader}>
                  <Card.Img variant="top" src={lieu.image} style={styles.cardImg} />
                  <button 
                    onClick={() => toggleFavorite(lieu.id)} 
                    style={styles.favoriteBtn}
                  >
                    {favorites.includes(lieu.id) ? 
                      <HeartFill color="red" size={24} /> : 
                      <Heart color="white" size={24} />
                    }
                  </button>
                </div>
                <Card.Body>
                  <Card.Title>{lieu.nom}</Card.Title>
                  <Card.Text className="text-muted">{lieu.description.substring(0, 60)}...</Card.Text>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge bg="secondary">{lieu.categorie}</Badge>
                    <strong>{lieu.prix} MAD</strong>
                  </div>
                  <div className="mb-3">
                    {renderStars(lieu.rating)} <span>({lieu.rating})</span>
                  </div>
                  <Button 
                    variant="danger" 
                    onClick={() => openModal(lieu)}
                    style={styles.detailsBtn}
                  >
                    Voir détails
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal} 
          style={modalStyles}
          overlayClassName="modal-overlay"
        >
          {currentLieu && (
            <>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#e63946', color: 'white'}}>
                <h2 style={{margin: 0}}>{currentLieu.nom}</h2>
                <button onClick={closeModal} style={{background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer'}}>&times;</button>
              </div>
              <img src={currentLieu.image} alt={currentLieu.nom} style={{width: '100%', height: '300px', objectFit: 'cover'}} />
              <div style={{padding: '20px'}}>
                <p>{currentLieu.description}</p>
                <div style={{margin: '20px 0', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
                  <p><strong>Catégorie:</strong> {currentLieu.categorie}</p>
                  <p><strong>Prix:</strong> {currentLieu.prix} MAD</p>
                  <p><strong>Horaires:</strong> {currentLieu.heures}</p>
                  <p><strong>Adresse:</strong> {currentLieu.adresse}</p>
                  <div>
                    <strong>Note:</strong> {renderStars(currentLieu.rating)} ({currentLieu.rating}/5)
                  </div>
                </div>
                <Button 
                  variant="danger" 
                  onClick={closeModal}
                  style={{width: '100%', marginTop: '20px'}}
                >
                  Fermer
                </Button>
              </div>
            </>
          )}
        </Modal>
      </Container>
    </div>
  );
}

export default Recommandations;