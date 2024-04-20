import { useMemo } from "react";
import { Container, Box, Typography } from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
// console.log(STUDENTS);

function App() {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Full Name",
      },
      {
        accessorKey: "email",
        header: "E-mail Address",
      },
      {
        accessorKey: "phone",
        header: "Phone Number",
      },

      {
        accessorKey: "standard",
        header: "Class Name",
      },

      {
        accessorKey: "section",
        header: "Section",
      },

      {
        accessorKey: "age",
        header: "Age",
      },
      {
        accessorKey: "date_of_birth",
        header: "DOB",
      },

      {
        accessorKey: "date_of_admission",
        header: "DOA",
      },

      // {
      //   accessorKey: "address.pincode",
      //   header: "Postal Code",
      // },

      // {
      //   accessorKey: "address.city",
      //   header: "City Name",
      // },
      // {
      //   accessorKey: "address.street",
      //   header: "Street Address",
      // },
      // {
      //   accessorKey: "address.state",
      //   header: "State Name",
      // },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: STUDENTS,
    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor:"success.main",
        color:theme.palette.common.white
      }),
    }),
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: "grid",
          margin: "auto",
          gridTemplateColumns: "1fr 1fr",
          width: "100%",
          rowGap:2
        }}
      >
        <Typography>Pin Code: {row.original.address.pincode}</Typography>
        <Typography>City: {row.original.address.city}</Typography>
        <Typography>State: {row.original.address.state}</Typography>
        <Typography>Street: {row.original.address.street}</Typography>
      </Box>
    ),
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
}

export default App;
