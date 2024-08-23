import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../styles/modals.css'
import '../styles/forms.css'
//
import '../img/button_delete_default.png'
import deleteButton from '../img/button_delete_default.png'

const GroupsModal = ({ show, handleClose, addGroup, deleteGroup, groups }) => {
  const [newGroup, setNewGroup] = useState('')

  const handleAddGroup = () => {
    if (newGroup && !groups.includes(newGroup)) {
      addGroup(prevGroups => [...prevGroups, newGroup])
      setNewGroup('')
    }
  }

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-left">
      <Modal.Header closeButton>
        <Modal.Title>Группы контактов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {groups.map((group, index) => (
            <div key={index} className="group-item">
              <input type="text" value={group} readOnly />
              <button
                className="delete-button"
                onClick={() => deleteGroup(group)}
              >
                <img src={deleteButton} alt="Delete" />
              </button>
            </div>
          ))}
        </div>
        <Form.Group className="mt-3">
          <Form.Control
            type="text"
            placeholder="Введите название группы"
            value={newGroup}
            onChange={e => setNewGroup(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="group-add-button" onClick={handleAddGroup}>
          Добавить
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GroupsModal
