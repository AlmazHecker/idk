"use client";
import { DataTable } from "@ui/data-table";
import { getWordListColumns } from "@/src/features/Word/WordList/lib/getWordListColumns";
import useSWR from "swr";
import fetcher from "@shared/api/fetch";
import { WithRelation } from "@shared/types/prisma";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useColumnVisibility } from "@shared/hooks/useColumnVisibility";

type WordListProps = {
  date: Date;
};

export default function WordList({ date }: WordListProps) {
  const { data: words, isLoading } = useSWR<{
    content: WithRelation<"Word", "subject">[];
  }>(`/api/words?day=${date.toISOString()}`, fetcher);

  const router = useRouter();

  const goToDetails = (word: WithRelation<"Word", "subject">) => {
    router.push(`/words/${word.id}`);
  };

  const { columnVisibility } = useColumnVisibility([
    "createdAt",
    "updatedAt",
    "id",
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <DataTable
      columnVisibility={columnVisibility}
      onRowClick={goToDetails}
      columns={getWordListColumns()}
      data={words?.content || []}
    />
  );
}
