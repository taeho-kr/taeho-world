
export const groupArrayByAttribute = (data, attrName) => {
    if (!Array.isArray(data)) return []

    console.log(data, attrName)
    data.reduce((acc, cur) => {
        if (acc[attrName]) acc[attrName].push(cur)
        else acc[attrName] = [cur]
        return acc
    })

    return data
}