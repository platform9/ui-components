/// <reference types="react" />
import Theme from '../../theme-manager/themes/model';
export interface PieDataEntry {
    value: number;
    name: string;
    color: keyof Theme['components']['graph'];
}
export interface PieGraphProps {
    data: PieDataEntry[];
    width?: number;
    height?: number;
    sideLength?: number;
    arcWidth?: number;
    percent?: number;
    startAngle?: number;
    endAngle?: number;
    primary?: string;
    empty?: boolean;
    healthColor?: PieDataEntry['color'];
}
declare const PieGraph: ({ data, sideLength, arcWidth, percent, primary, empty, healthColor, startAngle, endAngle, width, height, ...rest }: PieGraphProps) => JSX.Element;
export default PieGraph;
