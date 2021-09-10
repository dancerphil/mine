import {sumBy, compact} from 'lodash';
import {createMappedRegion} from 'region-core';
import {rerender} from './renderer';
import {Block} from './types';

const blockRegion = createMappedRegion<{x: number, y: number}, Block>();

const getBlock = (x: number, y: number) => blockRegion.getValue({x, y}) as Block;

export const getBlockList = (): Block[] => {
    const arr: Block[] = []
    for (let i = 0; i < 1000; i++) {
        const [x, y] = getXY(i);
        arr.push(getBlock(x, y))
    }
    return arr;
}

let start = false;

const getXY = (i: number) => {
    return [i % 10, Math.floor(i / 10)]
}

const getSurroundingBlocks = (block: Block) => {
    const {x, y} = block;
    const blockList = [
        getBlock(x - 1, y - 1), getBlock(x - 1, y), getBlock(x - 1, y + 1),
        getBlock(x, y - 1), getBlock(x, y + 1),
        getBlock(x + 1, y - 1), getBlock(x + 1, y), getBlock(x + 1, y + 1),
    ]
    return compact(blockList);
}

const createBlock = (i: number): Block => {
    const [x, y] = getXY(i);
    return {
        x,
        y,
        mine: false,
        reveal: false,
        mark: false,
        label: 0,
    }
}

const resetMap = () => {
    for (let i = 0; i < 1000; i++) {
        const block = createBlock(i)
        blockRegion.set({x: block.x, y: block.y}, block);
    }
}

resetMap();

const fillMap = () => {
    getBlockList().forEach((block) => {
        block.mine = false;
    })

    let mineCount = 0;
    while (mineCount < 150) {
        const i = Math.floor(Math.random() * 1000)
        const [x, y] = getXY(i)
        const block = blockRegion.getValue({x, y}) as Block
        if (!block.mine) {
            block.mine = true;
            mineCount ++;
        }
    }

    getBlockList().forEach((block) => {
        const blocks = getSurroundingBlocks(block);
        block.label = sumBy(blocks, 'mine')
    })
}

const fillMapUntilValid = (block: Block) => {
    for (let i = 0; i < 100; i++) {
        fillMap();
        if (!block.mine && block.label === 0) {
            return
        }
    }
}

const handleMark = (block: Block) => {
    block.mark = true;
}

const handleReveal = (block: Block) => {
    if (block.reveal) {
        return;
    }
    block.reveal = true;
    if (block.mine) {
        console.error('失败')
        getBlockList().forEach(block => {
            block.reveal = true;
        })
        return;
    }
    const {label} = block
    if (label === 0) {
        // 这是一个深搜
        getSurroundingBlocks(block).forEach(handleReveal)
    }
}

const handleSmart = (block: Block) => {
    const blocks = getSurroundingBlocks(block);
    // 如果 reveal 的 block 数量正好，则把未打开的置为 mark
    if (sumBy(blocks, (block) => block.reveal ? 0 : 1) === block.label) {
        blocks.filter(b => !b.reveal).forEach(handleMark);
        return;
    }
    // 如果 mark 的 block 数量正好，则把未打开的置为 reveal
    if (sumBy(blocks, (block) => block.mark ? 1 : 0) === block.label) {
        blocks.filter(b => !b.mark).forEach(handleReveal)
    }
}

export const handleBlockClick = (block: Block) => {
    if (!start){
        fillMapUntilValid(block);
        start = true
    }
    const {reveal} = block
    if (reveal) {
        handleSmart(block);
    } else {
        handleReveal(block);
    }
    rerender()
}

export const handleBlockMove = (x: number, y: number) => {
    const block = getBlock(x, y);
    if (block) {
        handleBlockClick(block)
    }
}
