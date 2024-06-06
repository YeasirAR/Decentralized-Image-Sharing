import EditProfile from "@/components/edit-profile/edit-profile";
import EditProfileUser from "@/components/edit-profile-user/edit-profile-user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const EditProfilePage = () =>{
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    let role = null;
    let decodedToken = null;
    if (token) {
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        console.error("Invalid or expired token:", error);
          return redirect('/auth/login');
      }
    }
  
    if (!decodedToken) {
      return redirect('/auth/login');
    }
    role = decodedToken.role;
    return(
        <>
            {role === "org" ? <EditProfile /> : <EditProfileUser />}
        </>
    )
};
export default EditProfilePage;