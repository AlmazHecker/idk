"use client";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import {
  LoginFormData,
  loginFormSchema,
} from "@/src/features/Authentication/Login/model/model";
import { FieldError, UseFormReturn } from "react-hook-form";
import { PasswordInput } from "@ui/password-input";
import { useCustomForm } from "@shared/hooks/useCustomForm";
import { signIn } from "next-auth/react";
import { isApiError } from "@shared/api/error-handling";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const { form, errors, handleSubmit } = useCustomForm<LoginFormData>({
    schema: loginFormSchema,
  });

  const onSubmit = async (
    data: LoginFormData,
    formApi: UseFormReturn<LoginFormData>,
  ) => {
    try {
      formApi.clearErrors();
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        callbackUrl: "/words",
        redirect: false,
      });

      if (res?.error) {
        return formApi.setError("root", { message: res.error });
      }
      if (res?.ok) {
        return router.replace("/words");
      }
    } catch (e) {
      formApi.setError("root", {
        message: isApiError(e) ? e?.message : "IDK. Something went wrong.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border py-24 md:px-20 px-8 w-full max-w-[560px] rounded-xl"
    >
      <h2 className="text-center pb-8 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Welcome!
      </h2>
      <Input
        label="Username"
        {...form.register("username")}
        placeholder="Username"
        containerClassName="mb-4"
        error={errors.username}
      />
      <PasswordInput
        label="Password"
        {...form.register("password")}
        containerClassName="mb-4"
        error={errors.password || (errors.root as FieldError)}
      />
      <Button
        disabled={form.formState.isSubmitting}
        className="w-full"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}
