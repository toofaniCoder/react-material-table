import { useMemo } from "react";
import { Button, Container, MenuItem, Stack } from "@mui/material";
import "./App.css";

import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
import { Delete, Edit } from "@mui/icons-material";
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
    enableRowActions: true,
    // renderRowActionMenuItems: ({ table }) => [
    //   // <MenuItem key={"edit"}>edit action</MenuItem>,
    //   // <MenuItem key={"delete"}>delete action</MenuItem>,
    //   // <MenuItem key={"disable"}>disable action</MenuItem>,

    //   // <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
    //   //   icon={<Edit />}
    //   //   key="edit"
    //   //   label="Edit"
    //   //   onClick={() => alert("Edit")}
    //   //   table={table}
    //   // />,

    // ],
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Admin Actions", //change header text
      },
    },
    positionActionsColumn: "last",
    renderRowActions: () => (
      <Stack direction={"row"} spacing={2}>
        <Button
          startIcon={<Edit />}
          variant="contained"
          color="success"
          size="small"
        >
          edit
        </Button>{" "}
        <Button
          startIcon={<Delete />}
          variant="contained"
          size="small"
          color="error"
        >
          delete
        </Button>
      </Stack>
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
