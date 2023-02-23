import { LessonData } from './Lesson/Model/LessonModel';
import { LessonCard } from './Lesson/LessonCard';

export interface LessonsViewProps {
    lessons: LessonData[];
    onLessonChoose: (index: number) => void;
}

export const LessonsView = (props: LessonsViewProps) => {
    return (
        <div style={{ width: '60%', margin: 'auto', marginTop: '50px' }}>
            {props.lessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} onStartLesson={() => props.onLessonChoose(lesson.id)} />
            ))}
        </div>
    );
};
