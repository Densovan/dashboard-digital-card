// components/UserTable.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { requestUser } from "@/lib/api/user-api";
import type { User } from "@/types/user-type";

const UserTable = () => {
  const { USERS } = requestUser();

  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: USERS,
  });

  console.log(data, "==data");

  const columns: ColumnDef<User>[] = [
    {
      header: "Full Name",
      accessorKey: "full_name",
    },
    {
      header: "Username",
      accessorKey: "user_name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorFn: (row) => row.roles.join(", "),
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      cell: ({ getValue }) =>
        new Date(getValue() as string).toLocaleDateString(),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full text-left border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 font-bold text-sm">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
