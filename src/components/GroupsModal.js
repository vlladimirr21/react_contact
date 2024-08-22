import React, { useState } from 'react'
import { Modal, Button, ListGroup, Form } from 'react-bootstrap'
import '../App.css'

const GroupsModal = ({ show, handleClose, addGroup, groups }) => {
  const [newGroup, setNewGroup] = useState('')

  const handleAddGroup = () => {
    if (newGroup && !groups.includes(newGroup)) {
      addGroup(newGroup)
      setNewGroup('')
    }
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
        <ListGroup>
          {groups.map((group, index) => (
            <ListGroup.Item key={index}>{group}</ListGroup.Item>
          ))}
        </ListGroup>
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
        <Button variant="secondary" onClick={handleAddGroup}>
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
