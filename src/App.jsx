import { useMemo } from "react";
import {
  Container,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./App.css";

import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  MRT_CopyButton,
  flexRender,
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
        Cell: ({ cell }) => (
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            {cell.getValue()}
            <MRT_CopyButton table={table} cell={cell}>
              copy
            </MRT_CopyButton>
          </Stack>
        ),
      },

      {
        accessorKey: "standard",
        header: "Class",
      },

      {
        accessorKey: "section",
        header: "Section",
      },

      // {
      //   accessorKey: "age",
      //   header: "Age",
      // },
      // {
      //   accessorKey: "date_of_birth",
      //   header: "DOB",
      // },

      // {
      //   accessorKey: "date_of_admission",
      //   header: "DOA",
      // },

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
    enableRowSelection: true,
    defaultColumn: {
      size: 300,
    },
    initialState: {
      showGlobalFilter: true,
      pagination: { pageSize: 5, pageIndex: 0 },
    },
  });

  return (
    <Container sx={{ py: 5 }}>
      {/* <MaterialReactTable table={table} /> */}
      <Paper>
        <Box sx={{ p: 2 }}>
          <MRT_GlobalFilterTextField table={table} />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell variant="head" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.Header ??
                              header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow key={row.id} selected={row.getIsSelected()}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell variant="body" key={cell.id}>
                      {/* Use MRT's cell renderer that provides better logic than flexRender */}
                      <MRT_TableBodyCellValue
                        cell={cell}
                        table={table}
                        staticRowIndex={rowIndex} //just for batch row selection to work
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <MRT_TablePagination table={table} />
        <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
      </Paper>
    </Container>
  );
}

export default App;
