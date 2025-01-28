"use client";
import { FormEvent, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@ui/card";
import { Select } from "@ui/select";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { DIFFICULTIES } from "@/src/features/WordQuiz/model/difficulty";
import DateRangePicker from "@/src/shared/ui/date-range-picker";
import { DateRange } from "react-day-picker";
type QuizSettingsState = {
  difficulty: string;
  dateRange?: DateRange;
};

const Page = () => {
  const router = useRouter();

  const [quizSettings, setQuizSettings] = useState<QuizSettingsState>({
    difficulty: "EASY",
  });

  const onDifficultyChange = (e: string) => {
    setQuizSettings({ ...quizSettings, difficulty: e });
  };

  const onDateChange = (dateRange?: DateRange) => {
    if (dateRange?.from && !dateRange?.to) {
      return setQuizSettings({
        ...quizSettings,
        dateRange: { from: dateRange.from, to: dateRange.from },
      });
    }

    setQuizSettings({ ...quizSettings, dateRange });
  };

  const submitSettings = (e: FormEvent) => {
    e.preventDefault();
    const { dateRange, difficulty } = quizSettings;
    const dateString = `start=${dateRange?.from?.toISOString()}&end=${dateRange?.to?.toISOString()}`;

    const userTZ = `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

    return router.push(
      `/quiz?difficulty=${difficulty}&${dateString}&${userTZ}`
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
          <DateRangePicker
            value={quizSettings.dateRange}
            onChange={onDateChange}
            label="Words from a specific days(optional)"
            min={1}
            max={31}
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
