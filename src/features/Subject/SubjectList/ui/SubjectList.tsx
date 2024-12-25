"use client";
import { FC } from "react";
import { DataTable } from "@ui/data-table";
import { getSubjectListColumns } from "@/src/features/Subject/SubjectList/lib/getSubjectListColumns";
import { Subject } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useColumnVisibility } from "@shared/hooks/useColumnVisibility";

type SubjectListProps = {
  subjects: Subject[];
  isLoading: boolean;
};

const SubjectList: FC<SubjectListProps> = ({ subjects, isLoading }) => {
  const router = useRouter();

  const onRowClick = (subject: Subject) => {
    router.push(`/subjects/${subject.id}`);
  };

  const { columnVisibility } = useColumnVisibility([
    "createdAt",
    "updatedAt",
    "id",
  ]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <DataTable
      columnVisibility={columnVisibility}
      onRowClick={onRowClick}
      columns={getSubjectListColumns()}
      data={subjects}
    />
  );
};

export default SubjectList;
