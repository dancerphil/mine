import {Coordinate} from "./types";

export const xyList: Array<Coordinate> = [];

for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 10; x++) {
        xyList.push({x, y});
    }
}
