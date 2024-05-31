import MyImage from "@/components/my-image/MyImage";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

const MyImagePage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
    
  let decodedToken = null; 
  if (token) {
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    } catch (error) {
      console.error("Invalid or expired token:", error);
    //   return redirect('/auth/login'); 
    }
  }

  if (!decodedToken) {
    // return redirect('/auth/login');
  }

  return (
    <>
      <MyImage user_email={decodedToken?.email || ''} />
    </>
  );
};

export default MyImagePage;
