"use client";
import RegisterForm from "@/src/features/Authentication/Register/ui/RegisterForm";
import { RegisterFormData } from "@/src/features/Authentication/Register/model/model";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { isApiError } from "@shared/api/error-handling";
import fetcher from "@shared/api/fetch";

const RegisterPage = () => {
  const router = useRouter();

  const onSubmit = async (
    data: RegisterFormData,
    formApi: UseFormReturn<RegisterFormData>,
  ) => {
    try {
      formApi.clearErrors();
      await fetcher("/api/auth/register", {
        method: "POST",
        body: data,
      });

      return router.push(`/login`);
    } catch (e) {
      formApi.setError("root", {
        message: isApiError(e) ? e?.message : "IDK. Something went wrong.",
      });
    }
  };
  return (
    <div className="container px-6 mx-auto min-h-screen grid place-items-center">
      <RegisterForm onSubmit={onSubmit} />
    </div>
  );
};

export default RegisterPage;
