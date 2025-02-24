import { Kanji } from "@prisma/client";
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
import { KanjiFormData } from "../../KanjiForm/model/model";
import { mutateKanji } from "@/src/entities/kanji/mutations";
import KanjiForm from "../../KanjiForm/ui/KanjiForm";

type Props = DialogProps & { value: Kanji };

export default function UpdateKanjiDialog({ value, ...props }: Props) {
  const kanji = useSWR<Kanji>(
    props.open ? `/api/kanji/${value.id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const onSubmit = async (
    data: KanjiFormData,
    formApi: UseFormReturn<KanjiFormData>
  ) => {
    try {
      await fetcher(`/api/kanji/${value.id}`, { method: "PUT", body: data });
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
        <DialogTitle className="sr-only">Update kanji</DialogTitle>
        <DialogDescription className="sr-only">Update kanji</DialogDescription>

        {kanji.isLoading ? (
          <div className="p-10">Loading...</div>
        ) : (
          <KanjiForm
            className="md:w-full w-auto border-none"
            onSubmit={onSubmit}
            value={kanji?.data}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
