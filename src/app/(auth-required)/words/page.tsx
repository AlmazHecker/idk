"use client";
import WordList from "@/src/features/Word/WordList/ui/WordList";
import CreateWordForm from "@/src/features/Word/CreateWord/ui/CreateWordForm";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const dateParam = params.get("date");

  const date = dateParam !== null ? new Date(dateParam) : new Date();

  return (
    <div className="grid items-center justify-items-center pb-20 gap-4">
      <h2 className="text-center text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Words for today ({date.toDateString()})!
      </h2>

      <CreateWordForm />

      <WordList date={date} />
    </div>
  );
}
