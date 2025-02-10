import { Link } from "@ui/Link";
import SelectDate from "@/src/widgets/Header/ui/SelectDate";
import LogoutButton from "@/src/features/Authentication/Logout/ui/LogoutButton";
import ThemeSwitch from "@/src/widgets/ThemeSwitch/ThemeSwitch";

const Header = async () => {

  return (
    <div className="flex flex-col md:flex-row h-auto text-center justify-between items-center gap-2 pb-4 md:h-[52px]">
      <div>
        <Link className="text-md" href="/words" variant="ghost">
          Words
        </Link>
        <Link className="text-md" href="/subjects" variant="ghost">
          Subjects
        </Link>
        <Link className="text-md" href="/quiz-settings" variant="ghost">
          Quiz
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        <SelectDate />
        <ThemeSwitch  />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
