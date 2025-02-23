"use client";
import useSWR from "swr";
import fetcher from "@shared/api/fetch";
import { WithRelation } from "@shared/types/prisma";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pageable from "@ui/pagination";
import { Pagination as PaginationType } from "@shared/types/pagination";
import { KanjiCard } from "@/src/features/Kanji/KanjiList/ui/KanjiCard";

type WordListProps = {
  date: Date;
};

const kanjiData = [
  {
    kanji: "愛",
    kunyomi: "あい.する",
    onyomi: "アイ",
    meaning: "love, affection",
    jlptLevel: "N4",
    strokes: 13,
    animationUrl:
      "https://nihongoichiban.com/wp-content/uploads/2011/03/5927.gif", // This would be your actual GIF URL
  },
  {
    kanji: "学",
    kunyomi: "まな.ぶ",
    onyomi: "ガク",
    meaning: "study, learning",
    jlptLevel: "N5",
    strokes: 8,
    animationUrl: "/api/placeholder/320/240",
  },
  {
    kanji: "心",
    kunyomi: "こころ",
    onyomi: "シン",
    meaning: "heart, mind, spirit",
    jlptLevel: "N4",
    strokes: 4,
    animationUrl: "/api/placeholder/320/240",
  },
  {
    kanji: "空",
    kunyomi: "そら",
    onyomi: "クウ",
    meaning: "sky, empty",
    jlptLevel: "N5",
    strokes: 8,
    animationUrl: "/api/placeholder/320/240",
  },
];

export default function KanjiList({ date }: WordListProps) {
  const params = useSearchParams();
  const page = Number(params.get("page"));

  const { data: words, isLoading } = useSWR<{
    content: WithRelation<"Word", "subject">[];
    pagination: PaginationType;
  }>(`/api/words?day=${date.toISOString()}&page=${page}`, fetcher);

  const router = useRouter();

  const onPageChange = (page: number) => {
    if (params.get("date")) {
      return router.push(`/words?date=${params.get("date")}&page=${page}`, {
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
        {kanjiData.map((kanji, index) => (
          <KanjiCard key={index} {...kanji} />
        ))}
      </div>
      <Pageable
        onChange={onPageChange}
        totalPage={1}
        currentPage={words?.pagination?.page}
      />
    </>
  );
}
