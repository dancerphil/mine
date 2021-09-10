import React, {useCallback, useEffect, useRef} from 'react';
import {getBlockList, handleBlockMove} from './region';
import {useRender} from './renderer';
import Block from './Block';
import {Block as BlockType} from './types';
import c from './App.module.css';

const App = () => {
    useRender()
    const ref = useRef<HTMLDivElement>(null)
    const windowWidth = window.outerWidth
    const windowHeight = window.outerHeight
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

    const handlePrev = useCallback(
        () => {
            const element = ref.current as HTMLDivElement;
            element.scrollBy(0, -windowHeight * 0.8)
        },
        [windowHeight]
    )

    const handleNext = useCallback(
        () => {
            const element = ref.current as HTMLDivElement;
            element.scrollBy(0, windowHeight * 0.8)
        },
        [windowHeight]
    )

    const blockList = getBlockList()

    return (
        <>
            <div className={c.header} onClick={handlePrev}>
                {blockList.filter(item => item.mine && !item.mark).length}
            </div>
            <div
                className={c.container}
                style={containerStyle}
                ref={ref}
            >
                {blockList.map((block: BlockType) => {
                    const {x, y} = block
                    return (
                        <Block key={`${x}-${y}`} block={block} style={blockStyle} />
                    )
                })}
            </div>
            <div className={c.footer} onClick={handleNext}>
                next page
            </div>
        </>
    );
}

export default App;
