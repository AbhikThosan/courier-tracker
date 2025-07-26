import React from 'react';

const ContactInfo = ({ name, phone }) => {
  return (
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">{phone}</div>
    </div>
  );
};

export default ContactInfo; 