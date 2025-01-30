import React from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CCardHeader, CCardText, CRow, CCol, CProgress } from '@coreui/react'

const MachineDetail = () => {
  const { name } = useParams()

  const cards = [
    {
      header: 'Status mesin',
      color: 'success',
      content: ['Running', 'Finish: 14%'],
    },
    {
      header: 'Cycle Time',
      color: 'danger',
      content: ['40/1 detik', 'Downtime: 25 menit'],
    },
    {
      header: 'Output Produksi',
      color: 'info',
      content: ['Good: 3541 Pcs', 'NG: 203 Pcs'],
    },
    {
      header: 'Nama Produk',
      color: 'secondary',
      content: ['Assembly', 'Cams Shaft Transmisi Honda'],
    },
    {
      header: 'Produksi Order',
      color: 'secondary',
      content: ['Tanggal: 01-01-2025', 'Order: 15000 Part'],
    },
    {
      header: 'Estimasi Produk',
      color: 'secondary',
      content: ['Estimasi Selesai: 10-01-2025', 'Actual: 3000 Part'],
    },
  ]

  const shifts = [
    {
      title: 'Shift 1',
      progress: [20, 30, 50, 40, 60, 70, 80, 90, 100, 100],
    },
    {
      title: 'Shift 2',
      progress: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    },
    {
      title: 'Shift 3',
      progress: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
    },
  ]

  const hours = Array.from({ length: 10 }, (_, index) => `${7 + index}:00`)

  return (
    <div>
      <h2>Detail Mesin: {decodeURIComponent(name)}</h2>
      <CRow>
        {cards.map((card, index) => (
          <CCol sm={4} key={index}>
            <CCard className={`mb-3 border-top-${card.color} border-top-3`}>
              <CCardHeader>{card.header}</CCardHeader>
              <CCardBody>
                {card.content.map((text, textIndex) => (
                  <CCardText key={textIndex}>{text}</CCardText>
                ))}
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
      <h2>Detail Production</h2>
      <CRow>
        {shifts.map((shift, index) => (
          <CCol md={12} key={index}>
            <CCard className="mb-3">
              <CCardHeader>{shift.title}</CCardHeader>
              <CCardBody>
                <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {hours.map((hour, hourIndex) => (
                      <span key={hourIndex} style={{ flex: 1, textAlign: 'center' }}>
                        {hour}
                      </span>
                    ))}
                  </div>
                </div>
                <CProgress>
                  {shift.progress.map((value, hourIndex) => (
                    <CProgress
                      key={hourIndex}
                      value={value}
                      color="success"
                      style={{ width: `${100 / shift.progress.length}%` }}
                    />
                  ))}
                </CProgress>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  )
}

export default MachineDetail
