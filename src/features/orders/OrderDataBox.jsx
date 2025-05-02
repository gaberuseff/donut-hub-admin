import styled from "styled-components";

import {HiClipboardDocumentList} from "react-icons/hi2";

import CartRow from "../../ui/CartRow";
import {formatCurrency} from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-green-800);
  padding: 2rem 4rem;
  color: var(--color-grey-0);
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--border-radius-sm);
  margin-top: 2rem;
  padding: 0 3.6rem;
  font-weight: 600;
`;

// A purely presentational component
function OrderDataBox({order}) {
  const {
    orderDate,
    cart,
    customer,
    phone,
    email,
    orderPrice,
    deliveryPrice,
    address,
  } = order;

  const totalPrice = orderPrice + deliveryPrice;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiClipboardDocumentList />
          <p>{cart.length} items</p>
        </div>

        <p>{orderDate}</p>
      </Header>
      <Section>
        <Guest>
          <p>{customer}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>{phone}</p>
          <span>&bull;</span>
          <p>{address}</p>
        </Guest>

        {cart.map((item, index) => (
          <CartRow key={index} item={item} />
        ))}

        <Price>Delivery Fee = {formatCurrency(deliveryPrice)}</Price>
        <Price>Total Price = {formatCurrency(totalPrice)}</Price>
      </Section>
    </StyledBookingDataBox>
  );
}

export default OrderDataBox;
