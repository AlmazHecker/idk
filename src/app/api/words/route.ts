import { prisma } from "@shared/lib/prisma-client";
import {
  WordFormData,
  wordFormSchema,
} from "@/src/features/Word/WordForm/model/model";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/auth";
import { Pagination } from "@shared/types/pagination";
import { endOfDay, startOfDay } from "date-fns";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const newWord = (await request.json()) as WordFormData;

  const validation = wordFormSchema.safeParse(newWord);
  if (!validation.success) {
    const { errors } = validation.error;

    return Response.json(
      { message: "Invalid request", errors },
      { status: 400 },
    );
  }

  if (newWord?.subject?.id) {
    const subject = await prisma.subject.findFirst({
      where: { id: +newWord.subject.id },
    });

    if (!subject) {
      return Response.json(
        { message: "Subject with given id not found!" },
        { status: 400 },
      );
    }
  }

  await prisma.word.create({
    data: {
      userId: +session.user.id,
      word: newWord.word,
      translation: newWord.translation,
      subjectId: newWord?.subject?.id || null,
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

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  if (!day) {
    return Response.json(
      { message: "Day parameter is required" },
      { status: 400 },
    );
  }

  const parsedDate = new Date(day);
  const start = startOfDay(parsedDate);
  const end = endOfDay(parsedDate);

  const totalCount = await prisma.word.count({
    where: {
      userId: +session.user?.id,
      createdAt: { gte: start, lte: end },
    },
  });

  const words = await prisma.word.findMany({
    where: {
      userId: +session.user?.id,
      createdAt: { gte: start, lte: end },
    },
    skip: (page - 1) * size,
    take: size,
    include: { subject: true },
    omit: {
      explanation: true,
    },
  });

  const totalPages = Math.ceil(totalCount / size);

  return Response.json({
    content: words,
    pagination: {
      page,
      size,
      totalPages,
      totalCount,
    } satisfies Pagination,
  });
}
