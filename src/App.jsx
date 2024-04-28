import { useMemo, useState } from "react";
import { Container } from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
// console.log(STUDENTS);

function App() {
  const [data, setData] = useState([...STUDENTS]);
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Full Name",
        // enableEditing:false
      },
      {
        accessorKey: "email",
        header: "E-mail Address",
        // Edit: () => null,
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
    data: data,
    enableEditing: true,
    // editDisplayMode: "row",
    onEditingRowSave: ({ table, row, values }) => {
      setData((prevData) =>
        prevData.map((item) => (item.id === row.original.id ? values : item))
      );
      table.setEditingRow(null);
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
