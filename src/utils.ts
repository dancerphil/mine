import {Block, Coordinate, Diff} from "./types";
import {getSurroundingBlocks} from "./region";
import {compact, sumBy} from "lodash";
import {intelligenceLevel, xNumber, yNumber} from "./constant";

export const xyList: Array<Coordinate> = [];

for (let y = 0; y < yNumber; y++) {
    for (let x = 0; x < xNumber; x++) {
        xyList.push({x, y});
    }
}

export const handleMark = (block: Block) => {
    block.mark = true;
};

export const handleReveal = (block: Block) => {
    if (block.reveal) {
        return;
    }
    block.reveal = true;
    if (block.mine) {
        block.mark = true;
        // getBlockList().forEach(block => {
        //     block.reveal = true;
        // });
        throw new Error('失败');
    }
    const {label} = block;
    if (label === 0) {
        // 这是一个深搜
        getSurroundingBlocks(block).forEach(handleReveal);
    }
};

export const applyDiff = (diff: Diff) => {
    const {mark, reveal} = diff;
    if(mark) {
        mark.forEach(handleMark);
    }
    if(reveal) {
        reveal.forEach(handleReveal);
    }
};

export const combineDiff = (diffList: Diff[]) => {
    const mark = compact(diffList.map(diff => diff.mark)).flat();
    const reveal = compact(diffList.map(diff => diff.reveal)).flat();
    return {mark, reveal};
};

const iterateeMaybeMine = (block: Block) => {
    // 已知是雷
    if (block.reveal && block.mine) {
        return 1;
    }
    // 未打开
    if (!block.reveal) {
        return 1;
    }
    return 0;
};

export const computeSmartDiff = (block: Block): Diff => {
    if (block.mine) {
        return {};
    }
    const blocks = getSurroundingBlocks(block);
    // 如果未打开的 block 数量正好，则把未打开的置为 mark
    if (sumBy(blocks, iterateeMaybeMine) === block.label) {
        return {
            mark: blocks.filter(b => !b.reveal)
        };
    }

    if (intelligenceLevel >= 1) {
        // 如果 mark 的 block 数量正好，则把未打开的置为 reveal
        if (sumBy(blocks, (block) => block.mark ? 1 : 0) === block.label) {
            return {
                reveal: blocks.filter(b => !b.mark)
            };
        }
    }
    return {};
};
