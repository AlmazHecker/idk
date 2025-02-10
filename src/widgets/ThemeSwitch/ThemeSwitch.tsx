import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@ui/button";

const ThemeSwitch = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      id='theme-btn'
    >
        <MoonIcon id="moon-svg" className="!size-5" />
        <SunIcon id="sun-svg" className="!size-5" />
    </Button>
  );
};

export default ThemeSwitch;
