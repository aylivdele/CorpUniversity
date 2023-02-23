import Lesson from './Lesson/Lesson';
import { exampleLesson1, exampleLesson2 } from './Lesson/ExampleConstants/LessonListExample';
import { useState } from 'react';
import { LessonsView } from './LessonsView';

const lessons = [exampleLesson1, exampleLesson2];
function Content() {
    const [currentLesson, setCurrentLesson] = useState<number | undefined>(undefined);

    return (
        <>
            {currentLesson !== undefined ? (
                <Lesson
                    lessonData={lessons.find(lesson => lesson.id === currentLesson)!}
                    onClose={() => setCurrentLesson(undefined)}
                />
            ) : (
                <LessonsView lessons={lessons} onLessonChoose={id => setCurrentLesson(id)} />
            )}
        </>
    );
}

export default Content;
