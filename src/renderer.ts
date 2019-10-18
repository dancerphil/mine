type Listener = () => void;

const createRenderer = () => {
    const listeners: Listener[] = [];
    const rerender = () => {
        listeners.forEach(listener => listener());
    }
    const subscribe = (listener: Listener) => {
        listeners.push(listener);
        return () => {
            listeners.splice(listeners.indexOf(listener), 1);
        }
    }
    return {rerender, subscribe};
}

export const {rerender, subscribe} = createRenderer()
