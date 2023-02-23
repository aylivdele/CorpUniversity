import { TaskContent, TaskContentType, TestQuestion } from '../Model/LessonModel';
import React from 'react';
import { SimpleTextComponent } from './Components/SimpleTextComponent';
import { AccordionComponent } from './Components/AccordionComponent';
import { AlertComponent, AlertType } from './Components/AlertComponent';
import { ImageComponent } from './Components/ImageComponent';
// @ts-ignore
import imagePlaceholder from './notFoundImage.png';
import { ListComponent } from './Components/ListComponent';
import { TestQuestionComponent } from './Components/TestQuestionComponent';

export class UIFactory {
    private static defaultStyles: React.CSSProperties = {
        marginBottom: '10px',
    };

    public static renderTitle(title: string): JSX.Element {
        return <h2 style={{ marginBottom: '30px' }}>{title}</h2>;
    }

    public static renderContent(content: TaskContent, screenEnterCallback?: () => void): JSX.Element | null {
        switch (content.type) {
            case TaskContentType.SIMPLE_TEXT:
                return this.renderSimpleText(content, screenEnterCallback);
            case TaskContentType.ACCORDION:
                return this.renderAccordion(content, screenEnterCallback);
            case TaskContentType.ATTENTION:
                return this.renderAttention(content, screenEnterCallback);
            case TaskContentType.WARNING:
                return this.renderWarning(content, screenEnterCallback);
            case TaskContentType.IMAGE:
                return this.renderImage(content, screenEnterCallback);
            case TaskContentType.LIST:
                return this.renderList(content, screenEnterCallback);
        }
        return null;
    }

    public static renderQuestion(
        question: TestQuestion,
        onChange: (variant: string, value: boolean, isRadio: boolean) => void,
        mistake?: boolean
    ): JSX.Element | null {
        return <TestQuestionComponent question={question} onChange={onChange} mistake={mistake} />;
    }

    private static renderSimpleText(content: TaskContent, screenEnterCallback?: () => void) {
        return (
            <SimpleTextComponent
                title={content.title}
                text={(content.text as string) ?? ''}
                key={content.index}
                style={this.defaultStyles}
                screenEnterCallback={screenEnterCallback}
            />
        );
    }

    private static renderAccordion(content: TaskContent, screenEnterCallback?: () => void) {
        return (
            <AccordionComponent
                screenEnterCallback={screenEnterCallback}
                text={(content.text as string) ?? ''}
                title={content.title ?? 'Открой меня'}
                key={content.index}
                style={this.defaultStyles}
            />
        );
    }

    private static renderAttention(content: TaskContent, screenEnterCallback?: () => void) {
        return (
            <AlertComponent
                type={AlertType.DANGER}
                text={(content.text as string) ?? 'Attention'}
                key={content.index}
                style={this.defaultStyles}
                screenEnterCallback={screenEnterCallback}
            />
        );
    }

    private static renderWarning(content: TaskContent, screenEnterCallback?: () => void) {
        return (
            <AlertComponent
                text={(content.text as string) ?? 'Warning'}
                type={AlertType.WARNING}
                key={content.index}
                style={this.defaultStyles}
                screenEnterCallback={screenEnterCallback}
            />
        );
    }

    private static renderImage(content: TaskContent, screenEnterCallback?: () => void) {
        return (
            <ImageComponent
                title={content.title}
                imgSource={content.imgSource ?? imagePlaceholder}
                key={content.index}
                style={this.defaultStyles}
                screenEnterCallback={screenEnterCallback}
            />
        );
    }

    private static renderList(content: TaskContent, screenEnterCallback?: () => void) {
        return (
            <ListComponent
                text={(content.text as string[]) || []}
                style={this.defaultStyles}
                screenEnterCallback={screenEnterCallback}
            />
        );
    }
}
