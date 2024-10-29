import React from 'react'
import dynamic from 'next/dynamic'

const BannerEdit = dynamic(() => import("./BannerEdit"), { ssr: false });

const page = () => {
    return (
        <BannerEdit/>
    )
}

export default page