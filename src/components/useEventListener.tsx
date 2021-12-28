import {useEffect, RefObject} from 'react';
import {handleBlockClickWithCatch} from '../handlers';
import {size} from '../constant';
import {Coordinate} from "../types";

function getCoordinate(element: HTMLDivElement, clientX: number, clientY: number): Coordinate {
    const rect = element.getBoundingClientRect();
    const mouseX = clientX - rect.left + element.scrollLeft;
    const mouseY = clientY - rect.top + element.scrollTop;
    const x = Math.floor(mouseX / size);
    const y = Math.floor(mouseY / size);
    return {x, y};
}

const useEventListener = (ref: RefObject<HTMLDivElement>) => {
    useEffect(
        () => {
            const element = ref.current;

            if (!element) {
                return;
            }

            const handleTouchMove = (e: TouchEvent) => {
                e.preventDefault();
                const coordinate = getCoordinate(element, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
                handleBlockClickWithCatch(coordinate);
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (e.buttons) {
                    const coordinate = getCoordinate(element, e.clientX, e.clientY);
                    handleBlockClickWithCatch(coordinate);
                }
            };

            // passive false 禁止默认滚动
            document.body.addEventListener('touchmove', handleTouchMove, {passive: false});
            document.body.addEventListener('touchend', handleTouchMove);
            document.body.addEventListener('mousemove', handleMouseMove);
            document.body.addEventListener('mouseup', handleMouseMove);

            return () => {
                document.body.removeEventListener('touchmove', handleTouchMove);
                document.body.removeEventListener('touchend', handleTouchMove);
                document.body.removeEventListener('mousemove', handleMouseMove);
                document.body.removeEventListener('mouseup', handleMouseMove);
            };
        },
        [ref]
    );

    return ref;
};

export default useEventListener;
