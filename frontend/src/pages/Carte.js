import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// Fix for missing leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const locations = [
  { position: [31.63, -8.00], name: "Marrakech", description: "Découvrez les meilleures activités !" },
  { position: [31.6167, -8.0333], name: "Jardin Majorelle", description: "Jardin botanique iconique" },
  { position: [31.6258, -7.9892], name: "Place Jemaa el-Fna", description: "Cœur vibrant de la ville" },
];

function Carte() {
  return (
    <MapContainer 
      center={[31.63, -8.00]} 
      zoom={12} 
      style={{ height: "100vh", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={loc.position}>
          <Popup className="custom-popup">
            <h3>{loc.name}</h3>
            <p>{loc.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Carte;