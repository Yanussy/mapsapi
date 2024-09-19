
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authService from "./services/authService"; // Import the axios service
import List from "./components/List";
const MapComponent = () => {
  const position = [51.505, -0.09]; // Default position [latitude, longitude]
  const { email } = useParams(); // Assuming you're passing user email as a param
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null); // Location state to store lat/lng

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/user/${email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error.message);
      }
    };

    fetchUserData();
  }, [email]);

  // Display loading until user is fetched
  if (!user) return <div>Loading...</div>;

  return (
    <>
      <List/>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker email={email} setLocation={setLocation} />
      </MapContainer>
    </>
  );
};

// Component to handle location and update the backend
const LocationMarker = ({ email, setLocation }) => {
  const [position, setPosition] = useState(null);

  // Handle location updates
  const handleLocationUpdate = (latitude, longitude) => {
    authService
      .updateLocation(email, latitude, longitude)
      .then(() => {
        console.log("Location updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update location:", error);
      });
  };

  // Use map events to detect user location
  const map = useMapEvents({
    click() {
      map.locate(); // Triggers location detection
    },
    locationfound(e) {
      setPosition(e.latlng); // Set the location in state
      setLocation(e.latlng); // Update location in the parent state
      map.flyTo(e.latlng, map.getZoom()); // Move the map to user's location
      console.log("znam kude jiveesh")
      // Call function to send location to backend
      handleLocationUpdate(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default MapComponent;

