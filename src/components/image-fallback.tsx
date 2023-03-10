import React, { useEffect, useState } from 'react'

interface Props
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  src: string
  fallbackSrc: string
}

export default function ImageWithFallback({ src, fallbackSrc, ...rest }: Props) {
  const [imageSrc, setImageSrc] = useState(src)

  useEffect(() => {
    if (src) {
      setImageSrc(src)
    }
  }, [src])

  useEffect(() => {
    if (!src) {
      setImageSrc(fallbackSrc)
    }
  }, [fallbackSrc])

  const handleLoadFallback = () => {
    setImageSrc(fallbackSrc)
  }
  return <img src={imageSrc} onError={handleLoadFallback} {...rest} />
}
