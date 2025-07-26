import { useState } from 'react';
import { message } from 'antd';

const useMapLocation = (onLocationSelect) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([23.828079, 90.365104]); // Dhaka, Bangladesh

  const handleLocationSelect = (lat, lng) => {
    setCurrentLocation({ lat, lng });
    if (onLocationSelect) {
      onLocationSelect(lat, lng);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          setMapCenter([lat, lng]);
          setCurrentLocation({ lat, lng });
          if (onLocationSelect) {
            onLocationSelect(lat, lng);
          }
          setLocationLoading(false);
        },
        (error) => {
          console.error('Error getting current location:', error);
          message.error('Unable to get current location. Please select manually.');
          setLocationLoading(false);
        }
      );
    } else {
      message.error('Geolocation is not supported by this browser.');
    }
  };

  const clearSelection = () => {
    setCurrentLocation(null);
    if (onLocationSelect) {
      onLocationSelect(null, null);
    }
  };

  const updateMapCenter = (lat, lng) => {
    setMapCenter([lat, lng]);
  };

  return {
    currentLocation,
    locationLoading,
    mapCenter,
    handleLocationSelect,
    getCurrentLocation,
    clearSelection,
    updateMapCenter
  };
};

export default useMapLocation; 