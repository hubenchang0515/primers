import { imageInfo } from '@/utils/image';
import NextImage from 'next/image';
import { CSSProperties } from 'react';

export interface ImageProps {
    src?: string;
    alt?: string;
    style?: CSSProperties;
}

export default async function Image(props:ImageProps) {
    const info = await imageInfo(props.src??"");
    return (
        <NextImage src={info.src} alt={props.alt??'image'} width={info.width} height={info.height} style={props.style}/>
    )
}