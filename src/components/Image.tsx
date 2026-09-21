import { imageInfo } from '@/utils/image';
import NextImage from 'next/image';
import { CSSProperties } from 'react';

export interface ImageProps {
    src?: string;
    absolute?: boolean;
    alt?: string;
    title?: string;
    style?: CSSProperties;
}

export default async function Image(props:ImageProps) {
    const size = {width:0, height: 0};
    const match = props.alt?.match(/.+!size:(\d+)x(\d+)/);
    if (match) {
        size.width = Number(match[1]);
        size.height = Number(match[2]);
    }
    if (props.src?.startsWith("http")) {
        <img src={props.src} width={size.width > 0 ? size.width : undefined} height={size.height > 0 ? size.height : undefined}/>
    }

    try {
        const info = await imageInfo(props.src??"", props.absolute);
        return (
            <NextImage 
                src={info.src} 
                alt={props.alt??'image'} 
                title={props.title} 
                width={size.width > 0 ? size.width : info.width} 
                height={size.height > 0 ? size.height : info.height} 
                style={props.style}
                rel="nofollow"
            />
        )
    } catch {
        return <NextImage src='/404' width={160} height={90} alt={props.alt??'image'} style={props.style}/>
    }
}