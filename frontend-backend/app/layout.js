import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/sidebar/sidebar';
import Navbar from '@/components/navbar/navbar';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DMIS - Decentralized Medical Image Sharing',
  description: 'A decentralized image sharing app with Blockchain and IPFS',
};

export default function RootLayout({ children }) {
  let showSidebar = true; 
  let showNavbar = true;
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Invalid or expired token:", error);
      showNavbar = false;
      showSidebar = false;
    }
  }

  if (!decodedToken) {
    showNavbar = false;
    showSidebar = false;
    // return redirect('/auth/login');
  }
  // console.log('decodedToken', decodedToken);
  return (
    <html>
      <body>
        {showNavbar && (
          <Navbar
            name={decodedToken?.name || ''}
            email={decodedToken?.email || ''}
            profile_image={decodedToken?.profile_image || ''}
            role={decodedToken?.role || ''}
          />
        )}
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
