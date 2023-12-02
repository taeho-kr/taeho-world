import { useEffect, useState } from "react";
import styled from "styled-components";
import { centerBox } from "../../styles/components";
import { formatDatetime } from "../../utils/datetime";

const Clock = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      setTime(formatDatetime(new Date()));
    }, 333);
  }, []);

  return <ComponentWrapper>{time}</ComponentWrapper>;
};

const ComponentWrapper = styled.div`
  ${centerBox}
  width: 100%;
  height: 3rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  margin: 0.25rem;
`;

export default Clock;
