import MyImage from "@/components/my-image/MyImage";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';

const MyImagePage = () =>{
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    var decodedToken;
    if (token) {
        var decodedToken = jwt.decode(token);
      console.log(decodedToken.email);
    //   return redirect('/dashboard'); 
    }
    return(
        <>
            <MyImage owner_org= {decodedToken.email} />
        </>
    )
};
export default MyImagePage;