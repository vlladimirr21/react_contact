import React, { useState, useEffect } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import AddContactModal from './components/AddContactModal'
import GroupsModal from './components/GroupsModal'
import './App.css'
import contactBookIcon from './img/contact-book-icon.png'

const App = () => {
  // Устанавливаем начальные группы
  const initialGroups = ['Друзья', 'Коллеги']
  const [contacts, setContacts] = useState([])
  const [groups, setGroups] = useState(initialGroups)
  const [showAddContact, setShowAddContact] = useState(false)
  const [showGroups, setShowGroups] = useState(false)

  // Загрузка из localStorage
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || []
    const savedGroups =
      JSON.parse(localStorage.getItem('groups')) || initialGroups

    setContacts(savedContacts)
    setGroups(savedGroups)
  }, [])

  // Сохранение в localStorage
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

      {/* Модальные окна */}
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
      />
    </div>
  )
}

export default App
