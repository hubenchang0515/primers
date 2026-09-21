import { imageInfo } from '@/utils/image';
import NextImage from 'next/image';
import { CSSProperties } from 'react';

export interface ImageProps {
    src?: string;
    absolute?: boolean;
    alt?: string;
    title?: string;
}

export default async function Image(props:ImageProps) {
    const size = {width:0, height: 0};
    const matchSize = props.alt?.match(/!size:(\d+)x(\d+)/);
    if (matchSize) {
        size.width = Number(matchSize[1]);
        size.height = Number(matchSize[2]);
    }

    let center = true;
    const matchCenter = props.alt?.match(/!center:(true|false)/);
    if (matchCenter) {
        center = matchCenter[1] === "true" ? true : false;
    }

    if (props.src?.startsWith("http")) {
        return <img 
            src={props.src} 
            width={size.width > 0 ? size.width : undefined} 
            height={size.height > 0 ? size.height : undefined}
            style={center ? {display:'block', margin:'auto', maxWidth:'100%', height:'auto'} : {}}
        />
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
                style={center ? {display:'block', margin:'auto', maxWidth:'100%', height:'auto'} : {}}
                rel="nofollow"
            />
        )
    } catch {
        return <NextImage src='/404' width={160} height={90} alt={props.alt??'image'}/>
    }
}