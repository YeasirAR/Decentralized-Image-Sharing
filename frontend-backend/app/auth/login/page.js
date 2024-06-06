import LoginPage from "@/components/auth/login";
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
      <LoginPage />
    </>
  );
};
export default Login;
