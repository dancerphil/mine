export interface Block {
    id: string;
    x: number;
    y: number;
    mine: boolean;
    reveal: boolean;
    mark: boolean;
    label: number;
}
