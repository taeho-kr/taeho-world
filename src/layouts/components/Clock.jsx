import { useEffect, useState } from "react";
import styled from "styled-components";
import { centerBox, columnBox, rowBox } from "../../styles/components";
import { formatDatetime } from "../../utils/datetime";

const Clock = () => {
  const [time, setTime] = useState(formatDatetime(new Date()));

  useEffect(() => {
    setInterval(() => {
      setTime(formatDatetime(new Date()));
    }, 333);
  }, []);

  return (
    <ComponentWrapper>
      {time.split(" ").map((char) => {
        if (char === ":" || char === "-") return <span>{char}</span>;
        else return <TimeBlock>{char}</TimeBlock>;
      })}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${centerBox}
  ${columnBox}
  border: 1px solid black;
  border-radius: 0.5rem;
  margin: 0.25rem;
  padding: 0.5rem;
`;

const TimeBlock = styled.span`
  color: red;
  font-weight: bold;
  border: 1px solid black;
  padding: 0.25rem;
`;

export default Clock;
