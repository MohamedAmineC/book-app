"use client"
import Image from 'next/image'
import React from 'react'
import {useRouter} from "next/navigation"

const Logo = () => {
    const router = useRouter()
  return (
    <Image 
    src="/images/logo.webp"
    alt='Logo'
    width={100}
    height={100}
    className='hidden md:block cursor-pointer mix-blend-multiply'
    onClick={() => router.push('/')}
    />
  )
}

export default Logo