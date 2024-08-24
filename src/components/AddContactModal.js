import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import '../styles/modals.css'
import '../styles/forms.css'

const AddContactModal = ({
  show,
  handleClose,
  addContact,
  groups,
  currentContact,
}) => {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [group, setGroup] = useState('')

  useEffect(() => {
    if (currentContact) {
      setFullName(currentContact.fullName)
      setPhoneNumber(currentContact.phoneNumber)
      setGroup(currentContact.group)
    } else {
      setFullName('')
      setPhoneNumber('')
      setGroup('')
    }
  }, [currentContact])

  const handleSave = () => {
    const newContact = {
      fullName: fullName || 'Фамилия Имя Отчество',
      phoneNumber: phoneNumber || '+7 (ХХХ) ХХХ - ХХ - ХХ',
      group,
    }
    addContact(newContact)
    setFullName('')
    setPhoneNumber('')
    setGroup('')
    handleClose()
  }

  const handlePhoneNumberChange = e => {
    const value = e.target.value
    const formattedValue = value.replace(/\D/g, '').slice(0, 11)
    setPhoneNumber(formattedValue)
  }

  const handleFullNameChange = e => {
    const value = e.target.value
    const formattedValue = value.replace(/[^a-zA-Zа-яА-Я\s]/g, '')
    setFullName(formattedValue)
  }

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-left">
      <Modal.Header closeButton>
        <Modal.Title>
          {currentContact ? 'Редактирование контакта' : 'Добавление контакта'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Control
              type="text"
              placeholder="Введите ФИО"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Control
              type="text"
              placeholder="+7 (XXX) XXX - XX - XX"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              maxLength="11"
            />
          </Form.Group>
          <Form.Group controlId="formGroup">
            <Form.Select value={group} onChange={e => setGroup(e.target.value)}>
              <option value="">Выберите группу</option>
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
