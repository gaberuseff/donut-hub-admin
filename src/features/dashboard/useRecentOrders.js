import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getOrdersAfterDate } from "../../services/apiOrders";

export function useRecentOrders() {
    const [searchParams] = useSearchParams();

    const numDays = Number(searchParams.get("last")) || 7;

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: orders, isPending: isLoading } = useQuery({
        queryKey: ["orders", `last-${numDays}-days`],
        queryFn: () => getOrdersAfterDate(queryDate)
    })

    return {
        orders,
        isLoading,
        numDays,
    };
}