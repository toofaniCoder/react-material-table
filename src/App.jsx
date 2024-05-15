import { useMemo } from "react";
import { Container } from "@mui/material";
import "./App.css";
import _ from "lodash";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useSWR from "swr";
import STUDENTS from "./students.json";
// console.log(STUDENTS);

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/users",
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <DataTable
      data={data.map(({ address, company, ...rest }) => ({ ...rest }))}
    />
  );
}

const DataTable = ({ data }) => {
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
  console.log(data);
  const columns = useMemo(
    () =>
      Object.keys(data[0])
        .filter((item) => item != "address" || item != "website")
        .map((column) => ({
          header: _.capitalize(_.snakeCase(column)),
          accessorKey: column,
          id: column,
        })),
    [data]
  );
  console.log(columns);
  const table = useMaterialReactTable({
    columns,
    data: data,
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });

  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable table={table} />
    </Container>
  );
};

export default App;
