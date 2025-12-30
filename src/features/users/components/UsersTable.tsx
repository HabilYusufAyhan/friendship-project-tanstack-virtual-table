import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useLayoutEffect, useRef, useState } from 'react';

import type { UserData } from '../types/User';
import { userColumns } from '../types/users.columns';
import { UserRow } from './UserRow';
import { UsersEmpty } from './UsersEmpty';

interface Props {
  users: UserData[];
  onMeet: (id: number, name: string) => void;
  onSkip: (id: number) => void;
  isLoading: boolean;
}

export const UsersTable = ({ users, onMeet, onSkip, isLoading }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [maxRowHeight, setMaxRowHeight] = useState<number | null>(null);

  const table = useReactTable({
    data: users,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel()
  });

  const { rows } = table.getRowModel();

  useLayoutEffect(() => {
    if (!parentRef.current || users.length === 0) return;

    const rowElements = parentRef.current.querySelectorAll('tbody tr');
    let maxHeight = 0;

    rowElements.forEach((row) => {
      const height = row.getBoundingClientRect().height;

      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    if (maxHeight > 0) {
      setMaxRowHeight(Math.ceil(maxHeight));
    }
  }, [users]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => maxRowHeight || 100,
    overscan: 4,
    measureElement: (el) => el.getBoundingClientRect().height
  });

  const shouldVirtualize = maxRowHeight !== null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div ref={parentRef} className="overflow-auto" style={{ maxHeight: '70vh' }}>
        <table className="w-full border-collapse border-spacing-0 table-fixed">
          <thead className="bg-linear-to-r from-purple-600 to-pink-600 text-white sticky top-0 z-20">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 text-center font-semibold">
                    {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {users.length === 0 ? (
            <UsersEmpty isLoading={isLoading} />
          ) : shouldVirtualize ? (
            <tbody style={{ height: rowVirtualizer.getTotalSize() }} className="relative">
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];

                return (
                  <UserRow
                    key={row.original.id}
                    user={row.original}
                    onMeet={onMeet}
                    onSkip={onSkip}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                      textAlign: 'left'
                    }}
                  />
                );
              })}
            </tbody>
          ) : (
            <tbody>
              {rows.map((row) => (
                <UserRow
                  key={row.original.id}
                  user={row.original}
                  onMeet={onMeet}
                  onSkip={onSkip}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
