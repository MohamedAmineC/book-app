"use client"

import {AiOutlineMenu} from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useEffect, useRef, useState } from "react"
import MenuItem from "./MenuItem"
import useBookModal from "@/app/hooks/useBookModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"
import {signOut} from "next-auth/react"

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu:React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const [isOpen,setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const bookModal = useBookModal()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
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
            onClick={currentUser ? bookModal.onOpen : loginModal.onOpen}>
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
                    {currentUser ? 
                    <>
                        <MenuItem label="Profile" onClick={() => {}} />
                        <MenuItem label="Logout" onClick={() => signOut()} />
                    </> : 
                    <>
                        <MenuItem label="Register" onClick={registerModal.onOpen} />
                        <MenuItem label="Login" onClick={loginModal.onOpen} />
                    </>}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu