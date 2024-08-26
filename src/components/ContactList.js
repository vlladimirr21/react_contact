import React from 'react'
import ContactGroup from './ContactGroup'

const ContactList = ({
  groups,
  contacts,
  openGroups,
  toggleGroup,
  handleEditContact,
  handleDeleteContact,
}) => (
  <div className="content">
    {groups.map((group, groupIndex) => (
      <ContactGroup
        key={groupIndex}
        group={group}
        contacts={contacts}
        openGroups={openGroups}
        toggleGroup={toggleGroup}
        handleEditContact={handleEditContact}
        handleDeleteContact={handleDeleteContact}
      />
    ))}
    {contacts.length === 0 && <p>Список контактов пуст</p>}
  </div>
)

export default ContactList
