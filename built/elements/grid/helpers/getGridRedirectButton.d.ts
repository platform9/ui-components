import React from 'react';
import { GridDefaultActionButtonProps } from '../../../elements/grid/buttons/GridDefaultActionButton';
export default function getGridRedirectButton<T>(targetRoute: ((item: T) => string) | string, customButtonProps?: Partial<GridDefaultActionButtonProps<T>> | ((selectedItems: T[], isDisabled: boolean) => Partial<GridDefaultActionButtonProps<T>>)): React.FC<GridDefaultActionButtonProps<T>>;
