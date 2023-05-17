/// <reference types="react" />
import { BadgesProps, RenderLabelParams, LabelParams, AnnotationProps, LabelProps } from './model';
import { GridCellProps } from '../../elements/grid/hooks/useGridRows';
export declare const defaultVariant: BadgesProps['variant'];
export declare const renderLabelsAsBadges: ({ variant, defaultValue }: LabelParams) => (labels: string[]) => JSX.Element;
export declare const renderResourceLabels: ({ separator, type, variant, ...rest }: RenderLabelParams) => (values: any) => JSX.Element;
export declare function createResourceLabelsCell<T>({ separator, type, variant }: RenderLabelParams): (props: GridCellProps<T, LabelProps['labels']>) => JSX.Element;
export declare function createResourceAnnotationsCell<T>(annotationProps: RenderLabelParams): (props: GridCellProps<T, AnnotationProps['annotations']>) => JSX.Element;
export declare const renderResourceAnnotations: ({ values, ...rest }: {
    [x: string]: any;
    values: any;
}) => JSX.Element;
