import React from 'react';
import { Card, Button, Input, Typography } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMapLocation from '../../hooks/useMapLocation';

const { Text } = Typography;

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const LeafletMapSelector = ({ onLocationSelect }) => {
  const {
    currentLocation,
    locationLoading,
    mapCenter,
    handleLocationSelect,
    getCurrentLocation,
    clearSelection
  } = useMapLocation(onLocationSelect);

  const handleManualLatChange = (e) => {
    const lat = parseFloat(e.target.value);
    if (!isNaN(lat)) {
      handleLocationSelect(lat, currentLocation?.lng || 0);
    }
  };

  const handleManualLngChange = (e) => {
    const lng = parseFloat(e.target.value);
    if (!isNaN(lng)) {
      handleLocationSelect(currentLocation?.lat || 0, lng);
    }
  };

  return (
    <Card size="small" className="mb-4">
      {/* Action Buttons */}
      <div className="mb-4 flex space-x-2">
        <Button 
          icon={<AimOutlined />} 
          onClick={getCurrentLocation}
          size="small"
          loading={locationLoading}
        >
          Use Current Location
        </Button>
        <Button 
          onClick={clearSelection}
          size="small"
        >
          Clear Selection
        </Button>
      </div>

      {/* Map Container */}
      <div 
        style={{ 
          width: '100%', 
          height: '300px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
          position: 'relative'
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onLocationSelect={handleLocationSelect} />
          
          {currentLocation && (
            <Marker position={[currentLocation.lat, currentLocation.lng]}>
              <Popup>
                Selected Location<br />
                Lat: {currentLocation.lat.toFixed(6)}<br />
                Lng: {currentLocation.lng.toFixed(6)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Instructions */}
      <div className="mt-3 text-center">
        <Text type="secondary" className="text-sm">
          <EnvironmentOutlined className="mr-1" />
          Click anywhere on the map to select location coordinates (Default: Dhaka, Bangladesh)
        </Text>
      </div>

      {/* Selected Location Display */}
      {currentLocation && (
        <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
          <Text strong className="text-green-800">
            ✓ Location Selected
          </Text>
          <div className="text-sm text-green-700 mt-1">
            Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
          </div>
        </div>
      )}

      {/* Manual Coordinate Input */}
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <Text strong>Manual Coordinate Input:</Text>
        <Text className="text-sm text-gray-600 block mb-2">
          Enter coordinates manually if needed (Default: Dhaka coordinates)
        </Text>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Text>Latitude:</Text>
            <Input
              placeholder="23.828079"
              onChange={handleManualLatChange}
              className="mt-1"
            />
          </div>
          <div>
            <Text>Longitude:</Text>
            <Input
              placeholder="90.365104"
              onChange={handleManualLngChange}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeafletMapSelector; 