export const sort = (arr, std, option = "INCREASE") => {
    if (std) return arr.sort((a, b) => option === "INCREASE" ? a[`${std}`] - b[`${std}`] : b[`${std}`] - a[`${std}`])
    else return arr.sort((a, b) => option === "INCREASE" ? a - b : b - a)
} 