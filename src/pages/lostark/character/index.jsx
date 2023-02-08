import { useEffect } from "react"
import { useRecoilState } from "recoil"
import styled from "styled-components"
import { getInfoCharacter, requestAPI } from "../../../api/lostark/openAPI"
import { characterInfoState } from "../../../store"
import Appearance from "./appearance"
import NamePlate from "./namePlate"
import Stats from "./stats"
import Tendencies from "./tendencies"

const CharacterPage = () => {
    const [info, setInfo] = useRecoilState(characterInfoState)

    useEffect(() => {
        callInfo()
    }, [])

    useEffect(() => {
        console.log(info)
    }, [info])

    const callInfo = () => {
        requestAPI({
            apiFunction: getInfoCharacter({ name: "포대사령관" }),
            onSuccess: setInfo,
            onError: (err) => { console.log(err) },
            onProcess: () => { console.log("call character info") }
        })
    }

    return (
        <ComponentWrapper>
            {
                info ?
                    <div>
                        <NamePlate guildName={info.GuildName} positionInGuild={info.GuildMemberGrade} title={info.Title} name={info.CharacterName} />
                        <Appearance image={info.CharacterImage} />
                        {info.Stats && <Stats data={info.Stats} />}
                        <Tendencies data={info.Tendencies} />
                    </div>
                    : <div>no char</div>
            }
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    
`

export default CharacterPage