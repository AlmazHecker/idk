import { FC } from "react";
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
import { Word } from "@prisma/client";
import fetcher from "@shared/api/fetch";
import { mutate } from "swr";
import { mutateWords } from "@entities/word/mutations";

type DeleteWordDialogProps = AlertDialogProps & {
  value: Word;
};

const DeleteWordDialog: FC<DeleteWordDialogProps> = ({ value, ...props }) => {
  const onSubmit = async () => {
    try {
      await fetcher(`/api/words/${value.id}`, { method: "DELETE" });
      await mutate(mutateWords);
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
};

export default DeleteWordDialog;
