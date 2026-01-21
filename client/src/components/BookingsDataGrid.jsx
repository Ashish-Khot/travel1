import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, Chip, Stack } from '@mui/material';

const sampleRows = [
  { id: 1, tourist: 'Alice Smith', tour: 'Sunset City Walk', date: '2026-01-15', amount: 49, status: 'Pending' },
  { id: 2, tourist: 'Bob Lee', tour: 'Mountain Adventure', date: '2026-01-18', amount: 120, status: 'Accepted' },
  { id: 3, tourist: 'Carla Gomez', tour: 'Historic Landmarks', date: '2026-01-20', amount: 80, status: 'Rejected' },
  { id: 4, tourist: 'David Kim', tour: 'Food Tasting Tour', date: '2026-01-22', amount: 60, status: 'Pending' },
];

const columns = [
  { field: 'tourist', headerName: 'Tourist', flex: 1, minWidth: 120 },
  { field: 'tour', headerName: 'Tour', flex: 1, minWidth: 140 },
  { field: 'date', headerName: 'Date', flex: 1, minWidth: 110 },
  { field: 'amount', headerName: 'Amount', flex: 1, minWidth: 100, renderCell: (params) => `$${params.value}` },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 100, renderCell: (params) => (
    <Chip label={params.value} color={params.value === 'Accepted' ? 'success' : params.value === 'Rejected' ? 'error' : 'warning'} size="small" />
  ) },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1.2,
    minWidth: 200,
    sortable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="success" size="small">Accept</Button>
        <Button variant="outlined" color="error" size="small">Reject</Button>
        <Button variant="outlined" color="primary" size="small">Chat</Button>
      </Stack>
    ),
  },
];

export default function BookingsDataGrid() {
  return (
    <Box sx={{ height: 420, width: '100%', bgcolor: 'background.paper', borderRadius: 4, boxShadow: 3, p: 2 }}>
      <DataGrid
        rows={sampleRows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
          borderRadius: 3,
          '& .MuiDataGrid-columnHeaders': { fontWeight: 700, fontSize: 16 },
          '& .MuiDataGrid-row': { transition: 'background 0.2s', '&:hover': { background: 'rgba(25, 118, 210, 0.04)' } },
        }}
      />
    </Box>
  );
}
