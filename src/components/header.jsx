import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <ComponentWrapper>
      <Link to="/">Home</Link>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  height: 3rem;
`;

export default Header;
