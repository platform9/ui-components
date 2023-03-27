/// <reference types="react" />
type AreaChartEntry<T extends string, V extends string> = {
    [P in T | V]: any;
};
export interface AreaChartType<T> {
    name: T;
    color: string;
    icon?: string;
}
interface Props<T extends string, V extends string> {
    values: Array<AreaChartEntry<T, V>>;
    width?: number;
    height?: number;
    xAxis: T;
    keys: Array<AreaChartType<V>>;
    responsive?: boolean;
    responsiveHeight?: number;
    verticalAxisLines?: boolean;
    horizontalAxisLines?: boolean;
    CustomTooltip?: JSX.Element;
}
declare function StackedAreaChart<Axis extends string, Types extends string>({ values, width, height, keys, xAxis, verticalAxisLines, horizontalAxisLines, responsive, responsiveHeight, CustomTooltip, }: Props<Axis, Types>): JSX.Element;
export default StackedAreaChart;
