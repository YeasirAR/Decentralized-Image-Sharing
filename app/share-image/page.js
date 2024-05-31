import ShareImage from "@/components/share-image/share-image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const ShareImagePage = () => {
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
      <ShareImage user_email={decodedToken?.email || ""} />
    </>
  );
};
export default ShareImagePage;
