import { FC } from 'react';
import { ParsedGridRow } from '../../../elements/grid/hooks/useGridRows';
interface GridFilterProps<F extends Record<string, unknown>, K extends keyof F = keyof F, V = F[K]> {
    key: K;
    updateFilterValue: FilterValueChangeHandler<V>;
    filterValue: V;
    clearFilter: () => void | Promise<void>;
    FilterComponent: FC<GridFilterComponentProps<V, F>>;
    filterValues: F;
    label?: string;
    filterComponentProps?: any;
}
interface DropdownFilterValue {
    key: string;
    label: string;
    updateFilterValue: FilterValueChangeHandler;
    value: string | {
        key: string;
        value: string;
    };
    display: string;
}
export interface GridFilteringProps<GF extends Record<string, unknown>, F extends Record<string, unknown>, DF extends Record<string, unknown>> {
    clearFilters: () => void | Promise<void>;
    globalFilters: GridFilterProps<GF>[];
    filters: GridFilterProps<F>[];
    dropdownFilters?: GridFilterProps<DF>[];
    dropdownFilterValues?: DropdownFilterValue[];
    dropdownValuesByKey?: Record<string, unknown>;
}
type FilterValueChangeHandler<V = unknown> = (value: V) => void | Promise<void>;
export interface GridFilterComponentProps<V, F> {
    value: V;
    onChange: (value: V) => void;
    className?: string;
    filterValues?: F;
}
export interface GridGlobalFilterSpec<T, F extends Record<string, unknown>, FK extends keyof F = keyof F, FV = F[FK]> {
    key: FK;
    FilterComponent: FC<GridFilterComponentProps<FV, F>>;
    initialValue?: FV;
    equalityComparerFn: (item: T, filterValue: FV) => boolean;
    allowEmpty?: boolean;
    controlled?: boolean;
    onChange?: FilterValueChangeHandler<FV>;
}
export interface GridFilterSpec<T, F extends Record<string, unknown>, TK extends keyof T = keyof T, FK extends keyof F = TK extends keyof F ? TK : keyof F, ICV = T[TK], FV = F[FK]> {
    columnKey: TK;
    FilterComponent: FC<GridFilterComponentProps<FV, F>>;
    initialValue?: FV;
    equalityComparerFn?: (itemColValue: ICV, filterValue: FV) => boolean;
    allowEmpty?: boolean;
    controlled?: boolean;
    onChange?: FilterValueChangeHandler<FV>;
}
export interface GridDropdownFilterSpec<T, F extends Record<string, unknown>, FK extends keyof F = keyof F, FV = F[FK]> {
    key?: FK;
    label?: string;
    FilterComponent: FC;
    filterComponentProps?: any;
    initialValue?: FV;
    equalityComparerFn?: (item: T, filterValue: FV) => boolean;
    allowEmpty?: boolean;
    controlled?: boolean;
    onChange?: FilterValueChangeHandler<FV>;
    getOptionsFn: (items: any) => any[];
    filterComponentOptionsPropName: string;
}
export interface GridFilteringConfig<T, GF extends Record<string, unknown> = Record<string, unknown>, F extends Record<string, unknown> = Record<string, unknown>, DF extends Record<string, unknown> = Record<string, unknown>> {
    filters?: GridFilterSpec<T, F>[];
    globalFilters?: Array<GridGlobalFilterSpec<T, GF>>;
    onClearFilters?: () => void | Promise<void>;
    dropdownFilters?: GridDropdownFilterSpec<T, DF>[];
}
export default function useGridFiltering<T, GF extends Record<string, unknown>, F extends Record<string, unknown>, DF extends Record<string, unknown>>(rows: Array<ParsedGridRow<T>>, { onClearFilters, globalFilters: globalFilterSpecs, filters: filterSpecs, dropdownFilters: dropdownFilterSpecs, }: GridFilteringConfig<T, GF, F, DF>): [Array<ParsedGridRow<T>>, GridFilteringProps<GF, F, DF>];
export {};
