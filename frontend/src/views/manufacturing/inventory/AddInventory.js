// AddInventory.js
import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddInventory = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Quantity: '',
    Description: '',
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form Data:', formData) // Log data yang akan dikirim
    if (!formData.Name || !formData.Quantity) {
      alert('Nama dan Jumlah harus diisi!')
      return
    }
    try {
      const quantity = parseInt(formData.Quantity, 10)
      const dataToSend = {
        Name: formData.Name,
        Quantity: quantity,
        Description: formData.Description,
      }
      console.log('Data to send:', dataToSend) // Log data yang akan dikirim ke backend
      await axios.post('http://localhost:8080/api/inventory', dataToSend)
      navigate('/manufacturing/inventory') // Updated navigation path
    } catch (error) {
      console.error('Error adding inventory:', error) // Updated error message
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Inventory</strong> {/* Updated title */}
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CFormLabel htmlFor="name">Nama Inventory</CFormLabel> {/* Updated label */}
              <CFormInput
                type="text"
                id="name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
              <CFormLabel htmlFor="quantity">Jumlah</CFormLabel>
              <CFormInput
                type="number"
                id="quantity"
                name="Quantity"
                value={formData.Quantity}
                onChange={handleInputChange}
                required
              />
              <CFormLabel htmlFor="description">Deskripsi</CFormLabel>
              <CFormInput
                type="text"
                id="description"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
              />
              <CModalFooter>
                <CButton color="secondary" onClick={() => navigate('/manufacturing/inventory')}>
                  Batal
                </CButton>
                <CButton color="primary" type="submit">
                  Simpan
                </CButton>
              </CModalFooter>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddInventory
