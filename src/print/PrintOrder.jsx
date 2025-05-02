import {useReactToPrint} from "react-to-print";
import {useRef} from "react";
import styled, {css} from "styled-components";
import {HiMiniPrinter} from "react-icons/hi2";
import {formatCurrency} from "../utils/helpers";
import {QRCodeSVG} from "qrcode.react";

import ButtonIcon from "../ui/ButtonIcon";

const StyledContent = styled.div`
  display: none;

  @media print {
    height: 100vh;
    display: block;
    padding: 4rem 3rem;
    gap: 1rem;
  }
`;

const OrderId = styled.p`
  font-weight: 600;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid var(--color-grey-200);
`;

const StyledName = styled.p`
  font-weight: 600;
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const Styledinfo = styled.p`
  font-weight: 500;
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const StyledOrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 1rem 0;
`;

const StyledOrderAmount = styled.div`
  font-weight: 600;
  font-size: 1.8rem;
  margin: 1rem 0;

  text-decoration: underline;
`;

const StyledSecoundCode = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 50%;
  transform: translateX(50%);

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem;
`;

function PrintOrder({order, color}) {
  const {
    customer,
    phone,
    id: orderId,
    address,
    orderPrice,
    deliveryPrice,
  } = order;
  const totalAmount = orderPrice + deliveryPrice;

  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({contentRef});

  const qrCode = () => {
    return (
      <QRCodeSVG
        value={`https://donut-hub.vercel.app/order/${orderId}`}
        title={"Order QR Code"}
        size={100}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        minVersion={1}
        imageSettings={{
          // in data folder
          x: undefined,
          y: undefined,
          height: 24,
          width: 24,
          opacity: 1,
          excavate: false,
        }}
      />
    );
  };

  return (
    <div>
      <ButtonIcon onClick={() => reactToPrintFn()} color={color}>
        <HiMiniPrinter size={20} />
      </ButtonIcon>
      <StyledContent ref={contentRef}>
        <StyledHeader>
          <div>
            <OrderId>Order : {orderId}</OrderId>
            <StyledName>Name: {customer}</StyledName>
            <Styledinfo>Phone: {phone}</Styledinfo>
            <Styledinfo>Address: {address}</Styledinfo>
          </div>

          <div>{qrCode()}</div>
        </StyledHeader>

        {order.cart.map((item) => (
          <StyledOrderItem key={item.donutId}>
            <p>
              {item.quantity} x {item.name}
            </p>
            <p>{formatCurrency(item.unitPrice)}</p>
          </StyledOrderItem>
        ))}

        <StyledOrderAmount>
          Total: {formatCurrency(totalAmount)}
        </StyledOrderAmount>

        <StyledSecoundCode>
          <div>{qrCode()}</div>
          <div>
            Order Amount: <strong>{formatCurrency(totalAmount)}</strong>
          </div>
        </StyledSecoundCode>
      </StyledContent>
    </div>
  );
}

export default PrintOrder;
