import React from 'react';
import { Layout, Typography } from 'antd';
import useAuth from '../hooks/useAuth';
import Sidebar from '../components/layout/Sidebar';
import CreatePackageForm from '../components/packages/CreatePackageForm';

const { Content } = Layout;
const { Title, Text } = Typography;

const PackagesPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleFormSuccess = () => {
    // Handle form success - could redirect or show success message
    console.log('Package created successfully!');
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar user={user} onLogout={handleLogout} />

      <Layout>
        <Content className="bg-gray-50 p-2 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Title level={2} className="text-gray-800 mb-2 text-xl sm:text-2xl lg:text-3xl">
                Create New Package
              </Title>
              <Text className="text-gray-600 text-sm sm:text-base">
                Fill out the form below to create a new courier package
              </Text>
            </div>

            {/* Create Package Form */}
            <CreatePackageForm
              visible={true}
              onSuccess={handleFormSuccess}
              onCancel={() => {}}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PackagesPage; 