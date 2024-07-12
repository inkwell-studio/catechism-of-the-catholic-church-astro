import { getLanguage } from '../../language-state.ts';
import { Language } from '../../../source/types/types.ts';

const sampleIndices = new Map<Language, number>();
Object.values(Language).forEach((language) => sampleIndices.set(language, 0));

export function getText(): string {
    const language = getLanguage();

    let index = sampleIndices.get(language) ?? 0;

    const textSamples = getTextSamples(language);
    if (index >= textSamples.length) {
        index = 0;
    }
    sampleIndices.set(language, index + 1);

    return textSamples.at(index) ?? '';
}

function getTextSamples(language: Language): Array<string> {
    switch (language) {
        case Language.ENGLISH:
            return englishSamples;
        case Language.LATIN:
            return latinSamples;
        case Language.SPANISH:
            return spanishSamples;
    }
}

// source: Douay-Rheims 1899 American Edition
// https://www.biblegateway.com/versions/Douay-Rheims-1899-American-Edition-DRA-Bible/
const englishSamples = [
    `And in those days cometh John the Baptist preaching in the desert of Judea.`,
    `And saying: Do penance: for the kingdom of heaven is at hand.`,
    `For this is he that was spoken of by Isaias the prophet, saying: A voice of one crying in the desert, Prepare ye the way of the Lord, make straight his paths.`,
    `And the same John had his garment of camels' hair, and a leathern girdle about his loins: and his meat was locusts and wild honey.`,
    `Then went out to him Jerusalem and all Judea, and all the country about Jordan:`,
    `And were baptized by him in the Jordan, confessing their sins.`,
    `And seeing many of the Pharisees and Sadducees coming to his baptism, he said to them: Ye brood of vipers, who hath shewed you to flee from the wrath to come?`,
    `Bring forth therefore fruit worthy of penance.`,
    `And think not to say within yourselves, We have Abraham for our father. For I tell you that God is able of these stones to raise up children to Abraham.`,
    `For now the axe is laid to the root of the trees. Every tree therefore that doth not yield good fruit, shall be cut down, and cast into the fire.`,
    `I indeed baptize you in the water unto penance, but he that shall come after me, is mightier than I, whose shoes I am not worthy to bear; he shall baptize you in the Holy Ghost and fire.`,
    `Whose fan is in his hand, and he will thoroughly cleanse his floor and gather his wheat into the barn; but the chaff he will burn with unquenchable fire.`,
    `Then cometh Jesus from Galilee to the Jordan, unto John, to be baptized by him.`,
    `But John stayed him, saying: I ought to be baptized by thee, and comest thou to me?`,
    `And Jesus answering, said to him: Suffer it to be so now. For so it becometh us to fulfill all justice. Then he suffered him.`,
    `And Jesus being baptized, forthwith came out of the water: and lo, the heavens were opened to him: and he saw the Spirit of God descending as a dove, and coming upon him.`,
    `And behold a voice from heaven, saying: This is my beloved Son, in whom I am well pleased.`,
    `Then Jesus was led by the spirit into the desert, to be tempted by the devil.`,
    `And when he had fasted forty days and forty nights, afterwards he was hungry.`,
    `And the tempter coming said to him: If thou be the Son of God, command that these stones be made bread.`,
    `Who answered and said: It is written, Not in bread alone doth man live, but in every word that proceedeth from the mouth of God.`,
    `Then the devil took him up into the holy city, and set him upon the pinnacle of the temple,`,
    `And said to him: If thou be the Son of God, cast thyself down, for it is written: That he hath given his angels charge over thee, and in their hands shall they bear thee up, lest perhaps thou dash thy foot against a stone.`,
    `Jesus said to him: It is written again: Thou shalt not tempt the Lord thy God.`,
    `Again the devil took him up into a very high mountain, and shewed him all the kingdoms of the world, and the glory of them,`,
    `And said to him: All these will I give thee, if falling down thou wilt adore me.`,
    `Then Jesus saith to him: Begone, Satan: for it is written, The Lord thy God shalt thou adore, and him only shalt thou serve.`,
    `Then the devil left him; and behold angels came and ministered to him.`,
    `And when Jesus had heard that John was delivered up, he retired into Galilee:`,
    `And leaving the city Nazareth, he came and dwelt in Capharnaum on the sea coast, in the borders of Zabulon and Nephthalim;`,
    `That it might be fulfilled which was said by Isaias the prophet:`,
    `Land of Zabulon and land of Nephthalim, the way of the sea beyond the Jordan, Galilee of the Gentiles:`,
    `The people that sat in darkness, hath seen great light: and to them that sat in the region of the shadow of death, light is sprung up.`,
    `From that time Jesus began to preach, and to say: Do penance, for the kingdom of heaven is at hand.`,
    `And Jesus walking by the sea of Galilee, saw two brethren, Simon who is called Peter, and Andrew his brother, casting a net into the sea (for they were fishers).`,
    `And he saith to them: Come ye after me, and I will make you to be fishers of men.`,
    `And they immediately leaving their nets, followed him.`,
    `And going on from thence, he saw other two brethren, James the son of Zebedee, and John his brother, in a ship with Zebedee their father, mending their nets: and he called them.`,
    `And they forthwith left their nets and father, and followed him.`,
    `And Jesus went about all Galilee, teaching in their synagogues, and preaching the gospel of the kingdom: and healing all manner of sickness and every infirmity, among the people.`,
    `And his fame went throughout all Syria, and they presented to him all sick people that were taken with divers diseases and torments, and such as were possessed by devils, and lunatics, and those that had palsy, and he cured them:`,
    `And much people followed him from Galilee, and from Decapolis, and from Jerusalem, and from Judea, and from beyond the Jordan.`,
];

// Source: the Vulgate
// https://www.biblegateway.com/passage/?search=Matthaeus%204&version=VULGATE
const latinSamples = [
    'Tunc Jesus ductus est in desertum a Spiritu, ut tentaretur a diabolo.',
    'Et cum jejunasset quadraginta diebus, et quadraginta noctibus, postea esuriit.',
    'Et accedens tentator dixit ei: Si Filius Dei es, dic ut lapides isti panes fiant.',
    'Qui respondens dixit: Scriptum est: Non in solo pane vivit homo, sed in omni verbo, quod procedit de ore Dei.',
    'Tunc assumpsit eum diabolus in sanctam civitatem, et statuit eum super pinnaculum templi,',
    'et dixit ei: Si Filius Dei es, mitte te deorsum. Scriptum est enim: Quia angelis suis mandavit de te, et in manibus tollent te, ne forte offendas ad lapidem pedem tuum.',
    'Ait illi Jesus: Rursum scriptum est: Non tentabis Dominum Deum tuum.',
    'Iterum assumpsit eum diabolus in montem excelsum valde: et ostendit ei omnia regna mundi, et gloriam eorum,',
    'et dixit ei: Haec omnia tibi dabo, si cadens adoraveris me.',
    'Tunc dicit ei Jesus: Vade Satana: Scriptum est enim: Dominum Deum tuum adorabis, et illi soli servies.',
    'Tunc reliquit eum diabolus: et ecce angeli accesserunt, et ministrabant ei.',
    'Cum autem audisset Jesus quod Joannes traditus esset, secessit in Galilaeam:',
    'et, relicta civitate Nazareth, venit, et habitavit in Capharnaum maritima, in finibus Zabulon et Nephthalim:',
    'ut adimpleretur quod dictum est per Isaiam prophetam:',
    'Terra Zabulon, et terra Nephthalim, via maris trans Jordanem, Galilaea gentium:',
    'populus, qui sedebat in tenebris, vidit lucem magnam: et sedentibus in regione umbrae mortis, lux orta est eis.',
    'Exinde coepit Jesus praedicare, et dicere: Poenitentiam agite: appropinquavit enim regnum caelorum.',
    'Ambulans autem Jesus juxta mare Galilaeae, vidit duos fratres, Simonem, qui vocatur Petrus, et Andream fratrem ejus, mittentes rete in mare (erant enim piscatores),',
    'et ait illis: Venite post me, et faciam vos fieri piscatores hominum.',
    'At illi continuo relictis retibus secuti sunt eum.',
    'Et procedens inde, vidit alios duos fratres, Jacobum Zebedaei, et Joannem fratrem ejus, in navi cum Zebedaeo patre eorum, reficientes retia sua: et vocavit eos.',
    'Illi autem statim relictis retibus et patre, secuti sunt eum.',
    'Et circuibat Jesus totam Galilaeam, docens in synagogis eorum, et praedicans Evangelium regni: et sanans omnem languorem, et omnem infirmitatem in populo.',
    'Et abiit opinio ejus in totam Syriam, et obtulerunt ei omnes male habentes, variis languoribus, et tormentis comprehensos, et qui daemonia habebant, et lunaticos, et paralyticos, et curavit eos:',
    'lilaea, et Decapoli, et de Jerosolymis, et de Judaea, et de trans Jordanem.',
];

// Source: Biblia Torres Amat
// https://www.bibliatodo.com/la-biblia/Torres-amat/mateo-4
const spanishSamples = [
    'En aquella sazón, Jesús fue conducido del espíritu de Dios al desierto, para que fuese tentado allí por el diablo.',
    'Y después de haber ayunado cuarenta días con cuarenta noches, tuvo hambre.',
    'Entonces, acercándose el tentador, le dijo: Si eres el Hijo de Dios, di que esas piedras se conviertan en panes.',
    'Mas Jesús le respondió: Escrito está: No sólo de pan vive el hombre, sino de toda palabra o disposición que sale de la boca de Dios.',
    'Después de esto lo transportó el diablo a la santa ciudad de Jerusalén , y lo puso sobre lo alto del templo;',
    'y le dijo: Si eres el Hijo de Dios, échate de aquí abajo; pues está escrito: Que te ha encomendado a sus ángeles, los cuales te tomarán en las palmas de sus manos para que tu pie no tropiece contra alguna piedra.',
    'Le replicó Jesús : También está escrito: No tentarás al Señor tu Dios.',
    'Todavía le subió el diablo a un monte muy encumbrado, y le mostró todos los reinos del mundo y la gloria de ellos.',
    'Y le dijo: Todas estas cosas te daré si, postrándote delante de mí, me adorares.',
    'Le respondió entonces Jesús : Apártate de ahí, Satanás; porque está escrito: Adorarás al Señor Dios tuyo, y a él solo servirás.',
    'Y con esto le dejó el diablo; y he aquí que se acercaron los ángeles y le servían.',
    'Oyendo después Jesús que Juan había sido encarcelado, se retiró a Galilea.',
    'Y dejando la ciudad de Nazaret, fue a morar en Cafarnaúm, ciudad marítima en los confines de Zabulón y Neftalí;',
    'con que vino a cumplirse lo que dijo el profeta Isaías:',
    'El país de Zabulón y el país de Neftalí, por donde se va al mar de Tiberíades a la otra parte del Jordán, la Galilea de los gentiles,',
    'este pueblo que yacía en las tinieblas, ha visto una luz grande: Luz que ha venido a iluminar a los que habitan en la región de las sombras de la muerte.',
    'Desde entonces empezó Jesús a predicar y decir: Haced penitencia, porque está cerca el reino de los cielos.',
    'Caminando un día Jesús por la ribera del mar de Galilea vio a dos hermanos, Simón, llamado Pedro, y Andrés su hermano, echando la red en el mar (pues eran pescadores)',
    'y les dijo: Seguidme a mí, y yo os haré pescadores de hombres.',
    'Al instante los dos, dejadas las redes, lo siguieron.',
    'Pasando más adelante, vio a otros dos hermanos, Santiago, hijo de Zebedeo, y Juan su hermano, remendando sus redes en la barca con Zebedeo su padre, y los llamó;',
    'Ellos también al punto, dejadas las redes y a su padre, lo siguieron.',
    'E iba Jesús recorriendo toda la Galilea, enseñando en sus sinagogas y predicando la buena nueva del reino celestial, y sanando toda dolencia y toda enfermedad en los del pueblo;',
    'con lo que corrió su fama por toda la Siria, y le presentaban todos los que estaban enfermos y acosados de varios males y dolores agudos, los endemoniados, los epilépticos, los paralíticos; y los curaba.',
    'Y le iba siguiendo mucha gente de Galilea, y Decápolis, y Jerusalén , y Judea, y de la otra parte del Jordán.',
];
