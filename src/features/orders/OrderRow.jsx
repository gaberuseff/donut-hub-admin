import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {formatCurrency} from "../../utils/helpers";
import {HiMiniTrash, HiOutlineEye} from "react-icons/hi2";
import styled from "styled-components";

import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteOrder from "./useDeleteOrder";

import PrintOrder from "../../print/PrintOrder";
import Tag from "../../ui/Tag";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty";
import ButtonIcon from "../../ui/ButtonIcon";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.8fr 1.5fr 0.3fr 1.2fr 0.7fr 0.9fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const OrderId = styled.p`
  font-weight: 600;
`;

const Customer = styled.div`
  font-weight: 500;
  text-transform: uppercase;

  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const StyledOrderOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  & > :nth-child(2) {
    font-weight: 600;
  }
`;

const Address = styled.a`
  color: var(--color-green-600);
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const StyledIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButtonIcon = styled.button`
  border: none;
  background: none;
  padding: 0.6rem;
  color: var(--color-grey-500);
  border-radius: var(--border-radius-rounded);

  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-200);
  }
`;

function OrderRow({order}) {
  const [confirmDelete, setConfimDlete] = useState(false);

  const {
    id: orderId,
    customer,
    phone,
    status,
    address,
    position,
    orderDate,
    cart,
    orderPrice,
    deliveryPrice,
  } = order;

  const {deleteOrder, isDeleting} = useDeleteOrder();

  if (isDeleting) <Spinner />;

  const statusToTagName = {
    unconfirmed: "red",
    delivered: "green",
    preparing: "indigo",
  };

  const navigate = useNavigate();

  const totalAmount = orderPrice + deliveryPrice;
  const CartOverview = cart
    .map((item) => `${item.quantity} x ${item.name}`)
    .join(", ")
    .slice(0, 30)
    .concat("...");

  if (order.length < 1) return <Empty resource="orders" />;

  function handelDeleteOrder() {
    deleteOrder(orderId);
  }

  return (
    <TableRow>
      <OrderId>{orderId}</OrderId>
      <Customer>
        <span>{customer}</span>
        <span>{phone}</span>
      </Customer>
      <StyledOrderOverview>
        <p>{CartOverview}</p>
        <p>{orderDate}</p>
      </StyledOrderOverview>
      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Address target="_blank" href={`https://maps.google.com/?q=${position}`}>
        {address}
      </Address>
      <Amount>{formatCurrency(totalAmount)}</Amount>

      <StyledIcons>
        <ButtonIcon onClick={() => navigate(`/orders/${orderId}`)}>
          <HiOutlineEye size={20} />
        </ButtonIcon>

        <ButtonIcon onClick={() => setConfimDlete(!confirmDelete)}>
          <HiMiniTrash size={20} />
        </ButtonIcon>

        {confirmDelete && (
          <ConfirmDelete
            resourceName={`order ${orderId}`}
            onConfirm={handelDeleteOrder}
            disabled={isDeleting}
            onCloseModal={() => setConfimDlete(!confirmDelete)}
          />
        )}

        <PrintOrder order={order} />
      </StyledIcons>
    </TableRow>
  );
}

export default OrderRow;
