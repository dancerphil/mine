import {useEffect, RefObject} from 'react';
import {createRegion} from 'region-core';
import {handleBlockClickWithCatch} from '../handlers';
import {size} from '../constant';
import {Coordinate} from "../types";

const currentCoordinateRegion = createRegion<Coordinate>();

export const useCurrentCoordinate = currentCoordinateRegion.useValue;

const setCurrentCoordinate = (coordinate: Coordinate) => {
    currentCoordinateRegion.set(prev => {
        if(!prev || prev.x !== coordinate.x || prev.y !== coordinate.y) {
            return coordinate;
        }
        return prev;
    });
};

const resetCurrentCoordinate = currentCoordinateRegion.reset;

const getCoordinate = (element: HTMLDivElement, clientX: number, clientY: number): Coordinate => {
    const rect = element.getBoundingClientRect();
    const mouseX = clientX - rect.left + element.scrollLeft;
    const mouseY = clientY - rect.top + element.scrollTop;
    const x = Math.floor(mouseX / size);
    const y = Math.floor(mouseY / size);
    return {x, y};
};

interface Params {
    clientX: number;
    clientY: number;
}

const withTouch = (handler: (e: Params) => void) => (e: TouchEvent) => {
    e.preventDefault();
    const clientX = e.changedTouches[0].clientX;
    const clientY = e.changedTouches[0].clientY;
    handler({clientX, clientY});
};

const withMouse = (handler: (e: Params) => void) => (e: MouseEvent) => {
    if (e.buttons) {
        const clientX = e.clientX;
        const clientY = e.clientY;
        handler({clientX, clientY});
    }
};

const useEventListener = (ref: RefObject<HTMLDivElement>) => {
    useEffect(
        () => {
            const element = ref.current;

            if (!element) {
                return;
            }

            const handleStart = ({clientX, clientY}: Params) => {
                const coordinate = getCoordinate(element, clientX, clientY);
                setCurrentCoordinate(coordinate);
            };

            const handleTouchStart = withTouch(handleStart);
            const handleMouseDown = withMouse(handleStart);

            const handleMove = ({clientX, clientY}: Params) => {
                const coordinate = getCoordinate(element, clientX, clientY);
                setCurrentCoordinate(coordinate);
                handleBlockClickWithCatch(coordinate);
            };

            const handleTouchMove = withTouch(handleMove);
            const handleMouseMove = withMouse(handleMove);

            const handleEnd = ({clientX, clientY}: Params) => {
                const coordinate = getCoordinate(element, clientX, clientY);
                handleBlockClickWithCatch(coordinate);
                resetCurrentCoordinate();
            };

            const handleTouchEnd = withTouch(handleEnd);
            const handleMouseUp = withMouse(handleEnd);

            // passive false 禁止默认滚动
            document.body.addEventListener('touchstart', handleTouchStart);
            document.body.addEventListener('mousedown', handleMouseDown);
            document.body.addEventListener('touchmove', handleTouchMove, {passive: false});
            document.body.addEventListener('mousemove', handleMouseMove);
            document.body.addEventListener('touchend', handleTouchEnd);
            document.body.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.body.removeEventListener('touchstart', handleTouchStart);
                document.body.removeEventListener('mousedown', handleMouseDown);
                document.body.removeEventListener('touchmove', handleTouchMove);
                document.body.removeEventListener('mousemove', handleMouseMove);
                document.body.removeEventListener('touchend', handleTouchEnd);
                document.body.removeEventListener('mouseup', handleMouseUp);
            };
        },
        [ref]
    );

    return ref;
};

export default useEventListener;
