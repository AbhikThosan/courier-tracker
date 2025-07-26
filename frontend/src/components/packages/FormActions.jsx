import React from 'react';
import { Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const FormActions = ({ loading, onReset }) => {
  return (
    <div className="flex justify-end space-x-3 pt-4 border-t">
      <Button onClick={onReset} size="large">
        Reset Form
      </Button>
      <Button 
        type="primary" 
        htmlType="submit" 
        loading={loading}
        size="large"
        icon={<InboxOutlined />}
      >
        Create Package
      </Button>
    </div>
  );
};

export default FormActions; 