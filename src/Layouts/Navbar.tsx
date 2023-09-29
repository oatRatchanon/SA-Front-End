import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useStore } from "../hooks/useStore";

function Navbar() {
  const { user, setUser } = useStore();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );
        console.log(res);
        setUser({
          email: res.data.email,
          name: res.data.name,
          picture: res.data.picture,
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Nav>
      <FullNavContainer>
        <StyledLink to="/">CUTaskOverflow</StyledLink>
        {user ? (
          <RightContainer>
            <UserImg src={user.picture} alt={user.picture} />
            <div>{user.name}</div>
            <LoginContainer
              onClick={() => {
                setUser(undefined);
                googleLogout();
              }}
            >
              Sign Out
            </LoginContainer>
          </RightContainer>
        ) : (
          <LoginContainer onClick={() => login()}>Sign In</LoginContainer>
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

const LoginContainer = styled.div`
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
