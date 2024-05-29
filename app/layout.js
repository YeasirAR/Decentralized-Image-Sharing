import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar/sidebar';
import Navbar from '@/components/navbar/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Decentralized Image Sharing',
  description: 'A decentralized image sharing app with Blockchain and IPFS',
};

export default function RootLayout({ children }) {
  const showSidebar = true; 

  return (
    <html>
    <body>
      {showSidebar && <Navbar />}
      {showSidebar ? (
        <Sidebar>
          {children}
        </Sidebar>
      ) : (
        children 
      )}
    </body>
    </html>
  );
}
