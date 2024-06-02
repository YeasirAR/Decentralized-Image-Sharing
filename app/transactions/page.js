import AllTransactions from "@/components/all-transactions/all-transactions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const Transactions = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const blockchain_backend = process.env.NEXT_PUBLIC_BLOCKCHAIN_BACKEND;
  const ml_backend = process.env.NEXT_PUBLIC_ML_BACKEND;
  let decodedToken = null;
  if (token) {
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Invalid or expired token:", error);
      return redirect("/auth/login");
    }
  }

  if (!decodedToken) {
    return redirect("/auth/login");
  }
  return (
    <>
      <AllTransactions
        user_email={decodedToken?.email || ""}
        blockchain_backend={blockchain_backend}
        ml_backend={ml_backend}
      />
    </>
  );
};
export default Transactions;
