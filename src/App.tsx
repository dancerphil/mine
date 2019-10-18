import React, {useReducer, useEffect, CSSProperties} from 'react';
import {createSelector} from 'reselect';
import useWindowWidth from './useWindowWidth';
import {blockMap} from './region';
import {subscribe} from './renderer';
import Block from './Block';
import {Block as BlockType} from './types';
import styles from './App.module.css';

const containerStyleSelector = createSelector<number, number, CSSProperties>(
    (windowWidth) => windowWidth < 400 ? windowWidth : 400,
    (width) => ({width})
)

const sizeStyleSelector = createSelector<number, number, CSSProperties>(
    size => size,
    (size) => ({width: size, height: size})
)

const increase = (v: number) => v + 1;

const App = () => {
  const rerender = useReducer(increase, 0)[1];
  const windowWidth = useWindowWidth();
  const containerStyle = containerStyleSelector(windowWidth)
  const blockStyle = sizeStyleSelector((containerStyle.width as number) / 10);
  useEffect(
      () => subscribe(rerender as any),
      [rerender]
  )
  return (
      <div className={styles.container} style={containerStyle}>
        {Object.values(blockMap).map((block: BlockType) => (
            <Block key={block.id} block={block} style={blockStyle} />
        ))}
      </div>
  );
}

export default App;
