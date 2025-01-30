import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Kanagata = () => {
  const purchaseOrders = [
    {
      No: 1,
      NoPR: 'PR001',
      ReqDate: '2023-10-01',
      Item: 'Mesin Pemotong',
      Qty: 2,
      Unit: 'Unit',
      Price: 5000000,
      Total: 10000000,
      Plant: 'Plant A',
      MaterialGroup: 'Mesin',
      PIC: 'John Doe',
      PO: 'PO001',
      PODate: '2023-10-02',
      Descriptions: 'Pembelian mesin pemotong untuk produksi',
      Budget: 12000000,
      NoSPB: 'SPB001',
      NoRingi: 'RNG001',
      NoAsset: 'ASSET001',
      Remark: 'Segera dikirim',
      Status: 'Dalam Proses',
      Supplier: 'PT. Mesin Jaya',
      TotalItem: 2,
      ItemReceived: 2,
      PercentReceived: 100,
      AmountRingi: 10000000,
      AmountPO: 10000000,
      GapRingi: 0,
      ArrivedAmount: 2,
      ToBeDelivery: 0,
      ToBeDeliveryProject: 'Project A',
    },
    {
      No: 2,
      NoPR: 'PR002',
      ReqDate: '2023-10-03',
      Item: 'Bahan Baku',
      Qty: 100,
      Unit: 'Kg',
      Price: 20000,
      Total: 2000000,
      Plant: 'Plant B',
      MaterialGroup: 'Bahan',
      PIC: 'Jane Smith',
      PO: 'PO002',
      PODate: '2023-10-04',
      Descriptions: 'Pembelian bahan baku untuk produksi',
      Budget: 3000000,
      NoSPB: 'SPB002',
      NoRingi: 'RNG002',
      NoAsset: 'ASSET002',
      Remark: 'Dalam pengiriman',
      Status: 'Dikirim',
      Supplier: 'PT. Bahan Baku',
      TotalItem: 100,
      ItemReceived: 80,
      PercentReceived: 80,
      AmountRingi: 1600000,
      AmountPO: 2000000,
      GapRingi: 400000,
      ArrivedAmount: 80,
      ToBeDelivery: 20,
      ToBeDeliveryProject: 'Project B',
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tabel Purchase Order</strong>
          </CCardHeader>
          <CCardBody>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>No PR</th>
                  <th>Req. Date</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Plant</th>
                  <th>Material Group</th>
                  <th>PIC</th>
                  <th>PO</th>
                  <th>PO Date</th>
                  <th>Descriptions</th>
                  <th>Budget</th>
                  <th>No SPB</th>
                  <th>No Ringi</th>
                  <th>No Asset</th>
                  <th>Remark</th>
                  <th>Status</th>
                  <th>Supplier</th>
                  <th>Total Item</th>
                  <th>Item Received</th>
                  <th>% Received</th>
                  <th>Amount Ringi</th>
                  <th>Amount PO</th>
                  <th>Gap Ringi</th>
                  <th>Arrived Amount</th>
                  <th>To Be Delivery</th>
                  <th>To Be Delivery / Project</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((order) => (
                  <tr key={order.No}>
                    <td>{order.No}</td>
                    <td>{order.NoPR}</td>
                    <td>{order.ReqDate}</td>
                    <td>{order.Item}</td>
                    <td>{order.Qty}</td>
                    <td>{order.Unit}</td>
                    <td>{order.Price}</td>
                    <td>{order.Total}</td>
                    <td>{order.Plant}</td>
                    <td>{order.MaterialGroup}</td>
                    <td>{order.PIC}</td>
                    <td>{order.PO}</td>
                    <td>{order.PODate}</td>
                    <td>{order.Descriptions}</td>
                    <td>{order.Budget}</td>
                    <td>{order.NoSPB}</td>
                    <td>{order.NoRingi}</td>
                    <td>{order.NoAsset}</td>
                    <td>{order.Remark}</td>
                    <td>{order.Status}</td>
                    <td>{order.Supplier}</td>
                    <td>{order.TotalItem}</td>
                    <td>{order.ItemReceived}</td>
                    <td>{order.PercentReceived}</td>
                    <td>{order.AmountRingi}</td>
                    <td>{order.AmountPO}</td>
                    <td>{order.GapRingi}</td>
                    <td>{order.ArrivedAmount}</td>
                    <td>{order.ToBeDelivery}</td>
                    <td>{order.ToBeDeliveryProject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Kanagata
