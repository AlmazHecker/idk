import { prisma } from "@shared/lib/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/auth";
import { Pagination } from "@shared/types/pagination";
import { endOfDay, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import {
  KanjiFormData,
  kanjiFormSchema,
} from "@/src/features/Kanji/KanjiForm/model/model";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const newKanji = (await request.json()) as KanjiFormData;

  const validation = kanjiFormSchema.safeParse(newKanji);
  if (!validation.success) {
    const { errors } = validation.error;

    return Response.json(
      { message: "Invalid request", errors },
      { status: 400 }
    );
  }

  await prisma.kanji.create({
    data: {
      userId: +session.user.id,

      jlptLevel: newKanji.jlptLevel,
      kanji: newKanji.kanji,
      kunyomi: newKanji.kunyomi,
      onyomi: newKanji.onyomi,
      meaning: newKanji.meaning,
      strokes: newKanji.strokes,
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
  const timezone = searchParams.get("timezone") || "UTC";

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  if (!day) {
    return Response.json(
      { message: "Day parameter is required" },
      { status: 400 }
    );
  }

  const parsedDate = toZonedTime(day, timezone);

  const start = fromZonedTime(startOfDay(parsedDate), timezone);
  const end = fromZonedTime(endOfDay(parsedDate), timezone);

  const [totalCount, kanji] = await Promise.all([
    prisma.kanji.count({
      where: { userId: +session.user?.id, createdAt: { gte: start, lte: end } },
    }),
    prisma.kanji.findMany({
      where: { userId: +session.user?.id, createdAt: { gte: start, lte: end } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * size,
      take: size,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / size);

  return Response.json({
    content: kanji,
    pagination: { page, size, totalPages, totalCount } satisfies Pagination,
  });
}
