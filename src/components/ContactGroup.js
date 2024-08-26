import React from 'react'
import { Collapse } from 'react-bootstrap'
import ContactItem from './ContactItem'

const ContactGroup = ({
  group,
  contacts,
  openGroups,
  toggleGroup,
  handleEditContact,
  handleDeleteContact,
}) => (
  <div className="contact-group">
    <div className="contact-group-title" onClick={() => toggleGroup(group)}>
      {group}
      <span className="toggle-icon">{openGroups[group] ? '▲' : '▼'}</span>
    </div>
    <Collapse in={openGroups[group]}>
      <div className="contact-items">
        {contacts
          .filter(contact => contact.group === group)
          .map((contact, index) => (
            <ContactItem
              key={index}
              contact={contact}
              handleEditContact={handleEditContact}
              handleDeleteContact={handleDeleteContact}
            />
          ))}
      </div>
    </Collapse>
  </div>
)

export default ContactGroup
