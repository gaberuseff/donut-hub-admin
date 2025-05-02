import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateUser as updatedUserApi } from "../../services/apiAuth";

function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        // mutationFn: updatedUserApi,
        mutationFn: () => {
            console.log("updateUserApi called");
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success("user successfully updated");
        },

        onError: (error) => {
            toast.error("user could not be updated");
            console.log(error.message);
        },
    });

    return { updateUser, isUpdating };
}

export default useUpdateUser;