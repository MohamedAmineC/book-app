import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import SearchBar from './SearchBar'
import UserMenu from './UserMenu'

const Navbar = () => {
  return (
    <header className='w-full fixed bg-white shadow-sm z-10'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex items-center justify-between gap-3 md:gap-0'>
                    <Logo />
                    <SearchBar />
                    <UserMenu />
                </div>
            </Container>
        </div>
    </header>
  )
}

export default Navbar