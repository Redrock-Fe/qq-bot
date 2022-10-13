export function checkTime(
  day: string,
  time: string
): {
  Y?: number;
  M?: number;
  D?: number;
  h: number;
  m: number;
  s: number;
} {
  if (day === '') {
    const timeArr = time.split(':');
    return {
      h: parseInt(timeArr[0]),
      m: parseInt(timeArr[1]),
      s: parseInt(timeArr[2]),
    };
  } else {
    const dayArr = day.split('-');
    const timeArr = time.split(':');
    return {
      Y: parseInt(dayArr[0]),
      M: parseInt(dayArr[1]),
      D: parseInt(dayArr[2]),
      h: parseInt(timeArr[0]),
      m: parseInt(timeArr[1]),
      s: parseInt(timeArr[2]),
    };
  }
}
