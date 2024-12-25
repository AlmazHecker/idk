import { FC } from "react";
import fetcher from "@shared/api/fetch";
import { WithRelation } from "@shared/types/prisma";
import GeminiChat from "@/src/features/Gemini/ui/GeminiChat";

type PageProps = {
  params: Promise<{ wordId: string }>;
};

const Page: FC<PageProps> = async ({ params }) => {
  const wordId = (await params).wordId;
  const word = await fetcher<WithRelation<"Word", "subject">>(
    `/api/words/${wordId}`,
  );

  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <h2 className="pb-2 text-5xl font-semibold  transition-colors first:mt-0">
          {word.word}
        </h2>

        <p className="text-5xl mx-20">===</p>
        <h2 className="dpb-2 text-5xl font-semibold transition-colors first:mt-0">
          {word.translation}
        </h2>
      </div>

      <GeminiChat
        value={`I'm learning new language and want to know when to use ${word.word} word ?`}
      />
    </div>
  );
};

export default Page;
