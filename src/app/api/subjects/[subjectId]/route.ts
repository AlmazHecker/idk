import { prisma } from "@shared/lib/prisma-client";
import {
  SubjectFormData,
  subjectFormSchema,
} from "@/src/features/Subject/SubjectForm/model/model";
import { isNotNumberLike } from "@shared/lib/utils";

type URLParams = {
  subjectId: string;
};

export async function PUT(
  request: Request,
  { params }: { params: Promise<URLParams> },
) {
  const subjectId = (await params).subjectId;

  if (isNotNumberLike(subjectId)) {
    return Response.json({ message: "subjectId shouldn't be null!" });
  }

  const subject = (await request.json()) as SubjectFormData;

  const validation = subjectFormSchema.safeParse(subject);
  if (!validation.success) {
    const { errors } = validation.error;

    return Response.json(
      { message: "Invalid request", errors },
      { status: 400 },
    );
  }

  await prisma.subject.update({
    where: { id: +subjectId },
    data: { title: subject.title, content: subject.content },
  });

  return Response.json({ message: "SUCCESS!" });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<URLParams> },
) {
  const subjectId = (await params).subjectId;

  if (isNotNumberLike(subjectId)) {
    return Response.json({ message: "subjectId shouldn't be null!" });
  }

  await prisma.subject.delete({ where: { id: +subjectId } });

  return Response.json({ message: "SUCCESS!" });
}

export async function GET(
  request: Request,
  { params }: { params: Promise<URLParams> },
) {
  const subjectId = (await params).subjectId;

  if (isNotNumberLike(subjectId)) {
    return Response.json({ message: "subjectId shouldn't be null!" });
  }

  const subject = await prisma.subject.findFirst({ where: { id: +subjectId } });

  return Response.json({ content: subject });
}
