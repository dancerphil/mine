import {memo} from "react";
import {useCurrentCoordinate} from "./useEventListener";
import {castRangeStyle, intelligenceLevel, size} from '../constant';
import c from './CastRange.module.css';

function CastRange() {
    const currentCoordinate = useCurrentCoordinate();
    if (intelligenceLevel < 3) {
        return null;
    }
    if (!currentCoordinate) {
        return null;
    }
    const {x, y} = currentCoordinate;
    return <div className={c.castRange} style={{...castRangeStyle, left: (x - 1) * size, top: (y - 1) * size}} />;
}

export default memo(CastRange);
