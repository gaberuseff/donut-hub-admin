import styled, {css} from "styled-components";

const Input = styled.input`
  color: var(--color-grey-700);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;

  ${(props) =>
    props.type === "checkbox" &&
    css`
      width: 2.4rem;
      height: 2.4rem;
      accent-color: var(--color-green-600);
    `}
`;

export default Input;
