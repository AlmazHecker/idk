import WordList from "@/src/features/Word/WordList/ui/WordList";
import CreateWordForm from "@/src/features/Word/CreateWord/ui/CreateWordForm";

type PageProps = {
  searchParams: Promise<{ date: string }>;
};
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const date = params.date ? new Date(params.date) : new Date();

  return (
    <div className="grid items-center justify-items-center  pb-20 md:gap-16 gap-4  font-[family-name:var(--font-geist-sans)]">
      <h2 className="text-center text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Words for today ({date.toDateString()})!
      </h2>

      <CreateWordForm />

      <WordList date={date} />
    </div>
  );
}
