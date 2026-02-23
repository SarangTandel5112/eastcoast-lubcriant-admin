import { Card, CardContent, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/common';

export const TablePlaceholder = (props: {
  title: string;
  columns: string[];
  rows?: number;
}) => {
  const rows = Array.from(
    { length: props.rows ?? 5 },
    (_, index) => `row-${index + 1}`,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
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
            {rows.map(rowId => (
              <TableRow key={rowId}>
                {props.columns.map(column => (
                  <TableCell key={`${rowId}-${column}`}>—</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
