import { DefaultComponentProps } from './DefaultComponentProps';
import React, { createRef } from 'react';
import { useScreenEnter } from '../../../../Utils/useScreenEnter';
import { Alert, Badge } from 'react-bootstrap';

export enum AlertType {
    DANGER = 'danger',
    WARNING = 'warning',
}

export interface AttentionComponentProps extends DefaultComponentProps {
    text: string;
    type: AlertType;
}

export const AlertComponent = (props: AttentionComponentProps) => {
    const ref = createRef<HTMLDivElement>();
    useScreenEnter(ref, props.screenEnterCallback);

    switch (props.type) {
        case AlertType.DANGER:
            return (
                <Alert variant="danger" ref={ref} style={props.style}>
                    <Badge pill bg="danger" className="me-1">
                        !
                    </Badge>
                    {props.text}
                </Alert>
            );
        case AlertType.WARNING:
        default:
            return (
                <Alert ref={ref} variant="warning" style={props.style}>
                    <Badge pill bg="warning" className="me-1">
                        i
                    </Badge>
                    {props.text}
                </Alert>
            );
    }
};
