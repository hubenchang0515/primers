export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: JsonValue }
  | JsonValue[];


export interface JsonLdProps {
    json: JsonValue;
}

export default function JsonLd(props:JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(props.json).replace(/</g, '\\u003c'),
            }}
        />
    );
}