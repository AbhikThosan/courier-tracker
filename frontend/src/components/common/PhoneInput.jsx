import React from 'react';
import { Input } from 'antd';

const PhoneInput = ({ value, onChange, placeholder, prefix, ...props }) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      prefix={prefix}
      {...props}
    />
  );
};

export default PhoneInput; 