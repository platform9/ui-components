/// <reference types="react" />
import PropTypes from 'prop-types';
declare const CloseButton: {
    ({ tooltip, ...props }: {
        [x: string]: any;
        tooltip?: string;
    }): JSX.Element;
    propTypes: {
        to: PropTypes.Requireable<string>;
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export default CloseButton;
