import React from 'react'
import dynamic from 'next/dynamic'

const BlogEdit = dynamic(() => import("./BlogEdit"), { ssr: false });

const page = () => {
    return (
        <BlogEdit />
    )
}

export default page