import styled from "styled-components";
import {useRecentOrders} from "./useRecentOrders";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const {orders, isLoading, numDays} = useRecentOrders();

  if (isLoading) <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats orders={orders} isLoading={isLoading} />
      <TodayActivity orders={orders} isLoading={isLoading} />
      <SalesChart orders={orders} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
