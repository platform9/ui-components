/// <reference types="react" />
interface Props {
    items: Array<string | JSX.Element>;
    type?: string;
    className?: string;
}
declare const BulletList: ({ items, type, className }: Props) => JSX.Element;
export default BulletList;
