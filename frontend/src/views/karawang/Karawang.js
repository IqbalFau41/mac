import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CProgress,
  CFormSelect,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { getStatusConfig, generateDefaultSignal } from '../../utils/signalLightConfig'
import '../../scss/signalLightConfig.scss'

const Karawang = () => {
  // We manage several pieces of state that work together to display our machine data
  const [machineNames, setMachineNames] = useState([]) // Holds our complete machine dataset
  const [lineGroups, setLineGroups] = useState([]) // Available manufacturing line groups
  const [selectedLineGroup, setSelectedLineGroup] = useState('') // Currently selected group filter
  const [loading, setLoading] = useState(true) // Controls loading state display
  const [error, setError] = useState(null) // Handles any API or processing errors

  // When the component first mounts, we fetch the available line groups
  // This populates our filter dropdown menu
  useEffect(() => {
    const fetchLineGroups = async () => {
      try {
        const response = await axios.get('/api/machine-names/karawang/line-groups')
        setLineGroups(response.data.map((group) => group.LineGroup))
      } catch (err) {
        console.error('Error fetching line groups:', err)
      }
    }

    fetchLineGroups()
  }, [])

  // This effect handles our main data fetching logic
  // It runs initially and whenever the selected line group changes
  useEffect(() => {
    const fetchMachineNames = async () => {
      try {
        setLoading(true)
        const params = selectedLineGroup ? { params: { lineGroup: selectedLineGroup } } : {}

        // Make parallel API calls for machine names and status
        const [machineResponse, statusResponse] = await Promise.all([
          axios.get('/api/machine-names/karawang', params),
          axios.get('/api/machine-status/all'),
        ])

        // Create our status lookup table for efficient access
        const machineStatuses = statusResponse.data.reduce((acc, status) => {
          acc[status.NoMachine] = status
          return acc
        }, {})

        // Transform the raw data into our display format
        const transformedData = machineResponse.data.map((machine) => {
          const machineStatus = machineStatuses[machine.Machine_Code] || {}
          const statusConfig = getStatusConfig(machineStatus.Status || 'Shutdown')

          // Calculate our performance metrics
          const actual = machineStatus.Counter || 0
          const plan = machineStatus.TotalCounter || 100
          const performance = plan > 0 ? Math.round((actual / plan) * 100) : 0

          return {
            no_mesin: machine.Machine_Code,
            mesin: machine.LineName,
            lineGroup: machine.LineGroup,
            status: machineStatus.Status || 'Shutdown',
            message: statusConfig.displayName,
            Plan: plan,
            actual: actual,
            performance: `${performance}%`,
            startTime: machineStatus.StartDate_Time,
            endTime: machineStatus.EndDate_Time,
            cycleTime: machineStatus.CT,
          }
        })

        setMachineNames(transformedData)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching machine data:', err)
        setError(err)
        setLoading(false)
      }
    }

    // Single fetch when component mounts or lineGroup changes
    fetchMachineNames()

    // Remove the interval-based refresh
    // No need for cleanup since we're not setting up an interval anymore
  }, [selectedLineGroup])

  // Display error state if something goes wrong
  if (error) {
    return (
      <CRow>
        <CCol className="text-center text-danger">
          Error loading machine names: {error.message}
        </CCol>
      </CRow>
    )
  }

  return (
    <>
      {/* Line Group Filter Section */}
      <CRow className="mb-3">
        <CCol md={4}>
          <CFormSelect
            value={selectedLineGroup}
            onChange={(e) => setSelectedLineGroup(e.target.value)}
          >
            <option value="">All Line Groups</option>
            {lineGroups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>

      {/* Main Content Area */}
      {loading ? (
        <CRow>
          <CCol className="text-center">
            <CSpinner color="primary" />
          </CCol>
        </CRow>
      ) : (
        <CRow className="d-flex align-items-stretch">
          {machineNames.map((data, index) => {
            const { borderColor, headerColor } = getStatusConfig(data.status)
            const signalClasses = generateDefaultSignal(data.status)
            const progress = data.actual ? Math.min((data.actual / (data.Plan || 1)) * 100, 100) : 0

            return (
              <CCol md={2} sm={2} className="mb-4 px-2" key={index}>
                <CCard className="machine-card-wrapper mb-4" style={{ borderColor }}>
                  <CCardHeader
                    className="machine-card-header"
                    style={{ backgroundColor: headerColor }}
                  >
                    <Link to={`/karawang/machine/${encodeURIComponent(data.no_mesin)}`}>
                      <strong className="machine-code">{data.no_mesin}</strong>
                      <span className="machine-name">{data.mesin}</span>
                    </Link>
                  </CCardHeader>

                  <CCardBody className="machine-card-body">
                    <div className="status-message">
                      <strong
                        title={
                          data.startTime
                            ? `Last updated: ${new Date(data.startTime).toLocaleString()}`
                            : ''
                        }
                      >
                        {data.message}
                      </strong>
                    </div>

                    <div className="machine-info-container">
                      <div className="signal-tower">
                        {signalClasses.map((signalClass, i) => {
                          // Check if it's Normal Operation and this is the green light (index 2)
                          const isGreenLight = i === 2
                          const isNormalOperation = data.status.toLowerCase() === 'normal operation'

                          return (
                            <div
                              key={i}
                              className={`signal ${signalClass} ${isNormalOperation && isGreenLight ? 'blinking' : ''}`}
                            />
                          )
                        })}
                      </div>

                      <div className="machine-details">
                        <p>
                          <strong>No. Mesin:</strong> {data.no_mesin}
                        </p>
                        <p>
                          <strong>Plan:</strong> {data.Plan}
                        </p>
                        <div className="metric-container">
                          <strong>Actual:</strong> {data.actual}
                          <CProgress height={10} value={progress} />
                        </div>
                        <div className="metric-container">
                          <strong>Performance:</strong> {data.performance}
                          <CProgress
                            height={10}
                            value={parseFloat(data.performance.replace('%', ''))}
                          />
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            )
          })}
        </CRow>
      )}
    </>
  )
}

export default Karawang
