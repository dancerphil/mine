import {sumBy, compact} from 'lodash';
import {rerender} from './renderer';
import {Block} from './types';

interface BlockMap {
    [key: string]: Block
}

export const blockMap: BlockMap = {};

let start = false;

const getXY = (i: number) => {
    return [i % 10, Math.floor(i / 10)]
}

const getId = (x: number, y: number) => {
    return `${x},${y}`;
}

const getSurroundingBlocks = (block: Block) => {
    const {x, y} = block;
    const blockIndexList = [
        getId(x - 1, y - 1), getId(x - 1, y), getId(x - 1, y + 1),
        getId(x, y - 1), getId(x, y + 1),
        getId(x + 1, y - 1), getId(x + 1, y), getId(x + 1, y + 1),
    ]
    return compact(blockIndexList.map(id => blockMap[id]));
}

const createBlock = (i: number) => {
    const [x, y] = getXY(i);
    const id = getId(x, y);
    return {
        id,
        x,
        y,
        mine: false,
        reveal: false,
        mark: false,
        label: 0,
    }
}

const fillMap = () => {
    Object.values(blockMap).forEach((block) => {
        block.mine = false
    })

    let mineCount = 0;
    while (mineCount < 150) {
        const i = Math.floor(Math.random() * 1000)
        const [x, y] = getXY(i)
        const id = getId(x, y)
        const block = blockMap[id]
        if (!block.mine) {
            block.mine = true;
            mineCount ++;
        }
    }

    Object.values(blockMap).forEach((block) => {
        const blocks = getSurroundingBlocks(block);
        block.label = sumBy(blocks, 'mine')
    })
}

const resetMap = () => {
    for (let i = 0; i < 1000; i++) {
        const block = createBlock(i)
        blockMap[block.id] = block;
    }
}

resetMap();

const handleValidFillMap = (block: Block) => {
    fillMap();
    let c = 0
    while (c++ < 100) {
        fillMap();
        if (!block.mine && block.label === 0) {
            return
        }
    }
}

const handleFail = () => {
    Object.values(blockMap).forEach(block => {
            block.reveal = true;
    })
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
        handleFail()
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
    if (sumBy(blocks, (block) => block.reveal ? 0 : 1) === block.label) {
        blocks.filter(b => !b.reveal).forEach(handleMark);
        return;
    }
    if (sumBy(blocks, (block) => block.mark ? 1 : 0) === block.label) {
        blocks.filter(b => !b.mark).forEach(handleReveal)
    }
}

export const handleBlockClick = (block: Block) => {
    if (!start){
        handleValidFillMap(block);
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
