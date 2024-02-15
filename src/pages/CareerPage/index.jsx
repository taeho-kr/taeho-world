import styled from "styled-components";
import { columnBox, pageBox } from "../../styles/components";
import Deepixel from "./components/Deepixel";
import { useState } from "react";
import TmaxAI from "./components/TmaxAI";
import Conworth from "./components/Conworth";
import Innodep from "./components/Innodep";
import CareerCard from "./components/CareerCard";

const CareerPage = () => {
  const [expandedCareers, setExpandedCareers] = useState([]);
  const careers = [
    {
      title: "Deepixel",
      start: "2020-02",
      end: "2021-06",
      role: "Frontend Engineer",
      stacks: [
        "Vue.js",
        "Vuetify",
        "Vuex",
        "Node.js",
        "MySQL",
        "OpenGL",
        "JQuery",
      ],
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
        <CareerCard
          key={career.title}
          title={career.title}
          role={career.role}
          start={career.start}
          end={career.end}
          stacks={career.stacks}
          element={career.element}
        />
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

export default CareerPage;
