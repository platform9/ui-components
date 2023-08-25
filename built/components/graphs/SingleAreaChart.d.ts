import React from 'react';
interface Props {
    values: {
        [key: string]: string | number;
    }[];
    xAxis: string;
    dataKey: string;
    lineColor?: string;
    fillColor?: string;
    height?: number;
    legendContent?: React.ReactElement;
    legendLabelFn?: (key: string) => string;
    tooltipFormatterFn?: (value: string | number, key: string) => string | [string, string];
}
export default function SingleAreaChart({ values, xAxis, dataKey, lineColor, fillColor, height, legendLabelFn, tooltipFormatterFn, }: Props): JSX.Element;
export {};
