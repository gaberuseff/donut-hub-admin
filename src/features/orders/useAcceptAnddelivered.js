import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrder } from "../../services/apiOrders";
import toast from "react-hot-toast";

function useAcceptAndDelivered() {
    const queryClient = useQueryClient();

    const { mutate: updateState, isLoading: isLoadingState } = useMutation({
        mutationFn: ({ orderId, status }) => {
            updateOrder(orderId, { status: status });
        },

        onSuccess: () => {
            toast.success('Order updated successfully');
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["order"]);
        },

        onError: () => {
            toast.error('Order could not be updated');
        },

    })

    return { updateState, isLoadingState };
}

export default useAcceptAndDelivered;