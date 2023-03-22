/// <reference types="react" />
interface Props {
    className?: string;
    searchTerm?: string;
    onSearchChange: (value: string) => any;
}
export default function SearchBar({ className, searchTerm, onSearchChange }: Props): JSX.Element;
export {};
