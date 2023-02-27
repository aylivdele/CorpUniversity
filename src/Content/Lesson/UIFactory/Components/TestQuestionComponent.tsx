import { TestQuestion } from '../../Model/LessonModel';
import { Form } from 'react-bootstrap';
import React from 'react';

export interface TestQuestionComponentProps {
    question: TestQuestion;
    onChange: (variant: string, value: boolean, isRadio: boolean) => void;
    mistake?: boolean;
}

export const TestQuestionComponent = (props: TestQuestionComponentProps) => {
    const { question, onChange, mistake } = props;

    const style: React.CSSProperties = {
        marginBottom: '20px',
        padding: '5px',
    };

    if (mistake) {
        style.border = '1px solid red';
        style.borderRadius = '5px';
    }

    const isRadio = question.correctAnswers.length === 1;

    return (
        <Form style={style}>
            <Form.Group>
                <Form.Label>{question.text}</Form.Label>
                {question.answers.map(answer => (
                    <Form.Check
                        key={answer}
                        type={isRadio ? 'radio' : 'checkbox'}
                        label={answer}
                        onChange={event => onChange(answer, event.target.checked, isRadio)}
                        name="group"
                    />
                ))}
                {mistake && <Form.Label style={{ color: 'red' }}>Ошибка!</Form.Label>}
            </Form.Group>
        </Form>
    );
};
