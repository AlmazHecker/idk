import { Arguments } from "swr";

export const mutateSubjects = (key: Arguments) =>
  (key as string)?.startsWith(`/api/subjects`);
