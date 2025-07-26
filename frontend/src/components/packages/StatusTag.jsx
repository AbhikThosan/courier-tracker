import React from 'react';
import { Tag } from 'antd';

const StatusTag = ({ status }) => {
  const getStatusColor = (status) => {
    const statusColors = {
      'CREATED': 'blue',
      'ASSIGNED': 'orange',
      'IN_TRANSIT': 'purple',
      'DELIVERED': 'green',
      'FAILED': 'red'
    };
    return statusColors[status] || 'default';
  };

  return (
    <Tag color={getStatusColor(status)}>
      {status}
    </Tag>
  );
};

export default StatusTag; 