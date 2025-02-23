import { TextEditor } from "@ui/text-editor/text-editor";
import ScrollDown from "@ui/scroll-down/scroll-down";
import { prisma } from "@shared/lib/prisma-client";
import { redirect } from "next/navigation";
import { isNotNumberLike } from "@shared/lib/utils";

type Params = Promise<{ subjectId: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { subjectId } = await params;

  if (isNotNumberLike(subjectId)) {
    return redirect("/subjects");
  }
  const subject = await prisma.subject.findFirst({ where: { id: +subjectId } });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="relative text-center text-[2.5em] md:text-[5em] -mt-6 mb-6 font-semibold md:h-[calc(100vh-76px)] h-[calc(100vh-92px)] grid place-items-center">
        {subject?.title}

        <ScrollDown className="absolute bottom-0 md:block hidden" />
      </h1>
      <div className="geminichka p-4 border rounded-sm bg-background prose dark:prose-invert max-w-none">
        <TextEditor editable={false} value={subject?.content} />
      </div>
    </div>
  );
};

export default Page;
