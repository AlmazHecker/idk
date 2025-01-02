"use server";

import { cookies } from "next/headers";

export async function setThemeCookie(theme: string) {
  (await cookies()).set("theme", theme);
}
