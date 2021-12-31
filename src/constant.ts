export const windowWidth = window.innerWidth;
export const windowHeight = window.innerHeight;

export const xNumber = 20;
export const size = Math.floor(windowWidth / xNumber);
export const yNumber = Math.floor(windowHeight * 0.95 / size); // 5vh header
export const blockNumber = xNumber * yNumber;
export const mineNumber = Math.floor(blockNumber * 0.2);
// 0 mark，1 smart，2 reveal 时会 smart，3 smart 后会对周围 smart
export const intelligenceLevel = 3;

export const panelStyle = {width: xNumber * size, height: yNumber * size};
export const blockStyle = {width: size, height: size};
export const castRangeStyle = {width: size * 3, height: size * 3};
