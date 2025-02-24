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
import { Kanji } from "@prisma/client";
import fetcher from "@shared/api/fetch";
import { mutate } from "swr";
import useAction from "@shared/hooks/useAction";
import { mutateKanji } from "@/src/entities/kanji/mutations";

type Props = AlertDialogProps & { value: Kanji };

export default function DeleteKanjiDialog({ value, ...props }: Props) {
  const onSubmit = async () => {
    try {
      await fetcher(`/api/kanji/${value.id}`, { method: "DELETE" });
      await mutate(mutateKanji);
      props.onOpenChange?.(false);
    } catch (e) {
      alert(`SOMETHING WENT WRONG! ${e}`);
    }
  };

  const { isLoading, executeAction } = useAction(onSubmit);

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
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={executeAction}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
