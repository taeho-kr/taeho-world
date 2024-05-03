import styled from "styled-components";
import { rowBox } from "../../../styles";

const StoryArea = () => {

    const badges = [
        {
            id: 1,
            title: "Badge 1",
            image: "https://via.placeholder.com/150",
            description: "Badge 1 description"
        },
        {
            id: 2,
            title: "Badge 2",
            image: "https://via.placeholder.com/150",
            description: "Badge 2 description"
        },
        {
            id: 3,
            title: "Badge 3",
            image: "https://via.placeholder.com/150",
            description: "Badge 3 description"
        },
        {
            id: 4,
            title: "Badge 4",
            image: "https://via.placeholder.com/150",
            description: "Badge 4 description"
        },
        {
            id: 5,
            title: "Badge 5",
            image: "https://via.placeholder.com/150",
            description: "Badge 5 description"
        },
        {
            id: 6,
            title: "Badge 6",
            image: "https://via.placeholder.com/150",
            description: "Badge 6 description"
        },
        {
            id: 7,
            title: "Badge 7",
            image: "https://via.placeholder.com/150",
            description: "Badge 7 description"
        },
        {
            id: 8,
            title: "Badge 8",
            image: "https://via.placeholder.com/150",
            description: "Badge 8 description"
        },
        {
            id: 9,
            title: "Badge 9",
            image: "https://via.placeholder.com/150",
            description: "Badge 9 description"
        },
        {
            id: 10,
            title: "Badge 10",
            image: "https://via.placeholder.com/150",
            description: "Badge 10 description"
        },
        {
            id: 11,
            title: "Badge 11",
            image: "https://via.placeholder.com/150",
            description: "Badge 11 description"
        },
        {
            id: 12,
            title: "Badge 12",
            image: "https://via.placeholder.com/150",
            description: "Badge 12 description"
        },
        {
            id: 13,
            title: "Badge 13",
            image: "https://via.placeholder.com/150",
            description: "Badge 13 description"
        }
    ]

    return (
        <ComponentWrapper>
            <BadgesContainer>
                {badges.map((badge) => (
                    <Badge key={badge.id} src={badge.image} />
                ))}
            </BadgesContainer>
        </ComponentWrapper>
    );
}

const ComponentWrapper = styled.div`
    width: 100%;
    padding: 8px 0;
    background-color: gray;
`

const BadgesContainer = styled.div`
    ${rowBox};
    align-items: center;
    width: 100%;
    height: 85px;
    overflow-x: scroll;
    gap: 1rem;
`

const Badge = styled.div<{ src: string }>`
    width: 56px;
    height: 56px;
    background-color: white;
    border-radius: 100%;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`

export default StoryArea;