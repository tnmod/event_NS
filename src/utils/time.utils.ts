export const getTime = () => {
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const formattedTime = currentDate.toLocaleTimeString('en-US', options);
    return `${formattedDate}/${formattedTime}`;
}