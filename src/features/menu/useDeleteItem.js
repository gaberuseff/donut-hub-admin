import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteItem as deleteItemApi } from "../../services/apiMenu";

function useDeleteItem() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteItem } = useMutation({

        // mutationFn: deleteItemApi,
        mutationFn: () => {
            console.log('ds');
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu"] });
            toast.success("item deleted successfully");
        },

        onError: (error) => {
            console.log(error.message);
            toast.error("item could not be deleted");
        },
    });

    return { isDeleting, deleteItem };
}


export default useDeleteItem;