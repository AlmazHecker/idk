import { Arguments } from "swr";

export const mutateKanji = (key: Arguments) =>
  (key as string)?.startsWith(`/api/kanji`);
