import React from 'react';
import { Button } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';

const LocationCell = ({ lat, lon }) => {
  const handleOpenInMaps = () => {
    if (lat && lon) {
      const url = `https://www.google.com/maps?q=${lat},${lon}`;
      window.open(url, '_blank');
    }
  };

  if (!lat || !lon) {
    return (
      <span className="text-gray-400 text-sm">No location</span>
    );
  }

  return (
    <Button
      type="primary"
      size="small"
      icon={<EnvironmentOutlined />}
      onClick={handleOpenInMaps}
      className="flex items-center"
    >
      See Location
    </Button>
  );
};

export default LocationCell; 