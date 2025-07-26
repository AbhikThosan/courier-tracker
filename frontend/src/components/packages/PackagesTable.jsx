import React from 'react';
import { Table, Spin } from 'antd';
import PackageIdCell from './PackageIdCell';
import StatusTag from './StatusTag';
import ContactInfo from './ContactInfo';
import LocationCell from './LocationCell';
import DeleteAction from './DeleteAction';

const PackagesTable = ({ packages, loading, onDeleteSuccess }) => {
  const columns = [
    {
      title: 'Package ID',
      dataIndex: 'package_id',
      key: 'package_id',
      render: (packageId) => <PackageIdCell packageId={packageId} />,
      responsive: ['md'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => (
        <LocationCell lat={record.lat} lon={record.lon} />
      ),
      responsive: ['lg'],
    },
    {
      title: 'Receiver',
      key: 'receiver',
      render: (_, record) => (
        <ContactInfo 
          name={record.receiver} 
          phone={record.receiver_phone} 
        />
      ),
      responsive: ['sm'],
    },
    {
      title: 'Sender',
      key: 'sender',
      render: (_, record) => (
        <ContactInfo 
          name={record.sender} 
          phone={record.sender_phone} 
        />
      ),
      responsive: ['md'],
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <DeleteAction 
          packageId={record.package_id} 
          packageName={record.receiver}
          onDeleteSuccess={onDeleteSuccess}
        />
      ),
      width: 80,
      fixed: 'right',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 sm:py-12">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={packages}
          rowKey="_id"
          pagination={false}
          className="ant-table-striped"
          size="small"
          scroll={{ x: 800 }}
        />
      </div>
    </div>
  );
};

export default PackagesTable; 