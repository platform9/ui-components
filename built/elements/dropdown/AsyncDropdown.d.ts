/// <reference types="react" />
import { PropsWithProgress } from '../../components/progress/withProgress';
import { DropdownProps } from '../../elements/dropdown/Dropdown';
export interface AsyncDropdownProps<V> extends PropsWithProgress<DropdownProps<V>> {
    formField?: boolean;
    selectFirst?: boolean;
}
export declare type PropsWithAsyncDropdown<P, V = string> = Omit<AsyncDropdownProps<V>, 'items'> & P;
export default function AsyncDropdown<V = string>({ showAll, formField, compact, selectFirst, onChange, items, loading, loadingProps, ...props }: AsyncDropdownProps<V>): JSX.Element;
