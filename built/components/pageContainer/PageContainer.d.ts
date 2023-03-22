import React from 'react';
import PropTypes from 'prop-types';
export declare const PageContext: React.Context<{
    extraHeaderContainer: any;
}>;
/**
 * Component to be used as a container for the sections contents which allows to use
 * PageContainerHeader to render extra header contents dynamically within any children and also
 * exposes a "header" prop to render any arbitrary fixed header content
 */
declare const PageContainer: {
    ({ children, header, className, floatingHeader, ...rest }: {
        [x: string]: any;
        children: any;
        header?: any;
        className?: string;
        floatingHeader: any;
    }): JSX.Element;
    propTypes: {
        header: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        floatingHeader: PropTypes.Requireable<boolean>;
    };
    defaultProps: {
        floatingHeader: boolean;
    };
};
export default PageContainer;
