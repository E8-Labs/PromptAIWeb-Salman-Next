import type { Metadata } from 'next'
import {Poppins, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
subsets: ['latin'],})

export const metadata: Metadata = {
  title: 'Prompt Savvy',
  description: 'Created by Salman Majid',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
