import React from 'react';
import cx from 'classnames';
import styles from './Block.module.css';
import theme from './Theme2.module.css';
import {useBlock} from "../region";
import {handleBlockClick} from "../handlers";
import {blockStyle as style} from '../constant';
import {Coordinate} from "../types";

interface Props {
    coordinate: Coordinate
}

const Block = ({coordinate}: Props) => {
    const block = useBlock(coordinate);

    if (!block) {
        return null;
    }

    const {mine, reveal, mark, label} = block;

    const handleClick = () => handleBlockClick(block);

    if (!reveal) {
        const className = cx(
            styles.block,
            theme.cover,
            {
                [theme.mark]: mark,
            }
        );
        return (
            <div
                className={className}
                style={style}
                onClick={handleClick}
            >
                {mark && 'm'}
            </div>
        );
    }
    const className = cx(
        styles.block,
        theme.reveal,
        {
            [theme[`label${label}`]]: !mine,
            [theme.mine]: mine,
        }
    );
    return (
        <div
            className={className}
            style={style}
            onClick={handleClick}
        >
            {mine ? '!' :  label}
        </div>
    );
};

export default Block;
