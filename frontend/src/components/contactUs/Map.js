import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { FaMapMarker, FaPhone, FaEnvelope } from "react-icons/fa";

const defaultMarker = new L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  iconSize: [35, 55],
  iconAnchor: [13, 0],
});

function Map() {
  const position = [41.0044, 29.042];
  return (
    <React.Fragment>
      <div className="map-area">
        <MapContainer
          center={position}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultMarker}>
            <Popup className="request-popup">
              <div className="popup-area">
                <h3>Contact Us</h3>
                <p>
                  <FaMapMarker /> Kadiköy, Istanbul, Turkey
                  <br />
                  <FaPhone /> +90 (542) 282-7740
                  <br />
                  <FaEnvelope />{" "}
                  <a
                    href="mailto:aliihsantas34@gmail.com"
                    className="footer-anchor"
                  >
                    aliihsantas34@gmail.com
                  </a>
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </React.Fragment>
  );
}

export default Map;
