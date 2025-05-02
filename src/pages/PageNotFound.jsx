import styled from "styled-components";

import {useMoveBack} from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Heading as="h1">
        The page you are looking for could not be found 😢
      </Heading>
      <Button onClick={moveBack} size="large" variations="primary">
        &larr; Go back
      </Button>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
