export type AlignVertical = 'top' | 'middle' | 'bottom';
export type AlignHorizontal = 'left' | 'middle' | 'right';
export interface MenuPlacementProps {
    align?: {
        vertical: AlignVertical;
        horizontal: AlignHorizontal;
    };
    offset?: {
        vertical: number;
        horizontal: number;
    };
}
export interface TooltipProps {
    message: string;
}
