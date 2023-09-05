import styled from "styled-components";
import {
  Caption,
  Content,
  Row,
  Title,
  columnBox,
  pageBox,
  rowBox,
} from "../../styles/components";
import Deepixel from "./components/Deepixel";
import { useState } from "react";
import Card from "../../components/Card";
import TmaxAI from "./components/TmaxAI";
import Conworth from "./components/Conworth";
import Innodep from "./components/Innodep";

const CareerPage = () => {
  const [expandedCareers, setExpandedCareers] = useState([]);
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

  const handleClickCareer = (careerTitle) => {
    const newExpandedCareers = [...expandedCareers];
    newExpandedCareers.includes(careerTitle)
      ? newExpandedCareers.splice(newExpandedCareers.indexOf(careerTitle))
      : newExpandedCareers.push(careerTitle);
    setExpandedCareers(newExpandedCareers);
  };

  return (
    <PageWrapper>
      {careers.map((career) => (
        <Card key={career.title}>
          <CareerWrapper>
            <CareerTitleWrapper onClick={() => handleClickCareer(career.title)}>
              <CareerTitleContainer>
                <Title>{career.title}</Title>
                <Content>{career.role}</Content>
              </CareerTitleContainer>
              <CareerTitleContainer>
                <Caption>{`${career.start} ~ ${
                  career.end ? career.end : "Now"
                }`}</Caption>
              </CareerTitleContainer>
            </CareerTitleWrapper>
            {expandedCareers.includes(career.title) && (
              <Card>
                <CareerContentsContainer>
                  {career.element}
                </CareerContentsContainer>
              </Card>
            )}
          </CareerWrapper>
        </Card>
      ))}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  ${pageBox}
  ${columnBox}
  padding: 1rem;
  gap: 0.5rem;
`;

const CareerWrapper = styled.div`
  ${columnBox}
  gap: 1rem;
  padding: 1rem;
  background-color: var(--white);
`;

const CareerTitleWrapper = styled.div`
  ${columnBox}
  cursor: pointer;
  &:hover {
    color: var(--dark-gray);
  }
`;

const CareerTitleContainer = styled.div`
  ${rowBox}
  gap: 1rem;
  align-items: baseline;
`;

const CareerContentsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: var(--light-gray);
`;

export default CareerPage;
