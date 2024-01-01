import { useEffect, useState } from "react";
import styled from "styled-components";
import { centerBox, columnBox, rowBox } from "../../styles/components";
import { formatTime } from "../../utils/datetime";

const Clock = () => {
  const [time, setTime] = useState(formatTime(new Date()));
  const [date, setDate] = useState(new Date().getDate());
  const weekDays = [
    { value: 0, text: "SUN" },
    { value: 1, text: "MON" },
    { value: 2, text: "TUE" },
    { value: 3, text: "WED" },
    { value: 4, text: "THU" },
    { value: 5, text: "FRI" },
    { value: 6, text: "SAT" },
  ];

  useEffect(() => {
    setInterval(() => {
      setTime(formatTime(new Date()));
      setDate(new Date().getDate());
    }, 99);
  }, []);

  return (
    <ComponentWrapper>
      <WeekDaysConatiner>
        {weekDays.map((day) => {
          return day.value === date ? (
            <SelectedWeekDay key={day.value}>{day.text}</SelectedWeekDay>
          ) : (
            <span key={day.value}>{day.text}</span>
          );
        })}
      </WeekDaysConatiner>
      <TimeContainer>
        {time.split("").map((char, i) => {
          return <TimeBlock key={i}>{char}</TimeBlock>;
        })}

      </TimeContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${centerBox}
  ${columnBox}
  border: 1px solid var(--gray);
  border-radius: 0.25rem;
  gap: 0.25rem;
  margin: 0.25rem;
  padding: 0.5rem;
  background-color: var(--light-gray);
  box-shadow: 0.0625rem 0.0625rem 0.25rem 0 var(--gray) inset;
`;

const WeekDaysConatiner = styled.div`
  ${rowBox}
  align-items: baseline;
  font-size: 0.6rem;
  gap: 0.2rem;
  color: var(--gray);
`;

const SelectedWeekDay = styled.strong`
  font-size: 0.7rem;
  color: var(--black);
`;

const TimeContainer = styled.div`
  ${rowBox}
`;

const TimeBlock = styled.span`
  font-weight: bold;
  width: 1rem;
  text-align: center;
`;

export default Clock;
