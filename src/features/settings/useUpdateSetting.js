import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

function useUpdateSetting() {
    const queryClient = useQueryClient();

    const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
        // mutationFn: updateSettingApi,
        mutationFn: () => {
            console.log("updateSettingApi");
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] });
            toast.success("setting successfully updated");
        },

        onError: (error) => {
            toast.error("setting could not be updated");
            console.log(error.message);
        },
    });

    return { updateSetting, isUpdating };
}

export default useUpdateSetting;