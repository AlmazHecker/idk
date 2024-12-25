import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Subject } from "@prisma/client";
import { formatDate } from "@shared/lib/date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Button } from "@ui/button";
import { MoreHorizontal } from "lucide-react";
import { useToggle } from "@shared/hooks/useToggle";
import dynamic from "next/dynamic";

const UpdateSubjectDialog = dynamic(
  () => import("@/src/features/Subject/UpdateSubject/ui/UpdateSubjectDialog"),
);
const DeleteSubjectDialog = dynamic(
  () => import("@/src/features/Subject/DeleteSubject/ui/DeleteSubjectDialog"),
);

export const getSubjectListColumns = (): ColumnDef<Subject>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => formatDate(info.getValue() as string),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: (info) => formatDate(info.getValue() as string),
    },
    {
      meta: { style: { textAlign: "end" } },
      id: "actions",
      enableHiding: false,
      cell: (cell) => <ActionsCell cell={cell} />,
    },
  ];
};

const ActionsCell = ({
  cell: { row },
}: {
  cell: CellContext<Subject, unknown>;
}) => {
  const updateDialog = useToggle(false);
  const deleteDialog = useToggle(false);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="ml-auto h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={updateDialog.toggle}>
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={deleteDialog.toggle}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateSubjectDialog
        open={updateDialog.isOpen}
        onOpenChange={updateDialog.toggle}
        value={row.original}
      />
      <DeleteSubjectDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.toggle}
        value={row.original}
      />
    </div>
  );
};
