import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useStore } from "../hooks/useStore";
import Cookies from "js-cookie";
import { deleteCookie } from "../utils/cookie";
import { GATEWAY_URL } from "../config/env";
import { renewAccessToken, getRefreshToken } from "../utils/auth";

const googleLoginURL = `${GATEWAY_URL}/api/auth/google/login`;

function Navbar() {
  const { user, setUser } = useStore();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${GATEWAY_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const email = res?.data?.email ?? "";
        const displayName = res?.data?.displayName ?? "";
        setUser({ email, displayName });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // If a 401 error occurs, renew the token
          try {
            // Call your renewToken function to refresh the token
            const refreshToken = getRefreshToken() ?? "";
            await renewAccessToken(refreshToken);

            // Retry fetching user details after token renewal
            const newAccessToken = Cookies.get("accessToken");
            const res = await axios.get(`${GATEWAY_URL}/api/auth/me`, {
              headers: { Authorization: `Bearer ${newAccessToken}` },
            });
            const email = res?.data?.email ?? "";
            const displayName = res?.data?.displayName ?? "";
            setUser({ email, displayName });
          } catch (renewError) {
            console.log("Token renewal failed:", renewError);
            // Handle token renewal failure, e.g., redirect to login
          }
        }
      }
    };

    fetchUserDetails();
  }, [setUser]);

  const logout = () => {
    try {
      const accessToken = Cookies.get("accessToken");
      axios.get(`${GATEWAY_URL}/api/auth/logout`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Nav>
      <FullNavContainer>
        <StyledLink to="/">CUTaskOverflow</StyledLink>
        {user ? (
          <RightContainer>
            {/* <UserImg src={user.picture} alt={user.picture} /> */}
            <div>{user.displayName}</div>
            <LoginContainer
              onClick={() => {
                setUser(undefined);
                logout();
              }}
            >
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

const UserImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
`;

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
