import { DefaultComponentProps } from './DefaultComponentProps';
import React, { createRef } from 'react';
import { useScreenEnter } from '../../../../Utils/useScreenEnter';
import { Accordion } from 'react-bootstrap';

export interface AccordionComponentProps extends DefaultComponentProps {
    text: string;
    title: string;
}

export const AccordionComponent = (props: AccordionComponentProps) => {
    const ref = createRef<HTMLDivElement>();
    useScreenEnter(ref, props.screenEnterCallback);

    return (
        <Accordion style={props.style}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{props.title}</Accordion.Header>
                <Accordion.Body ref={ref}>{props.text}</Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};
