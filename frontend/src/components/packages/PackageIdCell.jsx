import React, { useState } from 'react';
import { Tooltip, Button, message } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Text } = Typography;

const PackageIdCell = ({ packageId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(packageId);
      setCopied(true);
      message.success('Package ID copied to clipboard!');
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy package ID:', err);
      message.error('Failed to copy package ID');
    }
  };

  const truncatedId = packageId?.substring(0, 8) + '...';

  return (
    <div className="flex items-center space-x-2">
      <Tooltip 
        title={packageId} 
        placement="top"
        mouseEnterDelay={0.5}
      >
        <Text code className="text-xs cursor-pointer">
          {truncatedId}
        </Text>
      </Tooltip>
      
      <Button
        type="text"
        size="small"
        icon={copied ? <CheckOutlined /> : <CopyOutlined />}
        onClick={handleCopy}
        className={`p-1 h-6 w-6 flex items-center justify-center ${
          copied ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'
        }`}
        title={copied ? 'Copied!' : 'Copy Package ID'}
      />
    </div>
  );
};

export default PackageIdCell; 