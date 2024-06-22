import { useMemo } from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
} from "@mui/material";
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
      // {
      //   accessorKey: "email",
      //   header: "E-mail Address",
      // },
      // {
      //   accessorKey: "phone",
      //   header: "Phone Number",
      // },

      // {
      //   accessorKey: "standard",
      //   header: "Class Name",
      // },

      // {
      //   accessorKey: "section",
      //   header: "Section",
      // },

      // {
      //   accessorKey: "age",
      //   header: "Age",
      // },
      {
        accessorKey: "date_of_birth",
        header: "DOB",
      },

      {
        accessorKey: "date_of_admission",
        header: "DOA",
      },
      {
        size:200,
        accessorFn: (row) => new Date(row.date_of_birth).toDateString(),
        id: "birthday",
        header: "Birthday",
        Cell: ({ cell }) => (
          <Stack spacing={2} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <span>🎂 {cell.getValue()}</span>
            <Button color="success"  variant="contained" size="small">
              send wishesh
            </Button>
          </Stack>
        ),
        Filter: ({ column }) => (
          <FormControlLabel
            control={<Switch />}
            label="show todays birthday"
            onChange={(e) => column.setFilterValue(e.target.checked)}
          />
        ),
        filterFn: (row, id, filterValue) =>
          filterValue ? row.getValue(id) === new Date().toDateString() : null,
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
      //   accessorKey:"address.state",
      //   header:"State Name"
      // }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: STUDENTS,
    initialState: {
      showColumnFilters: true,
      pagination: { pageSize: 5, pageIndex: 0 },
    },
  });
  console.log(table.getState().columnFilters);
  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
}

export default App;
