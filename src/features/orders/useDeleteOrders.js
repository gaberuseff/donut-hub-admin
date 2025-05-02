import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAllOrders as deleteAllOrdersApi } from "../../services/apiOrders";

function useDeleteOrders() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: deleteAllOrders, isPending: isDeleting } = useMutation({
        mutationFn: deleteAllOrdersApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("All orders deleted successfully");
            navigate("/");
        },
        onError: (error) => {
            console.log(error.message);
            toast.error("orders could not be deleted");
        },
    });

    return { deleteAllOrders, isDeleting };
}

export default useDeleteOrders;