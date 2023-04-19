import React, { PropsWithChildren } from 'react';
import { Route } from '../../plugins/route';
interface Props {
    route?: Route;
    routeKey?: string;
    activeTab?: string;
    setActiveTab?: (value: any) => void;
    previewInHeader?: boolean;
    onClick?: (tab: string) => void;
    HeaderTitlePortal?: React.ComponentType<any>;
}
export default function Tabs({ route, routeKey, activeTab, setActiveTab, onClick, children, previewInHeader, HeaderTitlePortal, }: PropsWithChildren<Props>): JSX.Element;
export {};
