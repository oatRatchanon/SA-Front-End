import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <Nav>
      <FullNavContainer>
        <StyledLink to="/">CUTaskOverflow</StyledLink>
        <LoginContainer>Sign In</LoginContainer>
      </FullNavContainer>
    </Nav>
  );
}

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
