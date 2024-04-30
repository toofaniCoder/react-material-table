import { useMemo } from "react";
import { Container } from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
import { blue } from "@mui/material/colors";
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
    enableExpanding: true,

    getSubRows: (originalRow) => originalRow.child,
    muiTableContainerProps: {
      sx: () => {
        return {
          "tr:has(td>span[aria-label='Collapse'])": {
            backgroundColor: `${blue[200]} !important`,
          },
        };
      },
    },
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
}

export default App;
