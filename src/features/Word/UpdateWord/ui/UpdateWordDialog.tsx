import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@ui/dialog";
import WordForm from "@/src/features/Word/WordForm/ui/WordForm";
import { UseFormReturn } from "react-hook-form";
import { WordFormData } from "@/src/features/Word/WordForm/model/model";
import fetcher from "@shared/api/fetch";
import { isApiError } from "@shared/api/error-handling";
import { mutate } from "swr";
import { mutateWords } from "@entities/word/mutations";
import { WithRelation } from "@shared/types/prisma";

type UpdateWordDialogProps = DialogProps & {
  value: WithRelation<"Word", "subject">;
};

const UpdateWordDialog = ({ value, ...props }: UpdateWordDialogProps) => {
  const onSubmit = async (
    data: WordFormData,
    formApi: UseFormReturn<WordFormData>,
  ) => {
    try {
      await fetcher(`/api/words/${value.id}`, { method: "PUT", body: data });
      await mutate(mutateWords);
      props.onOpenChange?.(false);
    } catch (e) {
      formApi.setError("root", {
        message: isApiError(e) ? e?.message : "IDK. Something went wrong.",
      });
    }
  };

  return (
    <Dialog {...props}>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Update Word</DialogTitle>
        <DialogDescription className="sr-only">Update Word</DialogDescription>

        <WordForm
          className="md:w-full w-auto border-none"
          onSubmit={onSubmit}
          value={value}
          type="UPDATE"
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateWordDialog;
