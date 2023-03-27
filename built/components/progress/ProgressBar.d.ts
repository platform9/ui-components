import { FC } from 'react';
type LabelRenderProp = (value: string) => string;
interface Props {
    percent: number | string;
    animated?: boolean;
    width?: string | number;
    height?: string | number;
    containedPercent?: boolean;
    label?: string | JSX.Element | LabelRenderProp;
    variant?: 'progress' | 'health';
    color?: 'error' | 'success' | 'primary';
    showPercent?: boolean;
}
declare const ProgressBar: FC<Props>;
export default ProgressBar;
