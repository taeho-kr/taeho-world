import styled from "styled-components"
import PartyCard from "./partyCard"

const Parties = ({ groupId }) => {
    // const tempMembers = ["사격사령관"]
    const tempMembers = ["사격사령관", "먹물사령관"]
    // const tempMembers = ["사격사령관", "일격사령관", "먹물사령관"]

    const targets = [
        { type: "어비스 레이드", name: "아르고스", stages: 3, requireLevel: [1370, 1370, 1370] },
        { type: "리허설", name: "쿠크세이튼 리허설", stages: 3, requireLevel: [1385, 1385, 1385] },
        { type: "리허설", name: "아브렐슈드 리허설", stages: 4, requireLevel: [1385, 1385, 1385] },
        { type: "리허설", name: "일리아칸 리허설", stages: 3, requireLevel: [1385, 1385, 1385] },
        { type: "어비스 던전", name: "카양겔", level: ["노말", "하드1", "하드2", "하드3"], stages: 2, requireLevel: [[1475, 1475], [1520, 1520], [1560, 1560], [1580, 1580]] },
        { type: "군단장", name: "발탄", level: ["노말", "하드", "헬"], stages: 2, requireLevel: [[1415, 1415], [1445, 1445], [1445, 1445]] },
        { type: "군단장", name: "비아키스", level: ["노말", "하드", "헬"], stages: 3, requireLevel: [[1430, 1430, 1430], [1460, 1460, 1460], [1460, 1460, 1460]] },
        { type: "군단장", name: "쿠크세이튼", level: ["노말", "헬"], stages: 3, requireLevel: [[1475, 1475, 1475], [1475, 1475, 1475]] },
        { type: "군단장", name: "아브렐슈드", level: ["노말", "하드"], stages: 6, requireLevel: [[1490, 1490, 1500, 1500, 1520, 1520], [1540, 1540, 1550, 1550, 1560, 1560]] },
        { type: "군단장", name: "일리아칸", level: ["노말", "하드"], stages: 3, requireLevel: [[1580, 1580, 1580], [1600, 1600, 1600]] },
    ]

    const purposes = [
        "트라이",
        "클리어경험o",
        "반숙련자",
        "숙련자",
        "숙제",
        "달인의 경지",
        "즐겜",
        "무적의 공격대"
    ]

    const onClickMakeParty = () => {
        console.log("make party")
    }

    return (
        <ComponentWrapper>
            <input type="button" onClick={onClickMakeParty} value="파티 만들기" />
            {groupId}
            <PartyCard title={'title'} targetName={'카양겔'} targetLevel={'하드2'} purpose={'트라이'} members={tempMembers} progress={0} />
            {
                targets.map(el => {
                    return (<div>{el.type}-{el.name}</div>)
                })
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    
`

export default Parties