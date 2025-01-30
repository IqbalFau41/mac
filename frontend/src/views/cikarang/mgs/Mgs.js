import React from 'react'
import { CCard, CCardBody, CCardHeader, CCardText, CCardTitle, CCol, CRow } from '@coreui/react'

export const Mgs = () => {
  const colors = [
    { color: 'primary' },
    { color: 'secondary' },
    { color: 'success' },
    { color: 'danger' },
    { color: 'warning' },
    { color: 'info' },
    { color: 'light' },
    { color: 'dark' },
  ]

  const headers = [
    '11003 MANUAL LATHE OKUMA',
    'EBW - DRILL CARRIER 23015-23017-23018',
    'MACH LINE-1 CASE M38 12257 - 12263',
    'MACH LINE-2 CASE M38 12257 - 12263',
    'MACH LINE-3 CASE M38 12257 - 12263',
    'LATHE LINE-03 GEAR SUN 12252',
    'ASSY GEAR COMP PLANETARY 62030',
    'ASSY END COMP TIE ROD 91043-91044',
  ]

  const titles = [
    'Running',
    'Stop',
    'Warning',
    'Little Stop',
    'Line Stop',
    'Power Off',
    'Standby',
    'Maintenance',
  ]

  const cardDetails = [
    {
      duration: '15 menit 30 detik',
      planning: 120,
      actual: 30,
      cycleTime: 60,
      performance: '25%',
    },
    {
      duration: '10 menit 0 detik',
      planning: 100,
      actual: 20,
      cycleTime: 50,
      performance: '20%',
    },
    {
      duration: '5 menit 15 detik',
      planning: 80,
      actual: 15,
      cycleTime: 40,
      performance: '18%',
    },
    {
      duration: '12 menit 45 detik',
      planning: 110,
      actual: 25,
      cycleTime: 55,
      performance: '22%',
    },
    {
      duration: '8 menit 30 detik',
      planning: 90,
      actual: 10,
      cycleTime: 45,
      performance: '11%',
    },
    {
      duration: '20 menit 0 detik',
      planning: 130,
      actual: 35,
      cycleTime: 70,
      performance: '27%',
    },
    {
      duration: '20 menit 0 detik',
      planning: 130,
      actual: 35,
      cycleTime: 70,
      performance: '27%',
    },
    {
      duration: '20 menit 0 detik',
      planning: 130,
      actual: 35,
      cycleTime: 70,
      performance: '27%',
    },
  ]

  return (
    <CRow>
      {colors.map((item, index) => (
        <CCol sm={2} key={index}>
          <CCard textBgColor={item.color} className="mb-3">
            <CCardHeader>{headers[index]}</CCardHeader> {/* Updated header */}
            <CCardBody>
              <CCardTitle>{titles[index]}</CCardTitle> {/* Updated title */}
              <CCardText>
                Durasi: {cardDetails[index]?.duration}
                <br />
                Planning: {cardDetails[index]?.planning}
                <br />
                Actual: {cardDetails[index]?.actual}
                <br />
                Cycle Time: {cardDetails[index]?.cycleTime}
                <br />
                Performance: {cardDetails[index]?.performance}
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  )
}

export default Mgs
