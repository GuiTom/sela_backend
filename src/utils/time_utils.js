const timeToFormatedDate = function (timestamp) {
    const date = new Date(timestamp); // 创建Date对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份（需要加1）
    const day = date.getDate(); // 获取日期
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
const timeToFormatedDateTime = function (timestamp) {
    const date = new Date(timestamp); // 创建Date对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份（需要加1）
    const day = date.getDate(); // 获取日期
    const hour = date.getHours(); // 获取小时
    const minute = date.getMinutes(); // 获取分钟
    const second = date.getSeconds(); // 获取秒
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formattedDate;
}
const timeToFormatedDateHour = function (timestamp) {
    const date = new Date(timestamp); // 创建Date对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份（需要加1）
    const day = date.getDate(); // 获取日期
    const hour = date.getHours(); // 获取小时
    const formattedDate = `${year}.${month}.${day} ${hour}h`;
    return formattedDate;
}
const timeToFormatedTime = function (timestamp) {
    const date = new Date(timestamp); // 创建Date对象
    const hour = date.getHours(); // 获取小时
    const minute = date.getMinutes(); // 获取分钟
    const second = date.getSeconds(); // 获取秒
    const formattedTime = `${hour}:${minute}:${second}`;
    return formattedTime;
}
const timeZoneOfffsetHours = function () {
    let offsetMinutes = new Date().getTimezoneOffset();
    // 注意：getTimezoneOffset()返回的是与UTC的负偏移量，所以实际上我们需要取其相反数  
    offsetMinutes = -offsetMinutes;
    // 转换为小时  
    let offsetHours = Math.floor(offsetMinutes / 60);

    return offsetHours;
}
export { timeToFormatedDateTime, timeToFormatedTime, timeToFormatedDateHour, timeToFormatedDate, timeZoneOfffsetHours };