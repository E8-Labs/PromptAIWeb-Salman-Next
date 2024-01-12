'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

function page() {
  const searchParams = useSearchParams()
  console.log(searchParams.get('search')) // Logs "search"
  return (
    <div>
        This is terms page
    </div>
  )
}

export default page
