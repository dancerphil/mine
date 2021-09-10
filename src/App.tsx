import React, {useEffect, useRef} from 'react';
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

  useEffect(
      () => {
          const handler = (e: any) => {
              const element = ref.current as HTMLDivElement;
              const mouseX = e.pageX - element.offsetLeft
              const mouseY = e.pageY - element.offsetTop
              const x = Math.floor(mouseX / size)
              const y = Math.floor(mouseY / size)
              handleBlockMove(x, y);
          }

          const handleTouchMove = (e: TouchEvent) => {
              e.preventDefault()
              handler(e)
          }

          const handleMouseMove = (e: MouseEvent) => {
              if (e.buttons) {
                  handler(e)
              }
          }

          document.body.addEventListener('touchmove', handleTouchMove, {passive: false})

          const element = ref.current as HTMLDivElement;
          element.addEventListener('mousemove', handleMouseMove)

          return () => {
              document.body.removeEventListener('touchmove', handleTouchMove);
              element.removeEventListener('mousemove', handleMouseMove)
          }
      },
      [size]
  )

  return (
      <div
          className={styles.container}
          style={containerStyle}
          ref={ref}
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
