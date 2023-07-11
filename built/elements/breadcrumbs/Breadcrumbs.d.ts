import { PropsWithChildren } from 'react';
import { TextProps } from '../Text';
type Props = PropsWithChildren<{
    nameOverrides: Record<string, string>;
    textVariant?: TextProps['variant'];
    icon?: string;
}>;
export default function Breadcrumbs({ nameOverrides, textVariant, icon, }: Props): JSX.Element;
export {};
