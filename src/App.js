import React, { useState, useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import AddContactModal from './components/AddContactModal'
import GroupsModal from './components/GroupsModal'
import contactBookIcon from './img/contact-book-icon.png'
// import styles
import './styles/buttons.css'
import './styles/containers.css'
import './styles/headers.css'
import './styles/modals.css'
import './styles/forms.css'
import './styles/contacts.css'
import './styles/groups.css'

const App = () => {
  const [contacts, setContacts] = useState([])
  const [groups, setGroups] = useState(['Друзья', 'Коллеги'])
  const [showAddContact, setShowAddContact] = useState(false)
  const [showGroups, setShowGroups] = useState(false)

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || []
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [
      'Друзья',
      'Коллеги',
    ]

    setContacts(savedContacts)
    setGroups(savedGroups)
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [contacts, groups])

  const handleAddContact = contact => {
    setContacts([...contacts, contact])
  }

  const handleAddGroup = group => {
    setGroups([...groups, group])
  }

  const handleShowAddContact = () => setShowAddContact(true)
  const handleCloseAddContact = () => setShowAddContact(false)

  const handleShowGroups = () => setShowGroups(true)
  const handleCloseGroups = () => setShowGroups(false)

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
        {contacts.length > 0 ? (
          <ListGroup>
            {contacts.map((contact, index) => (
              <ListGroup.Item key={index}>
                {contact.fullName} - {contact.phoneNumber} ({contact.group})
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>Список контактов пуст</p>
        )}
      </div>

      {/* модальные окна */}
      <AddContactModal
        show={showAddContact}
        handleClose={handleCloseAddContact}
        addContact={handleAddContact}
        groups={groups}
      />
      <GroupsModal
        show={showGroups}
        handleClose={handleCloseGroups}
        addGroup={handleAddGroup}
        groups={groups}
        setGroups={setGroups}
      />
    </div>
  )
}

export default App
