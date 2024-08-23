import React, { useState, useEffect } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import AddContactModal from './components/AddContactModal'
import GroupsModal from './components/GroupsModal'
import './styles/buttons.css'
import './styles/containers.css'
import './styles/headers.css'
import './styles/modals.css'
import './styles/forms.css'
import './styles/contacts.css'
import './styles/groups.css'
import contactBookIcon from './img/contact-book-icon.png'
import editIcon from './img/button_edit_default.png'
import deleteIcon from './img/button_delete_default.png'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [groups, setGroups] = useState(['Друзья', 'Коллеги'])
  const [showAddContact, setShowAddContact] = useState(false)
  const [showGroups, setShowGroups] = useState(false)
  const [currentContact, setCurrentContact] = useState(null)
  const [openGroups, setOpenGroups] = useState({})

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || []
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [
      'Друзья',
      'Коллеги',
    ]
    setGroups(savedGroups)
    setContacts(savedContacts)

    const initialOpenGroups = savedGroups.reduce((acc, group) => {
      acc[group] = false // По умолчанию все группы закрыты
      return acc
    }, {})
    setOpenGroups(initialOpenGroups)
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [contacts, groups])

  const handleAddContact = contact => {
    if (currentContact) {
      const updatedContacts = contacts.map(c =>
        c === currentContact ? contact : c
      )
      setContacts(updatedContacts)
      setCurrentContact(null)
    } else {
      setContacts([...contacts, contact])
    }
  }

  const handleEditContact = contact => {
    setCurrentContact(contact)
    setShowAddContact(true)
  }

  const handleDeleteContact = contactToDelete => {
    const updatedContacts = contacts.filter(c => c !== contactToDelete)
    setContacts(updatedContacts)
  }

  const toggleGroup = groupName => {
    setOpenGroups(prevOpenGroups => ({
      ...prevOpenGroups,
      [groupName]: !prevOpenGroups[groupName],
    }))
  }

  const handleShowAddContact = () => {
    setCurrentContact(null)
    setShowAddContact(true)
  }

  const handleCloseAddContact = () => setShowAddContact(false)

  const handleShowGroups = () => setShowGroups(true)
  const handleCloseGroups = () => setShowGroups(false)

  const handleDeleteGroup = groupToDelete => {
    const updatedGroups = groups.filter(group => group !== groupToDelete)
    setGroups(updatedGroups)

    const updatedContacts = contacts.filter(
      contact => contact.group !== groupToDelete
    )
    setContacts(updatedContacts)
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="app-title">
          <img
            src={contactBookIcon}
            alt="Contact Book"
            className="contact-book-icon"
          />
          Книга контактов
        </h1>
        <div>
          <Button variant="danger" onClick={handleShowAddContact}>
            Добавить контакт +
          </Button>
          <Button variant="primary" onClick={handleShowGroups}>
            Группы
          </Button>
        </div>
      </header>
      <div className="content">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="contact-group">
            <div
              className="contact-group-title"
              onClick={() => toggleGroup(group)}
            >
              {group}
              <span className="toggle-icon">
                {openGroups[group] ? '▲' : '▼'}
              </span>
            </div>
            <Collapse in={openGroups[group]}>
              <div className="contact-items">
                {openGroups[group] &&
                  contacts
                    .filter(contact => contact.group === group)
                    .map((contact, index) => (
                      <div key={index} className="contact-item">
                        <div className="contact-info">
                          <span className="contact-name">
                            {contact.fullName}
                          </span>
                          <span className="contact-phone">
                            {contact.phoneNumber}
                          </span>
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
                    ))}
              </div>
            </Collapse>
          </div>
        ))}
        {contacts.length === 0 && <p>Список контактов пуст</p>}
      </div>

      <AddContactModal
        show={showAddContact}
        handleClose={handleCloseAddContact}
        addContact={handleAddContact}
        groups={groups}
        currentContact={currentContact}
      />
      <GroupsModal
        show={showGroups}
        handleClose={handleCloseGroups}
        addGroup={setGroups}
        deleteGroup={handleDeleteGroup}
        groups={groups}
      />
    </div>
  )
}

export default App
