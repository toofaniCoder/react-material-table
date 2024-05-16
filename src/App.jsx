/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { Container } from "@mui/material";
import "./App.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query"; //note: this is TanStack React Query V5

import STUDENTS from "./students.json";
// console.log(STUDENTS);

function App() {
  const [expanded, setExpanded] = useState({});
  console.log(expanded);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["students", ...Object.keys(expanded)],
    queryFn: async () => {
      const { data } = await axios.get(
        Object.keys(expanded)
          ? `http://localhost:5000/students?parentIds=${Object.keys(
              expanded
            ).join(",")}`
          : `http://localhost:5000/students`
      );
      return data;
    },
    placeholderData: keepPreviousData,
  });

  return (
    <DataTable
      isFetching={isFetching}
      data={data}
      loading={isLoading}
      expanded={expanded}
      setExpanded={setExpanded}
    />
  );
}

const DataTable = ({ data, loading, expanded, setExpanded, isFetching }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Full Name ",
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
        header: "Section Name",
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
        header: "Pin Code",
      },
      {
        accessorKey: "address.city",
        header: "City Name",
      },
      {
        accessorKey: "address.street",
        header: "Street Name",
      },
      {
        accessorKey: "address.state",
        header: "State Name",
      },
    ],
    []
  );

  const rootData = useMemo(
    () =>
      data?.students
        ? data?.students?.filter((student) => student.parentId === null)
        : [],
    [data?.students]
  );
  const table = useMaterialReactTable({
    columns,
    data: rootData,
    enableExpanding: true,
    getRowId: (row) => row.studentId,
    onExpandedChange: setExpanded,
    getRowCanExpand: (row) => {
      return row.original.hasChild;
    },
    state: {
      isLoading: loading,
      showProgressBars: isFetching,
      expanded: expanded,
    },
    getSubRows: (row) =>
      data?.students?.filter((student) => student.parentId === row.studentId),
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });
  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
};
export default App;
