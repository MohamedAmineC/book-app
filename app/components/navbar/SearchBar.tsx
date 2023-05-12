"use client"

import { useRouter } from 'next/navigation'
import React,{useState} from 'react'
import {BiSearch} from "react-icons/bi"

const SearchBar = () => {
    const [searchTerm,setSearchTerm] = useState('')
    const router = useRouter();
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        router.push(`/${searchTerm}`)
    }
  return (
    <div className='w-full sm:block md:w-auto border-[1px] rounded-full py-2 pl-6 pr-2 shadow-sm hover:shadow-md transition cursor-pointer'>
        <div className='flex items-center justify-between md:gap-3 gap-0'>
            <input 
            id='search'
            name='search'
            required
            placeholder='Search for the next book you are looking to borrow'
            className='p-2 outline-none focus:outline-none'
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value)}}
            />
            <button type="button" className='bg-green-800 w-11 h-11 rounded-full flex items-center justify-center'
            onClick={handleSubmit}>
                <BiSearch size={24} className='text-white' />
            </button>
        </div>
    </div>
  )
}

export default SearchBar