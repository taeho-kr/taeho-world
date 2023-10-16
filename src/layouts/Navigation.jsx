import styled from "styled-components";
import { columnBox } from "../styles/components";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { routes } from "../routes";

const Navigation = () => {
  const navigate = useNavigate();

  const onClickMenu = (route) => {
    navigate(route);
  };

  return (
    <ComponentWrapper>
      {routes.map((route) => (
        <Button
          key={route.label}
          width={"100%"}
          bold={location.pathname.startsWith(route.route) && "true"}
          onClick={() => onClickMenu(route.route)}
        >
          {route.label}
        </Button>
      ))}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.nav`
  ${columnBox}
  background: var(--theme);
  width: 4rem;
  height: 100%;
`;

export default Navigation;
