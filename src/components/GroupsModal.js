import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../App.css'

const GroupsModal = ({ show, handleClose, addGroup, groups, setGroups }) => {
  const [newGroup, setNewGroup] = useState('')

  const handleAddGroup = () => {
    if (newGroup && !groups.includes(newGroup)) {
      const updatedGroups = [...groups, newGroup]
      setGroups(updatedGroups)
      setNewGroup('')
    }
  }

  const handleDeleteGroup = groupToDelete => {
    const updatedGroups = groups.filter(group => group !== groupToDelete)
    setGroups(updatedGroups)
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal-dialog-left"
      // backdrop="static"
    >
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
                onClick={() => handleDeleteGroup(group)}
              >
                &#x2715;
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
