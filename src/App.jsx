import { useMemo } from "react";
import { Button, Container } from "@mui/material";
import "./App.css";

import { MaterialReactTable } from "material-react-table";

import STUDENTS from "./students.json";
import { useLocalStorage } from "@uidotdev/usehooks";
// console.log(STUDENTS);

function App() {
  const [sorting, setSorting] = useLocalStorage("mrt_sorting", []);
  const [columnFilters, setColumnFilters] = useLocalStorage("mrt_sorting", []);

  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    "mrt_columnVisibility",
    {}
  );
  const [density, setDensity] = useLocalStorage("mrt_density", "comfortable");
  const [globalFilter, setGlobalFilter] = useLocalStorage(
    "mrt_globalFilter",
    ""
  );
  const [showGlobalFilter, setShowGlobalFilter] = useLocalStorage(
    "mrt_showGlobalFilter",
    false
  );
  const [showColumnFilters, setShowColumnFilters] = useLocalStorage(
    "mrt_showColumnFilters",
    false
  );

  const resetState = () => {
    localStorage.removeItem("mrt_columnFilters");
    localStorage.removeItem("mrt_columnVisibility");
    localStorage.removeItem("mrt_density");
    localStorage.removeItem("mrt_globalFilter");
    localStorage.removeItem("mrt_showGlobalFilter");
    localStorage.removeItem("mrt_showColumnFilters");
    localStorage.removeItem("mrt_sorting");
    window.location.reload();
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

  return (
    <Container sx={{ py: 5 }}>
      <MaterialReactTable
        data={STUDENTS}
        columns={columns}
        onColumnFiltersChange={setColumnFilters}
        onColumnVisibilityChange={setColumnVisibility}
        onDensityChange={setDensity}
        onGlobalFilterChange={setGlobalFilter}
        onShowColumnFiltersChange={setShowColumnFilters}
        onShowGlobalFilterChange={setShowGlobalFilter}
        onSortingChange={setSorting}
        renderTopToolbarCustomActions={() => (
          <Button onClick={resetState}>Reset State</Button>
        )}
        state={{
          columnFilters,
          columnVisibility,
          density,
          globalFilter,
          showColumnFilters,
          showGlobalFilter,
          sorting,
        }}
        initialState={{ pagination: { pageIndex: 0, pageSize: 5 } }}
      />
    </Container>
  );
}

export default App;
