'use client';

import React from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableCell,
  TableExpandedRow,
  DataTableRow,
  DataTableHeader,
} from '@carbon/react';
import { RepoRowItemProps } from './page';

interface Props {
  rows: RepoRowItemProps[];
  headers: Array<DataTableHeader>;
}

const RepoTable = ({ rows, headers }: Props) => {
  const getRowDescription = (rowId: number) => {
    const row = rows.find(({ id }) => id === rowId);
    return row ? row.description : '';
  };
  return (
    <DataTable
      rows={(rows as unknown) as Array<Omit<DataTableRow<any>, 'cells'>>}
      headers={headers}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
      }) => (
        <TableContainer
          title="Miners Online Repositories"
          description="A collection of public Miners Online repositories."
        >
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader />
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow colSpan={headers.length + 1}>
                    <p>{getRowDescription((row.id as unknown) as number)}</p>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};

export default RepoTable;