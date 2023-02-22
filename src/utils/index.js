
const groupArrayByAttribute = (data, attrName) => {
    data.reduce((acc, cur) => {
        const a = attrName
        const { attrName } = cur
        if (acc[type]) acc[type].push(cur)
        else acc[type] = [cur]
        return acc
    }
}