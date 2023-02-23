import { Button, Col, ListGroup, Modal, ProgressBar, Row, Tab } from 'react-bootstrap';
import { LessonData, LessonTask, TestQuestion } from './Model/LessonModel';
import { useCallback, useState } from 'react';
import { UIFactory } from './UIFactory/UIFactory';

export interface LessonProps {
    lessonData: LessonData;
    onClose: () => void;
}

type CompletionMap = Map<number, Array<boolean>>;
type SubmittedAnswers = Map<number, Array<string>>;

function initCompletionMap(lessonTasks: LessonTask[]) {
    const map: CompletionMap = new Map();
    lessonTasks.forEach(task => {
        map.set(
            task.index,
            task.content.map(() => false)
        );
    });
    return map;
}

function initSubmittedAnswers(questions?: TestQuestion[]) {
    const map: SubmittedAnswers = new Map();
    questions?.forEach(question => map.set(question.index, []));
    return map;
}

function getIsTestAvailable(completionMap: CompletionMap): boolean {
    for (const arr of completionMap.values()) {
        if (!arr.reduce((pv, cv) => pv && cv)) {
            return false;
        }
    }
    return true;
}

function Lesson(props: LessonProps) {
    const { lessonTasks, lessonTest } = props.lessonData;

    const [currentTask, setCurrentTask] = useState<number>(0);
    const [completionMap, setCompletionMap] = useState<CompletionMap>(initCompletionMap(lessonTasks));
    const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswers>(
        initSubmittedAnswers(lessonTest?.questions)
    );
    const [mistakes, setMistakes] = useState<Array<number>>([]);
    const [completedLesson, setCompletedLesson] = useState<boolean>(false);

    const updateCompletionMap = useCallback(
        (taskIdx: number, contentIdx: number) => {
            completionMap.get(taskIdx)![contentIdx] = true;
            setCompletionMap(new Map(completionMap.entries()));

            if (getIsTestAvailable(completionMap) && !lessonTest) {
                setCompletedLesson(true);
            }
        },
        [lessonTasks]
    );

    const onNext = useCallback(() => {
        window.scrollTo(0, 0);
        setCurrentTask(currentTask + 1);
    }, [currentTask]);

    const onAnswerChange = useCallback(
        (questionIndex: number, variant: string, value: boolean, isRadio: boolean) => {
            const answers = submittedAnswers.get(questionIndex);
            if (isRadio) {
                submittedAnswers.set(questionIndex, [variant]);
            } else if (value) {
                answers!.push(variant);
            } else {
                submittedAnswers.set(
                    questionIndex,
                    answers!.filter(answer => answer !== variant)
                );
            }
            setSubmittedAnswers(new Map(submittedAnswers.entries()));
        },
        [submittedAnswers]
    );

    const submitAnswers = useCallback(() => {
        const questionsWithMistakes: number[] = [];

        lessonTest?.questions.forEach(question => {
            const submitted = submittedAnswers.get(question.index)!;
            if (
                submitted.length !== question.correctAnswers.length ||
                question.correctAnswers.reduce(
                    (wrong, correctAnswer) => wrong || !submitted.includes(correctAnswer),
                    false
                )
            ) {
                questionsWithMistakes.push(question.index);
            }
        });

        setMistakes(questionsWithMistakes);

        if (!questionsWithMistakes.length) {
            setCompletedLesson(true);
        }
    }, [submittedAnswers]);

    return (
        <div className="mx-auto mt-5" style={{ width: '80%' }}>
            <Button onClick={props.onClose}>К списку уроков</Button>
            <Tab.Container activeKey={currentTask}>
                <Row>
                    <Col sm={3} />
                    <Col sm={6} style={{ backgroundColor: 'whitesmoke', borderRadius: '5px', padding: '20px' }}>
                        <Tab.Content>
                            {lessonTasks.map(task => (
                                <Tab.Pane key={task.index} eventKey={task.index}>
                                    {UIFactory.renderTitle(task.title)}
                                    {task.content.map(content =>
                                        UIFactory.renderContent(content, () =>
                                            updateCompletionMap(task.index, content.index)
                                        )
                                    )}
                                    {(task.index + 1 < lessonTasks.length ||
                                        (!!lessonTest && getIsTestAvailable(completionMap))) && (
                                        <div className="d-flex justify-content-end">
                                            <Button onClick={onNext}>{'Далее >'}</Button>
                                        </div>
                                    )}
                                </Tab.Pane>
                            ))}

                            {!!lessonTest && getIsTestAvailable(completionMap) && (
                                <Tab.Pane eventKey={lessonTasks.length}>
                                    {lessonTest.questions.map(question =>
                                        UIFactory.renderQuestion(
                                            question,
                                            (variant, value, isRadio) =>
                                                onAnswerChange(question.index, variant, value, isRadio),
                                            mistakes.includes(question.index)
                                        )
                                    )}
                                    <div className="d-flex justify-content-end">
                                        <Button onClick={submitAnswers}>{'Проверить'}</Button>
                                    </div>
                                </Tab.Pane>
                            )}
                        </Tab.Content>
                    </Col>
                    <Col sm={3}>
                        <ListGroup>
                            {lessonTasks.map(task => {
                                const completedArray = completionMap.get(task.index)!;
                                const count = completedArray?.reduce((pv, cv) => pv + +cv, 0);
                                return (
                                    <ListGroup.Item
                                        key={task.index}
                                        variant={
                                            completionMap.get(task.index)?.reduce((pv, cv) => pv && cv)
                                                ? 'success'
                                                : 'light'
                                        }
                                        action
                                        onClick={() => setCurrentTask(task.index)}
                                        active={task.index === currentTask}
                                    >
                                        {task.title}
                                        <ProgressBar variant="warning" now={(count / completedArray.length) * 100} />
                                    </ListGroup.Item>
                                );
                            })}
                        </ListGroup>
                        {lessonTest && (
                            <ListGroup className="mt-1">
                                <ListGroup.Item
                                    action
                                    disabled={!getIsTestAvailable(completionMap)}
                                    onClick={() => setCurrentTask(lessonTasks.length)}
                                >
                                    Итоговый тест
                                </ListGroup.Item>
                            </ListGroup>
                        )}
                    </Col>
                </Row>
                <Modal show={completedLesson} onHide={props.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{props.lessonData.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Поздравляем, урок пройден!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={props.onClose}>
                            Закончить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Tab.Container>
        </div>
    );
}

export default Lesson;
