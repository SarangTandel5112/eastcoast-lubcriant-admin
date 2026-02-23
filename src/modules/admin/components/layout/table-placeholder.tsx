import { Badge, Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

export type TablePlaceholderProps = {
  title: string;
  columns: string[];
  rows?: number;
};

export const TablePlaceholder = (props: TablePlaceholderProps) => {
  const rowCount = props.rows ?? 5;
  const rowIds = Array.from({ length: rowCount }, (_, index) => `row-${index + 1}`);
  const statusVariants = ['default', 'success', 'muted'] as const;

  return (
    <Card className="border-neutral-800 bg-neutral-900/70">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>{props.title}</CardTitle>
        <Badge variant="muted">Preview data</Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {props.columns.map(column => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowIds.map((rowId, rowIndex) => (
              <TableRow key={rowId} className="border-neutral-800">
                {props.columns.map((column, columnIndex) => (
                  <TableCell key={`${rowId}-${column}`} className="text-neutral-300">
                    {columnIndex === 0
                      ? (
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-blue-400/80" />
                            <span className="text-sm">
                              Sample
                              {rowIndex + 1}
                            </span>
                          </div>
                        )
                      : column.toLowerCase().includes('status')
                        ? (
                            <Badge variant={statusVariants[rowIndex % statusVariants.length]}>
                              {rowIndex % 2 === 0 ? 'Active' : 'Pending'}
                            </Badge>
                          )
                        : (
                            <div className="h-2 rounded-full bg-neutral-700/70" style={{ width: `${55 + (columnIndex * 8)}%` }} />
                          )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
