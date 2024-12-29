"use client";

import { FC } from "react";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@ui/card";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { useCustomForm } from "@shared/hooks/useCustomForm";
import {
  WordFormData,
  wordFormSchema,
} from "@/src/features/Word/WordForm/model/model";
import { Controller, UseFormReturn } from "react-hook-form";
import { Subject } from "@prisma/client";
import { mapWordApiDataToFormData } from "@/src/features/Word/WordForm/transformer/transformer";
import { capitalize, cn } from "@shared/lib/utils";
import { SelectSubject } from "@/src/features/Word/WordForm/ui/SelectSubject";
import { WithRelation } from "@shared/types/prisma";

type WordFormProps = {
  onSubmit: (data: WordFormData, form: UseFormReturn<WordFormData>) => void;
  value?: WithRelation<"Word", "subject">;

  className?: string;
  type: "CREATE" | "UPDATE";
};

const WordForm: FC<WordFormProps> = ({ value, onSubmit, className, type }) => {
  const { form, errors, handleSubmit, isDirty, isValid, isSubmitting } =
    useCustomForm<WordFormData>({
      schema: wordFormSchema,
      values: mapWordApiDataToFormData(value),
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={cn("md:w-[500px] w-full my-4", className)}>
        <CardHeader>
          <CardTitle>
            {type === "CREATE" ? "Add new word" : "Update word"}
          </CardTitle>
          <CardDescription>
            NOTE: Duplicate words are not allowed!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Controller
              name="subject"
              control={form.control}
              render={({ field }) => {
                return (
                  <SelectSubject
                    value={field.value as Subject}
                    onChange={field.onChange}
                  />
                );
              }}
            />

            <Controller
              control={form.control}
              name="word"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(capitalize(e.target.value))}
                    error={errors.word}
                    label="Word"
                    placeholder="New word"
                  />
                );
              }}
            />

            <Controller
              control={form.control}
              name="translation"
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(capitalize(e.target.value))}
                    error={errors.translation}
                    label="Translation"
                    placeholder="Translation of the word"
                  />
                );
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
            {type === "CREATE" ? "Add" : "Save"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default WordForm;
