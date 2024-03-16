import {Poppins, Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
subsets: ['latin'],})

export const metadata = {
  title: 'Prompt Savvy',
  description: 'Created by Salman Majid',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
