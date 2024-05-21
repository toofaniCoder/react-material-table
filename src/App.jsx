import { useMemo } from "react";
import { Container } from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
// console.log(STUDENTS);
import { flatten } from "flat";
import _ from "lodash";

function App() {
  //should be memoized or stable
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: "name",
  //       header: "Full Name",
  //     },
  //     {
  //       accessorKey: "email",
  //       header: "E-mail Address",
  //     },
  //     {
  //       accessorKey: "phone",
  //       header: "Phone Number",
  //     },

  //     {
  //       accessorKey: "standard",
  //       header: "Class Name",
  //     },

  //     {
  //       accessorKey: "section",
  //       header: "Section",
  //     },

  //     {
  //       accessorKey: "age",
  //       header: "Age",
  //     },
  //     {
  //       accessorKey: "date_of_birth",
  //       header: "DOB",
  //     },

  //     {
  //       accessorKey: "date_of_admission",
  //       header: "DOA",
  //     },

  //     {
  //       accessorKey: "address.pincode",
  //       header: "Postal Code",
  //     },

  //     {
  //       accessorKey: "address.city",
  //       header: "City Name",
  //     },
  //     {
  //       accessorKey: "address.street",
  //       header: "Street Address",
  //     },
  //     {
  //       accessorKey: "address.state",
  //       header: "State Name",
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () =>
      Object.keys(flatten(STUDENTS.at(0))).map((columnId) => ({
        accessorKey: columnId,
        header: _.capitalize(_.lowerCase(columnId.split(".").pop())),
        id: columnId,
      })),
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: STUDENTS,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
}

export default App;
