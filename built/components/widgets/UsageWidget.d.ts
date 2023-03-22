/// <reference types="react" />
declare const defaultStats: {
    current: number;
    max: number;
    percent: number;
};
interface Props {
    title: string;
    units: string;
    stats: typeof defaultStats;
    precision?: number;
    usedText?: string;
}
export default function UsageWidget({ title, precision, units, usedText, stats, ...rest }: Props): JSX.Element;
export {};
