export const type = [
    { id: 1, name: "어비스 레이드" },
    { id: 2, name: "군단장 레이드 스페셜" },
    { id: 3, name: "어비스 던전" },
    { id: 4, name: "군단장 레이드" },
]

export const targets = [
    { type: 1, name: "아르고스", stage: 3, requireLevel: [1370, 1370, 1370] },
    { type: 2, name: "쿠크세이튼", stage: 3, requireLevel: [1385, 1385, 1385] },
    { type: 2, name: "아브렐슈드", stage: 4, requireLevel: [1385, 1385, 1385] },
    { type: 2, name: "일리아칸", stage: 3, requireLevel: [1385, 1385, 1385] },
    { type: 3, name: "카양겔", difficulty: ["노말", "하드1", "하드2", "하드3"], stage: 2, requireLevel: [[1475, 1475], [1520, 1520], [1560, 1560], [1580, 1580]] },
    { type: 4, name: "발탄", difficulty: ["노말", "하드", "헬"], stage: 2, requireLevel: [[1415, 1415], [1445, 1445], [1445, 1445]] },
    { type: 4, name: "비아키스", difficulty: ["노말", "하드", "헬"], stage: 3, requireLevel: [[1430, 1430, 1430], [1460, 1460, 1460], [1460, 1460, 1460]] },
    { type: 4, name: "쿠크세이튼", difficulty: ["노말", "헬"], stage: 3, requireLevel: [[1475, 1475, 1475], [1475, 1475, 1475]] },
    { type: 4, name: "아브렐슈드", difficulty: ["노말", "하드"], stage: 6, requireLevel: [[1490, 1490, 1500, 1500, 1520, 1520], [1540, 1540, 1550, 1550, 1560, 1560]] },
    { type: 4, name: "일리아칸", difficulty: ["노말", "하드"], stage: 3, requireLevel: [[1580, 1580, 1580], [1600, 1600, 1600]] },
]

export const purposes = [
    "트라이",
    "클리어 경험",
    "반숙련자",
    "숙련자",
    "숙제",
    "달인의 경지",
    "즐겜",
    "무적의 공격대"
]