import { imageInfo } from '@/utils/image';
import NextImage from 'next/image';
import { CSSProperties } from 'react';

export interface ImageProps {
    src?: string;
    absolute?: boolean;
    alt?: string;
    style?: CSSProperties;
}

export default async function Image(props:ImageProps) {
    try {
        const info = await imageInfo(props.src??"", props.absolute);
        return (
            <NextImage src={info.src} alt={props.alt??'image'} width={info.width} height={info.height} style={props.style}/>
        )
    } catch {
        return <NextImage src='/404' width={160} height={90} alt={props.alt??'image'} style={props.style}/>
    }
}