import { Link } from "@ui/Link";
import SelectDate from "@/src/widgets/Header/ui/SelectDate";
import LogoutButton from "@/src/features/Authentication/Logout/ui/LogoutButton";

const Header = () => {
  return (
    <div className="flex justify-between items-center gap-2 pb-4 h-[52px]">
      <div>
        <Link className="text-md" href="/words" variant="ghost">
          Words
        </Link>
        <Link className="text-md" href="/subjects" variant="ghost">
          Subjects
        </Link>
        <Link className="text-md" href="/calendar" variant="ghost">
          Calendar
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <SelectDate />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
