import React from 'react';

const ContactList = ({ contacts, openModalC }) => {
  return (
    <ul>
      {contacts?.map((contact) => (
        <li key={contact.id} onClick={() => openModalC(contact)}>
          {contact.first_name} {contact.last_name}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;