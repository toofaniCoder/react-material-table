import { useMemo } from "react";
import { Button, ButtonBase, Container } from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
import { Link } from "react-router-dom";
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

      {
        accessorKey: "address.pincode",
        header: "Postal Code",
      },

      {
        accessorKey: "address.city",
        header: "City Name",
      },
      {
        accessorKey: "address.street",
        header: "Street Address",
      },
      {
        accessorKey: "address.state",
        header: "State Name",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: STUDENTS,
    // muiTableBodyCellProps: (x) => ({
    //   onDoubleClick: (event) => {
    //     event.currentTarget.style.background = "red";
    //     console.info(x);
    //   },
    //   sx: {
    //     cursor: "pointer",
    //   },
    // }),
    muiEditTextFieldProps: ({ cell }) => ({
      onBlur: (event) => {
        console.info(event, cell.id);
      },
    }),
    muiTableBodyRowProps: ({ row }) => ({
      component: Link,
      to: `/students/${row.original.id}`,
      onClick: (event) => {
        console.info(event, row.id);
      },
      sx: {
        textDecoration:"none",
        p: 0,
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
}

export default App;
