import React from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

// FIX DEFAULT MARKER ISSUE
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function OfficeMap() {

  // OFFICE LOCATION
  const officePosition = [
    22.5726,
    88.3639,
  ];

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>

        Our Office Location 📍

      </h2>

      <MapContainer

        center={officePosition}

        zoom={13}

        scrollWheelZoom={false}

        style={styles.map}
      >

        {/* OPENSTREETMAP TILES */}
        <TileLayer

          attribution='&copy; OpenStreetMap contributors'

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* OFFICE MARKER */}
        <Marker position={officePosition}>

          <Popup>

            🚀 E-Learning Office <br />

            Kolkata, India

          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}

const styles = {

  container: {
    marginTop: "50px",

    width: "100%",
  },

  heading: {
    textAlign: "center",

    color: "#ff9800",

    marginBottom: "20px",

    fontSize: "36px",
  },

  map: {
    width: "100%",

    height: "450px",

    borderRadius: "25px",

    overflow: "hidden",
  },
};

export default OfficeMap;