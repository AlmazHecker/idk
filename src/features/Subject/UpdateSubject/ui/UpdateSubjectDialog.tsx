import { Subject } from "@prisma/client";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@ui/dialog";
import { UseFormReturn } from "react-hook-form";
import fetcher from "@shared/api/fetch";
import { isApiError } from "@shared/api/error-handling";
import useSWR, { mutate } from "swr";
import SubjectForm from "@/src/features/Subject/SubjectForm/ui/SubjectForm";
import { SubjectFormData } from "@/src/features/Subject/SubjectForm/model/model";
import { mutateSubjects } from "@entities/subject/mutations";

type Props = DialogProps & {
  value: Subject;
};

export default function UpdateSubjectDialog({ value, ...props }: Props) {
  const subject = useSWR<{ content: Subject }>(
    props.open ? `/api/subjects/${value.id}` : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const onSubmit = async (
    data: SubjectFormData,
    formApi: UseFormReturn<SubjectFormData>,
  ) => {
    try {
      await fetcher(`/api/subjects/${value.id}`, { method: "PUT", body: data });
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
        <DialogTitle className="sr-only">Update subject</DialogTitle>
        <DialogDescription className="sr-only">
          Update subject
        </DialogDescription>

        {subject.isLoading ? (
          <div className="p-10">Loading...</div>
        ) : (
          <SubjectForm
            className="md:w-full w-auto border-none"
            onSubmit={onSubmit}
            value={subject?.data?.content}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
