import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-800);
  background-color: var(--color-${(props) => props.type}-100);

  ${(props) =>
    props.type === "green" &&
    `
    color: var(--color-green-400);
  `}
`;

export default Tag;
