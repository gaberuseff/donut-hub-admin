import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../../services/apiOrders";
import { useParams } from "react-router-dom";



function useOrder() {
    const { orderId } = useParams();

    const { data: order, isLoading: isLoadingOrder } = useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrder(orderId),
    });

    return { order, isLoadingOrder };
}

export default useOrder;