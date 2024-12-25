import { FC } from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { UseFormReturn } from "react-hook-form";
import {
  RegisterFormData,
  registerFormSchema,
} from "@/src/features/Authentication/Register/model/model";
import { PasswordInput } from "@ui/password-input";
import { useCustomForm } from "@shared/hooks/useCustomForm";

type RegisterFormProps = {
  onSubmit: (
    data: RegisterFormData,
    formApi: UseFormReturn<RegisterFormData>,
  ) => void;
};

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const { form, errors, handleSubmit } = useCustomForm<RegisterFormData>({
    schema: registerFormSchema,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border py-24 md:px-20 px-8 w-full max-w-[560px] rounded-xl"
    >
      <h2 className="text-center pb-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Welcome!
      </h2>

      <Input
        label="Email"
        {...form.register("email")}
        placeholder="idk@gmail.com"
        containerClassName="mb-3"
        error={errors.email}
      />
      <PasswordInput
        label="Password"
        {...form.register("password")}
        containerClassName="mb-3"
        error={errors.password}
      />
      <PasswordInput
        label="Repeat password"
        {...form.register("confirmPassword")}
        containerClassName="mb-3"
        error={errors.confirmPassword}
      />
      <Button className="w-full" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
