import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import {formatDate} from "date-fns";
import Spinner from "../../ui/Spinner";
import TodayOrder from "./TodayOrder";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / -1;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity({orders, isLoading}) {
  if (isLoading) return <Spinner />;

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Last 5 Orders</Heading>
      </Row>
      <TodayList>
        {/* check if the order is today ? and render the last 5 orders */}
        {orders?.length > 0 ? (
          orders
            .filter((order) => {
              const orderDate = new Date(order.created_at);
              const today = new Date();
              return (
                orderDate.getDate() === today.getDate() &&
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
              );
            })
            .slice(0, 5)
            .map((order) => <TodayOrder order={order} key={order.id} />)
        ) : (
          <NoActivity>No activity today</NoActivity>
        )}
      </TodayList>
    </StyledToday>
  );
}

export default TodayActivity;
