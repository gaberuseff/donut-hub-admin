import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../services/apiMenu";

function useItems() {
    const { data: menu, isLoading } = useQuery({
        queryKey: ["menu"],
        queryFn: getMenu,
    });

    return { menu, isLoading };
}

export default useItems;