import { PropsWithChildren } from 'react';
import { TextProps } from '../Text';
type Props = PropsWithChildren<{
    nameOverrides: Record<string, string>;
    textVariant?: TextProps['variant'];
}>;
export default function Breadcrumbs({ nameOverrides, textVariant }: Props): JSX.Element;
export {};
