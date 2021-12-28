import React, {useCallback, useEffect, useRef} from 'react';
import {getBlockList} from '../region';
import {handleBlockMove} from '../handlers';
import {useRender} from '../renderer';
import Block from './Block';
import c from './App.module.css';
import {size, containerStyle, windowHeight} from '../constant';
import {xyList} from '../utils';

const App = () => {
    useRender();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(
        () => {
            const handleTouchMove = (e: TouchEvent) => {
                e.preventDefault();
                const element = ref.current as HTMLDivElement;
                const rect = element.getBoundingClientRect();
                const mouseX = e.touches[0].clientX - rect.left + element.scrollLeft;
                const mouseY = e.touches[0].clientY - rect.top + element.scrollTop;
                const x = Math.floor(mouseX / size);
                const y = Math.floor(mouseY / size);
                handleBlockMove(x, y);
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (e.buttons) {
                    const element = ref.current as HTMLDivElement;
                    const rect = element.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left + element.scrollLeft;
                    const mouseY = e.clientY - rect.top + element.scrollTop;
                    const x = Math.floor(mouseX / size);
                    const y = Math.floor(mouseY / size);
                    handleBlockMove(x, y);
                }
            };

            document.body.addEventListener('touchmove', handleTouchMove, {passive: false});

            const element = ref.current as HTMLDivElement;
            element.addEventListener('mousemove', handleMouseMove);

            return () => {
                document.body.removeEventListener('touchmove', handleTouchMove);
                element.removeEventListener('mousemove', handleMouseMove);
            };
        },
        []
    );

    const handlePrev = useCallback(
        () => {
            const element = ref.current as HTMLDivElement;
            element.scrollBy(0, -windowHeight * 0.5);
        },
        []
    );

    const handleNext = useCallback(
        () => {
            const element = ref.current as HTMLDivElement;
            element.scrollBy(0, windowHeight * 0.5);
        },
        []
    );

    const blockList = getBlockList();

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
                {xyList.map((coordinate) => {
                    return (
                        <Block key={`${coordinate.x}-${coordinate.y}`} coordinate={coordinate} />
                    );
                })}
            </div>
            <div className={c.footer} onClick={handleNext}>
                next page
            </div>
        </>
    );
};

export default App;
