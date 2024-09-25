import React from 'react'
import dynamic from 'next/dynamic'
const CategoryEdit = dynamic(()=>import("./CategoryEdit"),{ssr:false})


const page = () => {
  return (
    <>
        <CategoryEdit/>
    </>
  )
}

export default page