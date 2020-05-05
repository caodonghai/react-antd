//创建随机整数
export const creatRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

//创建随机颜色
export const createRandomColor = () => {
    return '#'+Math.floor(Math.random()*16777215).toString(16)
}

//自定义数组排序
export const customizeSort = (data = [], sortBy, sortField) => {
    // 第一个参数为需要排序的数组
    // 第二个参数为自定义排序数组
    // 第三个参数为排序字段
    const sortByObject = sortBy.reduce((obj, item, index) => ({
        ...obj,
        [item]: index
    }),{});
    return data.sort(
        (a, b) => sortByObject[a[sortField]] - sortByObject[b[sortField]]
    )
};

//