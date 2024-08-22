import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../App.css'

const AddContactModal = ({ show, handleClose, addContact, groups }) => {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [group, setGroup] = useState('')

  const handleSave = () => {
    const newContact = { fullName, phoneNumber, group }
    addContact(newContact)
    handleClose()
    setFullName('')
    setPhoneNumber('')
    setGroup('')
  }

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-left">
      <Modal.Header closeButton>
        <Modal.Title>Добавление контакта</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Control
              type="text"
              placeholder="Введите ФИО"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Control
              type="text"
              placeholder="Введите номер"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroup">
            <Form.Select
              value={group}
              onChange={e => setGroup(e.target.value)}
              aria-label="Выберите группу"
            >
              <option value="" disabled>
                Выберите группу
              </option>
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
