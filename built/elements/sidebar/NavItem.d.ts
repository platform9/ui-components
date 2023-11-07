/// <reference types="react" />
import { IRouterLink } from '../../plugins/model';
export interface NavItemProps extends IRouterLink {
    isActive?: boolean;
    tooltip?: boolean;
    open?: boolean;
    compact?: boolean;
    activeDisplayType?: 'background' | 'bar';
    className?: string;
    tooltipProps?: {
        [key: string]: any;
    };
    disableLink?: boolean;
    hideExternalLinkIcon?: boolean;
    externalLinkIcon?: string;
}
export default function NavItem({ name, link, icon, className, open, isActive, compact, tooltip, tooltipProps, activeDisplayType, disableLink, hideExternalLinkIcon, externalLinkIcon, }: NavItemProps): JSX.Element;
