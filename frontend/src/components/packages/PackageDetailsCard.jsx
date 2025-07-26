import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col, Card } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const PackageDetailsCard = () => {
  return (
    <Card 
      title={
        <div className="flex items-center">
          <FileTextOutlined className="mr-2 text-orange-600" />
          <span>Package Details</span>
        </div>
      }
      className="mb-4"
      size="small"
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="CREATED">Created</Option>
              <Option value="ASSIGNED">Assigned</Option>
              <Option value="IN_TRANSIT">In Transit</Option>
              <Option value="DELIVERED">Delivered</Option>
              <Option value="FAILED">Failed</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="eta"
            label="Estimated Time of Arrival"
          >
            <DatePicker 
              showTime 
              placeholder="Select ETA"
              className="w-full"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="note"
        label="Notes"
      >
        <TextArea 
          rows={3}
          placeholder="Fragile item, special handling required..."
        />
      </Form.Item>
    </Card>
  );
};

export default PackageDetailsCard; 