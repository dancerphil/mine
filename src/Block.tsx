import React, {CSSProperties, useCallback} from 'react';
import cx from 'classnames';
import {Block as BlockType} from './types';
import styles from './Block.module.css';
import theme from './Theme2.module.css';
import {handleBlockClick} from "./region";

interface Props {
    block: BlockType
    style: CSSProperties
}

const Block = ({block, style}: Props) => {
    const {mine, reveal, mark, label} = block;
    const handleClick = useCallback(
        () => handleBlockClick(block),
        [block]
    )
    if (!reveal) {
        const className = cx(
            styles.block,
            theme.cover,
            {
                [theme.mark]: mark,
            }
        )
        return (
            <div
                className={className}
                style={style}
                onClick={handleClick}
            >
                {mark && 'm'}
            </div>
        )
    }
    const className = cx(
        styles.block,
        theme.reveal,
        {
            [theme[`label${label}`]]: !mine,
            [theme.mine]: mine,
        }
    )
    return (
        <div
            className={className}
            style={style}
            onClick={handleClick}
        >
            {mine ? '!' :  label}
        </div>
    )
}

export default Block;
