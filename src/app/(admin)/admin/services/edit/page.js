import React from 'react'
import dynamic from 'next/dynamic'

const ServiceEdit = dynamic(() => import("./ServicesEdit"), { ssr: false });
const page = () => {
    return (
        <ServiceEdit/>
    )
}

export default page