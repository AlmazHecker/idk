import WordQuiz from "@/src/features/WordQuiz/ui/WordQuiz";
import React, { FC } from "react";
import { getRandomWords } from "@app/actions/word";
import { DIFFICULTIES } from "@/src/features/WordQuiz/model/difficulty";

type PageProps = {
  searchParams: Promise<{
    "word-count": string;
    difficulty: string;
    day: string;
  }>;
};

const getLimitForDifficulty = (difficulty: string) => {
  const { min, max } = DIFFICULTIES[difficulty] || DIFFICULTIES.EASY;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Page: FC<PageProps> = async ({ searchParams }) => {
  const p = await searchParams;

  const day = p?.day ? new Date(p?.day) : "";
  const difficulty = p?.difficulty;

  const limit = getLimitForDifficulty(difficulty);

  const randomWords = await getRandomWords(day, limit);

  return (
    <div className="max-w-xl mx-auto grid place-items-center h-[calc(100vh-92px-6.5rem)] md:h-[calc(100vh-76px-5rem)]">
      {randomWords?.length ? (
        <WordQuiz words={randomWords || []} />
      ) : (
        <div>No words available for the quiz.</div>
      )}
    </div>
  );
};

export default Page;
