import { useState, useEffect } from 'react';
import { message } from 'antd';
import apiClient from '../utils/apiClient';

const usePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get('/packages');
      setPackages(data);
    } catch (err) {
      const errorMessage = 'Failed to fetch packages: ' + err.message;
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const refreshPackages = () => {
    fetchPackages();
  };

  return {
    packages,
    loading,
    error,
    refreshPackages,
  };
};

export default usePackages; 