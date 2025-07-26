import React, { useEffect, useRef } from 'react';
import { Form } from 'antd';
import usePackageForm from '../../hooks/usePackageForm';
import SenderInfoCard from './SenderInfoCard';
import ReceiverInfoCard from './ReceiverInfoCard';
import PackageDetailsCard from './PackageDetailsCard';
import LocationSelectionCard from './LocationSelectionCard';
import FormActions from './FormActions';

const CreatePackageForm = ({ visible, onSuccess }) => {
  const [form] = Form.useForm();
  const isInitialMount = useRef(true);
  const {
    loading,
    contextHolder,
    handleSubmit,
    handleLocationSelect,
    resetForm
  } = usePackageForm(onSuccess);

  // Reset form only on initial mount, not on every visible change
  useEffect(() => {
    if (isInitialMount.current && visible) {
      console.log('Initial form mount, setting up form');
      form.resetFields();
      resetForm();
      isInitialMount.current = false;
    }
  }, [visible, form, resetForm]);

  const handleReset = () => {
    console.log('Manual reset triggered');
    form.resetFields();
    resetForm();
  };

  const handleFormSubmit = (values) => {
    console.log('Form submitted with values:', values);
    // Pass the form reset function to the hook
    handleSubmit(values, () => {
      form.resetFields();
      resetForm();
    });
  };

  const handleFormFinishFailed = (errorInfo) => {
    console.log('Form validation failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          onFinishFailed={handleFormFinishFailed}
          initialValues={{
            status: 'CREATED',
            assigned_courier_id: '461783b7-8d45-49ea-80ae-f4ff6be0d973'
          }}
          preserve={false}
        >
          <SenderInfoCard />
          <ReceiverInfoCard />
          <PackageDetailsCard />
          <LocationSelectionCard onLocationSelect={handleLocationSelect} />
          <FormActions loading={loading} onReset={handleReset} />
        </Form>
      </div>
    </>
  );
};

export default CreatePackageForm; 