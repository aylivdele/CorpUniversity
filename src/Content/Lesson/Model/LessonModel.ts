export enum TaskContentType {
    SIMPLE_TEXT,
    ACCORDION,
    ATTENTION,
    WARNING,
    IMAGE,
    LIST,
}

export interface TaskContent {
    id: number;
    type: TaskContentType;
    title?: string;
    text?: string | string[];
    imgSource?: string;
}
export interface LessonTask {
    id: number;
    title: string;
    content: TaskContent[];
    completed?: boolean;
}

export interface TestQuestion {
    id: number;
    text: string;
    answers: string[];
    correctAnswers: string[];
}

export interface LessonTest {
    questions: TestQuestion[];
}

export interface LessonData {
    id: number;
    title: string;
    description: string;
    lessonTasks: LessonTask[];
    lessonTest?: LessonTest;
    completed: boolean;
}
