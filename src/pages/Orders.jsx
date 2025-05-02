import Heading from "../ui/Heading";
import Row from "../ui/Row";
import OrderTable from "../features/orders/OrderTable";
import OrderTableOperations from "../features/orders/OrderTableOperations";
import DeleteAllOrders from "../features/orders/DeleteAllOrders";

function Orders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Orders</Heading>
        <OrderTableOperations />
      </Row>
      <Row type="vertical">
        <OrderTable />
        <DeleteAllOrders />
      </Row>
    </>
  );
}

export default Orders;
