import {sumBy} from 'lodash';
import {rerender} from './renderer';
import {getBlock, setBlock, getBlockList, getSurroundingBlocks} from './region';
import {Block, Coordinate} from './types';
import {intelligenceLevel, mineNumber, xNumber, yNumber} from "./constant";
import {xyList, applyDiff, computeSmartDiff, handleReveal} from "./utils";

let start = false;

export const handleReset = () => {
    xyList.forEach(({x, y}) => {
        const block = {
            x,
            y,
            mine: false,
            reveal: false,
            mark: false,
            label: 0,
        };
        setBlock({x, y}, block);
    });
    start = false;
    rerender();
};

handleReset();

const fillMap = () => {
    getBlockList().forEach((block) => {
        block.mine = false;
    });

    let mineCount = 0;
    while (mineCount < mineNumber) {
        const x = Math.floor(Math.random() * xNumber);
        const y = Math.floor(Math.random() * yNumber);
        const block = getBlock({x, y}) as Block;
        if (!block.mine) {
            block.mine = true;
            mineCount ++;
        }
    }

    getBlockList().forEach((block) => {
        const blocks = getSurroundingBlocks(block);
        block.label = sumBy(blocks, 'mine');
    });
};

const fillMapUntilValid = (block: Block) => {
    for (let i = 0; i < 100; i++) {
        fillMap();
        if (!block.mine && block.label === 0) {
            return;
        }
    }
};

const handleSmartRoot = (block: Block) => {
    const diff = computeSmartDiff(block);
    applyDiff(diff);

    if (intelligenceLevel >= 3) {
        const diffList = getSurroundingBlocks(block).filter(block => block.reveal).map(computeSmartDiff);
        diffList.forEach(applyDiff);
    }
};

export const handleBlockClick = (coordinate: Coordinate) => {
    const block = getBlock(coordinate);
    if (!block){
        return;
    }
    if (!start){
        fillMapUntilValid(block);
        start = true;
    }
    const {reveal} = block;
    if (reveal) {
        handleSmartRoot(block);
    } else {
        handleReveal(block);
        if (intelligenceLevel >= 2) {
            handleSmartRoot(block);
        }
    }
};

export const handleBlockClickWithCatch = (coordinate: Coordinate) => {
    try {
        handleBlockClick(coordinate);
    } catch (e) {
        console.error(e);
    } finally {
        rerender();
    }
};
