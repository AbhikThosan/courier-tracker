import { useState } from 'react';
import { message } from 'antd';
import apiClient from '../utils/apiClient';

const usePackageForm = (onSuccess) => {
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values, formReset) => {
    try {
      setLoading(true);
      console.log('Starting form submission...');

      // Validate required fields
      if (!values.sender || !values.receiver || !values.sender_phone || !values.receiver_phone) {
        messageApi.error('Please fill in all required fields');
        return;
      }

      // Prepare the payload
      const payload = {
        ...values,
        lat: selectedLocation?.lat || 23.828079, // Default to Dhaka if no location selected
        lon: selectedLocation?.lon || 90.365104, // Default to Dhaka if no location selected
        status: values.status || 'CREATED',
        eta: values.eta?.toISOString(),
        assigned_courier_id: values.assigned_courier_id || '461783b7-8d45-49ea-80ae-f4ff6be0d973'
      };

      console.log('Creating package with payload:', payload);

      // Call the API
      const response = await apiClient.post('/packages', payload);
      console.log('API Response:', response);

      messageApi.success('Package created successfully!');
      
      // Call onSuccess callback first
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form after successful submission
      if (formReset) {
        formReset();
      }
      resetForm();
      
    } catch (error) {
      console.error('Error creating package:', error);
      messageApi.error(
        error.response?.data?.message || 
        error.message ||
        'Failed to create package. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat, lon) => {
    console.log('Location selected:', { lat, lon });
    setSelectedLocation({ lat, lon });
  };

  const resetForm = () => {
    console.log('Resetting form state');
    setSelectedLocation(null);
  };

  return {
    loading,
    selectedLocation,
    messageApi,
    contextHolder,
    handleSubmit,
    handleLocationSelect,
    resetForm
  };
};

export default usePackageForm; 