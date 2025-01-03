import {
  WordFormData,
  wordFormSchema,
} from "@/src/features/Word/WordForm/model/model";
import { prisma } from "@shared/lib/prisma-client";
import { isNotNumberLike } from "@shared/lib/utils";

type URLParams = {
  wordId: string;
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<URLParams> },
) {
  const wordId = (await params).wordId;

  if (isNotNumberLike(wordId)) {
    return Response.json({ message: "WordId shouldn't be null!" });
  }

  const word = (await request.json()) as WordFormData;

  const validation = wordFormSchema.safeParse(word);
  if (!validation.success) {
    const { errors } = validation.error;

    return Response.json(
      { message: "Invalid request", errors },
      { status: 400 },
    );
  }

  await prisma.word.update({
    where: { id: +wordId },
    data: {
      translation: word.translation,
      word: word.word,
      subjectId: word.subject?.id || null,
    },
  });

  return Response.json({ message: "SUCCESS!" });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<URLParams> },
) {
  const wordId = (await params).wordId;

  if (isNotNumberLike(wordId)) {
    return Response.json({ message: "WordId shouldn't be null!" });
  }

  await prisma.word.delete({ where: { id: +wordId } });

  return Response.json({ message: "SUCCESS!" });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<URLParams> },
) {
  const wordId = (await params).wordId;

  if (isNotNumberLike(wordId)) {
    return Response.json({ message: "WordId shouldn't be null!" });
  }

  const word = await prisma.word.findFirst({
    where: { id: +wordId },
    include: { subject: true },
  });

  return Response.json(word);
}
