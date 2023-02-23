import { DefaultComponentProps } from './DefaultComponentProps';
import React, { createRef } from 'react';
import { useScreenEnter } from '../../../../Utils/useScreenEnter';

export interface SimpleTextComponentProps extends DefaultComponentProps {
    text: string;
    title?: string;
}

export const SimpleTextComponent = (props: SimpleTextComponentProps) => {
    const ref = createRef<HTMLDivElement>();
    useScreenEnter(ref, props.screenEnterCallback);

    return (
        <div ref={ref} style={props.style}>
            {props.title && <h3>{props.title}</h3>}
            {props.text}
        </div>
    );
};
