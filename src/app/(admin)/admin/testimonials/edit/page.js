import React from 'react'
import dynamic from 'next/dynamic'

const TestimonialsEdit = dynamic(()=>import("./TestimonialsEdit"),{ssr:false})

const page = () => {
  return (
    <>
      <TestimonialsEdit/>
    </>
  )
}

export default page