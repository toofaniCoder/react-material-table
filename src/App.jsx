import { useMemo } from "react";
import { Box, Button, Container } from "@mui/material";
import "./App.css";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { flatten } from "flat";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
// console.log(STUDENTS);

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});
function App() {
  const handleExportAllData = () => {
    const csv = generateCsv(csvConfig)(STUDENTS.map((el) => flatten(el)));
    download(csvConfig)(csv);
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => flatten(row.original));
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
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
    enableRowSelection:true,
    renderTopToolbarCustomActions: () => (
      <Box>
        <Button size="small" onClick={handleExportAllData}>
          Export All Data
        </Button>
        <Button
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
        >
          Export All Rows
        </Button>{" "}
        <Button
          size="small"
          onClick={() => handleExportRows(table.getRowModel().rows)}
        >
          Export Current Page
        </Button>{" "}
        <Button
          size="small"
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
        >
          Export Selected Rows
        </Button>
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
