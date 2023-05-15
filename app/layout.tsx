import BookModal from './components/modals/BookModal'
import Modal from './components/modals/Modal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ToastProvider from './providers/ToastProvider'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={inter.className}
      suppressHydrationWarning={true}>
        <BookModal />
        <RegisterModal />
        <LoginModal />
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
