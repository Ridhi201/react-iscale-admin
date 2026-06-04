import React from 'react';

const colorStyles = {
  purple: 'btn-glossy-purple',
  teal: 'btn-glossy-teal',
  blue: 'btn-glossy-blue',
  red: 'btn-glossy-red',
  royalblue: 'btn-glossy-royalblue'
};

export const GlossyButton = ({ 
  children, 
  variant = 'blue', 
  className = '', 
  isIcon = false,
  ...props 
}) => {
  const variantClass = colorStyles[variant] || colorStyles.blue;
  
  return (
    <button
      className={`${variantClass} ${isIcon ? 'icon-only' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlossyButton;
