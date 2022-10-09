import dayjs from 'dayjs';

export const getToday = () => dayjs().format('YYYY-MM-DD');

export const getNowTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

