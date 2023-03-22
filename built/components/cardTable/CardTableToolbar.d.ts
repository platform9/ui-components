/// <reference types="react" />
import PropTypes from 'prop-types';
declare const CardTableToolbar: {
    ({ title, sorting, orderDirection, orderBy, filters, filterValues, onSortChange, onDirectionSwitch, onFilterUpdate, onRefresh, onSearchChange, searchTerm, }: {
        title: any;
        sorting?: any[];
        orderDirection: any;
        orderBy: any;
        filters?: any[];
        filterValues: any;
        onSortChange: any;
        onDirectionSwitch: any;
        onFilterUpdate: any;
        onRefresh: any;
        onSearchChange: any;
        searchTerm: any;
    }): JSX.Element;
    propTypes: {
        orderDirection: PropTypes.Requireable<string>;
        orderBy: PropTypes.Requireable<string>;
        onSortChange: PropTypes.Requireable<(...args: any[]) => any>;
        onDirectionSwitch: PropTypes.Requireable<(...args: any[]) => any>;
        onSearchChange: PropTypes.Requireable<(...args: any[]) => any>;
        onRefresh: PropTypes.Requireable<(...args: any[]) => any>;
        searchTerm: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        filters: PropTypes.Requireable<NonNullable<PropTypes.ReactElementLike | PropTypes.InferProps<{
            field: PropTypes.Validator<string>;
            label: PropTypes.Requireable<string>;
            type: PropTypes.Validator<string>;
            render: PropTypes.Requireable<(...args: any[]) => any>;
            filterWith: PropTypes.Requireable<(...args: any[]) => any>;
            items: PropTypes.Requireable<any[]>;
        }>[]>>;
        filterValues: PropTypes.Requireable<object>;
        onFilterUpdate: PropTypes.Requireable<(...args: any[]) => any>;
    };
};
export declare const filterSpecPropType: PropTypes.Requireable<PropTypes.InferProps<{
    field: PropTypes.Validator<string>;
    label: PropTypes.Requireable<string>;
    type: PropTypes.Validator<string>;
    render: PropTypes.Requireable<(...args: any[]) => any>;
    filterWith: PropTypes.Requireable<(...args: any[]) => any>;
    items: PropTypes.Requireable<any[]>;
}>>;
export default CardTableToolbar;
