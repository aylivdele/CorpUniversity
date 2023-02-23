import { LessonData } from './Model/LessonModel';
import { Button, Card } from 'react-bootstrap';

export interface LessonCardProps {
    lesson: LessonData;
    onStartLesson: () => void;
}

export const LessonCard = (props: LessonCardProps) => {
    const lesson = props.lesson;
    return (
        <Card style={{ marginBottom: '25px' }}>
            <Card.Header>{lesson.title}</Card.Header>
            <Card.Body>
                <Card.Text>{lesson.description}</Card.Text>
                <Button onClick={props.onStartLesson}>Начать.</Button>
            </Card.Body>
        </Card>
    );
};
