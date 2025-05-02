import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          {value: "all", label: "All"},
          {value: "unconfirmed", label: "Unconfirmed"},
          {value: "preparing", label: "Preparing"},
          {value: "delivered", label: "Delivered"},
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;
