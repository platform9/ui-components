/// <reference types="react" />
interface Props<T> {
    data: T[];
    setFilteredData: Function;
    filters?: FilterSpec[];
    searchTarget: string;
    extraFilters?: JSX.Element[];
}
export interface FilterSpec {
    name: string;
    label: string;
    options: string[];
    target: string;
}
export default function Filter<T>({ data, setFilteredData, filters, searchTarget, extraFilters, }: Props<T>): JSX.Element;
export {};
