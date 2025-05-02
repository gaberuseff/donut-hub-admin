import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function MenuTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="souldOut"
        options={[
          {value: "all", label: "All"},
          {value: "available", label: "Available"},
          {value: "sold-out", label: "Sold out"},
        ]}
      />

      <SortBy
        options={[
          {value: "name-asc", label: "Sort by name (A-Z)"},
          {value: "name-desc", label: "Sort by name (Z-A)"},
          {value: "price-asc", label: "Sort by price (low to high)"},
          {value: "price-desc", label: "Sort by price (high to low)"},
        ]}
      />
    </TableOperations>
  );
}

export default MenuTableOperations;
