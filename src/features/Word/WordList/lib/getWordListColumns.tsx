import { CellContext, ColumnDef } from "@tanstack/react-table";
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
import { WithRelation } from "@shared/types/prisma";
import dynamic from "next/dynamic";
const UpdateWordDialog = dynamic(
  () => import("@/src/features/Word/UpdateWord/ui/UpdateWordDialog"),
);
const DeleteWordDialog = dynamic(
  () => import("@/src/features/Word/DeleteWord/ui/DeleteWordDialog"),
);

export const getWordListColumns = (): ColumnDef<
  WithRelation<"Word", "subject">
>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.row.index,
    },
    {
      header: "Subject",
      cell: (info) => {
        return info.row.original.subject?.title;
      },
    },
    {
      accessorKey: "word",
      header: "Word",
    },
    {
      accessorKey: "translation",
      header: "Translation",
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
      id: "actions",
      enableHiding: false,
      cell: (cell) => <ActionsCell cell={cell} />,
    },
  ];
};

const ActionsCell = ({
  cell: { row },
}: {
  cell: CellContext<WithRelation<"Word", "subject">, unknown>;
}) => {
  const updateDialog = useToggle(false);
  const deleteDialog = useToggle(false);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="h-8 w-8 p-0">
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
      <UpdateWordDialog
        open={updateDialog.isOpen}
        onOpenChange={updateDialog.toggle}
        value={row.original}
      />
      <DeleteWordDialog
        open={deleteDialog.isOpen}
        onOpenChange={deleteDialog.toggle}
        value={row.original}
      />
    </div>
  );
};
