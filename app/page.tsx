import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();

  if (Boolean(session)) {
    redirect("/words");
  } else {
    redirect("/login");
  }
};

export default Page;
