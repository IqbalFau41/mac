import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CModalFooter,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateInventory = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Name: '',
    Quantity: '',
    Description: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const fetchInventory = async () => {
      if (!id) {
        setError('No inventory ID provided')
        return
      }

      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:8080/api/inventory/${id}`)
        console.log('Fetched data:', response.data) // Debug log

        if (response.data) {
          setFormData({
            Name: response.data.Name || '',
            Quantity: response.data.Quantity || '',
            Description: response.data.Description || '',
          })
          setError(null)
        } else {
          setError('No data found for this inventory item.')
        }
      } catch (error) {
        console.error('Error fetching inventory:', error)
        if (error.response?.status === 404) {
          setError('Inventory item not found.')
        } else {
          setError('Failed to fetch inventory data. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!formData.Name || !formData.Quantity) {
      setError('Name and Quantity are required fields.')
      return
    }

    const quantity = parseInt(formData.Quantity, 10)
    if (isNaN(quantity)) {
      setError('Quantity must be a valid number.')
      return
    }

    try {
      await axios.put(`http://localhost:8080/api/inventory/${id}`, {
        Name: formData.Name,
        Quantity: quantity,
        Description: formData.Description || '',
      })

      setSuccess('Inventory updated successfully.')
      setTimeout(() => {
        navigate('/manufacturing/inventory')
      }, 1500)
    } catch (error) {
      console.error('Error updating inventory:', error)
      setError(error.response?.data?.error || 'Failed to update inventory. Please try again later.')
    }
  }

  if (!id) {
    return <div className="alert alert-danger">Invalid inventory ID</div>
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <CSpinner />
      </div>
    )
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Update Inventory - ID: {id}</strong>
      </CCardHeader>
      <CCardBody>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="name">Nama Inventory</CFormLabel>
            <CFormInput
              type="text"
              id="name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="description">Deskripsi</CFormLabel>
            <CFormInput
              type="text"
              id="description"
              name="Description"
              value={formData.Description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <CFormLabel htmlFor="quantity">Jumlah</CFormLabel>
            <CFormInput
              type="number"
              id="quantity"
              name="Quantity"
              value={formData.Quantity}
              onChange={handleInputChange}
              required
            />
          </div>

          <CModalFooter>
            <CButton color="secondary" onClick={() => navigate('/manufacturing/inventory')}>
              Batal
            </CButton>
            <CButton color="primary" type="submit">
              Perbarui
            </CButton>
          </CModalFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default UpdateInventory
