import { BadgeVariant } from '../../elements/badge/Badge';
interface BadgeInfo {
    text: string;
    tooltipText?: string;
    additionalText?: string;
}
interface BaseBadgesProps {
    values?: BadgeInfo[];
    variant?: BadgeVariant;
    ellipsisAt?: number;
    showMoreButton?: boolean;
    bold?: boolean;
}
export interface BadgesProps extends BaseBadgesProps {
    entityType?: 'labels' | 'annotations' | 'string';
    containerType?: 'panel' | 'table';
    maxVisible?: number;
    testId?: string;
}
export interface LabelParams extends BadgesProps {
    defaultValue?: string;
    type?: BadgesProps['containerType'];
}
export interface RenderLabelParams extends LabelParams {
    separator?: string;
    ellipsisAt?: number;
}
export interface LabelProps extends Omit<BadgesProps, 'entityType'> {
    separator?: string;
    labels: {
        [key: string]: string | number;
    };
}
export interface AnnotationProps extends Omit<BadgesProps, 'entityType'> {
    separator?: string;
    annotations: {
        [key: string]: string | number;
    };
}
export {};
