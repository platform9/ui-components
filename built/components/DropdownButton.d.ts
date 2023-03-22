/// <reference types="react" />
interface Link {
    link: string;
    label: string;
}
interface Props {
    links: Link[];
    addText?: string;
}
declare const DropdownButton: ({ links, addText }: Props) => JSX.Element;
export default DropdownButton;
