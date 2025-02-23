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
    <div
    // experimental background :)
    // style={{
    //   backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg width='200' height='100' viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3e%3ctext transform='rotate(30 50 50)' x='20' y='50' fill='red' font-size='24px'%3e${word.word}%3c/text%3e%3c/svg%3e")`,
    //   backgroundRepeat: "repeat",
    //   height: "100vh",
    // }}
    >
      <div className="text-3xl mt-10">
        <h2 className="pb-2 font-semibold transition-colors first:mt-0">
          Word: {word.word}
        </h2>

        <h2 className="dpb-2 font-semibold transition-colors first:mt-0">
          Translation: {word.translation}
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
