export interface Coordinate {
    x: number;
    y: number;
}

export interface Block {
    x: number;
    y: number;
    mine: boolean;
    reveal: boolean;
    mark: boolean;
    label: number;
}
