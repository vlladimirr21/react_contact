import React from 'react'

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-light">
      <h2>Книга контактов</h2>
      <button className="btn btn-danger">Добавить контакт</button>
      <div className="badge bg-success">Vladimir</div>
    </header>
  )
}

export default Header
