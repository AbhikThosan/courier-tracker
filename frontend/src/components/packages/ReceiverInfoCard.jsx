import React from 'react';
import { Form, Input, Row, Col, Card } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import PhoneInput from '../common/PhoneInput';

const ReceiverInfoCard = () => {
  return (
    <Card 
      title={
        <div className="flex items-center">
          <UserOutlined className="mr-2 text-green-600" />
          <span>Receiver Information</span>
        </div>
      }
      className="mb-4"
      size="small"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="receiver"
            label="Receiver Name"
            rules={[{ required: true, message: 'Please enter receiver name' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Jane Smith"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="receiver_phone"
            label="Receiver Phone"
            rules={[{ required: true, message: 'Please enter receiver phone' }]}
          >
            <PhoneInput 
              prefix={<PhoneOutlined />} 
              placeholder="+8801765524321"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="destination_address"
        label="Destination Address"
        rules={[{ required: true, message: 'Please enter destination address' }]}
      >
        <Input 
          prefix={<HomeOutlined />} 
          placeholder="456 Receiver St, City"
        />
      </Form.Item>
    </Card>
  );
};

export default ReceiverInfoCard; 