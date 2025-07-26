import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Typography, message } from 'antd';
import useAuth from '../hooks/useAuth';
import usePackages from '../hooks/usePackages';
import Sidebar from '../components/layout/Sidebar';
import PackagesTable from '../components/packages/PackagesTable';

const { Content } = Layout;
const { Title, Text } = Typography;

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { packages, loading, refreshPackages } = usePackages();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  // Show welcome message on first login
  useEffect(() => {
    if (location.state?.fromLogin) {
      messageApi.success({
        content: `Welcome back, ${user?.email}!`,
        duration: 3,
      });
    }
  }, [location.state, user?.email, messageApi]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleDeleteSuccess = () => {
    // Refresh the packages list after successful deletion
    refreshPackages();
  };

  return (
    <Layout className="min-h-screen">
      {contextHolder}
      
      <Sidebar user={user} onLogout={handleLogout} />

      <Layout>
        <Content className="bg-gray-50 p-2 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <Title level={2} className="text-gray-800 mb-1 sm:mb-2 text-lg sm:text-xl lg:text-2xl">
                Packages
              </Title>
              <Text className="text-gray-600 text-sm sm:text-base">
                Manage and track all courier packages
              </Text>
            </div>

            <PackagesTable 
              packages={packages} 
              loading={loading} 
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard; 