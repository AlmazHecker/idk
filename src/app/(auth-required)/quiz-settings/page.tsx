"use client";
import { FormEvent, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Select } from "@ui/select";
import { DatePicker } from "@ui/date-picker";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { DIFFICULTIES } from "@/src/features/WordQuiz/model/difficulty";
type QuizSettingsState = {
  difficulty: string;
  date?: Date;
};

const Page = () => {
  const router = useRouter();

  const [quizSettings, setQuizSettings] = useState<QuizSettingsState>({
    difficulty: "EASY",
  });

  const onDifficultyChange = (e: string) => {
    setQuizSettings({ ...quizSettings, difficulty: e });
  };

  const onDateChange = (e?: Date) => {
    setQuizSettings({ ...quizSettings, date: e });
  };

  const submitSettings = (e: FormEvent) => {
    e.preventDefault();
    return router.push(
      `/quiz?difficulty=${quizSettings.difficulty}&day=${quizSettings.date?.toISOString() || ""}`,
    );
  };

  return (
    <form
      onSubmit={submitSettings}
      className="max-w-xl mx-auto grid place-items-center h-[calc(100vh-92px-6.5rem)] md:h-[calc(100vh-92px-5rem)]"
    >
      <Card>
        <CardHeader>Quiz Settings</CardHeader>
        <CardContent className="gap-2 flex flex-col">
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
  {
    label: `Hard(${DIFFICULTIES.HARD.min}-${DIFFICULTIES.HARD.max} questions)`,
    value: "HARD",
  },
  {
    label: `Medium(${DIFFICULTIES.MEDIUM.min}-${DIFFICULTIES.MEDIUM.max} questions)`,
    value: "MEDIUM",
  },
  {
    label: `Easy(${DIFFICULTIES.EASY.min}-${DIFFICULTIES.EASY.max} questions)`,
    value: "EASY",
  },
];
