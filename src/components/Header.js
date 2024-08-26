import React from 'react'
import { Button } from 'react-bootstrap'
import contactBookIcon from '../img/contact-book-icon.png'

const Header = ({ handleShowAddContact, handleShowGroups }) => (
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
)

export default Header
