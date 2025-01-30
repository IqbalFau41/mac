import React from 'react'
import { useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CRow,
  CCol,
  CProgress,
  CProgressStacked,
} from '@coreui/react'

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

  // Define hours for each shift
  const shifts = [
    {
      name: 'Shift 1',
      hours: [
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
      ],
      progressValues: [60],
      progressValues2: [30],
      progressValues3: [10],
    },
    {
      name: 'Shift 2',
      hours: ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
      progressValues: [50],
      progressValues2: [5],
      progressValues3: [20],
    },
    {
      name: 'Shift 3',
      hours: [
        '22:00',
        '23:00',
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
      ],
      progressValues: [10],
      progressValues2: [15],
      progressValues3: [10],
    },
  ]

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
              <CCardHeader>
                <strong>{shift.name}</strong>
              </CCardHeader>
              <CCardBody>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
                >
                  {shift.hours.map((hour, hourIndex) => (
                    <span key={hourIndex}>{hour}</span>
                  ))}
                </div>
                <CProgressStacked className="progress-stacked-production">
                  {shift.progressValues.map((value, valueIndex) => (
                    <CProgress key={valueIndex} color="success" value={value} />
                  ))}
                  {shift.progressValues2.map((value, valueIndex) => (
                    <CProgress key={`2-${valueIndex}`} color="danger" value={value} />
                  ))}
                  {shift.progressValues3.map((value, valueIndex) => (
                    <CProgress key={`3-${valueIndex}`} color="warning" value={value} />
                  ))}
                </CProgressStacked>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  {Array.from({ length: shift.hours.length }, (_, i) => i * 10).map(
                    (value, valueIndex) => (
                      <span key={valueIndex}>{value}</span>
                    ),
                  )}
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  )
}

export default MachineDetail
