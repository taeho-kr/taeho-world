import styled from "styled-components"

const NamePlate = ({ guildName, positionInGuild, title, name }) => {
    return (
        <ComponentWrapper>
            {guildName && <GuildName>{guildName}</GuildName>}
            {positionInGuild && <PositionInGuild>{positionInGuild}</PositionInGuild>}
            {title && <CharacterTitle>{title}</CharacterTitle>}
            <CharacterName>{name}</CharacterName>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    color: #83838395;
    font-size: 1.25rem;
    font-weight: bolder;
    text-shadow: 0px 0px 1px #686868e1;
`

const GuildName = styled.span`
    color: #169256;
`

const PositionInGuild = styled.span`
    color: grey;
`

const CharacterTitle = styled.span`
    color: rgb(254,159,0);
`

const CharacterName = styled.span`
    color: #ced19c;
`

export default NamePlate