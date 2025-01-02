"use client";
import { DataTable } from "@ui/data-table";
import { getWordListColumns } from "@/src/features/Word/WordList/lib/getWordListColumns";
import useSWR from "swr";
import fetcher from "@shared/api/fetch";
import { WithRelation } from "@shared/types/prisma";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useColumnVisibility } from "@shared/hooks/useColumnVisibility";
import Pageable from "@ui/pagination";
import { Pagination as PaginationType } from "@shared/types/pagination";
import { useState } from "react";
type WordListProps = {
  date: Date;
};

export default function WordList({ date }: WordListProps) {
  const [page, setPage] = useState<number>(0);

  const { data: words, isLoading } = useSWR<{
    content: WithRelation<"Word", "subject">[];
    pagination: PaginationType;
  }>(`/api/words?day=${date.toISOString()}&page=${page}`, fetcher);

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
    <>
      <DataTable
        columnVisibility={columnVisibility}
        onRowClick={goToDetails}
        columns={getWordListColumns()}
        data={words?.content || []}
      />
      <Pageable
        onChange={setPage}
        totalPage={words?.pagination?.totalPages}
        currentPage={words?.pagination?.page}
      />
    </>
  );
}
