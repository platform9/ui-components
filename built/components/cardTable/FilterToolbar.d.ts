import React from 'react';
interface Props {
    filters?: JSX.Element;
    showSortOption?: boolean;
    sortOptions?: any;
    onSortChange?: (value: any) => void;
    sortBy?: string;
    searchTerm: string;
    onSearchChange: (value: any) => any;
    onRefresh: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
export default function FilterToolbar({ filters, showSortOption, sortOptions, onSortChange, sortBy, searchTerm, onSearchChange, onRefresh, }: Props): JSX.Element;
export {};
