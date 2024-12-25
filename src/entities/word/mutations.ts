import { Arguments } from "swr";

export const mutateWords = (key: Arguments) =>
  (key as string)?.startsWith(`/api/words`);
