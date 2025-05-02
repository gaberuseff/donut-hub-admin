import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditItem } from "../../services/apiMenu";

function useUpdateItem() {
    const queryClient = useQueryClient();

    const { mutate: UpdateItem, isPending: isUpdating } = useMutation({
        // mutationFn: ({ newItem, id }) => createEditItem(newItem, id),
        mutationFn: () => {
            console.log('us');
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu"] });
            toast.success("item successfully updated");
        },

        onError: (error) => {
            toast.error("item could not be updated");
            console.log(error.message);
        },
    });

    return { UpdateItem, isUpdating };
}

export default useUpdateItem;