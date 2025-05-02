import {NavLink} from "react-router-dom";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineCog8Tooth,
  HiOutlineSquares2X2,
  HiUsers,
} from "react-icons/hi2";

import styled from "styled-components";
import {TbBrandStackoverflow} from "react-icons/tb";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.8rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-900);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-green-800);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineSquares2X2 />
            Dashboard
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/orders">
            <HiOutlineClipboardDocumentList />
            Orders
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/menu">
            <TbBrandStackoverflow />
            Menu
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiUsers />
            Users
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog8Tooth />
            Settings
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
