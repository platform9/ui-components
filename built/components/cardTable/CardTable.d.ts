import React from 'react';
interface Props {
    data: any[];
    searchTarget: string;
    filters?: any;
    filterValues?: FilterValues[];
    showSortOption?: boolean;
    sortOptions?: SortOptions[];
    onSortChange?: any;
    sortBy?: string;
    sortTarget?: string;
    loading: boolean;
    loadingMessage?: string;
    handleRefresh: any;
    children?: any;
    emptyItemsMessage?: string | React.ReactNode;
}
interface FilterValues {
    value: string;
    target?: string;
    customFilterFn?: any;
}
interface SortOptions {
    label: string;
    value: string;
}
declare const CardTable: ({ data, searchTarget, filters, filterValues, showSortOption, sortOptions, onSortChange, sortBy, sortTarget, loading, loadingMessage, handleRefresh, children, emptyItemsMessage, }: Props) => JSX.Element;
export default CardTable;
