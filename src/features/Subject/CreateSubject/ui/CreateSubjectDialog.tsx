"use client";
import { UseFormReturn } from "react-hook-form";
import fetcher from "@shared/api/fetch";
import { isApiError } from "@shared/api/error-handling";
import { mutate } from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import SubjectForm from "@/src/features/Subject/SubjectForm/ui/SubjectForm";
import { SubjectFormData } from "@/src/features/Subject/SubjectForm/model/model";
import { mutateSubjects } from "@entities/subject/mutations";

type Props = DialogProps;

export default function CreateSubjectDialog({ ...props }: Props) {
  const onSubmit = async (
    data: SubjectFormData,
    formApi: UseFormReturn<SubjectFormData>,
  ) => {
    try {
      await fetcher("/api/subjects", { method: "POST", body: data });
      await mutate(mutateSubjects);
      props.onOpenChange?.(false);
    } catch (e) {
      formApi.setError("root", {
        message: isApiError(e) ? e?.message : "IDK. Something went wrong.",
      });
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent
        className={
          "p-0 w-11/12 md:max-w-screen-md overflow-y-scroll max-h-[90%]"
        }
      >
        <DialogTitle className="sr-only">New Subject</DialogTitle>
        <DialogDescription className="sr-only">
          Create new subject
        </DialogDescription>

        <SubjectForm type="CREATE" onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
