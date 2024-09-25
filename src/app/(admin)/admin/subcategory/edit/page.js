import React from 'react'
import dynamic from 'next/dynamic'

const SubCategoryEdit = dynamic(()=>import("./SubcategoryEdit"),{ssr:false})

const page = () => {
  return (
    <SubCategoryEdit/>
  )
}

export default page