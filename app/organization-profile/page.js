import OrgProfile from "@/components/org-profile/org-profile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
const OrganizationProfile = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

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
  return (
    <>
        <OrgProfile />
    </>
  );
}
export default OrganizationProfile;