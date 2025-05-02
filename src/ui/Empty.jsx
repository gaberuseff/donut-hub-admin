import styled from "styled-components";

const StyledEmpty = styled.p`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
`;

function Empty({resource}) {
  return <StyledEmpty>No {resource} could be found.</StyledEmpty>;
}

export default Empty;
