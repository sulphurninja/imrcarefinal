import Base from '@layouts/Baseof'
import React from 'react'
import Order from '@layouts/components/Order'

export default function Repair() {
    return (
        <Base>
            <h1 className='px-6 mt-2'>📱 IMR Care - Repair  & Care</h1>
            <div className='section'>
                <h1 className='p-5'>🛠️ Book a Repair for your precious mobile phones today!</h1>
                <p className='p-5'>At Imr Care, a team of certified professionals would take care of your devices and get them back to you into mint condition. </p>
            </div>
            <Order />
        </Base>
    )
}
