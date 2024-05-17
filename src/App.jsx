import { useMemo } from "react";
import { Box, Button, Container } from "@mui/material";
import "./App.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { downloadExcel } from "react-export-table-to-excel";
import STUDENTS from "./students.json";
// console.log(STUDENTS);
import _ from "lodash";
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
  const handleExportRows = (rows) => {
    const tableData = rows.map((row) =>
      columns.map((column) => _.get(row.original, column.accessorKey))
    );
    const tableHeaders = columns.map((c) => c.header);

    downloadExcel({
      fileName: "material-react-table-to-excel",
      sheet: "material-react-table-to-excel",
      tablePayload: {
        header: tableHeaders,
        // accept two different data structures
        body: tableData,
      },
    });
  };
  const table = useMaterialReactTable({
    columns,
    data: STUDENTS,
    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box>
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
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          size="small"
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
