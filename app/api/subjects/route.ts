import { prisma } from "@shared/lib/prisma-client";
import {
  SubjectFormData,
  subjectFormSchema,
} from "@/src/features/Subject/SubjectForm/model/model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const newSubject = (await request.json()) as SubjectFormData;

  const validation = subjectFormSchema.safeParse(newSubject);
  if (!validation.success) {
    const { errors } = validation.error;

    return Response.json(
      { message: "Invalid request", errors },
      { status: 400 },
    );
  }

  const isSubjectExist = await prisma.subject.findFirst({
    where: { title: newSubject.title },
  });

  if (isSubjectExist) {
    return Response.json(
      { message: "Subject already exists!" },
      { status: 400 },
    );
  }

  await prisma.subject.create({
    data: {
      userId: +session.user.id,
      title: newSubject.title,
      content: newSubject.content,
    },
  });

  return Response.json({ message: "SUCCESS!" });
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");
  const search = searchParams.get("search");

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  let startOfDay: Date | undefined = undefined;
  let endOfDay: Date | undefined = undefined;

  if (day) {
    startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    endOfDay = new Date(startOfDay);
    endOfDay.setHours(23, 59, 59, 999);
  }

  const subjects = await prisma.subject.findMany({
    where: {
      userId: +session.user.id,
      createdAt: { gte: startOfDay, lte: endOfDay },
      title: { contains: search || "" },
    },
    select: { title: true, createdAt: true, updatedAt: true, id: true },
    skip: (page - 1) * size,
    take: size,
  });

  return Response.json({ content: subjects });
}
