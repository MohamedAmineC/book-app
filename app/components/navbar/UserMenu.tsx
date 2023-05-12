"use client"

import {AiOutlineMenu} from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useEffect, useRef, useState } from "react"
import MenuItem from "./MenuItem"

const UserMenu = () => {
    const [isOpen,setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    },[])
    const handleClickOutside = useCallback((e:MouseEvent) => {
        if(menuRef.current && !menuRef.current.contains(e.target as Node)){
            setIsOpen(false)
        }
    },[])
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[handleClickOutside])
  return (
    <div className='relative'>
        <div className='flex items-center gap-3'>
            <div className='border-[1px] text-sm font-semibold hidden md:block px-4 py-2 rounded-full cursor-pointer shadow-sm hover:shadow-md hover:bg-neutral-100 transition'
            onClick={() => {}}>
                Add a book to your library
            </div>
            <div className="flex items-center gap-3 p-4 md:py-1 md:px-2 rounded-full shadow-sm border-[1px] border-neutral-200 transition hover:shadow-md cursor-pointer"
            onClick={toggleOpen}>
                <AiOutlineMenu />
                <div className="hidden md:block">
                    <Avatar src={null} />
                </div>
            </div>
        </div>
        {isOpen && (
            <div ref={menuRef} className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm">
                <div className="flex flex-col cursor-pointer">
                    <MenuItem label="Register" onClick={() => {}} />
                    <MenuItem label="Login" onClick={() => {}} />
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu