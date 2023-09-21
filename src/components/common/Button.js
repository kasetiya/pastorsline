import React from 'react';

const Button = ({ label, color, onClick }) => {
  return (
    <button
      className="btn m-2"
      style={{ backgroundColor: color, border: `1px solid ${color}`, fontSize: 14, fontWeight: 'bold', color: '#fff'}}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;