import {HiOutlineBriefcase, HiOutlineChartBar} from "react-icons/hi";
import Stat from "./Stat";
import {HiOutlineBanknotes} from "react-icons/hi2";
import {TbCar} from "react-icons/tb";
import {formatCurrency} from "../../utils/helpers";

function Stats({orders, isLoading}) {
  // 1)
  const numOrders = orders?.length;

  // 2)
  const sales = orders?.reduce(
    (acc, order) => acc + order?.orderPrice + order.deliveryPrice,
    0
  );

  // 3)
  const numDelivered = orders?.filter(
    (order) => order.status === "delivered"
  ).length;

  // 4) calculate the number of orders items quantaty in all carts
  const numOrderItems = orders?.reduce((acc, order) => {
    const orderItems = order?.cart?.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return acc + orderItems;
  }, 0);

  if (isLoading) return null;

  return (
    <>
      <Stat
        title="orders"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numOrders}
      />
      <Stat
        title="sales"
        color="indigo"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="delivered"
        color="green"
        icon={<TbCar />}
        value={numDelivered}
      />
      <Stat
        title="num items is bought"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={numOrderItems}
      />
    </>
  );
}

export default Stats;
