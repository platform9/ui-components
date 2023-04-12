/// <reference types="react" />
interface Props {
    role: string;
    features: any;
    currentPluginId: string;
    setPluginId: (id: string) => void;
}
declare function DefaultFrame({ role }: Props): JSX.Element;
export default DefaultFrame;
