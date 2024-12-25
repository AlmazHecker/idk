import fetcher from "@shared/api/fetch";
import { Subject } from "@prisma/client";
import { TextEditor } from "@ui/text-editor/text-editor";
import ScrollDown from "@ui/scroll-down/scroll-down";

type Params = Promise<{ subjectId: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { subjectId } = await params;
  const data = await fetcher<{ content: Subject }>(
    `/api/subjects/${subjectId}`,
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="relative text-center text-7xl md:text-9xl -mt-6 mb-6 font-semibold h-[calc(100vh-76px)] grid place-items-center">
        {data?.content?.title}

        <ScrollDown className="absolute bottom-0" />
      </h1>
      <div className="geminichka p-4 border rounded bg-background prose dark:prose-invert max-w-none">
        <TextEditor editable={false} value={data.content?.content} />
      </div>
    </div>
  );
};

export default Page;
