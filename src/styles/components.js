import styled, { css } from "styled-components";

export const pageBox = css`
  width: 100%;
  height: 100%;
`;

export const centerBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const columnBox = css`
  display: flex;
  flex-direction: column;
`;

export const rowBox = css`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const SubTitle = styled.span`
  font-size: 1.25rem;
  font-weight: normal;
`;

export const ContentStrong = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

export const Content = styled.span`
  font-size: 1rem;
  font-weight: normal;
`;

export const Caption = styled.span`
  font-size: 0.75rem;
  font-weight: normal;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
