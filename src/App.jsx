import { useMemo } from "react";
import { Container, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import STUDENTS from "./students.json";
import { pink } from "@mui/material/colors";
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
    muiDetailPanelProps: {
      sx: {
        bgcolor: pink[50],
      },
    },
    renderDetailPanel: ({ row }) => {
      return (
        <Box
          sx={{
            width: "1100px",
            height: "300px",
          }}
        >
          <BarChart
            sx={{ maxWidth: "90%", mx: "auto" }}
            series={[{ data: Object.values(row.original.marks) }]}
            height={290}
            xAxis={[
              { data: Object.keys(row.original.marks), scaleType: "band" },
            ]}
            colors={[pink[400]]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </Box>
      );
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
