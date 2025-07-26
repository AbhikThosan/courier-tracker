import React from 'react';
import { Form, Input, Row, Col, Card } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import PhoneInput from '../common/PhoneInput';

const SenderInfoCard = () => {
  return (
    <Card 
      title={
        <div className="flex items-center">
          <UserOutlined className="mr-2 text-blue-600" />
          <span>Sender Information</span>
        </div>
      }
      className="mb-4"
      size="small"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="sender"
            label="Sender Name"
            rules={[{ required: true, message: 'Please enter sender name' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="John Doe"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="sender_phone"
            label="Sender Phone"
            rules={[{ required: true, message: 'Please enter sender phone' }]}
          >
            <PhoneInput 
              prefix={<PhoneOutlined />} 
              placeholder="+8801772873948"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="sender_address"
        label="Sender Address"
        rules={[{ required: true, message: 'Please enter sender address' }]}
      >
        <Input 
          prefix={<HomeOutlined />} 
          placeholder="123 Sender St, City"
        />
      </Form.Item>
    </Card>
  );
};

export default SenderInfoCard; 