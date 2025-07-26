import React from 'react';
import { Layout } from 'antd';
import useAuth from '../hooks/useAuth';
import Sidebar from '../components/layout/Sidebar';
import UnderConstruction from '../components/common/UnderConstruction';

const { Content } = Layout;

const UsersPage = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout className="min-h-screen">
      <Sidebar user={user} onLogout={handleLogout} />
      
      <Layout>
        <Content className="bg-gray-50">
          <UnderConstruction pageName="Users Management" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UsersPage; 