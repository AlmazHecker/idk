import { hash } from "bcrypt";
import { prisma } from "@shared/lib/prisma-client";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({ data: { email, password: hashedPassword } });
    return Response.json({ message: "SUCCESS!" });
  } catch (e) {
    return Response.json(
      { message: "Something went wrong!", details: e },
      { status: 500 },
    );
  }
}
