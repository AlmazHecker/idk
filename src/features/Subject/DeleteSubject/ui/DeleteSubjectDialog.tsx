import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ui/alert-dialog";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { Subject } from "@prisma/client";
import fetcher from "@shared/api/fetch";
import { mutate } from "swr";
import { mutateSubjects } from "@entities/subject/mutations";

type Props = AlertDialogProps & {
  value: Subject;
};

export default function DeleteSubjectDialog({ value, ...props }: Props) {
  const onSubmit = async () => {
    try {
      await fetcher(`/api/subjects/${value.id}`, { method: "DELETE" });
      await mutate(mutateSubjects);
      props.onOpenChange?.(false);
    } catch (e) {
      alert(`SOMETHING WENT WRONG! ${e}`);
    }
  };

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
