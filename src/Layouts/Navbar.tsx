import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {
  return (
    <Nav>
      <FullNavContainer>
        <StyledLink to="/">CUTaskOverflow</StyledLink>
        <div>Login</div>
      </FullNavContainer>
    </Nav>
  );
}

const Nav = styled.div`
  background-color: #2a2d48 !important;
  color: white;
  padding: 2vh 3vw !important;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const FullNavContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default Navbar;
