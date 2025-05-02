import styled from "styled-components";

import Tag from "../../ui/Tag";

import {formatCurrency} from "../../utils/helpers";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayOrder({order}) {
  return (
    <StyledTodayItem>
      {order.status === "delivered" ? (
        <Tag type="green">Delivered</Tag>
      ) : order.status === "preparing" ? (
        <Tag type="blue">preparing</Tag>
      ) : (
        <Tag type="red">Unconfirmed</Tag>
      )}
      <div>{order.id}</div>
      <Guest>{order.customer}</Guest>
      <div>{formatCurrency(order.orderPrice + order.deliveryPrice)}</div>
    </StyledTodayItem>
  );
}

export default TodayOrder;
