import { centerBox, columnBox } from "@/styles/components";
import styled from "styled-components";
import Card from "./Card";
import useMenu from "@/hooks/useMenu";

const Menus = ({ items = [], onClickItem }) => {
  const menu = useMenu();

  const handleClickItem = (value) => {
    onClickItem(value);
    menu.closeMenu();
  };

  return (
    <ComponentWrapper>
      <Card>
        <MenuItemList>
          {items.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => handleClickItem(item.value)}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuItemList>
      </Card>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div``;

const MenuItemList = styled.div`
  ${columnBox}
  ${centerBox}
  padding: 0.5rem 1rem;
  background-color: var(--white);
  gap: 0.5rem;
`;

const MenuItem = styled.span`
  word-break: keep-all;
  min-width: fit-content;
`;

export default Menus;
