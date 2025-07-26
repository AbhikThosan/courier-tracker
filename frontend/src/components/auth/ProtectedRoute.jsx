import React from 'react';
import { Spin, Result, Button } from 'antd';
import { LoadingOutlined, LockOutlined } from '@ant-design/icons';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();
  console.log(user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spin 
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} 
            size="large" 
          />
          <div className="mt-4 text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Result
          icon={<LockOutlined style={{ color: '#1890ff' }} />}
          title="Authentication Required"
          subTitle="Please log in to access this page."
          extra={
            <Button type="primary" onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          }
        />
      </div>
    );
  }

  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Result
          status="403"
          title="Access Denied"
          subTitle="You don't have permission to access this page."
          extra={
            <Button type="primary" onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          }
        />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 