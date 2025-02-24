import { z } from "zod";

export const kanjiFormSchema = z.object({
  kanji: z.string().min(1, "Kanji character is required"),
  kunyomi: z.string().min(1, "Kun'yomi reading is required"),
  onyomi: z.string().min(1, "On'yomi reading is required"),
  meaning: z.string().min(1, "Meaning is required"),
  jlptLevel: z.string().min(1, "JLPT level is required"),
  strokes: z.coerce.number().min(1, "Stroke count must be at least 1"),
});

export type KanjiFormData = z.infer<typeof kanjiFormSchema>;
