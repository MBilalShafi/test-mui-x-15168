import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';

const WAIT_DURATION = 1;
function Slow() {
  const start = Date.now();
  while (Date.now() - start < WAIT_DURATION) {}
  return <span>slow</span>;
}

export default function DataGridProDemo() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100000,
    editable: true,
  });

  const columns: DataGridProProps['columns'] = React.useMemo(
    () => [
      {
        field: 'avatar',
        renderCell: ({ row }) => {
          return <div>test</div>;
        },
      },
      {
        field: 'slow',
        renderCell: () => <Slow />,
      },
      ...data.columns,
    ],
    [],
  );

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <DataGridPro
        {...data}
        columns={columns}
        loading={data.rows.length === 0}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
        initialState={{
          pinnedColumns: {
            left: ['avatar', 'slow'],
            right: ['id'],
          },
        }}
      />
      <style>{`body{margin:0}`}</style>
    </Box>
  );
}
