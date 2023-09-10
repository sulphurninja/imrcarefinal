import Base from '@layouts/Baseof'
import AddAccessories from '@layouts/components/AddAccessories'
import AddMobileCovers from '@layouts/components/AddMobileCovers'
import AddServiceDialog from '@layouts/components/AddService'
import OrderTable from '@layouts/components/OrderTable'
import React from 'react'

export default function admin() {
  return (
    <Base>
      <div className='justify-center grid grid-cols-1 md:grid-cols-2 section ml-32'>
        <div>
          <AddServiceDialog />
          <AddAccessories />
          <AddMobileCovers />
        </div>

        <OrderTable />
      </div>
    </Base>
  )
}
