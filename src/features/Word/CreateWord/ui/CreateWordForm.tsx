"use client";
import WordForm from "@/src/features/Word/WordForm/ui/WordForm";
import { UseFormReturn } from "react-hook-form";
import { WordFormData } from "@/src/features/Word/WordForm/model/model";
import fetcher from "@shared/api/fetch";
import { isApiError } from "@shared/api/error-handling";
import { mutate } from "swr";
import { mutateWords } from "@entities/word/mutations";

const CreateWordForm = () => {
  const onSubmit = async (
    data: WordFormData,
    formApi: UseFormReturn<WordFormData>,
  ) => {
    try {
      await fetcher("/api/words", { method: "POST", body: data });
      formApi.reset();
      return mutate(mutateWords);
    } catch (e) {
      formApi.setError("root", {
        message: isApiError(e) ? e?.message : "IDK. Something went wrong.",
      });
    }
  };

  return <WordForm type="CREATE" onSubmit={onSubmit} />;
};

export default CreateWordForm;
