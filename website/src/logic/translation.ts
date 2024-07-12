import { BibleBook, Content, Language } from '@catechism/source/types/types.ts';

export function translate(englishText: string, language: Language): string {
    try {
        return Language.ENGLISH === language ? englishText : translationMap[englishText][language];
    } catch (error) {
        throw new Error(`Failed translation into [${language}]: ${englishText}`, error);
    }
}

const translationMap: Record<string, Record<Exclude<Language, Language.ENGLISH>, string>> = {
    //#region UI messages and labels
    'Server Error': {
        [Language.LATIN]: 'Servo Errore',
        [Language.SPANISH]: 'Error del Servidor',
    },
    'Error: No content found.': {
        [Language.LATIN]: 'Errore: non contentus inventus est.',
        [Language.SPANISH]: 'Error: no se encontró contenido.',
    },
    'Page not found.': {
        [Language.LATIN]: 'Pagina non inveni.',
        [Language.SPANISH]: 'Página no encontrada.',
    },
    'Unknown page:': {
        [Language.LATIN]: 'ignota pagina:',
        [Language.SPANISH]: 'Pagina desconocida:',
    },
    'Go Home': {
        [Language.LATIN]: 'Redira ad Initium',
        [Language.SPANISH]: 'Volver a Empezar',
    },
    'Introduction (Home)': {
        [Language.LATIN]: 'Praelocutio (Initium)',
        [Language.SPANISH]: 'Introducción (Empezar)',
    },
    'Select Language': {
        [Language.LATIN]: 'Eligere Lingua',
        [Language.SPANISH]: 'Seleccione el Idioma',
    },
    'Open': {
        [Language.LATIN]: 'Pando',
        [Language.SPANISH]: 'Desplegar',
    },
    'Unsupported language': {
        [Language.LATIN]: 'Sine lingua',
        [Language.SPANISH]: 'Idioma no admitido',
    },
    'Available languages': {
        [Language.LATIN]: 'Linguae Available',
        [Language.SPANISH]: 'Idiomas Disponibles',
    },
    //#endregion

    //#region Bible books
    // TODO: Add missing Spanish translations once the Spanish Bible translation version has been learned
    [BibleBook.GENESIS]: {
        [Language.LATIN]: 'Genesis',
        [Language.SPANISH]: 'Génesis',
    },
    [BibleBook.EXODUS]: {
        [Language.LATIN]: 'Exodus',
        [Language.SPANISH]: 'Exodus[Español]',
    },
    [BibleBook.LEVITICUS]: {
        [Language.LATIN]: 'Leviticus',
        [Language.SPANISH]: 'Leviticus[Español]',
    },
    [BibleBook.NUMBERS]: {
        [Language.LATIN]: 'Numeri',
        [Language.SPANISH]: 'Numbers[Español]',
    },
    [BibleBook.DEUTERONOMY]: {
        [Language.LATIN]: 'Deuteronomium',
        [Language.SPANISH]: 'Deuteronomy[Español]',
    },
    [BibleBook.JOSHUA]: {
        [Language.LATIN]: 'Josue',
        [Language.SPANISH]: 'Joshua[Español]',
    },
    [BibleBook.JUDGES]: {
        [Language.LATIN]: 'Judices',
        [Language.SPANISH]: 'Judges[Español]',
    },
    [BibleBook.SAMUEL_1]: {
        [Language.LATIN]: '1 Regum',
        [Language.SPANISH]: '1 Samuel[Español]',
    },
    [BibleBook.SAMUEL_2]: {
        [Language.LATIN]: '2 Regum',
        [Language.SPANISH]: '2 Samuel[Español]',
    },
    [BibleBook.KINGS_1]: {
        [Language.LATIN]: '3 Regum',
        [Language.SPANISH]: '1 Kings[Español]',
    },
    [BibleBook.KINGS_2]: {
        [Language.LATIN]: '4 Regum',
        [Language.SPANISH]: '2 Kings[Español]',
    },
    [BibleBook.CHRONICLES_1]: {
        [Language.LATIN]: '1 Paralipomenon',
        [Language.SPANISH]: '1 Chronicles[Español]',
    },
    [BibleBook.CHRONICLES_2]: {
        [Language.LATIN]: '2 Paralipomenon',
        [Language.SPANISH]: '2 Chronicles[Español]',
    },
    [BibleBook.EZRA]: {
        [Language.LATIN]: 'Esdræ',
        [Language.SPANISH]: 'Ezra[Español]',
    },
    [BibleBook.MACCABEES_2]: {
        [Language.LATIN]: '2 Machabæorum',
        [Language.SPANISH]: '2 Maccabees[Español]',
    },
    [BibleBook.JOB]: {
        [Language.LATIN]: 'Job',
        [Language.SPANISH]: 'Job[Español]',
    },
    [BibleBook.PSALMS]: {
        [Language.LATIN]: 'Psalmi',
        [Language.SPANISH]: 'Salmos',
    },
    [BibleBook.PROVERBS]: {
        [Language.LATIN]: 'Proverbia',
        [Language.SPANISH]: 'Proverbs[Español]',
    },
    [BibleBook.ECCLESIASTES]: {
        [Language.LATIN]: 'Ecclesiastes',
        [Language.SPANISH]: 'Ecclesiastes[Español]',
    },
    [BibleBook.SONG_OF_SOLOMON]: {
        [Language.LATIN]: 'Canticum Canticorum',
        [Language.SPANISH]: 'Song of Solomon[Español]',
    },
    [BibleBook.WISDOM]: {
        [Language.LATIN]: 'Sapientiæ',
        [Language.SPANISH]: 'Wisdom[Español]',
    },
    [BibleBook.SIRACH]: {
        [Language.LATIN]: 'Ecclesiasticus',
        [Language.SPANISH]: 'Sirach[Español]',
    },
    [BibleBook.ISAIAH]: {
        [Language.LATIN]: 'Isaiæ',
        [Language.SPANISH]: 'Isaiah[Español]',
    },
    [BibleBook.LAMENTATIONS]: {
        [Language.LATIN]: 'Lamentationes',
        [Language.SPANISH]: 'Lamentations[Español]',
    },
    [BibleBook.BARUCH]: {
        [Language.LATIN]: 'Baruch',
        [Language.SPANISH]: 'Baruch[Español]',
    },
    [BibleBook.EZEKIEL]: {
        [Language.LATIN]: 'Ezechielis',
        [Language.SPANISH]: 'Ezekiel[Español]',
    },
    [BibleBook.DANIEL]: {
        [Language.LATIN]: 'Danielis',
        [Language.SPANISH]: 'Daniel[Español]',
    },
    [BibleBook.HOSEA]: {
        [Language.LATIN]: 'Osee',
        [Language.SPANISH]: 'Hosea[Español]',
    },
    [BibleBook.JOEL]: {
        [Language.LATIN]: 'Joel',
        [Language.SPANISH]: 'Joel[Español]',
    },
    [BibleBook.AMOS]: {
        [Language.LATIN]: 'Amos',
        [Language.SPANISH]: 'Amos[Español]',
    },
    [BibleBook.JONAH]: {
        [Language.LATIN]: 'Jonæ',
        [Language.SPANISH]: 'Jonah[Español]',
    },
    [BibleBook.MICAH]: {
        [Language.LATIN]: 'Michææ',
        [Language.SPANISH]: 'Miqueas',
    },
    [BibleBook.ZEPHANIAH]: {
        [Language.LATIN]: 'Sophoniae',
        [Language.SPANISH]: 'Zephaniah[Español]',
    },
    [BibleBook.ZECHARIAH]: {
        [Language.LATIN]: 'Zachariæ',
        [Language.SPANISH]: 'Zechariah[Español]',
    },
    [BibleBook.MALACHI]: {
        [Language.LATIN]: 'Malachiæ',
        [Language.SPANISH]: 'Malachi[Español]',
    },
    [BibleBook.MATTHEW]: {
        [Language.LATIN]: 'secundum Matthæum',
        [Language.SPANISH]: 'Matthew[Español]',
    },
    [BibleBook.MARK]: {
        [Language.LATIN]: 'secundum Marcum',
        [Language.SPANISH]: 'Mark[Español]',
    },
    [BibleBook.LUKE]: {
        [Language.LATIN]: 'secundum Lucam',
        [Language.SPANISH]: 'Luke[Español]',
    },
    [BibleBook.JOHN]: {
        [Language.LATIN]: 'secundum Ioannem',
        [Language.SPANISH]: 'San Juan',
    },
    [BibleBook.ACTS_OF_THE_APOSTLES]: {
        [Language.LATIN]: 'Actus',
        [Language.SPANISH]: 'Hechos',
    },
    [BibleBook.ROMANS]: {
        [Language.LATIN]: 'ad Romanos',
        [Language.SPANISH]: 'Romans[Español]',
    },
    [BibleBook.CORINTHIANS_1]: {
        [Language.LATIN]: '1 ad Corinthios',
        [Language.SPANISH]: '1 Corinthians[Español]',
    },
    [BibleBook.CORINTHIANS_2]: {
        [Language.LATIN]: '2 ad Corinthios',
        [Language.SPANISH]: '2 Corinthians[Español]',
    },
    [BibleBook.GALATIANS]: {
        [Language.LATIN]: 'ad Galatas',
        [Language.SPANISH]: 'Galatians[Español]',
    },
    [BibleBook.EPHESIANS]: {
        [Language.LATIN]: 'ad Ephesios',
        [Language.SPANISH]: 'Efesios',
    },
    [BibleBook.PHILIPPIANS]: {
        [Language.LATIN]: 'ad Philippenses',
        [Language.SPANISH]: 'Philippians[Español]',
    },
    [BibleBook.COLOSSIANS]: {
        [Language.LATIN]: 'ad Colossenses',
        [Language.SPANISH]: 'Colossians[Español]',
    },
    [BibleBook.THESSALONIANS_1]: {
        [Language.LATIN]: '1 ad Thessalonicenses',
        [Language.SPANISH]: '1 Thessalonians[Español]',
    },
    [BibleBook.THESSALONIANS_2]: {
        [Language.LATIN]: '2 ad Thessalonicenses',
        [Language.SPANISH]: '2 Thessalonians[Español]',
    },
    [BibleBook.TIMOTHY_1]: {
        [Language.LATIN]: '1 ad Timotheum',
        [Language.SPANISH]: '1 Timothy[Español]',
    },
    [BibleBook.TIMOTHY_2]: {
        [Language.LATIN]: '2 ad Timotheum',
        [Language.SPANISH]: '2 Timothy[Español]',
    },
    [BibleBook.TITUS]: {
        [Language.LATIN]: 'ad Titum',
        [Language.SPANISH]: 'Titus[Español]',
    },
    [BibleBook.PHILEMON]: {
        [Language.LATIN]: 'ad Philemonem',
        [Language.SPANISH]: 'Philemon[Español]',
    },
    [BibleBook.HEBREWS]: {
        [Language.LATIN]: 'ad Hebræos',
        [Language.SPANISH]: 'Hebreos',
    },
    [BibleBook.JAMES]: {
        [Language.LATIN]: 'Iacobi',
        [Language.SPANISH]: 'James[Español]',
    },
    [BibleBook.PETER_1]: {
        [Language.LATIN]: '1 Petri',
        [Language.SPANISH]: '1 Peter[Español]',
    },
    [BibleBook.PETER_2]: {
        [Language.LATIN]: '2 Petri',
        [Language.SPANISH]: '2 Peter[Español]',
    },
    [BibleBook.JOHN_1]: {
        [Language.LATIN]: '1 Ioannis',
        [Language.SPANISH]: '1 John[Español]',
    },
    [BibleBook.JOHN_2]: {
        [Language.LATIN]: '2 Ioannis',
        [Language.SPANISH]: '2 John[Español]',
    },
    [BibleBook.JOHN_3]: {
        [Language.LATIN]: '3 Ioannis',
        [Language.SPANISH]: '3 John[Español]',
    },
    [BibleBook.JUDE]: {
        [Language.LATIN]: 'Iudæ',
        [Language.SPANISH]: 'Jude[Español]',
    },
    [BibleBook.REVELATION]: {
        [Language.LATIN]: 'Apocalypsis',
        [Language.SPANISH]: 'Revelation[Español]',
    },
    //#endregion

    //#region Content
    'Vulgate': {
        [Language.LATIN]: 'Vulgata',
        [Language.SPANISH]: 'Vulgata',
    },
    'Cf. ': {
        [Language.LATIN]: 'Cf. ',
        [Language.SPANISH]: 'Cf. ',
    },
    'Catechism of the Catholic Church': {
        [Language.LATIN]: 'Catechismus Catholicae Ecclesiae',
        [Language.SPANISH]: 'Catecismo de la Iglesia Católica',
    },
    'Table of Contents': {
        [Language.LATIN]: 'Index Generalis',
        [Language.SPANISH]: 'Índice General',
    },
    'prologue': {
        [Language.LATIN]: 'prooemium',
        [Language.SPANISH]: 'prologo',
    },
    'part': {
        [Language.LATIN]: 'pars',
        [Language.SPANISH]: 'parte',
    },
    'section': {
        [Language.LATIN]: 'sectio',
        [Language.SPANISH]: 'seccion',
    },
    'chapter': {
        [Language.LATIN]: 'caput',
        [Language.SPANISH]: 'capitulo',
    },
    'chapter-section': {
        [Language.LATIN]: 'caput-sectio',
        [Language.SPANISH]: 'capitulo-seccion',
    },
    'article': {
        [Language.LATIN]: 'articulus',
        [Language.SPANISH]: 'articulo',
    },
    'article-paragraph': {
        [Language.LATIN]: 'articulus-paragraphus',
        [Language.SPANISH]: 'articulo-parrafo',
    },
    'In Brief': {
        [Language.LATIN]: 'Compendium',
        [Language.SPANISH]: 'Resumen',
    },
    'in-brief': {
        [Language.LATIN]: 'compendium',
        [Language.SPANISH]: 'resumen',
    },
    'subarticle': {
        [Language.LATIN]: 'subarticulus',
        [Language.SPANISH]: 'subartículo',
    },
    'subarticle-': {
        [Language.LATIN]: 'subarticulus-',
        [Language.SPANISH]: 'subartículo-',
    },
    'paragraph': {
        [Language.LATIN]: 'paragraphus',
        [Language.SPANISH]: 'parrafo',
    },
    // This is not merely "paragraph" with a hypen at the end, but also the first part of "paragraph-group"
    'paragraph-': {
        [Language.LATIN]: 'paragraphus-',
        [Language.SPANISH]: 'parrafo-',
    },
    'paragraph-group': {
        [Language.LATIN]: 'paragraphus-classis',
        [Language.SPANISH]: 'parrafo-grupo',
    },
    'final-content': {
        [Language.LATIN]: 'finalis-contentus',
        [Language.SPANISH]: 'contenido-final',
    },
    [Content.PROLOGUE]: {
        [Language.LATIN]: 'prooemium',
        [Language.SPANISH]: 'prologo',
    },
    [Content.PART]: {
        [Language.LATIN]: 'pars',
        [Language.SPANISH]: 'parte',
    },
    [Content.SECTION]: {
        [Language.LATIN]: 'sectio',
        [Language.SPANISH]: 'seccion',
    },
    [Content.CHAPTER]: {
        [Language.LATIN]: 'caput',
        [Language.SPANISH]: 'capitulo',
    },
    [Content.CHAPTER_SECTION]: {
        [Language.LATIN]: 'caput-sectio',
        [Language.SPANISH]: 'capitulo-seccion',
    },
    [Content.ARTICLE]: {
        [Language.LATIN]: 'articulus',
        [Language.SPANISH]: 'articulo',
    },
    [Content.ARTICLE_PARAGRAPH]: {
        [Language.LATIN]: 'articulus-paragraphus',
        [Language.SPANISH]: 'articulo-parrafo',
    },
    [Content.SUB_ARTICLE]: {
        [Language.LATIN]: 'subarticulus',
        [Language.SPANISH]: 'subartículo',
    },
    [Content.IN_BRIEF]: {
        [Language.LATIN]: 'compendium',
        [Language.SPANISH]: 'resumen',
    },
    [Content.PARAGRAPH_GROUP]: {
        [Language.LATIN]: 'paragraphus-classis',
        [Language.SPANISH]: 'parrafo-grupo',
    },
    [Content.PARAGRAPH]: {
        [Language.LATIN]: 'paragraphus',
        [Language.SPANISH]: 'parrafo',
    },
    // During development, it is acceptable to use English for the following `Content` values
    [Content.GENERIC_CONTENT_CONTAINER]: {
        [Language.LATIN]: Content.GENERIC_CONTENT_CONTAINER,
        [Language.SPANISH]: Content.GENERIC_CONTENT_CONTAINER,
    },
    [Content.BLOCK_QUOTE]: {
        [Language.LATIN]: Content.BLOCK_QUOTE,
        [Language.SPANISH]: Content.BLOCK_QUOTE,
    },
    [Content.PARAGRAPH_SUB_ITEM_CONTAINER]: {
        [Language.LATIN]: Content.PARAGRAPH_SUB_ITEM_CONTAINER,
        [Language.SPANISH]: Content.PARAGRAPH_SUB_ITEM_CONTAINER,
    },
    [Content.PARAGRAPH_SUB_ITEM]: {
        [Language.LATIN]: Content.PARAGRAPH_SUB_ITEM,
        [Language.SPANISH]: Content.PARAGRAPH_SUB_ITEM,
    },
    [Content.TEXT_BLOCK]: {
        [Language.LATIN]: Content.TEXT_BLOCK,
        [Language.SPANISH]: Content.TEXT_BLOCK,
    },
    [Content.TEXT_HEADING]: {
        [Language.LATIN]: Content.TEXT_HEADING,
        [Language.SPANISH]: Content.TEXT_HEADING,
    },
    [Content.TEXT_WRAPPER]: {
        [Language.LATIN]: Content.TEXT_WRAPPER,
        [Language.SPANISH]: Content.TEXT_WRAPPER,
    },
    [Content.TEXT]: {
        [Language.LATIN]: Content.TEXT,
        [Language.SPANISH]: Content.TEXT,
    },
    [Content.CREED]: {
        [Language.LATIN]: Content.CREED,
        [Language.SPANISH]: Content.CREED,
    },
    [Content.TEN_COMMANDMENTS]: {
        [Language.LATIN]: Content.TEN_COMMANDMENTS,
        [Language.SPANISH]: Content.TEN_COMMANDMENTS,
    },
    'generic-content-container': {
        [Language.LATIN]: 'generic-content-container',
        [Language.SPANISH]: 'generic-content-container',
    },
    'block-quote': {
        [Language.LATIN]: 'block-quote',
        [Language.SPANISH]: 'block-quote',
    },
    'paragraph-sub-item-container': {
        [Language.LATIN]: 'paragraph-sub-item-container',
        [Language.SPANISH]: 'paragraph-sub-item-container',
    },
    'paragraph-sub-item': {
        [Language.LATIN]: 'paragraph-sub-item',
        [Language.SPANISH]: 'paragraph-sub-item',
    },
    'text-block': {
        [Language.LATIN]: 'text-block',
        [Language.SPANISH]: 'text-block',
    },
    'text-heading': {
        [Language.LATIN]: 'text-heading',
        [Language.SPANISH]: 'text-heading',
    },
    'text-wrapper': {
        [Language.LATIN]: 'text-wrapper',
        [Language.SPANISH]: 'text-wrapper',
    },
    'text': {
        [Language.LATIN]: 'text',
        [Language.SPANISH]: 'text',
    },
    'creed': {
        [Language.LATIN]: 'creed',
        [Language.SPANISH]: 'creed',
    },
    'ten-commandments': {
        [Language.LATIN]: 'ten-commandments',
        [Language.SPANISH]: 'ten-commandments',
    },
    // (end of section where English use is acceptable during development)
    //#endregion
};
