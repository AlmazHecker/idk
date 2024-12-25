import { Subject } from "@prisma/client";
import { SubjectFormData } from "@/src/features/Subject/SubjectForm/model/model";

export const mapSubjectApiDataToFormData = (
  subject?: Subject,
): SubjectFormData => {
  if (!subject) return {} as SubjectFormData;

  return { title: subject.title, content: subject.content };
};
