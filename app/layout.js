import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/sidebar/sidebar'
import Navbar from '@/components/navbar/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Decentralized Image Sharing',
  description: 'A decentralized image sharing app with Blockchain and IPFS',
}

export default function RootLayout({ children }) {
  var flag = true;
  return (
    <>
    <html>
      <body>
      {flag?<Navbar /> : <> </>}
      {flag?<Sidebar children={children} /> : <>{children} </>}
      </body>
    </html>

    </>
  )
}
