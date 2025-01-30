import React from 'react'
import { CCardText , CCard, CCardBody, CCardHeader, CCol, CCardTitle , CRow } from '@coreui/react'


const Forging = () => {
  const colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'dark', textColor: 'dark' },
  ]

  return (
    <CRow>
    {colors.map((item, index) => (
      <CCol sm={6} key={index}>
        <CCard textColor={item.textColor} className={`mb-3 border-${item.color}`}>
          <CCardHeader>Header</CCardHeader>
          <CCardBody>
            <CCardTitle>{item.color} card title</CCardTitle>
            <CCardText>
              Some quick example text to build on the card title and make up the bulk of the
              card's content.
            </CCardText>
          </CCardBody>
        </CCard>
      </CCol>
    ))}
  </CRow>
  )
}

export default Forging

