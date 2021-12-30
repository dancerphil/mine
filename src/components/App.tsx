import React, {useRef} from 'react';
import {getBlockList} from '../region';
import {useRender} from '../renderer';
import Block from './Block';
import c from './App.module.css';
import {handleReset} from '../handlers';
import {panelStyle} from '../constant';
import {xyList} from '../utils';
import useEventListener from './useEventListener';

const App = () => {
    useRender();
    const ref = useRef<HTMLDivElement>(null);
    useEventListener(ref);

    const blockList = getBlockList();

    return (
        <>
            <div className={c.header} onTouchEnd={handleReset}>
                {blockList.filter(item => item.mine && !item.mark).length}
            </div>
            <div className={c.content}>
                <div
                    className={c.panel}
                    style={panelStyle}
                    ref={ref}
                >
                    {xyList.map((coordinate) => {
                        return (
                            <Block key={`${coordinate.x}-${coordinate.y}`} coordinate={coordinate} />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default App;
