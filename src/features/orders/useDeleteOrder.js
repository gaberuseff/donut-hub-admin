import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteOrder as deleteOrderApi } from "../../services/apiOrders";

function useDeleteOrder() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: deleteOrder, isPending: isDeleting } = useMutation({
        mutationFn: (orderId) => deleteOrderApi(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("order deleted successfully");
            navigate("/orders");
        },
        onError: (error) => {
            console.log(error.message);
            toast.error("order could not be deleted");
        },
    });

    return { deleteOrder, isDeleting };
}

export default useDeleteOrder;