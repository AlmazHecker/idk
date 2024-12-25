"use client";
import { FC } from "react";
import { DataTable } from "@ui/data-table";
import { getSubjectListColumns } from "@/src/features/Subject/SubjectList/lib/getSubjectListColumns";
import { Subject } from "@prisma/client";
import { useRouter } from "next/navigation";

type SubjectListProps = {
  subjects: Subject[];
  isLoading: boolean;
};

const SubjectList: FC<SubjectListProps> = ({ subjects, isLoading }) => {
  const router = useRouter();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const onRowClick = (subject: Subject) => {
    router.push(`/subjects/${subject.id}`);
  };

  return (
    <DataTable
      onRowClick={onRowClick}
      columns={getSubjectListColumns()}
      data={subjects}
    />
  );
};

export default SubjectList;
