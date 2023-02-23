import { DefaultComponentProps } from './DefaultComponentProps';
import React, { createRef } from 'react';
import { useScreenEnter } from '../../../../Utils/useScreenEnter';

export interface ListComponentProps extends DefaultComponentProps {
    text: string[];
    title?: string;
}

export const ListComponent = (props: ListComponentProps) => {
    const ref = createRef<HTMLDivElement>();
    useScreenEnter(ref, props.screenEnterCallback);

    return (
        <div ref={ref} style={props.style}>
            {props.title && <h3>{props.title}</h3>}
            {props.text.map(text => {
                return (
                    <p key={text} style={{ marginLeft: '15px' }}>
                        <b>{'> '}</b>
                        {text}
                    </p>
                );
            })}
        </div>
    );
};
