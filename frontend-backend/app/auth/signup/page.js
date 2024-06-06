
import SignPage from '@/components/auth/signup'
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
const Login = () => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      const decodedToken = jwt.decode(token);
      console.log(decodedToken.email);
      return redirect('/dashboard'); 
    }
    return (
        <>
            <SignPage />
        </>
    )
}
export default Login
