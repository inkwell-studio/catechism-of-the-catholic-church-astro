import { getLanguage } from '../../language/language-state.ts';
import { Language } from '../../../source/types/types.ts';

//#region exported functions
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

export function getUniqueWords(language: Language): Array<string> {
    const words = getTextSamples(language)
        .map((line) => removePunctuation(line))
        .join(' ')
        .split(' ');

    const uniqueWords = new Set(words);
    return Array.from(uniqueWords);
}
//#endregion

//#region helper functions
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

function removePunctuation(text: string): string {
    const punctuationMarks = [
        `.`,
        `,`,
        `;`,
        `:`,
        `'`,
        `"`,
        `‘`,
        `’`,
        `“`,
        `”`,
        `(`,
        `)`,
    ];

    for (const punctuationMark of punctuationMarks) {
        text = text.replaceAll(punctuationMark, '');
    }

    return text;
}
//#endregion

//#region text samples
// source: Douay-Rheims 1899 American Edition
// https://www.biblegateway.com/versions/Douay-Rheims-1899-American-Edition-DRA-Bible/
const englishSamples = [
    // Genesis 1
    `In the beginning God created heaven, and earth.`,
    `And the earth was void and empty, and darkness was upon the face of the deep; and the spirit of God moved over the waters.`,
    `And God said: Be light made. And light was made.`,
    `And God saw the light that it was good; and he divided the light from the darkness.`,
    `And he called the light Day, and the darkness Night; and there was evening and morning one day.`,
    `And God said: Let there be a firmament made amidst the waters: and let it divide the waters from the waters.`,
    `And God made a firmament, and divided the waters that were under the firmament, from those that were above the firmament, and it was so.`,
    `And God called the firmament, Heaven; and the evening and morning were the second day.`,
    `God also said: Let the waters that are under the heaven, be gathered together into one place: and let the dry land appear. And it was so done.`,
    `And God called the dry land, Earth; and the gathering together of the waters, he called Seas. And God saw that it was good.`,
    `And he said: Let the earth bring forth the green herb, and such as may seed, and the fruit tree yielding fruit after its kind, which may have seed in itself upon the earth. And it was so done.`,
    `And the earth brought forth the green herb, and such as yieldeth seed according to its kind, and the tree that beareth fruit, having seed each one according to its kind. And God saw that it was good.`,
    `And the evening and the morning were the third day.`,
    `And God said: Let there be lights made in the firmament of heaven, to divide the day and the night, and let them be for signs, and for seasons, and for days and years:`,
    `To shine in the firmament of heaven, and to give light upon the earth. And it was so done.`,
    `And God made two great lights: a greater light to rule the day; and a lesser light to rule the night: and the stars.`,
    `And he set them in the firmament of heaven to shine upon the earth.`,
    `And to rule the day and the night, and to divide the light and the darkness. And God saw that it was good.`,
    `And the evening and morning were the fourth day.`,
    `God also said: Let the waters bring forth the creeping creature having life, and the fowl that may fly over the earth under the firmament of heaven.`,
    `And God created the great whales, and every living and moving creature, which the waters brought forth, according to their kinds, and every winged fowl according to its kind. And God saw that it was good.`,
    `And he blessed them, saying: Increase and multiply, and fill the waters of the sea: and let the birds be multiplied upon the earth.`,
    `And the evening and morning were the fifth day.`,
    `And God said: Let the earth bring forth the living creature in its kind, cattle and creeping things, and beasts of the earth, according to their kinds. And it was so done.`,
    `And God made the beasts of the earth according to their kinds, and cattle, and every thing that creepeth on the earth after its kind. And God saw that it was good.`,
    `And he said: Let us make man to our image and likeness: and let him have dominion over the fishes of the sea, and the fowls of the air, and the beasts, and the whole earth, and every creeping creature that moveth upon the earth.`,
    `And God created man to his own image: to the image of God he created him: male and female he created them.`,
    `And God blessed them, saying: Increase and multiply, and fill the earth, and subdue it, and rule over the fishes of the sea, and the fowls of the air, and all living creatures that move upon the earth.`,
    `And God said: Behold I have given you every herb bearing seed upon the earth, and all trees that have in themselves seed of their own kind, to be your meat:`,
    `And to all beasts of the earth, and to every fowl of the air, and to all that move upon the earth, and wherein there is life, that they may have to feed upon. And it was so done.`,
    `And God saw all the things that he had made, and they were very good. And the evening and morning were the sixth day.`,
    // Matthew 3
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
    // Matthew 4
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
    // Genesis 1
    'In principio creavit Deus caelum et terram.',
    'Terra autem erat inanis et vacua, et tenebrae erant super faciem abyssi: et spiritus Dei ferebatur super aquas.',
    'Dixitque Deus: Fiat lux. Et facta est lux.',
    'Et vidit Deus lucem quod esset bona: et divisit lucem a tenebris.',
    'Appellavitque lucem Diem, et tenebras Noctem: factumque est vespere et mane, dies unus.',
    'Dixit quoque Deus: Fiat firmamentum in medio aquarum: et dividat aquas ab aquis.',
    'Et fecit Deus firmamentum, divisitque aquas, quae erant sub firmamento, ab his, quae erant super firmamentum. Et factum est ita.',
    'Vocavitque Deus firmamentum, Caelum: et factum est vespere et mane, dies secundus.',
    'Dixit vero Deus: Congregentur aquae, quae sub caelo sunt, in locum unum: et appareat arida. Et factum est ita.',
    'Et vocavit Deus aridam Terram, congregationesque aquarum appellavit Maria. Et vidit Deus quod esset bonum.',
    'Et ait: Germinet terra herbam virentem, et facientem semen, et lignum pomiferum faciens fructum juxta genus suum, cujus semen in semetipso sit super terram. Et factum est ita.',
    'Et protulit terra herbam virentem, et facientem semen juxta genus suum, lignumque faciens fructum, et habens unumquodque sementem secundum speciem suam. Et vidit Deus quod esset bonum.',
    'Et factum est vespere et mane, dies tertius.',
    'Dixit autem Deus: Fiant luminaria in firmamento caeli, et dividant diem ac noctem, et sint in signa et tempora, et dies et annos:',
    'ut luceant in firmamento caeli, et illuminent terram. Et factum est ita.',
    'Fecitque Deus duo luminaria magna: luminare majus, ut praeesset diei: et luminare minus, ut praeesset nocti: et stellas.',
    'Et posuit eas in firmamento caeli, ut lucerent super terram,',
    'et praeessent diei ac nocti, et dividerent lucem ac tenebras. Et vidit Deus quod esset bonum.',
    'Et factum est vespere et mane, dies quartus.',
    'Dixit etiam Deus: Producant aquae reptile animae viventis, et volatile super terram sub firmamento caeli.',
    'Creavitque Deus cete grandia, et omnem animam viventem atque motabilem, quam produxerant aquae in species suas, et omne volatile secundum genus suum. Et vidit Deus quod esset bonum.',
    'Benedixitque eis, dicens: Crescite, et multiplicamini, et replete aquas maris: avesque multiplicentur super terram.',
    'Et factum est vespere et mane, dies quintus.',
    'Dixit quoque Deus: Producat terra animam viventem in genere suo, jumenta, et reptilia, et bestias terrae secundum species suas. Factumque est ita.',
    'Et fecit Deus bestias terrae juxta species suas, et jumenta, et omne reptile terrae in genere suo. Et vidit Deus quod esset bonum,',
    'et ait: Faciamus hominem ad imaginem et similitudinem nostram: et praesit piscibus maris, et volatilibus caeli, et bestiis, universaeque terrae, omnique reptili, quod movetur in terra.',
    'Et creavit Deus hominem ad imaginem suam: ad imaginem Dei creavit illum, masculum et feminam creavit eos.',
    'Benedixitque illis Deus, et ait: Crescite et multiplicamini, et replete terram, et subjicite eam, et dominamini piscibus maris, et volatilibus caeli, et universis animantibus, quae moventur super terram.',
    'Dixitque Deus: Ecce dedi vobis omnem herbam afferentem semen super terram, et universa ligna quae habent in semetipsis sementem generis sui, ut sint vobis in escam:',
    'et cunctis animantibus terrae, omnique volucri caeli, et universis quae moventur in terra, et in quibus est anima vivens, ut habeant ad vescendum. Et factum est ita.',
    'Viditque Deus cuncta quae fecerat, et erant valde bona. Et factum est vespere et mane, dies sextus.',
    // Matthew 3
    'In diebus autem illis venit Joannes Baptista praedicans in deserto Judaeae,',
    'et dicens: Poenitentiam agite: appropinquavit enim regnum caelorum.',
    'Hic est enim, qui dictus est per Isaiam prophetam dicentem: Vox clamantis in deserto: Parate viam Domini; rectas facite semitas ejus.',
    'Ipse autem Joannes habebat vestimentum de pilis camelorum, et zonam pelliceam circa lumbos suos: esca autem ejus erat locustae, et mel silvestre.',
    'Tunc exibat ad eum Jerosolyma, et omnis Judaea, et omnis regio circa Jordanem;',
    'et baptizabantur ab eo in Jordane, confitentes peccata sua.',
    'Videns autem multos pharisaeorum, et sadducaeorum, venientes ad baptismum suum, dixit eis: Progenies viperarum, quis demonstravit vobis fugere a ventura ira?',
    'Facite ergo fructum dignum poenitentiae.',
    'Et ne velitis dicere intra vos: Patrem habemus Abraham. Dico enim vobis quoniam potens est Deus de lapidibus istis suscitare filios Abrahae.',
    'Jam enim securis ad radicem arborum posita est. Omnis ergo arbor, quae non facit fructum bonum, excidetur, et in ignem mittetur.',
    'Ego quidem baptizo vos in aqua in poenitentiam: qui autem post me venturus est, fortior me est, cujus non sum dignus calceamenta portare: ipse vos baptizabit in Spiritu Sancto, et igni.',
    'Cujus ventilabrum in manu sua: et permundabit aream suam: et congregabit triticum suum in horreum, paleas autem comburet igni inextinguibili.',
    'Tunc venit Jesus a Galilaea in Jordanem ad Joannem, ut baptizaretur ab eo.',
    'Joannes autem prohibebat eum, dicens: Ego a te debeo baptizari, et tu venis ad me?',
    'Respondens autem Jesus, dixit ei: Sine modo: sic enim decet nos implere omnem justitiam. Tunc dimisit eum.',
    'Baptizatus autem Jesus, confestim ascendit de aqua, et ecce aperti sunt ei caeli: et vidit Spiritum Dei descendentem sicut columbam, et venientem super se.',
    'Et ecce vox de caelis dicens: Hic est Filius meus dilectus, in quo mihi complacui.',
    // Matthew 4
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
    // Genesis 1
    'En el principio creó Dios el cielo y la tierra.',
    'La tierra, estaba informe y vacía, las tinieblas cubrían la superficie del abismo, y el espíritu de Dios se movía sobre las aguas.',
    'Dijo, pues, Dios: Sea hecha la luz. Y la luz quedó hecha.',
    'Y vio Dios que la luz era buena, y dividió la luz de las tinieblas.',
    'A la luz la llamó día, y a las tinieblas noche; así de la tarde aquella y de la mañana siguiente resultó el primer día.',
    'Dijo asimismo Dios: Haya un firmamento o una gran extensión en medio de las aguas, que separe unas aguas de otras.',
    'E hizo Dios el firmamento, y separó las aguas que estaban debajo del firmamento, de aquéllas que estaban sobre el firmamento. Y quedó hecho así.',
    'Y al firmamento le llamó Dios cielo. Con lo que de tarde y de mañana se cumplió el día segundo.',
    'Dijo también Dios: Reúnanse en un lugar las aguas que están debajo del cielo y aparezca lo árido o seco. Y así se hizo.',
    'Y al elemento árido le dio Dios el nombre de tierra, y a las aguas reunidas las llamó mares. Y vio Dios que lo hecho estaba bueno.',
    'Dijo asimismo: Produzca la tierra hierba verde y que dé simiente, y plantas fructíferas que den fruto conforme a su especie, y contengan en sí mismas su simiente sobre la tierra. Y así se hizo.',
    'Con lo que produjo la tierra hierba verde, que da simiente según su especie, y árboles que dan fruto, de los cuales cada uno tiene su propia semilla según la especie suya. Y vio Dios que la cosa era buena.',
    'Y de la tarde y mañana resultó el día tercero.',
    'Dijo después Dios: Haya lumbreras o cuerpos luminosos en el firmamento del cielo, que distingan el día y la noche, y señalen los tiempos o las estaciones, los días y los años.',
    'A fin de que brillen en el firmamento del cielo, y alumbren la tierra. Y fue hecho así.',
    'Hizo, pues; Dios dos grandes lumbreras: la lumbrera mayor para que presidiese al día; y la lumbrera menor, para presidir la noche; e hizo las estrellas.',
    'Y las colocó en el firmamento o extensión del cielo, para que resplandeciesen sobre la tierra.',
    'Y presidiesen el día y a la noche, y separasen la luz de las tinieblas. Y vio Dios que la cosa era buena.',
    'Con lo que de tarde y mañana, resultó el día cuarto.',
    'Dijo también Dios: Produzcan las aguas reptiles animados que vivan en el agua, y aves que vuelen sobre la tierra, debajo del firmamento del cielo.',
    'Creó, pues, Dios los grandes peces , y todos los animales que viven y se mueven, producidos por las aguas según sus especies, y asimismo todo lo volátil según su género. Y vio Dios que lo hecho era bueno.',
    'Y los bendijo, diciendo: Creced y multiplicaos y henchid las aguas del mar, y multiplíquense las aves sobre la tierra.',
    'Con lo que de la tarde y mañana resultó el día quinto.',
    'Dijo todavía Dios: Produzca la tierra animales vivientes en cada género animales domésticos, reptiles y bestias silvestres de la tierra, según sus especies. Y fue hecho así.',
    'Hizo, pues, Dios las bestias silvestres de la tierra según sus especies, y los animales domésticos, y todo reptil terrestre según su especie. Y vio Dios que lo hecho era bueno.',
    'Y por fin dijo: Hagamos al hombre a imagen y semejanza nuestra; y domine a los peces del mar, y a las aves del cielo, y a las bestias, y a toda la tierra, y a todo reptil que se mueve sobre la tierra.',
    'Creó, pues, Dios al hombre a imagen suya: a imagen de Dios le creó; los creó varón y hembra.',
    'Y les echó Dios su bendición y dijo: Creced y multiplicaos, y henchid la tierra, y enseñoreaos de ella, y dominad a los peces del mar y a las aves del cielo y a todos los animales que se mueven sobre la tierra.',
    'Y añadió Dios: Ved que os he dado todas las hierbas las cuales producen simiente sobre la tierra, y todos los árboles los cuales tienen en sí mismos simiente de su especie, para que os sirvan de alimento a vosotros,',
    'y a todos los animales de la tierra, y a todas las aves del cielo, y a todos cuantos animales vivientes se mueven sobre la tierra, a fin de que tengan que comer. Y así se hizo.',
    'Y vio Dios todas las cosas que había hecho; y eran en gran manera buenas. Con lo que de la tarde y de la mañana se formó el día sexto.',
    // Matthew 3
    'En aquella temporada se dejó ver Juan Bautista predicando en el desierto de Judea,',
    'y diciendo: Haced penitencia, porque está cerca el reino de los cielos.',
    'Este es aquel de quien se dijo por el profeta Isaías: Es la voz del que clama en el desierto, diciendo: Preparad el camino del Señor. Haced derechas sus sendas.',
    'Traía Juan un vestido de pelos de camello y un cinto de cuero a sus lomos, y su comida eran langostas y miel silvestre.',
    'Iban, pues, a encontrarle las gentes de Jerusalén y de toda la Judea, y de toda la ribera del Jordán;',
    'y recibían de él el bautismo en el Jordán, confesando sus pecados.',
    'Pero como viese venir a su bautismo muchos de los fariseos y saduceos, les dijo: ¡Oh raza de víboras!, ¿quién os ha enseñado que con solas exterioridades podéis huir de la ira que os amenaza?',
    'Haced, pues, frutos dignos de penitencia;',
    'y dejaos de decir interiormente: Tenemos por padre a Abrahán; porque yo os digo que poderoso es Dios para hacer que nazcan de estas mismas piedras hijos de Abrahán.',
    'Mirad que ya el hacha está aplicada a la raíz de los árboles; y todo árbol que no produce buen fruto, será cortado y echado al fuego.',
    'Yo a la verdad os bautizo con agua para moveros a la penitencia; pero el que ha de venir después de mí es más poderoso que yo, y no soy yo digno siquiera de llevarle las sandalias; él es quien ha de bautizaros en el Espíritu Santo y en el fuego.',
    'El tiene en sus manos la pala, y limpiará perfectamente su era; y su trigo lo meterá en el granero; mas las pajas quemarás en un fuego inextinguible.',
    'Por este tiempo vino Jesús de Galilea al Jordán en busca de Juan para ser de él bautizado.',
    'Juan se resistía a ello, diciendo: Yo debo ser bautizado de ti, ¿y tú vienes a mí?',
    'A lo cual respondió Jesús , diciendo: Déjame hacer ahora, que así es como conviene que nosotros cumplamos toda justicia. Juan entonces condescendió con él.',
    'Bautizado, pues, Jesús , al instante que salió del agua se le abrieron los cielos, y vio bajar al Espíritu de Dios a manera de paloma y posar sobre él.',
    'Y se oyó una voz del cielo que decía: Este es mi hijo amado, en quien he puesto toda mi complacencia.',
    // Matthew 4
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
//#endregion
