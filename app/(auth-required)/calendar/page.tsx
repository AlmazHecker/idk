"use client";

import { useState } from "react";
import { dateFnsLocalizer, SlotInfo } from "react-big-calendar";
import BigCalendar from "@ui/big-calendar/big-calendar";

import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const LandingPage = () => {
  const [date, setDate] = useState(new Date());
  const router = useRouter();

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const onDayClick = (slotInfo: SlotInfo) => {
    return router.push(`/words?date=${slotInfo.start.toLocaleDateString()}`);
  };

  return (
    <main className="container mx-auto my-8">
      <BigCalendar
        defaultView="month"
        localizer={localizer}
        style={{ height: 600, width: "100%" }}
        selectable
        date={date}
        onSelectSlot={onDayClick}
        onNavigate={handleNavigate}
        views={["month"]}
      />
    </main>
  );
};

export default LandingPage;
