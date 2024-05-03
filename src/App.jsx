import { useMemo } from "react";
import {
  Container,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import STUDENTS from "./students.json";
// console.log(STUDENTS);

function App() {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Full Name",
        // enableColumnActions: false, // you can disable column action
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
    // enableColumnActions:false, // disable column action for all columns
    renderColumnActionsMenuItems: ({ internalColumnMenuItems, closeMenu }) => {
      return [
        <ListItemButton
          key="hello"
          onClick={() => {
            alert("Hello");
            closeMenu();
          }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <AccessibilityIcon />
          </ListItemIcon>
          <ListItemText primary="Say hello" />
        </ListItemButton>,
        // <MenuItem key="hello" onClick={() => console.log("hello")}>
        //   hello
        // </MenuItem>,
        ...internalColumnMenuItems,
      ];
    },
    muiTableHeadCellProps: {
      sx: {
        "& .Mui-TableHeadCell-Content": {
          justifyContent: "space-between",
        },
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
