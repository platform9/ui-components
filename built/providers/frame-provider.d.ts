import React from 'react';
export interface IFrameContextRefs {
    sidebarPaneContainer: any;
    headerTitleContainer: any;
    headerPrimaryActionContainer: any;
    headerSharedToolsContainer: any;
    contentMainContainer: any;
}
export interface IFullFrameContext extends IFrameContextRefs {
    setFrameContainerRef: (payload: Partial<IFrameContextRefs>) => void;
}
export declare const FrameContext: React.Context<{
    setFrameContainerRef: (payload: any) => void;
    sidebarPaneContainer: any;
    headerTitleContainer: any;
    headerPrimaryActionContainer: any;
    headerSharedToolsContainer: any;
    contentMainContainer: any;
}>;
export default FrameContext;
