/// <reference types="react" />
import { BatchActionButtonProps } from '../../../elements/grid/hooks/useGridSelectableRows';
import { ButtonProps } from '../../../elements/button/Button';
export declare type GridDefaultActionButtonProps<T> = ButtonProps & BatchActionButtonProps<T>;
export default function GridDefaultActionButton<T>({ className, disabled, children, onClick, icon, solidIcon, tooltip, ...rest }: GridDefaultActionButtonProps<T>): JSX.Element;
