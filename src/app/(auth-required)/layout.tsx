import { FC, ReactNode } from "react";
import Header from "@/src/widgets/Header/ui/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@app/api/auth/[...nextauth]/auth";

type LayoutProps = {
  children: ReactNode;
};
const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="pt-6 px-6 pb-20 md:gap-16 gap-4 sm:px-20">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
