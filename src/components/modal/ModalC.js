import React, { useEffect } from 'react';

const ModalC = ({ isOpen, closeModal, contact }) => {
  useEffect(() => {
    const modal = document.getElementById('modalC');

    const handleOutsideClick = (event) => {
      if (event.target === modal) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, closeModal]);

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`} id="modalC">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Contact Details</h2>
        <div>
          <strong>Name:</strong> {contact.first_name} {contact.last_name}
        </div>
        <div>
          <strong>Email:</strong> {contact.email || 'N/A'}
        </div>
        <div>
          <strong>Phone Number:</strong> {contact.phone_number || 'N/A'}
        </div>
      </div>
    </div>
  );
};

export default ModalC;