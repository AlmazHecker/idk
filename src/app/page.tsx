import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  return redirect(session ? "/words" : "/login");
};

export default Page;
