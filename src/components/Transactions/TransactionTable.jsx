import React, { forwardRef } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
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
const DateCell = forwardRef((props, ref) => {
  const date = new Date(props.value);
  return <div ref={ref}>{date.toLocaleDateString()}</div>;
});
const columns = [
  { field: "UUID", width: 20, headerName: "NO", hide: true },
  {
    field: "UserId",
    headerName: "User ID",
    width: 80,
    editable: false,
    sortable: false,
    filter: false,
    hideable: false,
  },
  {
    field: "mode",
    headerName: "Transaction",
    flex: 1,
    minWidth: 100,
    align: "left",
    editable: false,
    sortable: false,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: 160,
    sortable: false,
    editable: false,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "createdAt",
    headerName: "created",
    flex: 1,
    minWidth: 120,
    sortable: false,
    editable: false,
    align: "left",
    headerAlign: "left",
  },
];

const fetcher = (url) => axios.get(url).then((res) => res.data);
const TransactionTable = () => {
  const navigate = useNavigate();
  function sa(params) {
    console.log("params", params.row.UserId);
    const user = params.row.UserId;
    if (!user) return console.error("data not found");
    navigate(`/profile/${user}`);
  }
  const { data, error, isLoading } = useSWR("/api/transaction/", fetcher);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="grid justify-center items-center text-4xl">
        <p className="animate-pulse">Error connecting to the Server</p>
      </div>
    );
  if (error) return console.error(error);

  //   const formattedData = data.map((item) => ({
  //     ...item,
  //     createdAt: new Date(item.createdAt).toLocaleDateString(),
  //   }));

  return (
    <>
      <Box
        p={1}
        sx={{
          height: "auto",
          backgroundColor: "white",
          marginX: 2,
          boxShadow: 2,
          cursor: "pointer",
          overflowY: "auto",
          marginBottom: 0,
          borderRadius: 2,
        }}
      >
        <DataGrid
          sx={{
            height: "80vh",
            "@media (max-width: 600px)": {
              height: "80vh",
              fontSize: 14,
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F1FFF0",
              color: "rgb(0,0,0)",
              borderBottom: "1px solid",
              fontSize: 16,
            },
          }}
          loading={!data.length}
          onRowClick={(params) => sa(params)}
          rows={data}
          getRowId={(row) => row.UUID}
          columns={columns}
          disableSelectionOnClick={true}
          disableColumnSelector={true}
          disableColumnMenu
          defaultMuiPrevente
          components={{
            Toolbar: CustomToolbar,
          }}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </>
  );
};

export default TransactionTable;
// valueGetter: (params) => {
//   return params?.row?.Account?.UserId;
// }
// valueFormatter: (params) => params.row?.Account?.UserId
// // onRowClick={()=> alert("clicked...")}
//   onRowClick={(row)=> sa(data)}
