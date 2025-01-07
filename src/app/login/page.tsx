import LoginForm from "@/src/features/Authentication/Login/ui/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/words");
  }
  return (
    <div className="container px-6 mx-auto min-h-screen grid place-items-center">
      <LoginForm />
    </div>
  );
};

export default Page;
