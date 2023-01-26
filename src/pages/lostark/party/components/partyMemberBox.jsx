import { useEffect, useState } from "react"
import styled from "styled-components"
import { getAllCharacters, getInfoCharacterProfile, requestAPI } from "../../../../api/lostark/openAPI"

const PartyMemberBox = ({ name = "", onClick }) => {
    const [info, setInfo] = useState()

    useEffect(() => {
        if (name === "") return
        getCharacterInfoForBox()
        getMainCharacter()
    }, [name])

    const getCharacterInfoForBox = () => {
        requestAPI({
            apiFunction: getInfoCharacterProfile({ name: name }),
            pass: calculatePower,
            fail: (err) => { console.log(err) },
            onProcess: () => { console.log("call character info") }
        })
    }

    const getMainCharacter = () => {
        requestAPI({
            apiFunction: getAllCharacters({ name: name }),
            pass: setMainCharacter,
            fail: (err) => { console.log(err) },
            onProcess: () => { console.log("call all characters") }
        })
    }

    const calculatePower = (spec) => {
        console.log(spec)
        setInfo((info) => { return { ...info, level: spec.ItemAvgLevel.replace(',', '') } })
    }

    const setMainCharacter = (characters) => {
        console.log(characters)
        setInfo((info) => { return { ...info, mainCharacter: characters.reduce((o1, o2) => o1.ItemAvgLevel >= o2.ItemAvgLevel ? o1 : o2).CharacterName } })
    }

    return (
        <ComponentWrapper filled={name} onClick={onClick}>
            {info ?
                <>
                    <MemberName>{`${name}(${info.mainCharacter})`}</MemberName>
                    <MemberSpecification>{info.level}</MemberSpecification>
                </>
                : <MemberName>{'공격대원 모집 중'}</MemberName>
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    padding: 0.125rem;
    border-radius: 0.125rem;
    border: 1px solid white;
    opacity: ${props => props.filled ? undefined : 0.5};
`

const MemberName = styled.span`
    
`

const MemberSpecification = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
`

export default PartyMemberBox