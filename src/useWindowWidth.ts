import {useState, useEffect} from 'react';

const getWindowWidth = () => {
    return window.outerWidth;
}

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState<number>(getWindowWidth);
    useEffect(
        () => {
            const updateWindowWidth = () => setWindowWidth(getWindowWidth());
            window.addEventListener('resize', updateWindowWidth);
            return () => window.removeEventListener('resize', updateWindowWidth);
        }
    );
    return windowWidth;
}

export default useWindowWidth;
