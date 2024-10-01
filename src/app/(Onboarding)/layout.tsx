import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Header from '../components/Header'
import Link from 'next/link'
import Image from 'next/image'
// test
const inter = Inter({ subsets: ['latin'] })

/*export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="header">
          <div className="logo">
          <Link className='flex items-center' href="/">

            <Image
              src="/images/Logo.png"
              alt="App Logo"
              width={40}
              height={40}
            />
            <h1 className="app-name">Applicants First</h1>
            </Link>
          </div>
          <div className="top-buttons">
            <Link href="/login">
              <button className="button">Log In</button>
            </Link>
            <Link href="/role-management">
              <button className="button">Join Now</button>
            </Link>
          </div>
        </header>{' '}
        {children}
      </body>
    </html>
  )
}
