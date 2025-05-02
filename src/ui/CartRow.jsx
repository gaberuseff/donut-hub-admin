import styled from "styled-components";
import {formatCurrency} from "../utils/helpers";

const StyledCartBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 4rem;
`;

const StyedCartRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-100);
`;

function CartRow({item}) {
  return (
    <StyledCartBox>
      <StyedCartRow>
        <div>
          <strong>{item.quantity} - </strong>
        </div>
        <div>{item.name}</div>
        <div>{item.price}</div>
        <div>
          <strong>{formatCurrency(item.totalPrice)}</strong>{" "}
        </div>
      </StyedCartRow>
    </StyledCartBox>
  );
}

export default CartRow;
