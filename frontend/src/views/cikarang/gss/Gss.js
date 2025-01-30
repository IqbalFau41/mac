import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CCardText, CCardTitle } from '@coreui/react'
import { Link } from 'react-router-dom' // Import Link

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
    machine: 'MACH LINE-1 CASE M38 12257 - 12263',
    status: 'Warning',
    durasi: '10 menit 5 detik',
    planning: 150,
    actual: 100,
    cycleTime: 60,
    performa: '67%',
  },
  {
    machine: 'LATHE LINE-03 GEAR SUN 12252',
    status: 'Little Stop',
    durasi: '20 menit 0 detik',
    planning: 100,
    actual: 50,
    cycleTime: 60,
    performa: '50%',
  },
  {
    machine: 'ASSY GEAR COMP PLANETARY 62030',
    status: 'Line Stop',
    durasi: '15 menit 30 detik',
    planning: 120,
    actual: 30,
    cycleTime: 60,
    performa: '25%',
  },
  {
    machine: 'ASSY END COMP TIE ROD 91043- 91044',
    status: 'Power Off',
    durasi: '0 menit 0 detik',
    planning: 0,
    actual: 0,
    cycleTime: 0,
    performa: '0%',
  },
]

const Gss = () => {
  const statusColors = {
    running: 'var(--cui-success)',
    stop: 'var(--cui-danger)',
    warning: 'var(--cui-warning)',

    'little stop': '#fc38da', // Warna untuk Little Stop (pink)
    'line stop': '#C03FAB', // Warna untuk Line Stop (ungu)
    'power off': 'var(--cui-secondary)', // Warna abu tua untuk Power Off
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
                : item.status.toLowerCase() === 'little stop'
                  ? 'card-border-pink'
                  : item.status.toLowerCase() === 'line stop'
                    ? 'card-border-purple'
                    : item.status.toLowerCase() === 'power off'
                      ? '' // Tidak ada kelas border untuk Power Off
                      : '' // Menentukan kelas border berdasarkan status

        return (
          <CCol md={2} sm={2} key={index}>
            <CCard
              textColor="white"
              className={`mb-3 custom-card ${borderClass}`}
              style={{
                width: '100%',
                height: '100%',
                borderColor:
                  item.status.toLowerCase() === 'power off'
                    ? 'transparent'
                    : statusColors[item.status.toLowerCase()],
              }}
            >
              <CCardHeader
                className="card-header-machine-status"
                style={{
                  backgroundColor:
                    item.status.toLowerCase() === 'power off'
                      ? statusColors['power off']
                      : statusColors[item.status.toLowerCase()],
                }}
              >
                <Link
                  to={`/cikarang/machine/${encodeURIComponent(item.machine)}`} // Menggunakan nama mesin dalam URL
                  style={{
                    color: item.status.toLowerCase() === 'power off' ? 'white' : 'white', // Mengubah warna teks menjadi putih
                    textDecoration: 'underline', // Menambahkan garis bawah
                    cursor: 'pointer', // Mengubah kursor menjadi pointer
                  }}
                >
                  {item.machine}
                </Link>
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

export default Gss
