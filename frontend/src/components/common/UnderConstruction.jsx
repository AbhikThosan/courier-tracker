import React from 'react';
import { Card, Typography, Space } from 'antd';
import { ToolOutlined, SettingOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const UnderConstruction = ({ pageName = "This Page" }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="text-center max-w-md w-full shadow-lg">
        <Space direction="vertical" size="large" className="w-full">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-orange-100 p-4 rounded-full">
              <SettingOutlined className="text-4xl text-orange-500" />
            </div>
          </div>

          {/* Title */}
          <div>
            <Title level={2} className="text-gray-800 mb-2">
              🚧 Under Construction
            </Title>
            <Text className="text-gray-600 text-lg">
              {pageName} is currently being developed
            </Text>
          </div>

          {/* Description */}
          <div className="text-gray-500">
            <Text>
              We're working hard to bring you this feature. 
              Please check back soon!
            </Text>
          </div>

          {/* Features */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <ClockCircleOutlined className="text-blue-500" />
              <Text strong className="text-blue-700">Coming Soon</Text>
            </div>
            <Text className="text-blue-600 text-sm">
              This page will be available in the next update
            </Text>
          </div>

          {/* Action */}
          <div className="pt-4">
            <Text type="secondary" className="text-sm">
              <ToolOutlined className="mr-1" />
              Our development team is working on it
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default UnderConstruction; 