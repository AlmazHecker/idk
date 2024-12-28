import { FC } from "react";
import {
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@ui/card";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { useCustomForm } from "@shared/hooks/useCustomForm";
import { Controller, FieldError, UseFormReturn } from "react-hook-form";
import { Subject } from "@prisma/client";
import {
  SubjectFormData,
  subjectFormSchema,
} from "@/src/features/Subject/SubjectForm/model/model";
import { mapSubjectApiDataToFormData } from "@/src/features/Subject/SubjectForm/transformer/transformer";
import { TextEditor } from "@ui/text-editor/text-editor";

type WordFormProps = {
  onSubmit: (
    data: SubjectFormData,
    form: UseFormReturn<SubjectFormData>,
  ) => void;
  value?: Subject;

  className?: string;
  type?: "CREATE" | "UPDATE";
};

const SubjectForm: FC<WordFormProps> = ({ value, onSubmit, type }) => {
  const { form, errors, handleSubmit, isDirty, isValid, isSubmitting } =
    useCustomForm<SubjectFormData>({
      schema: subjectFormSchema,
      values: mapSubjectApiDataToFormData(value),
    });

  return (
    <form className="scroll-auto" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardTitle>
          {type === "CREATE" ? "New Subject" : "Update Subject"}
        </CardTitle>
        <CardDescription>
          NOTE: Duplicate subjects are not allowed!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <Input
            {...form.register("title")}
            error={errors.title || (errors.root as FieldError)}
            label="Title"
            placeholder="Title of the subject"
          />
          <Controller
            control={form.control}
            name="content"
            render={({ field }) => {
              return (
                <div className="border px-2">
                  <TextEditor
                    error={errors.content}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              );
            }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          {type === "CREATE" ? "Add" : "Save"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default SubjectForm;
