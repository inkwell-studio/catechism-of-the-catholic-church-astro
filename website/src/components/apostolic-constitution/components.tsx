import { Language } from '@catechism/source/types/types.ts';

export interface ApostolicConstitution {
    title: string;
    subtitle: string;
    authorText: Array<string>;
    intro: string;
}

export function Title(props: { text: string }): JSX.Element {
    return <h1>{props.text}</h1>;
}

export function Subtitle(props: { text: string }): JSX.Element {
    return <h2>{props.text}</h2>;
}

export function AuthorText(props: { lines: Array<string> }): JSX.Element {
    return (
        <div className='flex flex-col items-center'>
            {props.lines.map((text) => <span>{text}</span>)}
        </div>
    );
}

export function Intro(props: { text: string }): JSX.Element {
    return <em>{props.text}</em>;
}

export function getConstitution(language: Language): ApostolicConstitution {
    switch (language) {
        case Language.ENGLISH:
            return {
                title: 'Apostolic Constitution [ English ]',
                subtitle: 'Subtitle Text',
                authorText: ['line 1', 'line 2', 'line 3'],
                intro: 'Intro text goes here.',
            };
        case Language.LATIN:
            return {
                title: 'Apostolic Constitution [ Latin ]',
                subtitle: 'Subtitle Text',
                authorText: ['line 1', 'line 2', 'line 3'],
                intro: 'Intro text goes here.',
            };
        case Language.SPANISH:
            return {
                title: 'Apostolic Constitution [ Spanish ]',
                subtitle: 'Subtitle Text',
                authorText: ['line 1', 'line 2', 'line 3'],
                intro: 'Intro text goes here.',
            };
    }
}

//#region main content
export function Body(props: { language: Language }): JSX.Element {
    switch (props.language) {
        case Language.ENGLISH:
            return bodyEnglish();
        case Language.LATIN:
            return bodyLatin();
        case Language.SPANISH:
            return bodySpanish();
    }
}

function bodyEnglish(): JSX.Element {
    return <div>( body text : English )</div>;
}

function bodyLatin(): JSX.Element {
    return <div>( body text : Latin )</div>;
}

function bodySpanish(): JSX.Element {
    return <div>( body text : Spanish )</div>;
}
//#endregion
