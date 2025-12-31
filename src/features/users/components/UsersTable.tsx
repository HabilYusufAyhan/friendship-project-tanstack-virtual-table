import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect, useRef, useState } from 'react';

import type { UserData } from '../types/User';
import { userColumns } from '../types/users.columns';
import { UserRow } from './UserRow';
import { UsersEmpty } from './UsersEmpty';

interface Props {
  users: UserData[];
  isLoading: boolean;
}
export const UsersTable = ({ users, isLoading }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const table = useReactTable({
    data: users,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel()
  });
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 420 : 120),
    overscan: 5,
    measureElement: (el: HTMLElement) => el.getBoundingClientRect().height
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div
        ref={parentRef}
        className="overflow-auto overflow-x-hidden"
        style={{ maxHeight: '70vh' }}
      >
        <table className="w-full border-collapse table-fixed">
          <thead className=" bg-linear-to-r from-purple-600 to-pink-600 text-white sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="hidden md:table-row">
                {headerGroup.headers.map((header, index) => (
                  <th key={index} className=" py-4  text-sm font-semibold">
                    {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody style={{ height: `${rowVirtualizer.getTotalSize()}px` }} className="relative">
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];

              return (
                <UserRow
                  key={row.original.id}
                  user={row.original}
                  ref={rowVirtualizer.measureElement}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`
                  }}
                  dataIndex={virtualRow.index}
                />
              );
            })}
          </tbody>
        </table>
        {users.length === 0 && <UsersEmpty isLoading={isLoading} />}
      </div>
    </div>
  );
};
