"use client";
import SubjectList from "@/src/features/Subject/SubjectList/ui/SubjectList";
import { DatePicker } from "@ui/date-picker";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useToggle } from "@shared/hooks/useToggle";

import useSWR from "swr";
import { Subject } from "@prisma/client";
import fetcher from "@shared/api/fetch";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import NDynamic from "next/dynamic";
const CreateSubjectDialog = NDynamic(
  () => import("@/src/features/Subject/CreateSubject/ui/CreateSubjectDialog")
);

export default function Page() {
  const createDialog = useToggle(false);

  const [date, setDate] = useState<Date>();
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounce(search, 300);

  const { data: subjects, isLoading } = useSWR<{ content: Subject[] }>(
    `/api/subjects?day=${date?.toISOString() || ""}&search=${debouncedSearch}`,
    fetcher
  );

  return (
    <div>
      <div className="py-4 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <DatePicker
            value={date}
            onChange={setDate}
            triggerClassName="w-full md:w-[250px]"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
        </div>
        <Button onClick={createDialog.toggle}>Add Subject</Button>
      </div>
      <SubjectList subjects={subjects?.content || []} isLoading={isLoading} />

      <CreateSubjectDialog
        open={createDialog.isOpen}
        onOpenChange={createDialog.toggle}
      />
    </div>
  );
}
