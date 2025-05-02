import styled from "styled-components";

import useItems from "./useItems";

import Spinner from "../../ui/Spinner";
import MenuRow from "./MenuRow";
import Empty from "../../ui/Empty";
import {useSearchParams} from "react-router-dom";

const Table = styled.div`
  width: 100%;
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.8fr 1.8fr 2.2fr 1fr 0.4fr 1.4fr 0.2fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function MenuTable() {
  // const {data: menu, isLoading} = useQuery({
  //   queryKey: ["menu"],
  //   queryFn: getMenu,
  // });

  const {menu, isLoading} = useItems();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("souldOut") || "all";
  const filteredMenu = menu.filter((item) => {
    if (filterValue === "all") return true;
    if (filterValue === "available") return !item.soldOut;
    if (filterValue === "sold-out") return item.soldOut;
    return item.soldOut;
  });

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const sortAndFilteredMenu = [...filteredMenu].sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "price-asc") return a.unitPrice - b.unitPrice;
    if (sortBy === "price-desc") return b.unitPrice - a.unitPrice;
  });

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Name</div>
        <div>ingredients</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Sold out</div>
      </TableHeader>
      {sortAndFilteredMenu.map((item) => (
        <MenuRow key={item.id} item={item} />
      ))}
    </Table>
  );
}

export default MenuTable;
