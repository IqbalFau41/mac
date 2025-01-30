import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilIndustry,
  cilNotes,
  cilChartPie,
  cilStar,
  cilExternalLink,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Factory',
  },
  {
    component: CNavGroup,
    name: 'Cikarang Plant',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Machine Cikarang',
        to: '/cikarang/allcikarang',
      },
      {
        component: CNavItem,
        name: 'ALGT',
        to: '/cikarang/algt',
      },
      {
        component: CNavItem,
        name: 'Balancer',
        to: '/cikarang/balancer',
      },
      {
        component: CNavItem,
        name: 'Cashting',
        to: '/cikarang/cashting',
      },
      {
        component: CNavItem,
        name: 'Finishing',
        to: '/cikarang/finishing',
      },
      {
        component: CNavItem,
        name: 'FAS',
        to: '/cikarang/fas',
      },
      {
        component: CNavItem,
        name: 'Forging',
        to: '/cikarang/forging',
      },
      {
        component: CNavItem,
        name: 'GSS',
        to: '/cikarang/gss',
      },
      {
        component: CNavItem,
        name: 'HT',
        to: '/cikarang/ht',
      },
      {
        component: CNavItem,
        name: 'JSL',
        to: '/cikarang/jsl',
      },
      {
        component: CNavItem,
        name: 'MGS',
        to: '/cikarang/mgs',
      },
      {
        component: CNavItem,
        name: 'PRHC',
        to: '/cikarang/prhc',
      },
      {
        component: CNavItem,
        name: 'Shaft Transmision',
        to: '/cikarang/shafttransmision',
      },
      {
        component: CNavItem,
        name: 'SSM',
        to: '/cikarang/ssm',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Karawang Plant',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Machine Karawang',
        to: '/karawang/allkarawang',
      },
      {
        component: CNavItem,
        name: 'SC Camshaft',
        to: '/karawang/sc_camshaft',
      },
      {
        component: CNavItem,
        name: 'Transmisi-CAM FIN-Assy',
        to: '/karawang/transmisi_cam_fin_assy',
      },
      {
        component: CNavItem,
        name: 'SC Finishing-Assy M-CVT',
        to: '/karawang/sc_finishing_assy_m_cvt',
      },
      {
        component: CNavItem,
        name: 'FC Forging',
        to: '/karawang/sc_forging',
      },
      {
        component: CNavItem,
        name: 'SC Mach M-CVT Edps',
        to: '/karawang/sc_mach_m_cvt_edps',
      },
      {
        component: CNavItem,
        name: 'SC Machining 4R',
        to: '/karawang/sc_machining_4r',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Tool Control',
    to: '/tool_control',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Kanagata',
    to: '/kanagata',
    icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Departemen',
  },
  {
    component: CNavGroup,
    name: 'Manufacturing Eng',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Inventory',
        to: '/manufacturing/inventory',
      },
      {
        component: CNavItem,
        name: 'History Maintenance',
        to: '/maintenance/select',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Timeline Project',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: (
      <React.Fragment>
        {'Flex Signal'}
        <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
      </React.Fragment>
    ),
    href: 'http://06cs016/FS/DataDisplay/SignalMonitor.aspx',
  },
]

export default _nav
