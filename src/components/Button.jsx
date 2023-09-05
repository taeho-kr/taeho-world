import styled from "styled-components";
import { centerBox } from "../styles/components";

const Button = ({
  varient = "contained",
  color = "primary",
  size = "medium",
  onClick,
  disabled,
  children,
  width,
  bold,
}) => {
  return (
    <ComponentWrapper
      varient={varient}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      width={width}
      bold={bold}
    >
      {children}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.button`
  ${centerBox}
  color: ${(props) =>
    props.varient === "contained"
      ? `var(--${props.color}Text)`
      : `var(--${props.color})`};
  background-color: ${(props) =>
    props.varient === "contained" ? `var(--${props.color})` : "transparent"};
  font-size: ${(props) =>
    props.size === "small"
      ? "0.875rem"
      : props.size === "large"
      ? "1.25rem"
      : "1rem"};
  font-weight: ${[(props) => props.bold && "bold"]};
  width: ${(props) => props.width};
  padding: 0.25rem 1.25rem;
  border: ${(props) =>
    props.varient === "text" ? `0` : `1px solid var(--${props.color})`};
  border-radius: 0.5rem;
  cursor: pointer;

  :disabled {
    filter: opacity(0.5);
  }
`;

export default Button;
