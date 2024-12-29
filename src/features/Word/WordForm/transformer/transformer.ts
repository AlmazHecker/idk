import { WordFormData } from "@/src/features/Word/WordForm/model/model";
import { WithRelation } from "@shared/types/prisma";

export const mapWordApiDataToFormData = (
  word?: WithRelation<"Word", "subject">,
): WordFormData => {
  return {
    word: word?.word || "",
    translation: word?.translation || "",
    subject: word?.subject,
  };
};
