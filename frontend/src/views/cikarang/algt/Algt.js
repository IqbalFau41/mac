import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CCardText, CCardTitle } from '@coreui/react'

const machines = [
  {
    machine: '11003 MANUAL LATHE OKUMA',
    status: 'Running',
    durasi: '32 menit 49 detik',
    planning: 300,
    actual: 10,
    cycleTime: 60,
    performa: '16%',
  },
  {
    machine: 'EBW - DRILL CARRIER 23015-23017-23018',
    status: 'Stop',
    durasi: '50 menit 10 detik',
    planning: 200,
    actual: 150,
    cycleTime: 60,
    performa: '90%',
  },
  {
    machine: 'MACHINE XYZDASDA DASDA',
    status: 'Warning',
    durasi: '10 menit 5 detik',
    planning: 150,
    actual: 100,
    cycleTime: 60,
    performa: '67%',
  },
]

const Algt = () => {
  const statusColors = {
    running: 'var(--cui-success)',
    stop: 'var(--cui-danger)',
    warning: 'var(--cui-warning)',
  }

  return (
    <CRow className="d-flex align-items-stretch">
      {machines.map((item, index) => {
        const borderClass =
          item.status.toLowerCase() === 'running'
            ? 'card-border-green'
            : item.status.toLowerCase() === 'stop'
              ? 'card-border-red'
              : item.status.toLowerCase() === 'warning'
                ? 'card-border-warning'
                : '' // Menentukan kelas border berdasarkan status

        return (
          <CCol md={2} sm={2} key={index}>
            <CCard
              textColor="white"
              className={`mb-3 custom-card ${borderClass}`}
              style={{
                width: '100%',
                height: '100%',
                borderColor: statusColors[item.status.toLowerCase()],
              }}
            >
              <CCardHeader
                className="card-header-machine-status"
                style={{ backgroundColor: statusColors[item.status.toLowerCase()] }}
              >
                {item.machine}
              </CCardHeader>
              <CCardBody>
                <CCardTitle
                  className="machine-status-text"
                  style={{ textAlign: 'center', textTransform: 'uppercase' }}
                >
                  {item.status}
                </CCardTitle>
                <CCardText className="machine-status-text">
                  <div className="status-row">
                    <div>
                      <strong>Planning:</strong>
                    </div>
                    <div>{item.planning}</div>
                  </div>
                  <div className="status-row">
                    <div>
                      <strong>Actual:</strong>
                    </div>
                    <div>{item.actual}</div>
                  </div>
                  <div className="status-row">
                    <div>
                      <strong>Durasi:</strong>
                    </div>
                    <div>{item.durasi}</div>
                  </div>
                  <div className="status-row">
                    <div>
                      <strong>Performa:</strong>
                    </div>
                    <div>{item.performa}</div>
                  </div>
                  <div className="status-row">
                    <div>
                      <strong>Cycle Time:</strong>
                    </div>
                    <div>{item.cycleTime}</div>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        )
      })}
    </CRow>
  )
}

export default Algt
