"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@ui/button";
import { setThemeCookie } from "@app/actions/theme";

type Props = {
  theme?: string;
};
const ThemeSwitch = ({ theme }: Props) => {
  const switchThemes = () => {
    const root = window.document.documentElement;
    const newTheme = root.classList.toggle("dark") ? "dark" : "light";
    return setThemeCookie(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={switchThemes}
    >
      {theme === "dark" ? (
        <MoonIcon className="!size-5" />
      ) : (
        <SunIcon className="!size-5" />
      )}
    </Button>
  );
};

export default ThemeSwitch;
