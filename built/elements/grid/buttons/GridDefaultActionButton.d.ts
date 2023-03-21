/// <reference types="react" />
import { BatchActionButtonProps } from 'src/elements/grid/hooks/useGridSelectableRows';
import { ButtonProps } from 'src/elements/button/Button';
export type GridDefaultActionButtonProps<T> = ButtonProps & BatchActionButtonProps<T>;
export default function GridDefaultActionButton<T>({ className, disabled, children, onClick, icon, solidIcon, tooltip, ...rest }: GridDefaultActionButtonProps<T>): JSX.Element;
