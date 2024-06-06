import LoginPage from "@/components/auth/login";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    const decodedToken = jwt.decode(token);
    console.log(decodedToken.email);
    redirect('/dashboard'); 
  }
  else{
    redirect('/auth/login');
  }
  return (
    <main>
    </main>
  )
}

