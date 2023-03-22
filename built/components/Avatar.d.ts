/// <reference types="react" />
interface Props {
    displayName: string;
    diameter?: number;
    fontSize?: number;
    onClick?: any;
    className?: string;
}
declare const Avatar: ({ displayName, diameter, fontSize, onClick, className }: Props) => JSX.Element;
export default Avatar;
