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
import KanjiForm from "../../KanjiForm/ui/KanjiForm";
import { KanjiFormData } from "../../KanjiForm/model/model";
import { mutateKanji } from "@/src/entities/kanji/mutations";

type Props = DialogProps;

export default function CreateKanjiDialog({ ...props }: Props) {
  const onSubmit = async (
    data: KanjiFormData,
    formApi: UseFormReturn<KanjiFormData>
  ) => {
    try {
      await fetcher("/api/kanji", { method: "POST", body: data });
      await mutate(mutateKanji);
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
        className={"p-0 sm:max-w-[500px] overflow-y-scroll max-h-[90%]"}
      >
        <DialogTitle className="sr-only">New Kanji</DialogTitle>
        <DialogDescription className="sr-only">
          Create new kanji
        </DialogDescription>

        <KanjiForm type="CREATE" onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
