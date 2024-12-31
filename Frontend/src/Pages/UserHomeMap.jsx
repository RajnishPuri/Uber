import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const libraries = ["marker"];

const UserHomeMap = ({ currentLocation, setCurrentLocation }) => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });
                    if (setCurrentLocation) {
                        setCurrentLocation({ lat: latitude, lng: longitude });
                    }
                },
                (error) => {
                    console.error("Error fetching location:", error);
                    setLocation({ lat: 40.7128, lng: -74.0060 });
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLocation({ lat: 40.7128, lng: -74.0060 });
        }
    }, [setCurrentLocation]);

    const googleMapsApiKey = `${import.meta.env.VITE_BASE_GOOGLE_MAPS_API_KEY}`;

    const markerRef = React.useRef(null);

    const createMarker = () => {
        if (location) {
            const marker = new google.maps.Marker({
                position: location,
                map: markerRef.current.map,
                title: "Current Location",
            });
            return marker;
        }
    };
    return (
        <div className="h-[calc(100%-64px)]">
            {location ? (
                <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
                    <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={location}
                        zoom={15}
                        onLoad={(map) => {
                            markerRef.current = { map };
                            createMarker();
                        }}
                    >
                    </GoogleMap>
                </LoadScript>
            ) : (
                <div>Loading map...</div>
            )}
        </div>
    );
}

export default UserHomeMap