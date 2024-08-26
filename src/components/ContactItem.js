import React from 'react'
import editIcon from '../img/button_edit_default.png'
import deleteIcon from '../img/button_delete_default.png'

const ContactItem = ({ contact, handleEditContact, handleDeleteContact }) => (
  <div className="contact-item">
    <div className="contact-info">
      <span className="contact-name">{contact.fullName}</span>
      <span className="contact-phone">{contact.phoneNumber}</span>
    </div>
    <div className="contact-actions">
      <button onClick={() => handleEditContact(contact)}>
        <img src={editIcon} alt="Edit" />
      </button>
      <button onClick={() => handleDeleteContact(contact)}>
        <img src={deleteIcon} alt="Delete" />
      </button>
    </div>
  </div>
)

export default ContactItem
