import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSpinner,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { cilPen, cilTrash } from '@coreui/icons' // Correct import
import CIcon from '@coreui/icons-react' // Correct icon component import

const Inventory = () => {
  const [inventories, setInventories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState({ column: 'Name', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const navigate = useNavigate()

  const fetchInventories = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:8080/api/inventory')
      const normalizedData = response.data.map((item) => ({
        ...item,
        id: item.id || item.Id || item.ID,
        Name: item.Name || item.name,
        Description: item.Description || item.description,
        Quantity: item.Quantity || item.quantity,
      }))
      setInventories(normalizedData || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching inventories:', error)
      setError('Failed to load inventories. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventories()
  }, [])

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid ID for deletion:', id)
      return
    }

    try {
      await axios.delete(`http://localhost:8080/api/inventory/${id}`)
      fetchInventories()
    } catch (error) {
      console.error('Error deleting inventory:', error)
      setError('Failed to delete inventory. Please try again later.')
    }
  }

  const handleUpdate = (id) => {
    if (!id && id !== 0) {
      console.error('Invalid ID for update:', id)
      return
    }
    navigate(`/manufacturing/inventory/update/${id}`)
  }

  const handleSort = (column) => {
    const direction = sortOrder.column === column && sortOrder.direction === 'asc' ? 'desc' : 'asc'
    setSortOrder({ column, direction })
  }

  const sortedInventories = [...inventories].sort((a, b) => {
    if (sortOrder.direction === 'asc') {
      return a[sortOrder.column] > b[sortOrder.column] ? 1 : -1
    } else {
      return a[sortOrder.column] < b[sortOrder.column] ? 1 : -1
    }
  })

  const filteredInventories = sortedInventories.filter((item) =>
    item.Name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredInventories.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Inventory Management</strong>
          </CCardHeader>
          <CCardBody>
            <div className="d-flex justify-content-between mb-3">
              <CButton color="primary" onClick={() => navigate('/manufacturing/inventory/add')}>
                Tambah Inventory
              </CButton>
              <div className="w-25">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cari berdasarkan nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <CCard className="mb-4">
              <CCardBody>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th
                        onClick={() => handleSort('Name')}
                        style={{ cursor: 'pointer', width: '25%' }}
                      >
                        Nama Inventory{' '}
                        {sortOrder.column === 'Name'
                          ? sortOrder.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : ''}
                      </th>
                      <th
                        onClick={() => handleSort('Description')}
                        style={{ cursor: 'pointer', width: '35%' }}
                      >
                        Deskripsi{' '}
                        {sortOrder.column === 'Description'
                          ? sortOrder.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : ''}
                      </th>
                      <th
                        onClick={() => handleSort('Quantity')}
                        style={{ cursor: 'pointer', width: '15%' }}
                      >
                        Jumlah{' '}
                        {sortOrder.column === 'Quantity'
                          ? sortOrder.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : ''}
                      </th>
                      <th style={{ width: '20%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No inventories available.
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((inventory, index) => (
                        <tr key={inventory.id}>
                          <td>{inventory.Name}</td>
                          <td>{inventory.Description}</td>
                          <td>{inventory.Quantity}</td>
                          <td>
                            <CButton
                              color="warning"
                              className="me-2"
                              onClick={() => handleUpdate(inventory.id)}
                            >
                              <CIcon icon={cilPen} />
                            </CButton>
                            <CButton color="danger" onClick={() => handleDelete(inventory.id)}>
                              <CIcon icon={cilTrash} />
                            </CButton>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </CCardBody>
            </CCard>

            <CPagination
              aria-label="Page navigation example"
              className="d-flex justify-content-end" // Align pagination to the right
            >
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </CPaginationItem>
              {[...Array(Math.ceil(filteredInventories.length / itemsPerPage))].map((_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={currentPage === Math.ceil(filteredInventories.length / itemsPerPage)}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>

        {error && <div className="alert alert-danger">{error}</div>}
      </CCol>
    </CRow>
  )
}

export default Inventory
