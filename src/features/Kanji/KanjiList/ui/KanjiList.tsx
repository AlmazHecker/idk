"use client";
import useSWR from "swr";
import fetcher from "@shared/api/fetch";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pageable from "@ui/pagination";
import { Pagination as PaginationType } from "@shared/types/pagination";
import { KanjiCard } from "@/src/features/Kanji/KanjiList/ui/KanjiCard";
import { Kanji } from "@prisma/client";

type WordListProps = { date: Date };

export default function KanjiList({ date }: WordListProps) {
  const params = useSearchParams();
  const page = Number(params.get("page"));

  const { data: kanji, isLoading } = useSWR<{
    content: Kanji[];
    pagination: PaginationType;
  }>(`/api/kanji?day=${date.toISOString()}&page=${page}`, fetcher);

  const router = useRouter();

  const onPageChange = (page: number) => {
    if (params.get("date")) {
      return router.push(`/kanji?date=${params.get("date")}&page=${page}`, {
        scroll: false,
      });
    }
    router.push(`?page=${page}`, { scroll: false });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="rounded-2xl bg-[#f4d03f] dark:bg-gray-950 p-8 flex flex-wrap gap-8 w-full justify-center">
        {kanji?.content.map((kanji, index) => (
          <KanjiCard key={index} kanji={kanji} />
        ))}
      </div>
      <Pageable
        onChange={onPageChange}
        totalPage={1}
        currentPage={kanji?.pagination?.page}
      />
    </>
  );
}
