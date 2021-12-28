import {compact} from 'lodash';
import {createMappedRegion} from 'region-core';
import {Block, Coordinate} from './types';
import {xyList} from "./utils";

const blockRegion = createMappedRegion<Coordinate, Block>();

export const getBlock = blockRegion.getValue;

export const useBlock = blockRegion.useValue;

export const setBlock = blockRegion.set;

export const getBlockList = (): Block[] => compact(xyList.map(getBlock));

export const getSurroundingBlocks = (block: Block) => {
    const {x, y} = block;
    const blockList = [
        getBlock({x: x - 1, y: y - 1}), getBlock({x: x - 1, y: y}), getBlock({x: x - 1, y: y + 1}),
        getBlock({x: x, y: y - 1}), getBlock({x: x, y: y + 1}),
        getBlock({x: x + 1, y: y - 1}), getBlock({x: x + 1, y: y}), getBlock({x: x + 1, y: y + 1}),
    ];
    return compact(blockList);
};
