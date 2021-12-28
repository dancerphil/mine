import React, {useCallback, useRef} from 'react';
import {getBlockList} from '../region';
import {useRender} from '../renderer';
import Block from './Block';
import c from './App.module.css';
import {containerStyle, windowHeight} from '../constant';
import {xyList} from '../utils';
import useEventListener from './useEventListener';

const App = () => {
    useRender();
    const ref = useRef<HTMLDivElement>(null);
    useEventListener(ref);

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
