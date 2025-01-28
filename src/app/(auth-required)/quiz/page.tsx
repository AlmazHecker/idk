import WordQuiz from "@/src/features/WordQuiz/ui/WordQuiz";
import React, { FC } from "react";
import { getRandomWords } from "@app/actions/word";
import { DIFFICULTIES } from "@/src/features/WordQuiz/model/difficulty";

type PageProps = {
  searchParams: Promise<{
    "word-count": string;
    difficulty: string;
    day: string;
    start?: string;
    end?: string;
    timezone: string;
  }>;
};

const getLimitForDifficulty = (difficulty: string) => {
  const { min, max } = DIFFICULTIES[difficulty] || DIFFICULTIES.EASY;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Page: FC<PageProps> = async ({ searchParams }) => {
  const p = await searchParams;

  const from = p?.start ? new Date(p?.start) : undefined;
  const to = p?.end ? new Date(p?.end) : undefined;
  const difficulty = p?.difficulty;

  const limit = getLimitForDifficulty(difficulty);

  const randomWords = await getRandomWords({ from, to }, limit, p.timezone);

  return (
    <div className="max-w-xl mx-auto grid place-items-center h-[calc(100vh-92px-6.5rem)] md:h-[calc(100vh-92px-5rem)]">
      {randomWords?.length ? (
        <WordQuiz words={randomWords || []} />
      ) : (
        <div>No words available for the quiz.</div>
      )}
    </div>
  );
};

export default Page;
