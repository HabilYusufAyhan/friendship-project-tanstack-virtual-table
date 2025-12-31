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
const COLUMN_ALIGNMENTS: ('left' | 'center' | 'right')[] = [
  'left', // 1. sütun
  'center', // 2. sütun
  'right', // 3. sütun
  'left', // 4. sütun
  'center', // 5. sütun
  'right' // 6. sütun
];
const COLUMN_WIDTHS = ['20%', '20%', '15%', '15%', '15%', '15%'];

export const UsersTable = ({ users, onMeet, onSkip, isLoading }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [maxRowHeight, setMaxRowHeight] = useState<number | null>(null);
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

  useLayoutEffect(() => {
    if (!parentRef.current || users.length === 0) {
      setMaxRowHeight(null);
      return;
    }

    const measureRows = () => {
      const rowElements = parentRef.current?.querySelectorAll('tbody tr');
      if (!rowElements || rowElements.length === 0) return;

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
    };

    requestAnimationFrame(measureRows);
  }, [users, isMobile]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 420 : maxRowHeight || 100),
    overscan: 5,
    measureElement: (el) => el?.getBoundingClientRect().height ?? (isMobile ? 300 : 100)
  });

  const shouldVirtualize = maxRowHeight !== null && users.length > 20;

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
          <table className="w-full border-collapse border-spacing-0">
            <thead className="bg-linear-to-r from-purple-600 to-pink-600 text-white sticky top-0 z-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="hidden md:table-row">
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-center font-semibold"
                      style={{ width: COLUMN_WIDTHS[index], textAlign: COLUMN_ALIGNMENTS[index] }}
                    >
                      {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <UsersEmpty isLoading={isLoading} />
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div ref={parentRef} className="overflow-auto" style={{ maxHeight: '70vh' }}>
        <table className="w-full border-collapse border-spacing-0 table-fixed">
          <thead className="bg-linear-to-r from-purple-600 to-pink-600 text-white sticky top-0 z-20 hidden md:table-header-group">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-center font-semibold"
                    style={{ width: COLUMN_WIDTHS[index], textAlign: COLUMN_ALIGNMENTS[index] }}
                  >
                    {header.isPlaceholder ? null : header.column.columnDef.header?.toString()}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {shouldVirtualize ? (
            <tbody style={{ height: `${rowVirtualizer.getTotalSize()}px` }} className="relative">
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
                      transform: `translateY(${virtualRow.start}px)`
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
