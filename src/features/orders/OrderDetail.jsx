import {useNavigate} from "react-router-dom";
import {TbArrowBarToDown, TbCar} from "react-icons/tb";

import styled from "styled-components";

import {useMoveBack} from "../../hooks/useMoveBack";
import useOrder from "./useOrder";
import useAcceptAndDelivered from "./useAcceptAnddelivered";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import OrderDataBox from "./OrderDataBox";
import PrintOrder from "../../print/PrintOrder";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function OrderDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const {order, isLoadingOrder} = useOrder();
  const {updateState, isLoadingState} = useAcceptAndDelivered();

  if (isLoadingOrder) return <Spinner />;

  const {id: orderId, status} = order;

  const statusToTagName = {
    unconfirmed: "red",
    delivered: "green",
    preparing: "silver",
  };

  const updateStatus = status === "unconfirmed" ? "preparing" : "delivered";

  function handelUpdateOrderState() {
    updateState({orderId, status: updateStatus});

    if (updateStatus === "delivered") {
      navigate("/orders");
    }
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Order #{orderId}</Heading>
          <Tag type={statusToTagName[status]}>{status}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <OrderDataBox order={order} />

      <ButtonGroup>
        {status === "unconfirmed" || status === "preparing" ? (
          <Button
            onClick={handelUpdateOrderState}
            disabled={isLoadingState}
            variations="primary"
            size="medium"
            style={{display: "flex", alignItems: "center", gap: "0.8rem"}}>
            {status === "unconfirmed" ? (
              <>
                <TbArrowBarToDown size={20} />
                Accept ?
              </>
            ) : (
              <>
                <TbCar size={20} />
                Deliver ?
              </>
            )}
          </Button>
        ) : null}

        <PrintOrder order={order} color="white" />

        <Button variations="secondary" size="large" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default OrderDetail;
