// // components/UserTable.tsx
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import {
//   type ColumnDef,
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import { requestUser } from "@/lib/api/user-api";
// import type { User } from "@/types/user-type";

// const UserTable = () => {
//   const { USERS } = requestUser();

//   const { data, isLoading } = useQuery<User[]>({
//     queryKey: ["users"],
//     queryFn: USERS,
//   });

//   console.log(data, "==data");

//   const columns: ColumnDef<User>[] = [
//     {
//       header: "Full Name",
//       accessorKey: "full_name",
//     },
//     {
//       header: "Username",
//       accessorKey: "user_name",
//     },
//     {
//       header: "Email",
//       accessorKey: "email",
//     },
//     {
//       header: "Role",
//       accessorFn: (row) => row.roles.join(", "),
//     },
//     {
//       header: "Created At",
//       accessorKey: "created_at",
//       cell: ({ getValue }) =>
//         new Date(getValue() as string).toLocaleDateString(),
//     },
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="overflow-auto">
//       <table className="min-w-full text-left border">
//         <thead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id} className="border-b">
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} className="p-2 font-bold text-sm">
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="border-b hover:bg-gray-50">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="p-2 text-sm">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
// export default UserTable;

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { requestUser } from "@/lib/api/user-api";
import type { User } from "@/types/user-type";

const UserTable = () => {
  const { USERS } = requestUser();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  const sortField = sorting[0]?.id ?? "created_at";
  const sortOrder = sorting[0]?.desc ? "DESC" : "ASC";

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, sortField, sortOrder],
    queryFn: () =>
      USERS({
        page,
        pageSize,
        sortBy: sortField,
        sortOrder: sortOrder as "ASC" | "DESC",
      }),
    select: (res) =>
      res.data.filter((user: User) =>
        [user.full_name, user.user_name, user.email]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    keepPreviousData: true,
  });

  const columns: ColumnDef<User>[] = useMemo(
    () => [
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
        accessorFn: (row) => row.roles?.join(", ") ?? "-",
        cell: (info) => info.getValue(),
      },
      {
        header: "Created At",
        accessorKey: "created_at",
        cell: ({ getValue }) =>
          new Date(getValue() as string).toLocaleDateString(),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => alert(`Viewing user ${row.original.full_name}`)}
              className="text-blue-600 hover:underline text-xs"
            >
              View
            </button>
            <button
              onClick={() => alert(`Deleting user ${row.original.full_name}`)}
              className="text-red-600 hover:underline text-xs"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    pageCount: -1,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  return (
    <div className="space-y-4">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded px-3 py-2 text-sm"
      />

      {/* Table */}
      <div className="overflow-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-left cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex items-center px-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Previous
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
