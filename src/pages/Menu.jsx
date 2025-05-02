import styled from "styled-components";

import MenuTable from "../features/menu/MenuTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddItem from "../features/menu/AddItem";
import MenuTableOperations from "../features/menu/MenuTableOperations";

const StyledAddItemAndFilter = styled.div`
  display: flex;
  align-items: center;
  column-gap: 3rem;
`;

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">The Menu</Heading>

        <StyledAddItemAndFilter>
          <MenuTableOperations />
          <AddItem />
        </StyledAddItemAndFilter>
      </Row>

      <Row type="vertical">
        <MenuTable />
      </Row>
    </>
  );
}

export default Cabins;
