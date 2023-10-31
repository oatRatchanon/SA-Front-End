import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useStore } from "../hooks/useStore";
import { GATEWAY_URL } from "../config/env";
import { fetchUserDetailsService, logoutService } from "../services/auth";

const googleLoginURL = `${GATEWAY_URL}/api/auth/google/login`;

function Navbar() {
  const { user, setUser, setBookmarkFiles } = useStore();

  useEffect(() => {
    fetchUserDetailsService(setUser, setBookmarkFiles);
  }, [setUser, setBookmarkFiles]);

  const handleClickLogout = () => {
    setUser(undefined);
    logoutService(setUser);
  };

  return (
    <Nav>
      <FullNavContainer>
        <StyledLink to="/">CUTaskOverflow</StyledLink>
        {user ? (
          <RightContainer>
            {/* <UserImg src={user.picture} alt={user.picture} /> */}
            <div>{user.displayName}</div>
            <LoginContainer onClick={handleClickLogout}>
              Sign Out
            </LoginContainer>
          </RightContainer>
        ) : (
          <LoginContainer href={googleLoginURL}>
            {/* <LoginContainer onClick={() => login()}> */}
            Sign In
          </LoginContainer>
        )}
      </FullNavContainer>
    </Nav>
  );
}

// const UserImg = styled.img`
//   width: 2.4rem;
//   height: 2.4rem;
//   border-radius: 50%;
// `;

const RightContainer = styled.div`
  display: flex;
  gap: 0 1rem;
  align-items: center;
`;

const Nav = styled.div`
  background-color: #2a2d48 !important;
  color: white;
  padding: 2vh 10vw !important;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const FullNavContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 32px;
  font-weight: bold;
`;

const LoginContainer = styled.a`
  font-weight: bold;
  color: white;
  border: 1px solid white;
  /* background-color: white; */
  padding: 0.5rem 1rem;
  cursor: pointer;
  /* transition-duration: 0.3s; */
  &:hover {
    border: 2px solid white;
  }
`;

export default Navbar;
