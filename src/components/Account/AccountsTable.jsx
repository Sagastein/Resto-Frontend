import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
      <GridToolbarExport
        printOptions={{
          fileName: "data",
          hideFooter: true,
          hideToolbar: true,
          allColumns: true,
        }}
        csvOptions={{
          fileName: "Data",
          allColumns: true,
        }}
      />
    </GridToolbarContainer>
  );
}
const columns = [
  { field: "UUID", headerName: "NO", hide: true },
  {
    field: "UserId",
    headerName: "User ID",
    minMidth: 20,
    flex: 1,
    editable: false,
    sortable: false,
    filter: false,
    hideable: false,
  },

  {
    field: "AccountBalance",
    headerName: "Balance",
    flex: 1,
    type: "number",
    minWidth: 160,
    sortable: false,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    minWidth: 100,
    sortable: false,
    editable: false,
    align: "center",
  },
  {
    field: "createdAt",
    headerName: "created",
    flex: 1,
    minWidth: 100,
    sortable: false,
    editable: false,
    align: "left",
    headerAlign: "left",
  },
];
const fetcher = (url) => axios.get(url).then((res) => res.data);
const UsersTable = () => {
  const { data, error, isLoading } = useSWR("/api/Accounts", fetcher);

  if (isLoading) return <div className="skeleton p-8" />;
  if (!data) return console.log("waiting ...");
  if (error) return <div className="bg-black text-4xl">loading data</div>;
  console.log(data);
  return (
    <>
      <Box
        p={2}
        sx={{
          height: 490,
          backgroundColor: "white",
          marginX: 2,
          cursor: "pointer",
          overflowY: "auto",
          marginBottom: 0,
          borderRadius: 2,
        }}
      >
        <DataGrid
          loading={!data.length}
          onRowClick={() => console.log(data)}
          rows={data}
          autoPageSize
          getRowId={(row) => row.UUID}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          disableSelectionOnClick={true}
          disableColumnSelector={true}
          disableColumnMenu={true}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Box>
    </>
  );
};

export default UsersTable;
// valueGetter: (params) => {
//   return params?.row?.Account?.UserId;
// }
// valueFormatter: (params) => params.row?.Account?.UserId
// onRowClick={()=> alert("clicked...")}
