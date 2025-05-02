import styled from "styled-components";

import OrderRow from "./OrderRow";
import useOrders from "./useOrders";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

const Table = styled.div`
  width: 100%;
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 0.8fr 1.5fr 0.3fr 1.2fr 0.7fr 0.9fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 1.6rem;
`;

const TableFooter = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;
`;

function OrderTable() {
  const {orders, isLoading, count} = useOrders();
  if (isLoading) return <Spinner />;

  if (orders?.length < 1) return <Empty resource="orders" />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Order Id</div>
        <div>Customer</div>
        <div>Order</div>
        <div>Status</div>
        <div>Address</div>
        <div>Amount</div>
      </TableHeader>
      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}

      <TableFooter>
        <Pagination count={count} />
      </TableFooter>
    </Table>
  );
}

export default OrderTable;
