import {sumBy} from 'lodash';
import {rerender} from './renderer';
import {getBlock, setBlock, getBlockList, getSurroundingBlocks} from './region';
import {Block} from './types';
import {mineNumber, xNumber, yNumber} from "./constant";
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
        console.error('失败');
        getBlockList().forEach(block => {
            block.reveal = true;
        });
        return;
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
    // 如果 mark 的 block 数量正好，则把未打开的置为 reveal
    if (sumBy(blocks, (block) => block.mark ? 1 : 0) === block.label) {
        blocks.filter(b => !b.mark).forEach(handleReveal);
    }
};

export const handleBlockClick = (block?: Block) => {
    if (!block){
        return;
    }
    if (!start){
        fillMapUntilValid(block);
        start = true;
    }
    const {reveal} = block;
    if (reveal) {
        handleSmart(block);
    } else {
        handleReveal(block);
    }
    rerender();
};

export const handleBlockMove = (x: number, y: number) => {
    const block = getBlock({x, y});
    if (block) {
        handleBlockClick(block);
    }
};
