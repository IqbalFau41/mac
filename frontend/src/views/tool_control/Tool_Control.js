import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CRow, CCol, CCard, CCardBody, CCardHeader, CSpinner, CProgress } from '@coreui/react'
import { Link } from 'react-router-dom'

const Tool_Control = () => {
  const [machineNames, setMachineNames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getColors = (status) => {
    switch (status.toLowerCase()) {
      case 'running':
        return {
          borderColor: 'var(--cui-success)',
          headerColor: 'var(--cui-success)',
          signal: [
            'signal-dark-red',
            'signal-dark-yellow',
            'signal-green',
            'signal-dark-blue',
            'signal-dark-white',
          ],
        }
      case 'warning':
        return {
          borderColor: 'var(--cui-warning)',
          headerColor: 'var(--cui-warning)',
          signal: [
            'signal-dark-red',
            'signal-yellow',
            'signal-dark-green',
            'signal-dark-blue',
            'signal-dark-white',
          ],
        }
      case 'stop':
        return {
          borderColor: 'var(--cui-danger)',
          headerColor: 'var(--cui-danger)',
          signal: [
            'signal-red',
            'signal-dark-yellow',
            'signal-dark-green',
            'signal-dark-blue',
            'signal-dark-white',
          ],
        }
      case 'little stop':
        return {
          borderColor: '#fc38da',
          headerColor: '#fc38da',
          signal: [
            'signal-dark-red',
            'signal-dark-yellow',
            'signal-dark-green',
            'signal-blue',
            'signal-dark-white',
          ],
        }
      case 'line stop':
        return {
          borderColor: '#c03fab',
          headerColor: '#c03fab',
          signal: [
            'signal-dark-green',
            'signal-dark-yellow',
            'signal-dark-red',
            'signal-blue',
            'signal-dark-white',
          ],
        }
      case 'power off':
        return {
          borderColor: 'var(--cui-secondary)',
          headerColor: 'var(--cui-secondary)',
          signal: [
            'signal-dark-green',
            'signal-dark-yellow',
            'signal-dark-red',
            'signal-dark-blue',
            'signal-white',
          ],
        }
      default:
        return {
          borderColor: '#000',
          headerColor: '#000',
          signal: [
            'signal-dark-green',
            'signal-dark-yellow',
            'signal-dark-red',
            'signal-dark-blue',
            'signal-dark-white',
          ],
        }
    }
  }

  useEffect(() => {
    const fetchMachineNames = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/api/machine-names', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const transformedData = response.data.map((machine) => ({
          no_mesin: machine.Machine_Code || machine.LineName.split(':')[1] || machine.LineName,
          mesin: machine.LineName,
          message: 'Running',
          Plan: 150,
          actual: 140,
          performance: '93%',
        }))

        console.log('Detail machine names:', transformedData)

        setMachineNames(transformedData)
        setLoading(false)
      } catch (err) {
        console.error('Fetch error:', err.response ? err.response.data : err.message)
        setError(err)
        setLoading(false)
      }
    }

    fetchMachineNames()
  }, [])

  if (loading) {
    return (
      <CRow>
        <CCol className="text-center">
          <CSpinner color="primary" />
        </CCol>
      </CRow>
    )
  }

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
    <CRow className="d-flex align-items-stretch">
      {machineNames.map((data, index) => {
        const { borderColor, headerColor, signal } = getColors(data.message)
        const progress = data.Plan > 0 ? (data.actual / data.Plan) * 100 : 0

        return (
          <CCol md={2} sm={2} className="mb-4 px-2" key={index}>
            <CCard
              className="mb-4"
              style={{
                borderColor: borderColor,
                borderWidth: '1px',
                borderStyle: 'solid',
                height: '100%',
              }}
            >
              <CCardHeader
                style={{
                  backgroundColor: headerColor,
                  color: 'white',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Tambahkan ini untuk membuat judul center
                  padding: '5px 10px',
                }}
              >
                <Link
                  to={`/cikarang/machine/${encodeURIComponent(data.no_mesin)}`}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textTransform: 'uppercase',
                    textAlign: 'center', // Tambahkan ini
                  }}
                >
                  <strong style={{ fontSize: '0.9em' }}>{data.no_mesin}</strong>
                  <span style={{ fontSize: '0.8em', opacity: 0.8 }}>{data.mesin}</span>
                </Link>
              </CCardHeader>
              <CCardBody
                style={{
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start', // Ubah ke center untuk proposionalitas
                  height: '100%',
                  alignItems: 'center', // Tambahkan ini untuk perataan horizontal
                  marginBottom: '-8%',
                }}
              >
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    width: '100%', // Pastikan full width
                  }}
                >
                  <strong>{data.message}</strong>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '0px',
                    width: '100%', // Pastikan full width
                    alignItems: 'center',
                    justifyContent: 'center', // Tambahkan ini untuk perataan
                  }}
                >
                  <div
                    className="signal-tower"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minWidth: '30px',
                      height: '100%',
                    }}
                  >
                    {signal.map((signalClass, i) => (
                      <div
                        key={i}
                        className={`signal ${signalClass}`}
                        style={{
                          flex: '1',
                          width: '30px',
                          borderRadius: '2px',
                          minHeight: '25px',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 5px 0' }}>
                      <strong>No. Mesin:</strong> {data.no_mesin}
                    </p>
                    <p style={{ margin: '0 0 5px 0' }}>
                      <strong>Plan:</strong> {data.Plan}
                    </p>
                    <div style={{ marginBottom: '5px' }}>
                      <strong>Actual:</strong> {data.actual}
                      <CProgress height={10} value={progress} />
                    </div>
                    <div>
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
  )
}

export default Tool_Control
