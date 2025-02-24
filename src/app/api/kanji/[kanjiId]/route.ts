import {
  KanjiFormData,
  kanjiFormSchema,
} from "@/src/features/Kanji/KanjiForm/model/model";
import { prisma } from "@shared/lib/prisma-client";
import { isNotNumberLike } from "@shared/lib/utils";

type URLParams = { kanjiId: string };

export async function PUT(
  request: Request,
  { params }: { params: Promise<URLParams> }
) {
  const kanjiId = (await params).kanjiId;

  if (isNotNumberLike(kanjiId)) {
    return Response.json({ message: "KanjiId shouldn't be null!" });
  }

  const kanji = (await request.json()) as KanjiFormData;

  const validation = kanjiFormSchema.safeParse(kanji);
  if (!validation.success) {
    const { errors } = validation.error;

    return Response.json(
      { message: "Invalid request", errors },
      { status: 400 }
    );
  }

  await prisma.kanji.update({
    where: { id: +kanjiId },
    data: {
      jlptLevel: kanji.jlptLevel,
      kanji: kanji.kanji,
      kunyomi: kanji.kunyomi,
      onyomi: kanji.onyomi,
      meaning: kanji.meaning,
      strokes: kanji.strokes,
    },
  });

  return Response.json({ message: "SUCCESS!" });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<URLParams> }
) {
  const kanjiId = (await params).kanjiId;

  if (isNotNumberLike(kanjiId)) {
    return Response.json({ message: "KanjiId shouldn't be null!" });
  }

  await prisma.kanji.delete({ where: { id: +kanjiId } });

  return Response.json({ message: "SUCCESS!" });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<URLParams> }
) {
  const kanjiId = (await params).kanjiId;

  if (isNotNumberLike(kanjiId)) {
    return Response.json({ message: "KanjiId shouldn't be null!" });
  }

  const kanji = await prisma.kanji.findFirst({ where: { id: +kanjiId } });

  return Response.json(kanji);
}
