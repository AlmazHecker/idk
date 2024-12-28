"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Input } from "@ui/input";
import { Select } from "@ui/select";
import { DatePicker } from "@ui/date-picker";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
type QuizSettingsState = {
  wordsCount: number;
  difficulty: string;
  date?: Date;
};

const Page = () => {
  const router = useRouter();

  const [quizSettings, setQuizSettings] = useState<QuizSettingsState>({
    wordsCount: 10,
    difficulty: "EASY",
  });

  const onWordCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuizSettings({ ...quizSettings, wordsCount: +e.target.value });
  };

  const onDifficultyChange = (e: string) => {
    setQuizSettings({ ...quizSettings, difficulty: e });
  };

  const onDateChange = (e?: Date) => {
    setQuizSettings({ ...quizSettings, date: e });
  };

  const submitSettings = (e: FormEvent) => {
    e.preventDefault();
    return router.push(
      `/quiz?word-count=${quizSettings.wordsCount}&difficulty=${quizSettings.difficulty}&day=${quizSettings.date?.toISOString() || ""}`,
    );
  };
  return (
    <form
      onSubmit={submitSettings}
      className="max-w-xl mx-auto grid place-items-center h-[calc(100vh-92px-6.5rem)] md:h-[calc(100vh-76px-5rem)]"
    >
      <Card>
        <CardHeader>Quiz Settings</CardHeader>
        <CardContent className="gap-2 flex flex-col">
          <Input
            label="How many words?(10 - by default)"
            placeholder="Max - 30, Min - 5"
            type="number"
            min={5}
            value={quizSettings.wordsCount}
            onChange={onWordCountChange}
          />
          <Select
            value={quizSettings.difficulty}
            onChange={onDifficultyChange}
            label="Select difficulty"
            options={DIFFICULTY_OPTIONS}
          />
          <DatePicker
            value={quizSettings.date}
            onChange={onDateChange}
            label="Words from a specific day(optional)"
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Page;

const DIFFICULTY_OPTIONS = [
  { label: "Hard(20-30 questions)", value: "HARD" },
  { label: "Medium(15-20 questions)", value: "MEDIUM" },
  { label: "Easy(5-10 questions)", value: "EASY" },
];
