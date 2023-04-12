/// <reference types="react" />
import { IRouterLink } from '../../plugins/model';
interface Props extends IRouterLink {
    isActive?: boolean;
    tooltip?: boolean;
    open?: boolean;
    compact?: boolean;
    activeDisplayType?: 'background' | 'bar';
    className?: string;
    tooltipProps?: {
        [key: string]: any;
    };
}
export default function NavItem({ name, link, icon, className, open, isActive, compact, tooltip, tooltipProps, activeDisplayType, }: Props): JSX.Element;
export {};
