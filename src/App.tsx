import React, {useCallback, useRef} from 'react';
import useWindowWidth from './useWindowWidth';
import {getBlockList, handleBlockMove} from './region';
import {useRender} from './renderer';
import Block from './Block';
import {Block as BlockType} from './types';
import styles from './App.module.css';

const App = () => {
  useRender()
  const ref = useRef<HTMLDivElement>(null)
  const windowWidth = useWindowWidth();
  const containerStyle = {width: windowWidth < 400 ? windowWidth : 400}
  const size = containerStyle.width / 10
  const blockStyle = {width: size, height: size};

  const handleMouseMove = useCallback(
      (e) => {
          if (e.buttons) {
              const element = ref.current as HTMLDivElement;
              const mouseX = e.pageX - element.offsetLeft
              const mouseY = e.pageY - element.offsetTop
              const x = Math.floor(mouseX / size)
              const y = Math.floor(mouseY / size)
              handleBlockMove(x, y);
          }
      },
      [size]
  )

  return (
      <div
          className={styles.container}
          style={containerStyle}
          ref={ref}
          onMouseMove={handleMouseMove}
      >
        {getBlockList().map((block: BlockType) => {
          const {x, y} = block
          return (
              <Block key={`${x}-${y}`} block={block} style={blockStyle} />
          )
        })}
      </div>
  );
}

export default App;
