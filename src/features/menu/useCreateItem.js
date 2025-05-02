import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditItem } from "../../services/apiMenu";

function useCreateItem() {
    const queryClient = useQueryClient();

    const { mutate: CreateItem, isPending: isCreating } = useMutation({
        mutationFn: (newItem) => createEditItem(newItem),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["menu"] });
            queryClient.refetchQueries({ queryKey: ["menu"] });
            toast.success("New item successfully created");
        },

        onError: (error) => {
            toast.error("item could not be created");
            console.log(error.message);
        },
    });

    return { CreateItem, isCreating };
}

export default useCreateItem;