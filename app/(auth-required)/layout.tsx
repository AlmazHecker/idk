import { FC, ReactNode } from "react";
import Header from "@/src/widgets/Header/ui/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};
const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <div className="pt-6 px-8 pb-20 md:gap-16 gap-4 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
