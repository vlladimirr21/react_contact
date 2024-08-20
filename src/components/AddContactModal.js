import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../App.css'

const AddContactModal = ({ show, handleClose, addContact, groups }) => {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [group, setGroup] = useState(groups[0] || '')

  const handleSave = () => {
    const newContact = { fullName, phoneNumber, group }
    addContact(newContact)
    handleClose()
    setFullName('') // Сброс формы после сохранения
    setPhoneNumber('')
    setGroup(groups[0] || '')
  }

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-left">
      <Modal.Header closeButton>
        <Modal.Title>Добавление контакта</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Введите ФИО</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите ФИО"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Введите номер</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите номер"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroup">
            <Form.Label>Выберите группу</Form.Label>
            <Form.Select value={group} onChange={e => setGroup(e.target.value)}>
              {groups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddContactModal
