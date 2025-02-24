import { FC } from "react";
import {
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@ui/card";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { useCustomForm } from "@shared/hooks/useCustomForm";
import { FieldError, UseFormReturn } from "react-hook-form";
import { Kanji } from "@prisma/client";
import { KanjiFormData, kanjiFormSchema } from "../model/model";
import { mapKanjiApiDataToFormData } from "../transformer/transformer";

type KanjiFormProps = {
  onSubmit: (data: KanjiFormData, form: UseFormReturn<KanjiFormData>) => void;
  value?: Kanji;

  className?: string;
  type?: "CREATE" | "UPDATE";
};

const KanjiForm: FC<KanjiFormProps> = ({ value, onSubmit, type }) => {
  const { form, errors, handleSubmit, isDirty, isValid, isSubmitting } =
    useCustomForm<KanjiFormData>({
      schema: kanjiFormSchema,
      values: mapKanjiApiDataToFormData(value),
    });

  const jlptLevels = ["N5", "N4", "N3", "N2", "N1"];

  return (
    <form className="scroll-auto" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle>
          {type === "CREATE" ? "New Kanji" : "Update Kanji"}
        </CardTitle>
        <CardDescription>Enter the kanji details below</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                {...form.register("kanji")}
                error={errors.kanji || (errors.root as FieldError)}
                label="Kanji Character"
                placeholder="漢"
                className="!text-3xl text-center h-16"
              />
            </div>
            <div>
              <Input
                {...form.register("strokes")}
                error={errors.strokes}
                label="Stroke Count(Optional)"
                type="number"
                min={1}
                placeholder="13"
              />
            </div>
          </div>

          <Input
            {...form.register("meaning")}
            error={errors.meaning}
            label="Meaning"
            placeholder="e.g., Water, Mountain, Person"
          />

          <Input
            {...form.register("onyomi")}
            error={errors.onyomi}
            label="On'yomi Reading"
            placeholder="e.g., スイ, サン, ジン"
          />

          <Input
            {...form.register("kunyomi")}
            error={errors.kunyomi}
            label="Kun'yomi Reading"
            placeholder="e.g., みず, やま, ひと"
          />

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block mb-2">
              JLPT Level
            </label>
            <div className="flex gap-2">
              {jlptLevels.map((level) => (
                <label
                  key={level}
                  className={`flex-1 border rounded-md p-2 text-center cursor-pointer transition-colors ${
                    form.watch("jlptLevel") === level
                      ? "bg-[#f4d03f] dark:bg-yellow-600 border-black dark:border-gray-500"
                      : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    value={level}
                    {...form.register("jlptLevel")}
                  />
                  {level}
                </label>
              ))}
            </div>
            {errors.jlptLevel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.jlptLevel.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          {type === "CREATE" ? "Add Kanji" : "Update Kanji"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default KanjiForm;
