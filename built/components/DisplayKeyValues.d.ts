/// <reference types="react" />
interface Props {
    keyValuePairs: KeyValuePair[];
    rowSpacing?: number;
    limitValueLength?: boolean;
    alignKeyRight?: boolean;
}
interface KeyValuePair {
    key: string;
    value: any;
    render?: any;
}
declare const DisplayKeyValues: ({ keyValuePairs, rowSpacing, ...rest }: Props) => JSX.Element;
export default DisplayKeyValues;
