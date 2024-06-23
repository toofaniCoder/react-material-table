import { useMemo } from "react";
import { Container } from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
// console.log(STUDENTS);

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

function App() {
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Full Name",
      },

      {
        accessorKey: "standard",
        header: "Class Name",
        filterVariant: "range",
      },

      {
        accessorKey: "age",
        header: "Age",
        filterVariant: "range-slider",
      },
      {
        // accessorKey: "date_of_birth",
        accessorFn: (row) => moment(row.date_of_birth).calendar(),
        id: "date_of_birth",
        header: "DOB",
        filterVariant: "date",
        filterFn: (row, id, filterValue) =>
          row.getValue(id) === moment(filterValue._d).calendar(),
      },

      {
        // accessorKey: "date_of_admission",
        accessorFn: (row) => moment(row.date_of_admission).format("LLL"),
        id: "date_of_admission",
        header: "DOA",
        filterVariant: "datetime",
        filterFn: (row, id, filterValue) =>
          row.getValue(id) === moment(filterValue._d).format("LLL"),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: STUDENTS,
    enableFacetedValues: true,
    initialState: {
      showColumnFilters: true,
      pagination: { pageSize: 5, pageIndex: 0 },
    },
  });

  console.log(table.getState());
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container sx={{ py: 5 }}>
        <MaterialReactTable table={table} />
      </Container>
    </LocalizationProvider>
  );
}

export default App;
