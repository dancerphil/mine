import {sumBy} from 'lodash';
import {rerender} from './renderer';
import {getBlock, setBlock, getBlockList, getSurroundingBlocks} from './region';
import {Block, Coordinate} from './types';
import {intelligenceLevel, mineNumber, xNumber, yNumber} from "./constant";
import {xyList} from "./utils";

let start = false;

const resetMap = () => {
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
};

resetMap();

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

const handleMark = (block: Block) => {
    block.mark = true;
};

const handleReveal = (block: Block) => {
    if (block.reveal) {
        return;
    }
    block.reveal = true;
    if (block.mine) {
        getBlockList().forEach(block => {
            block.reveal = true;
        });
        throw new Error('失败');
    }
    const {label} = block;
    if (label === 0) {
        // 这是一个深搜
        getSurroundingBlocks(block).forEach(handleReveal);
    }
};

const handleSmart = (block: Block) => {
    const blocks = getSurroundingBlocks(block);
    // 如果 reveal 的 block 数量正好，则把未打开的置为 mark
    if (sumBy(blocks, (block) => block.reveal ? 0 : 1) === block.label) {
        blocks.filter(b => !b.reveal).forEach(handleMark);
        return;
    }

    if (intelligenceLevel >= 1) {
        // 如果 mark 的 block 数量正好，则把未打开的置为 reveal
        if (sumBy(blocks, (block) => block.mark ? 1 : 0) === block.label) {
            blocks.filter(b => !b.mark).forEach(handleReveal);
        }
    }
};

const handleSmartRoot = (block: Block) => {
    handleSmart(block);

    if (intelligenceLevel >= 3) {
        getSurroundingBlocks(block).filter(block => block.reveal).forEach(handleSmart);
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
