export const blockNumber = 1000;
export const mineNumber = 150;
export const xNumber = 10;
export const yNumber = 100;
// 0 mark，1 smart，2 reveal 时会 smart，3 smart 后会对周围 smart
export const intelligenceLevel = 3;
export const windowWidth = window.outerWidth;
export const windowHeight = window.outerHeight;
export const containerStyle = {width: windowWidth < 400 ? windowWidth : 400};
export const size = containerStyle.width / 10;
export const blockStyle = {width: size, height: size};
