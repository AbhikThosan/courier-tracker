import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Alert, 
  Space,
  Divider 
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  LoginOutlined,
  HomeOutlined 
} from '@ant-design/icons';
import useAuth from '../hooks/useAuth';
import { validateLoginForm } from '../utils/validation';

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [form] = Form.useForm();
  const { login, loading, error } = useAuth();
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // Clear previous errors
    setFormErrors({});
    
    // Validate form
    const errors = validateLoginForm(values);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Attempt login
    const result = await login(values.email, values.password);
    
    if (result.success) {
      // Login successful, redirect to dashboard
      navigate('/dashboard', { replace: true });
    } else {
      setFormErrors({ general: result.error });
    }
  };

  const handleValuesChange = () => {
    // Clear errors when user starts typing
    if (Object.keys(formErrors).length > 0) {
      setFormErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Logo/Brand Section */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full mb-3 sm:mb-4">
            <HomeOutlined className="text-white text-lg sm:text-2xl" />
          </div>
          <Title level={2} className="text-gray-800 mb-1 sm:mb-2 text-xl sm:text-2xl lg:text-3xl">
            Courier Tracker
          </Title>
          <Text className="text-gray-600 text-sm sm:text-base">
            Admin Portal
          </Text>
        </div>

        {/* Login Card */}
        <Card 
          className="shadow-xl border-0"
          bodyStyle={{ padding: '1rem sm:1.5rem lg:2rem' }}
        >
          <div className="text-center mb-4 sm:mb-6">
            <Title level={3} className="text-gray-800 mb-1 sm:mb-2 text-lg sm:text-xl lg:text-2xl">
              Welcome Back
            </Title>
            <Text className="text-gray-600 text-sm sm:text-base">
              Sign in to your admin account
            </Text>
          </div>

          {/* Test Credentials Info */}
          <Alert
            message="Test Credentials"
            description={
              <div className="text-xs sm:text-sm">
                <div><strong>Email:</strong> courier.tracker.admin@test.com</div>
                <div><strong>Password:</strong> trackeradmin123</div>
              </div>
            }
            type="info"
            showIcon
            className="mb-4 sm:mb-6"
          />

          {/* Error Alert */}
          {error && (
            <Alert
              message="Login Failed"
              description={error}
              type="error"
              showIcon
              className="mb-4 sm:mb-6"
            />
          )}

          {formErrors.general && (
            <Alert
              message="Login Failed"
              description={formErrors.general}
              type="error"
              showIcon
              className="mb-4 sm:mb-6"
            />
          )}

          {/* Login Form */}
          <Form
            form={form}
            name="admin-login"
            onFinish={handleSubmit}
            onValuesChange={handleValuesChange}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              label="Email Address"
              validateStatus={formErrors.email ? 'error' : ''}
              help={formErrors.email}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                type="email"
                autoComplete="email"
                className="h-10 sm:h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              validateStatus={formErrors.password ? 'error' : ''}
              help={formErrors.password}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="h-10 sm:h-12"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<LoginOutlined />}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
                size="large"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-4 sm:my-6">
            <Text type="secondary" className="text-xs sm:text-sm">
              Secure Access
            </Text>
          </Divider>

          {/* Security Notice */}
          <div className="text-center">
            <Text type="secondary" className="text-xs">
              This is a secure admin portal. Please ensure you're using a trusted device.
            </Text>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-6">
          <Text type="secondary" className="text-xs sm:text-sm">
            © 2025 Courier Tracker. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 