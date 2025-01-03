import { useEffect, useState } from "react";
import { VisibilityState } from "@tanstack/react-table";

export const useColumnVisibility = (
  colsToHide: string[],
  breakpoint: number = 768,
) => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= breakpoint;

      setColumnVisibility((prev) => {
        const newVisibility = { ...prev };
        colsToHide.forEach((col) => {
          newVisibility[col] = !isMobile;
        });
        return newVisibility;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return { columnVisibility, setColumnVisibility };
};
