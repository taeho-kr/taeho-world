import styled from "styled-components";
import { centerBox } from "../styles/components";

const Button = ({ onClick, disabled, children, width, bold }) => {
  return (
    <ComponentWrapper
      disabled={disabled}
      onClick={onClick}
      width={width ? width : "fit-content"}
      bold={bold}
    >
      {children}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.button`
  ${centerBox}
  border-radius: 0;
  border: 1px solid gray;
  width: ${(props) => props.width};
  padding: 0.25rem 1.25rem;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
    border: 1px solid black;
  }

  :disabled {
    filter: opacity(0.5);
  }
`;

export default Button;
