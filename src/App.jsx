import { useMemo } from "react";
import { Container, ThemeProvider, createTheme, useTheme } from "@mui/material";
import "./App.css";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { hiIN } from "@mui/material/locale";
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
    localization: {
      actions: "क्रियाएँ",
      and: "और",
      cancel: "रद्द करें",
      changeFilterMode: "फ़िल्टर मोड बदलें",
      changeSearchMode: "खोज मोड बदलें",
      clearFilter: "फ़िल्टर हटाएं",
      clearSearch: "खोज हटाएं",
      clearSelection: "चयन साफ़ करें",
      clearSort: "क्रमबद्धि हटाएं",
      clickToCopy: "कॉपी करने के लिए क्लिक करें",
      copy: "कॉपी",
      collapse: "संकुचित करें",
      collapseAll: "सभी को संकुचित करें",
      columnActions: "कॉलम क्रियाएँ",
      copiedToClipboard: "क्लिपबोर्ड पर कॉपी किया गया",
      dropToGroupBy: "{column} द्वारा समूहीकरण करें",
      edit: "संपादित करें",
      expand: "विस्तारित करें",
      expandAll: "सभी को विस्तारित करें",
      filterArrIncludes: "शामिल है",
      filterArrIncludesAll: "सभी शामिल हैं",
      filterArrIncludesSome: "शामिल हैं",
      filterBetween: "बीच में",
      filterBetweenInclusive: "सम्मिलित बीच में",
      filterByColumn: "{column} द्वारा फ़िल्टर करें",
      filterContains: "शामिल है",
      filterEmpty: "खाली",
      filterEndsWith: "के साथ समाप्त होता है",
      filterEquals: "बराबर है",
      filterEqualsString: "बराबर है",
      filterFuzzy: "धुंधला",
      filterGreaterThan: "से अधिक",
      filterGreaterThanOrEqualTo: "या बराबर",
      filterInNumberRange: "बीच में",
      filterIncludesString: "शामिल है",
      filterIncludesStringSensitive: "शामिल है",
      filterLessThan: "से कम",
      filterLessThanOrEqualTo: "या बराबर",
      filterMode: "फ़िल्टर मोड: {filterType}",
      filterNotEmpty: "खाली नहीं",
      filterNotEquals: "बराबर नहीं",
      filterStartsWith: "के साथ शुरू होता है",
      filterWeakEquals: "बराबर है",
      filteringByColumn: "{column} द्वारा फ़िल्टर - {filterType} {filterValue}",
      goToFirstPage: "पहले पृष्ठ पर जाएं",
      goToLastPage: "अंतिम पृष्ठ पर जाएं",
      goToNextPage: "अगले पृष्ठ पर जाएं",
      goToPreviousPage: "पिछले पृष्ठ पर जाएं",
      grab: "पकड़ो",
      groupByColumn: "{column} द्वारा समूहीकरण करें",
      groupedBy: "द्वारा समूहीकृत ",
      hideAll: "सभी छुपाएं",
      hideColumn: "{column} कॉलम छुपाएं",
      max: "अधिकतम",
      min: "न्यूनतम",
      move: "हटाएं",
      noRecordsToDisplay: "प्रदर्शित करने के लिए कोई रिकॉर्ड नहीं",
      noResultsFound: "कोई परिणाम नहीं मिला",
      of: "का",
      or: "या",
      pin: "पिन करें",
      pinToLeft: "बाईं ओर पिन करें",
      pinToRight: "दाईं ओर पिन करें",
      resetColumnSize: "कॉलम का आकार रीसेट करें",
      resetOrder: "क्रम रीसेट करें",
      rowActions: "पंक्ति क्रियाएँ",
      rowNumber: "#",
      rowNumbers: "पंक्ति संख्या",
      rowsPerPage: "प्रति पृष्ठ पंक्तियाँ",
      save: "सहेजें",
      search: "खोजें",
      selectedCountOfRowCountRowsSelected:
        "{selectedCount} का चयन किया गया {rowCount} पंक्ति(एं)",
      select: "चयन करें",
      showAll: "सभी दिखाएं",
      showAllColumns: "सभी कॉलम दिखाएं",
      showHideColumns: "कॉलम दिखाएं/छुपाएं",
      showHideFilters: "फ़िल्टर दिखाएं/छुपाएं",
      showHideSearch: "खोज दिखाएं/छुपाएं",
      sortByColumnAsc: "{column} आरोही क्रमबद्ध करें",
      sortByColumnDesc: "{column} अवरोही क्रमबद्ध करें",
      sortedByColumnAsc: "{column} आरोही क्रमबद्ध किया गया",
      sortedByColumnDesc: "{column} अवरोही क्रमबद्ध किया गया",
      thenBy: ", फिर क्रमबद्ध करें ",
      toggleDensity: "घनत्व टॉगल करें",
      toggleFullScreen: "पूर्ण स्क्रीन टॉगल करें",
      toggleSelectAll: "सभी का चयन करें/हटाएं",
      toggleSelectRow: "पंक्ति का चयन करें/हटाएं",
      toggleVisibility: "दृश्यता टॉगल करें",
      ungroupByColumn: "{column} से समूहीकरण हटाएं",
      unpin: "पिन हटाएं",
      unpinAll: "सभी पिन हटाएं",
    },
    initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
  });
  const theme = useTheme();
  return (
    <ThemeProvider theme={createTheme(theme, hiIN)}>
      <Container sx={{ py: 5 }}>
        <MaterialReactTable table={table} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
