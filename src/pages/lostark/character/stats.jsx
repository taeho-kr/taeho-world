import { useEffect, useState } from "react"
import styled from "styled-components"
import { sort } from "../../../utils/calculator"

const Stats = ({ data }) => {
    const validStats = ["치명", "특화", "신속"]
    const [statsData, setStatsData] = useState([])

    useEffect(() => {
        setStatsData(sortStats(data))
    }, [data])

    const sortStats = (stats) => {
        return sort([...stats], "Value", "DECREASE")
    }

    const getSumOfStatsPoint = () => {
        let sum = 0

        data.forEach(el => {
            if (validStats.includes(el.Type)) sum += Number(el.Value)
        })

        return sum
    }

    return (
        <ComponentWrapper>
            {getSumOfStatsPoint()}
            {
                statsData.map(el => {
                    return (
                        <StatsWrapper key={el.Type}>
                            <StatsName>{el.Type}</StatsName>
                            <StatsValue>{el.Value}</StatsValue>
                        </StatsWrapper>
                    )
                })
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const StatsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`

const StatsName = styled.span`
    font-weight: bolder;
`

const StatsValue = styled.span`
    font-weight: lighter;
`

export default Stats