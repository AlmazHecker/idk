"use client";
import { useSearchParams } from "next/navigation";
import KanjiList from "@/src/features/Kanji/KanjiList/ui/KanjiList";
import { Button } from "@/src/shared/ui/button";
import { useToggle } from "@/src/shared/hooks/useToggle";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const CreateKanjiDialog = dynamic(
  () => import("@/src/features/Kanji/CreateKanji/ui/CreateKanjiDialog")
);

export default function Page() {
  const params = useSearchParams();
  const dateParam = params.get("date");

  const date = useMemo(() => {
    return dateParam !== null ? new Date(dateParam) : new Date();
  }, [dateParam]);

  const createDialog = useToggle(false);

  return (
    <div className="grid items-center justify-items-center pb-20 gap-4">
      <h2 className="text-center text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Kanji for today ({date.toDateString()})!
      </h2>
      <Button onClick={createDialog.toggle} className="ml-auto">
        Add new Kanji
      </Button>
      <KanjiList date={date} />

      <CreateKanjiDialog
        open={createDialog.isOpen}
        onOpenChange={createDialog.toggle}
      />
    </div>
  );
}
