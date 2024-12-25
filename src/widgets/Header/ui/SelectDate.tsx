"use client";
import { DatePicker } from "@ui/date-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SelectDate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const date = params.get("date");
  const value = date ? new Date(date) : undefined;

  const onChange = (date?: Date) => {
    if (!date) return;
    router.push(`?date=${date.toLocaleDateString()}`);
  };

  if (pathname !== "/words") return;
  return <DatePicker value={value} className="w-[200px]" onChange={onChange} />;
};

export default SelectDate;
