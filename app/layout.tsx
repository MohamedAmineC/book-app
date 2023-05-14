import BookModal from './components/modals/BookModal'
import Modal from './components/modals/Modal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ToastProvider from './providers/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}
      suppressHydrationWarning={true}>
        <BookModal />
        <ToastProvider />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
