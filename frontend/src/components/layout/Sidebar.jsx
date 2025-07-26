import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined, 
  InboxOutlined, 
  UserOutlined, 
  LogoutOutlined,
  BellOutlined,
  SettingOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: 'packages',
      icon: <InboxOutlined />,
      label: 'Packages',
      onClick: () => navigate('/packages'),
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/users'),
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: 'Notifications',
      onClick: () => navigate('/notifications'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
  ];

  // Determine selected key based on current path
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/packages') return 'packages';
    if (path === '/users') return 'users';
    if (path === '/notifications') return 'notifications';
    if (path === '/settings') return 'settings';
    return 'dashboard';
  };

  return (
    <Sider
      width={250}
      className="bg-white shadow-lg"
      style={{ minHeight: '100vh' }}
    >
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        className="border-r-0 h-full"
        style={{ height: 'calc(100vh - 80px)' }}
        items={menuItems}
      />

      {/* Logout button at bottom of sidebar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">
            <div>Logged in as:</div>
            <div className="font-medium text-gray-800 truncate">
              {user?.email || 'Admin User'}
            </div>
          </div>
        </div>
        <Button 
          type="text" 
          icon={<LogoutOutlined />} 
          onClick={onLogout}
          className="w-full text-gray-600 hover:text-red-500"
          size="large"
        >
          Logout
        </Button>
      </div>
    </Sider>
  );
};

export default Sidebar; 