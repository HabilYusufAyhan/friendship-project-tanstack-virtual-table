import type { ColumnDef } from '@tanstack/react-table';

import type { UserData } from './User';

export const userColumns: ColumnDef<UserData>[] = [
  {
    id: 'user',
    header: 'Kullanıcı',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`
  },
  {
    id: 'contact',
    header: 'İletişim',
    accessorFn: (row) => row.email
  },
  {
    id: 'location',
    header: 'Konum',
    accessorFn: (row) => `${row.address.city}, ${row.address.state}, ${row.address.country}`
  },
  {
    id: 'job',
    header: 'Meslek',
    accessorFn: (row) => `${row.company.title} / ${row.company.department}`
  },
  {
    id: 'physical',
    header: 'Fiziksel',
    accessorFn: (row) => `Yaş: ${row.age}, ${row.height}cm, ${row.weight}kg`
  },
  {
    id: 'actions',
    header: 'İşlemler'
  }
];
