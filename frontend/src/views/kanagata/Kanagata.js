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

const Kanagata = () => {
  const [machineNames, setMachineNames] = useState([])
  const [lineGroups, setLineGroups] = useState([])
  const [selectedLineGroup, setSelectedLineGroup] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [location] = useState('CKR')

  // Fetch line groups
  useEffect(() => {
    const fetchLineGroups = async () => {
      try {
        const response = await axios.get(`/api/machine-names/${location}/line-groups`)
        setLineGroups(response.data.map((group) => group.LINE_GROUP))
      } catch (err) {
        console.error('Error fetching line groups:', err)
      }
    }

    fetchLineGroups()
  }, [location])

  // Fetch machine names and status
  useEffect(() => {
    const fetchMachineNames = async () => {
      try {
        setLoading(true)
        const params = selectedLineGroup ? { params: { lineGroup: selectedLineGroup } } : {}

        // Make parallel API calls for machine names and production history
        const [machineResponse, historyResponse] = await Promise.all([
          axios.get(`/api/machine-names/${location}`, params),
          axios.get(`/api/machine-history/${location}`, params),
        ])

        // Transform machine data
        const transformedData = machineResponse.data.map((machine) => {
          // Find the most recent history record for this machine
          const machineHistory =
            historyResponse.data
              .filter((history) => history.MachineCode === machine.MACHINE_CODE)
              .sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt))[0] || {}

          const statusConfig = getStatusConfig(machineHistory.OPERATION_NAME || 'Shutdown')

          // Calculate performance metrics
          const actual = machineHistory.MACHINE_COUNTER || 0
          const plan = 100 // You may want to define a way to get planned production
          const performance = plan > 0 ? Math.round((actual / plan) * 100) : 0

          return {
            no_mesin: machine.MACHINE_CODE,
            mesin: machine.MACHINE_NAME,
            lineGroup: machine.MACHINE_CODE,
            status: machineHistory.OPERATION_NAME || 'Shutdown',
            message: statusConfig.displayName,
            Plan: plan,
            actual: actual,
            performance: `${performance}%`,
            startTime: machineHistory.CreatedAt,
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

    fetchMachineNames()
  }, [selectedLineGroup, location])

  // Error handling
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
                    <Link to={`/cikarang/machine/${encodeURIComponent(data.no_mesin)}`}>
                      <strong className="machine-code">{data.mesin}</strong>
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
                          <strong>Machine Code:</strong> {data.lineGroup}
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

export default Kanagata
