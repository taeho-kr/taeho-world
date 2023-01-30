import { atom } from "recoil"

export const modalState = atom({
    key: "modalState",
    default: {
        isOpen: false,
        children: null,
        useBackmark: false
    }
})

export const characterInfoState = atom({
    key: "characterInfoState",
    default: undefined
})

export const partyState = atom({
    key: "partyState",
    default: [
        { title: "title", target: { type: 3, name: "카양겔", difficulty: "하드2", stage: [1, 2] }, purpose: "트라이", members: [], progress: 0 },
        { title: "title", target: { type: 4, name: "쿠크세이튼", difficulty: "노말", stage: [1, 3] }, purpose: "숙제", members: [], progress: 0 },
        { title: "title", target: { type: 4, name: "일리아칸", difficulty: "하드", stage: [1, 3] }, purpose: "반숙련자", members: [], progress: 0 },
        { title: "title", target: { type: 4, name: "아브렐슈드", difficulty: "노말", stage: [3, 6] }, purpose: "무적의 공격대", members: [], progress: 0 },
        { title: "title", target: { type: 4, name: "일리아칸", difficulty: "노말", stage: [1, 3] }, purpose: "숙제", members: [], progress: 0 },
    ]
})

