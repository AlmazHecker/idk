import { Kanji } from "@prisma/client";
import { KanjiFormData } from "../model/model";

export const mapKanjiApiDataToFormData = (kanji?: Kanji): KanjiFormData => {
  if (!kanji) return {} as KanjiFormData;

  return kanji;
};
