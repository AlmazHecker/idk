import { prisma } from "@shared/lib/prisma-client";

type URLParams = {
  wordId: string;
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<URLParams> },
) {
  const wordId = (await params).wordId;

  if (Number.isNaN(+wordId)) {
    return Response.json({ message: "WordId shouldn't be null!" });
  }

  const word = (await request.json()) as { content: string };

  if (word.content.trim() === "") {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }

  await prisma.word.update({
    where: { id: +wordId },
    data: {
      explanation: word.content,
    },
  });

  return Response.json({ message: "SUCCESS!" });
}
