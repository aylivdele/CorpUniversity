import { DefaultComponentProps } from './DefaultComponentProps';
import React, { createRef } from 'react';
import { useScreenEnter } from '../../../../Utils/useScreenEnter';
import { Image } from 'react-bootstrap';

export interface ImageComponentProps extends DefaultComponentProps {
    imgSource: string;
    title?: string;
}

export const ImageComponent = (props: ImageComponentProps) => {
    const ref = createRef<HTMLImageElement>();
    useScreenEnter(ref, props.screenEnterCallback);

    return <Image ref={ref} fluid src={props.imgSource} title={props.title} style={props.style} />;
};
