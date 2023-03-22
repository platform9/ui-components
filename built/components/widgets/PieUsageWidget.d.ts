/// <reference types="react" />
import { PieDataEntry } from '../../components/graphs/PieGraph';
export interface PieUsageWidgetProps {
    primary?: string;
    sideLength?: number;
    arcWidth?: number;
    data: PieDataEntry[];
    className?: string;
    showPercent?: boolean;
}
export declare const PieLegend: ({ data }: {
    data: any;
}) => JSX.Element;
declare const PieUsageWidget: ({ primary, data, className, showPercent, ...rest }: PieUsageWidgetProps) => JSX.Element;
export default PieUsageWidget;
