import styled from "styled-components";
import { Caption, Content, Row, Title, pageBox } from "../../styles/components";
import Deepixel from "./components/Deepixel";
import { useState } from "react";
import Card from "../../components/Card";
import TmaxAI from "./components/TmaxAI";
import Conworth from "./components/Conworth";
import Innodep from "./components/Innodep";

const CareerPage = () => {
  const [expanded, setExpanded] = useState([]);
  const careers = [
    {
      title: "Deepixel",
      start: "2020-02",
      end: "2021-06",
      role: "Frontend Engineer",
      element: <Deepixel />,
    },
    {
      title: "TmaxAI",
      start: "2021-07",
      end: "2023-03",
      role: "Frontend Engineer",
      element: <TmaxAI />,
    },
    {
      title: "Conworth",
      start: "2023-03",
      end: "2023-04",
      role: "Advisor",
      element: <Conworth />,
    },
    {
      title: "Innodep",
      start: "2023-04",
      end: null,
      role: "Frontend Engineer",
      element: <Innodep />,
    },
  ];

  return (
    <PageWrapper>
      {careers.map((career) => (
        <Card key={career.title}>
          <CareerWrapper>
            <CareerTitleContainer>
              <Title>{career.title}</Title>
              <Content>{career.role}</Content>
            </CareerTitleContainer>
            <CareerTitleContainer>
              <Caption>{`${career.start} ~ ${
                career.end ? career.end : "Now"
              }`}</Caption>
            </CareerTitleContainer>
            {career.element}
          </CareerWrapper>
        </Card>
      ))}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${pageBox}
  padding: 1rem;
`;

const CareerWrapper = styled.div`
  padding: 1rem;
  background-color: var(--white);
`;

const CareerTitleContainer = styled(Row)`
  align-items: baseline;
`;

export default CareerPage;
