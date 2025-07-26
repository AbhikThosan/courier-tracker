import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import apiClient from '../../utils/apiClient';

const DeleteAction = ({ packageId, packageName, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    console.log('Delete button clicked for package:', packageId);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      console.log('Deleting package:', packageId);
      
      // Call the delete API
      await apiClient.delete(`/packages/${packageId}`);
      
      // Show success message
      message.success('Package deleted successfully!');
      
      // Close modal
      setIsModalVisible(false);
      
      // Call the callback to refresh the table
      if (onDeleteSuccess) {
        onDeleteSuccess();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      message.error(
        error.response?.data?.message || 
        'Failed to delete package. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={showDeleteConfirm}
        loading={loading}
        className="flex items-center justify-center p-1 h-8 w-8 hover:bg-red-50"
        title="Delete Package"
      />

      <Modal
        title="Delete Package"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Yes, Delete"
        cancelText="Cancel"
        okType="danger"
        confirmLoading={loading}
        centered
      >
        <div className="flex items-start space-x-3">
          <ExclamationCircleOutlined 
            style={{ color: '#ff4d4f', fontSize: '20px', marginTop: '2px' }} 
          />
          <div>
            <p>Are you sure you want to delete this package?</p>
            <div className="mt-3 p-3 bg-gray-50 rounded">
              <p><strong>Package ID:</strong> {packageId}</p>
              <p><strong>Receiver:</strong> {packageName}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAction; 