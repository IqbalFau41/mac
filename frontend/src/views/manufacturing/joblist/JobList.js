import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CFormInput,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { cilPen, cilCheck, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import '../../../scss/inventoryConfig.scss'

const JobList = () => {
  // State management for job list data and UI controls
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState({ column: 'job_des', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(50)
  const [completeItem, setCompleteItem] = useState(null)
  const navigate = useNavigate()

  // Function to fetch job list data from the API
  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/api/job-list')
      setJobs(response.data || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching job list:', error)
      setError('Gagal memuat daftar pekerjaan. Silakan coba lagi nanti.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs()
  }, [])

  // Navigation handler for updating jobs
  const handleUpdate = (id) => {
    navigate(`/manufacturing/job-list/update/${id}`)
  }

  // Sorting handler for table columns
  const handleSort = (column) => {
    const direction = sortOrder.column === column && sortOrder.direction === 'asc' ? 'desc' : 'asc'
    setSortOrder({ column, direction })
  }

  // Handler for completing jobs and moving them to history
  const handleComplete = async () => {
    if (!completeItem) return

    try {
      await axios.post(
        `http://localhost:3000/api/job-history/move-to-history/${completeItem.no_part}`,
      )
      fetchJobs() // Refresh the job list
      setCompleteItem(null)
    } catch (error) {
      console.error('Error completing job:', error)
      setError('Gagal menyelesaikan pekerjaan. Silakan coba lagi nanti.')
    }
  }

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  // Sort and filter jobs based on current criteria
  const sortedAndFilteredJobs = React.useMemo(() => {
    // First, filter the jobs based on search term
    const filtered = jobs.filter((item) =>
      item.job_des.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      const aValue = a[sortOrder.column]
      const bValue = b[sortOrder.column]

      if (sortOrder.direction === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [jobs, searchTerm, sortOrder])

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedAndFilteredJobs.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedAndFilteredJobs.length / itemsPerPage)

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Loading state
  if (loading) {
    return (
      <div className="spinner-container">
        <CSpinner color="primary" />
      </div>
    )
  }

  // Table header component for better organization
  const TableHeader = ({ column, children }) => (
    <div className="fixed-header-cell" onClick={() => handleSort(column)}>
      {children}
      {sortOrder.column === column && (
        <span className="ms-1">{sortOrder.direction === 'asc' ? '↑' : '↓'}</span>
      )}
    </div>
  )

  return (
    <CRow className="job-list-page">
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Daftar Pekerjaan Karyawan</strong>
            <div className="search-container">
              <CFormInput
                type="text"
                placeholder="Cari berdasarkan deskripsi pekerjaan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                startContent={<CIcon icon={cilSearch} />}
              />
            </div>
          </CCardHeader>

          <CCardBody>
            <div className="fixed-header">
              <TableHeader column="nqp">NQP</TableHeader>
              <TableHeader column="nama_job">Nama Job</TableHeader>
              <TableHeader column="job_class">Job Class</TableHeader>
              <TableHeader column="sub_section">Sub Section</TableHeader>
              <TableHeader column="factory">Factory</TableHeader>
              <TableHeader column="job_des">Job Description</TableHeader>
              <TableHeader column="update_job">Update Job</TableHeader>
              <TableHeader column="due_date">Due Date</TableHeader>
              <TableHeader column="status">Status</TableHeader>
              <div className="fixed-header-cell">Action</div>
            </div>

            <div className="table-container">
              <CTable striped hover responsive className="responsive-table">
                <CTableBody>
                  {currentItems.map((job) => (
                    <CTableRow key={job.no_part}>
                      <CTableDataCell>{job.nqp}</CTableDataCell>
                      <CTableDataCell>{job.nama_job}</CTableDataCell>
                      <CTableDataCell>{job.job_class}</CTableDataCell>
                      <CTableDataCell>{job.sub_section}</CTableDataCell>
                      <CTableDataCell>{job.factory}</CTableDataCell>
                      <CTableDataCell>{job.job_des}</CTableDataCell>
                      <CTableDataCell>{formatDate(job.update_job)}</CTableDataCell>
                      <CTableDataCell>{formatDate(job.due_date)}</CTableDataCell>
                      <CTableDataCell>
                        <span className={`status-badge status-${job.status.toLowerCase()}`}>
                          {job.status}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleUpdate(job.no_part)}
                          title="Edit"
                        >
                          <CIcon icon={cilPen} />
                        </CButton>
                        <CButton
                          color="success"
                          size="sm"
                          onClick={() => setCompleteItem(job)}
                          title="Selesai"
                        >
                          <CIcon icon={cilCheck} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </div>

            <CPagination className="mt-3 justify-content-center">
              <CPaginationItem
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </CPaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>

        {error && <div className="alert alert-danger">{error}</div>}

        <CModal visible={!!completeItem} onClose={() => setCompleteItem(null)}>
          <CModalHeader>
            <CModalTitle>Konfirmasi Penyelesaian Pekerjaan</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Apakah Anda yakin pekerjaan ini telah selesai:
            <br />
            <strong>NQP: {completeItem?.nqp}</strong>
            <br />
            <strong>Deskripsi Pekerjaan: {completeItem?.job_des}</strong>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setCompleteItem(null)}>
              Batal
            </CButton>
            <CButton color="success" onClick={handleComplete}>
              Selesai
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default JobList
