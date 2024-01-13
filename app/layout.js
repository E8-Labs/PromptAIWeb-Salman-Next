import { poppins, inter } from '../ui/fonts'
import './globals.css'

export const metadata = {
  title: 'PromptAI',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
