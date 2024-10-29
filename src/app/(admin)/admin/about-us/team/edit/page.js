import React from 'react'
import dynamic from 'next/dynamic'

const TeamEdit = dynamic(() => import("./TeamEdit"), { ssr: false });

const page = () => {
  return (
    <TeamEdit/>
  )
}

export default page