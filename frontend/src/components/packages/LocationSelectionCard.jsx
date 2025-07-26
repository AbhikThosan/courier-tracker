import React from 'react';
import { Card, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import LeafletMapSelector from './LeafletMapSelector';

const { Text } = Typography;

const LocationSelectionCard = ({ onLocationSelect }) => {
  return (
    <Card 
      title={
        <div className="flex items-center">
          <EnvironmentOutlined className="mr-2 text-red-600" />
          <span>Location Selection</span>
        </div>
      }
      className="mb-6"
      size="small"
    >
      <Text className="text-gray-600 mb-4 block">
        Click on the map to select the package location coordinates (Free OpenStreetMap)
      </Text>
      <LeafletMapSelector onLocationSelect={onLocationSelect} />
    </Card>
  );
};

export default LocationSelectionCard; 