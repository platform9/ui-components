import React from 'react';
interface Props {
    onRefresh?: (event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>) => void;
}
declare const RefreshButton: ({ onRefresh }: Props) => JSX.Element;
export default RefreshButton;
