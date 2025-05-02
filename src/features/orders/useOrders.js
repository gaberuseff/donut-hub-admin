import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders } from "../../services/apiOrders";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constance";


function useOrders() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // Filter
    const filterValue = searchParams.get("status") || "all";
    const filter = !filterValue || filterValue === "all" ? null : { field: 'status', value: filterValue };

    // Pagination
    const page = Number(searchParams.get("page")) || 1;

    // query
    const { data: { data: orders, count } = {}, isPending: isLoading } = useQuery({
        queryKey: ["orders", filter, page],
        queryFn: () => getOrders({ filter, page }),
    });

    // prefetching 
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["orders", filter, page + 1],
            queryFn: () => getOrders({ filter, page: page + 1 }),
        });

    return { orders, count, isLoading };
}

export default useOrders;