import { useMemo } from "react";
import {
  Container,
  Stack,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
// console.log(STUDENTS);
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function DetailPanel({ row }) {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${row.id * 1 + 1}`,
    fetcher
  );

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error Loading User Info</Alert>;

  // render data
  return (
    <Stack direction={"column"} spacing={2}>
      <Typography>Phone 👉 {data.phone}</Typography>
      <Typography>Website 👉 {data.website}</Typography>
      <Typography>Company 👉 {data.company.name}</Typography>
      <Typography>E-mail 👉 {data.email}</Typography>
    </Stack>
  );
}

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
    renderDetailPanel: ({ row }) => <DetailPanel row={row} />,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
}

export default App;
