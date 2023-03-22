import React from 'react';
interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    fallbackSrc: string;
}
export default function ImageWithFallback({ src, fallbackSrc, ...rest }: Props): JSX.Element;
export {};
