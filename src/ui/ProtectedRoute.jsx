import styled from "styled-components";
import {useUser} from "../features/authentication/useUser";
import Spinner from "./Spinner";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const FullPageSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({children}) {
  const navigate = useNavigate();
  //   1) load the authentication user
  const {isLoading, isAuthenticated} = useUser();

  // 2) if there is no user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3) while loading, show a spinner
  if (isLoading)
    return (
      <FullPageSpinner>
        <Spinner />;
      </FullPageSpinner>
    );

  //  4) if there is a user, show the app
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
