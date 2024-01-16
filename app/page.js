import Image from 'next/image'
import Login from '../components/auth/login'
import Signup from '../components/auth/signup'
import Sidebar from '@/components/sidebar/sidebar'

export default function Home() {
  var flag = false;
  return (
    <main>
      {flag? <Login /> : <Signup />}
      <Sidebar />
    </main>
  )
}
