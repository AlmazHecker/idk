"use client";
import LoginForm from "@/src/features/Authentication/Login/ui/LoginForm";
import { LoginFormData } from "@/src/features/Authentication/Login/model/model";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { isApiError } from "@shared/api/error-handling";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const onSubmit = async (
    data: LoginFormData,
    formApi: UseFormReturn<LoginFormData>,
  ) => {
    try {
      formApi.clearErrors();
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        callbackUrl: "/",
        redirect: false,
      });

      if (res?.error) {
        return formApi.setError("root", { message: res.error });
      }
    } catch (e) {
      formApi.setError("root", {
        message: isApiError(e) ? e?.message : "IDK. Something went wrong.",
      });
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/words");
    }
  }, [status, session]);

  return (
    <div className="container px-6 mx-auto min-h-screen grid place-items-center">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
};

export default Page;
