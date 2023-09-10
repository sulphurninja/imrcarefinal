import Base from '@layouts/Baseof'
import Accessories from '@layouts/components/Accessories'
import React from 'react'

export default function AccessoriesPage() {
  return (
    <Base>
      <section>
        <h1 className='p-5 text-md'>🎉 Hot Offers - Customized Mobile Case, Skins & Back Covers  </h1>
        <Accessories />
      </section>
    </Base>
  )
}