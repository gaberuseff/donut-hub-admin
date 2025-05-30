import {Outlet} from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const AppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4rem 6.4rem;
  overflow-y: auto;
`;

const Container = styled.div`
  /* max-width: 120rem;
  margin: 0 auto; */
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayput() {
  return (
    <AppLayout>
      <Header />

      <Sidebar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </AppLayout>
  );
}

export default AppLayput;
