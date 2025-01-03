import { FC } from "react";
import GeminiChat from "@/src/features/Gemini/ui/GeminiChat";
import { prisma } from "@shared/lib/prisma-client";
import { redirect } from "next/navigation";
import { isNotNumberLike } from "@shared/lib/utils";

type PageProps = {
  params: Promise<{ wordId: string }>;
};

const Page: FC<PageProps> = async ({ params }) => {
  const wordId = (await params).wordId;

  if (isNotNumberLike(wordId)) {
    return redirect("/words");
  }

  const word = await prisma.word.findFirst({
    where: { id: +wordId },
    include: { subject: true },
  });

  if (!word) {
    return redirect("/words");
  }

  return (
    <div>
      <div className="flex justify-center text-3xl items-center mt-10">
        <h2 className="pb-2  font-semibold  transition-colors first:mt-0">
          {word.word}
        </h2>

        <p className="mx-5 md:mx-20">===</p>
        <h2 className="dpb-2 font-semibold transition-colors first:mt-0">
          {word.translation}
        </h2>
      </div>

      <GeminiChat
        wordId={wordId}
        explanation={word?.explanation}
        value={`I'm learning new language and want to know when to use ${word.word} word ?(Briefly)`}
      />
    </div>
  );
};

export default Page;
