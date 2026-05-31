// Generates the one-page CV PDF in every supported language.
// Run: node scripts/generate-cv.mjs
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const buildDir = path.join(__dirname, ".build");
const outDir = path.join(root, "public", "cv");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// Shared (non-translated) facts.
const NAME = "Noam Benjamin";
const CONTACT = ["514-863-7173", "noambenjamin40@gmail.com", "linkedin.com/in/noambenjamin4", "Montréal, QC"];
const ORGS = ["Afterlife Events", "Zara, Montréal", "YCC Sleepaway Camp", "JHoops Basketball Camp", "Villa Maria Basketball Team"];
const SCHOOLS = ["Dawson College, Montréal", "Villa Maria High School, Montréal"];

// Language list (order = picker order).
export const LANGS = [
  { code: "en", native: "English", en: "English", dir: "ltr" },
  { code: "fr", native: "Français", en: "French", dir: "ltr" },
  { code: "es", native: "Español", en: "Spanish", dir: "ltr" },
  { code: "pt", native: "Português", en: "Portuguese", dir: "ltr" },
  { code: "de", native: "Deutsch", en: "German", dir: "ltr" },
  { code: "it", native: "Italiano", en: "Italian", dir: "ltr" },
  { code: "zh", native: "中文", en: "Chinese", dir: "ltr" },
  { code: "ja", native: "日本語", en: "Japanese", dir: "ltr" },
  { code: "ko", native: "한국어", en: "Korean", dir: "ltr" },
  { code: "ru", native: "Русский", en: "Russian", dir: "ltr" },
  { code: "ar", native: "العربية", en: "Arabic", dir: "rtl" },
  { code: "hi", native: "हिन्दी", en: "Hindi", dir: "ltr" },
];

const C = {
  en: {
    ui: { profile: "Profile", experience: "Experience", education: "Education", interests: "Interests", contact: "Contact", languages: "Languages", coreSkills: "Core Skills", qualities: "Qualities" },
    roleTitle: "Bilingual Sales & Business Development",
    summary: "Bilingual Dawson College student and founder. I built a profitable events business from nothing, sold 1,500+ tickets, and landed sponsorships through cold outreach and negotiation. I'm comfortable generating revenue, closing sales, and building client relationships in both English and French.",
    roles: ["Founder", "Retail Associate", "Bunk Counselor", "Camp Counselor", "Team Member, Shooting Guard"],
    periods: ["July 2025 – Present", "July 2025 – August 2025", "July 2024 – August 2024", "July 2023 – August 2023", "October 2019 – March 2020"],
    points: [
      ["Sole founder, generating over $50,000 in revenue at an approximately 47% profit margin across 5 events in under one year.", "Sold 1,500+ tickets with zero ad spend, driving all sales through organic outreach, content, and word of mouth.", "Secured sponsorships and brand partnerships through cold outreach and direct negotiation.", "Built and managed client relationships across thousands of interactions, resolving issues and building a loyal repeat following.", "Negotiated venue and vendor contracts to protect margins.", "Hired and led teams of 10+ while studying full time at Dawson College."],
      ["Served approximately 300 customers per shift on the sales floor in English and French, answering product questions and driving purchase decisions.", "Maintained store organization, restocked merchandise, and kept fitting rooms and displays presentation-ready.", "Worked within a team of 10+ to keep the floor running smoothly during high-traffic periods."],
      ["Supervised a group of approximately 20 children aged 7 to 9 throughout a multi-week residential camp.", "Planned and led daily activities including sports, swimming, and drama.", "Resolved conflicts between campers and supported children experiencing homesickness.", "Coordinated daily routines: meals, hygiene, bedtime, and transitions between activities."],
      ["Supervised mixed-age groups of children aged 6 to 12 throughout the day.", "Designed age-appropriate workouts, games, and activities.", "Made sure every child felt included, engaged, and safe during transitions."],
      ["Committed to a full competitive season while keeping up with school, attending every practice on time.", "Worked closely with teammates toward shared goals under a demanding schedule.", "Built early discipline in time management, balancing practices with academic workload."],
    ],
    skills: ["Revenue growth", "Negotiation & closing", "Client relationships", "Outreach & prospecting", "Bilingual communication", "Lead generation & marketing"],
    qualities: ["Self-driven", "Resilient", "Persuasive", "Results-oriented"],
    langNames: ["English", "French"], native: "Native",
    eduCreds: ["DEC in Social Science", "High School Diploma"], eduDetail: ["Expected May 2026", "2024"],
    interests: [{ label: "Audio engineering", text: "Mixing engineer for 6+ years. I've mixed 600+ songs across pop, rap, Afrobeat, and more for paying clients, working in Logic Pro and FL Studio." }, { label: "Technology", text: "I build websites and small apps with AI coding tools like Claude and ChatGPT, and edit videos and montages in Final Cut Pro." }],
  },
  fr: {
    ui: { profile: "Profil", experience: "Expérience", education: "Formation", interests: "Centres d'intérêt", contact: "Contact", languages: "Langues", coreSkills: "Compétences clés", qualities: "Qualités" },
    roleTitle: "Ventes bilingues et développement commercial",
    summary: "Étudiant au Collège Dawson et fondateur bilingue. J'ai bâti une entreprise événementielle rentable à partir de zéro, vendu plus de 1 500 billets et décroché des commandites grâce à la prospection à froid et à la négociation. Je suis à l'aise pour générer des revenus, conclure des ventes et bâtir des relations clients en anglais comme en français.",
    roles: ["Fondateur", "Conseiller de vente", "Moniteur de camp", "Moniteur de camp", "Membre de l'équipe, arrière"],
    periods: ["Juillet 2025 – Présent", "Juillet 2025 – Août 2025", "Juillet 2024 – Août 2024", "Juillet 2023 – Août 2023", "Octobre 2019 – Mars 2020"],
    points: [
      ["Fondateur unique, générant plus de 50 000 $ de revenus avec une marge bénéficiaire d'environ 47 % sur 5 événements en moins d'un an.", "Vendu plus de 1 500 billets sans aucune dépense publicitaire, toutes les ventes provenant de la prospection organique, du contenu et du bouche-à-oreille.", "Obtenu des commandites et des partenariats de marque grâce à la prospection à froid et à la négociation directe.", "Bâti et entretenu des relations clients sur des milliers d'interactions, en résolvant les problèmes et en fidélisant une clientèle récurrente.", "Négocié les contrats de salles et de fournisseurs afin de protéger les marges.", "Recruté et dirigé des équipes de plus de 10 personnes tout en étudiant à temps plein au Collège Dawson."],
      ["Servi environ 300 clients par quart sur la surface de vente, en anglais et en français, en répondant aux questions et en orientant les décisions d'achat.", "Maintenu l'organisation du magasin, réapprovisionné la marchandise et gardé les cabines et les présentoirs impeccables.", "Travaillé au sein d'une équipe de plus de 10 personnes pour assurer le bon fonctionnement du magasin durant les périodes d'affluence."],
      ["Encadré un groupe d'environ 20 enfants âgés de 7 à 9 ans pendant un camp résidentiel de plusieurs semaines.", "Planifié et animé des activités quotidiennes : sports, natation et théâtre.", "Résolu des conflits entre campeurs et soutenu des enfants vivant le mal du pays.", "Coordonné les routines quotidiennes : repas, hygiène, coucher et transitions entre les activités."],
      ["Encadré des groupes d'enfants d'âges variés, de 6 à 12 ans, tout au long de la journée.", "Conçu des entraînements, des jeux et des activités adaptés à chaque âge.", "Veillé à ce que chaque enfant se sente inclus, engagé et en sécurité lors des transitions."],
      ["Engagé pour une saison complète de compétition tout en suivant l'école, présent à chaque entraînement à l'heure.", "Travaillé en étroite collaboration avec mes coéquipiers vers des objectifs communs, malgré un horaire exigeant.", "Développé tôt une discipline de gestion du temps en conciliant les entraînements et la charge scolaire."],
    ],
    skills: ["Croissance du chiffre d'affaires", "Négociation et conclusion", "Relations clients", "Prospection et démarchage", "Communication bilingue", "Génération de leads et marketing"],
    qualities: ["Autonome", "Résilient", "Persuasif", "Orienté résultats"],
    langNames: ["Anglais", "Français"], native: "Langue maternelle",
    eduCreds: ["DEC en Sciences humaines", "Diplôme d'études secondaires"], eduDetail: ["Prévu mai 2026", "2024"],
    interests: [{ label: "Ingénierie audio", text: "Ingénieur de mixage depuis plus de 6 ans. J'ai mixé plus de 600 morceaux (pop, rap, Afrobeat et autres) pour des clients payants, sur Logic Pro et FL Studio." }, { label: "Technologie", text: "Je crée des sites web et de petites applications avec des outils d'IA comme Claude et ChatGPT, et je monte des vidéos sur Final Cut Pro." }],
  },
  es: {
    ui: { profile: "Perfil", experience: "Experiencia", education: "Formación", interests: "Intereses", contact: "Contacto", languages: "Idiomas", coreSkills: "Competencias clave", qualities: "Cualidades" },
    roleTitle: "Ventas bilingües y desarrollo de negocios",
    summary: "Estudiante del Dawson College y fundador bilingüe. Construí desde cero un negocio de eventos rentable, vendí más de 1.500 entradas y conseguí patrocinios mediante prospección en frío y negociación. Me siento cómodo generando ingresos, cerrando ventas y creando relaciones con clientes tanto en inglés como en francés.",
    roles: ["Fundador", "Asesor de ventas", "Monitor de campamento", "Monitor de campamento", "Miembro del equipo, escolta"],
    periods: ["Julio 2025 – Presente", "Julio 2025 – Agosto 2025", "Julio 2024 – Agosto 2024", "Julio 2023 – Agosto 2023", "Octubre 2019 – Marzo 2020"],
    points: [
      ["Fundador único, generando más de 50 000 USD en ingresos con un margen de beneficio de aproximadamente el 47 % en 5 eventos en menos de un año.", "Vendí más de 1.500 entradas sin gasto en publicidad, impulsando todas las ventas mediante prospección orgánica, contenido y boca a boca.", "Conseguí patrocinios y alianzas de marca mediante prospección en frío y negociación directa.", "Construí y gestioné relaciones con clientes a lo largo de miles de interacciones, resolviendo problemas y fidelizando una clientela recurrente.", "Negocié contratos con locales y proveedores para proteger los márgenes.", "Contraté y dirigí equipos de más de 10 personas mientras estudiaba a tiempo completo en Dawson College."],
      ["Atendí a unos 300 clientes por turno en la sala de ventas, en inglés y francés, respondiendo preguntas e impulsando las decisiones de compra.", "Mantuve la organización de la tienda, repuse mercancía y dejé los probadores y exhibidores listos.", "Trabajé en un equipo de más de 10 personas para mantener la tienda funcionando durante las horas de mayor afluencia."],
      ["Supervisé a un grupo de unos 20 niños de 7 a 9 años durante un campamento residencial de varias semanas.", "Planifiqué y dirigí actividades diarias como deportes, natación y teatro.", "Resolví conflictos entre campistas y apoyé a niños que extrañaban su hogar.", "Coordiné rutinas diarias: comidas, higiene, hora de dormir y transiciones entre actividades."],
      ["Supervisé grupos de niños de distintas edades, de 6 a 12 años, durante todo el día.", "Diseñé entrenamientos, juegos y actividades adecuados para cada edad.", "Me aseguré de que cada niño se sintiera incluido, motivado y seguro en las transiciones."],
      ["Me comprometí con una temporada competitiva completa mientras cumplía con los estudios, asistiendo puntualmente a cada entrenamiento.", "Trabajé en estrecha colaboración con mis compañeros hacia objetivos comunes bajo un calendario exigente.", "Desarrollé temprano la disciplina de la gestión del tiempo, equilibrando los entrenamientos y la carga académica."],
    ],
    skills: ["Crecimiento de ingresos", "Negociación y cierre", "Relaciones con clientes", "Prospección y captación", "Comunicación bilingüe", "Generación de leads y marketing"],
    qualities: ["Autónomo", "Resiliente", "Persuasivo", "Orientado a resultados"],
    langNames: ["Inglés", "Francés"], native: "Nativo",
    eduCreds: ["DEC en Ciencias Sociales", "Diploma de secundaria"], eduDetail: ["Previsto mayo 2026", "2024"],
    interests: [{ label: "Ingeniería de audio", text: "Ingeniero de mezcla desde hace más de 6 años. He mezclado más de 600 canciones de pop, rap, Afrobeat y otros géneros para clientes de pago, usando Logic Pro y FL Studio." }, { label: "Tecnología", text: "Creo sitios web y pequeñas aplicaciones con herramientas de IA como Claude y ChatGPT, y edito vídeos y montajes en Final Cut Pro." }],
  },
  pt: {
    ui: { profile: "Perfil", experience: "Experiência", education: "Formação", interests: "Interesses", contact: "Contato", languages: "Idiomas", coreSkills: "Competências principais", qualities: "Qualidades" },
    roleTitle: "Vendas bilíngue e desenvolvimento de negócios",
    summary: "Estudante bilíngue do Dawson College e fundador. Construí do zero um negócio de eventos lucrativo, vendi mais de 1.500 ingressos e consegui patrocínios por meio de prospecção ativa e negociação. Sinto-me à vontade para gerar receita, fechar vendas e construir relacionamentos com clientes em inglês e francês.",
    roles: ["Fundador", "Consultor de vendas", "Monitor de acampamento", "Monitor de acampamento", "Membro da equipe, ala-armador"],
    periods: ["Julho 2025 – Presente", "Julho 2025 – Agosto 2025", "Julho 2024 – Agosto 2024", "Julho 2023 – Agosto 2023", "Outubro 2019 – Março 2020"],
    points: [
      ["Fundador único, gerando mais de US$ 50.000 em receita com margem de lucro de aproximadamente 47% em 5 eventos em menos de um ano.", "Vendi mais de 1.500 ingressos sem gasto com anúncios, impulsionando todas as vendas por prospecção orgânica, conteúdo e boca a boca.", "Consegui patrocínios e parcerias de marca por meio de prospecção ativa e negociação direta.", "Construí e gerenciei relacionamentos com clientes ao longo de milhares de interações, resolvendo problemas e fidelizando clientes recorrentes.", "Negociei contratos com locais e fornecedores para proteger as margens.", "Contratei e liderei equipes de mais de 10 pessoas enquanto estudava em tempo integral no Dawson College."],
      ["Atendi cerca de 300 clientes por turno no salão de vendas, em inglês e francês, respondendo dúvidas e impulsionando decisões de compra.", "Mantive a organização da loja, repus mercadorias e deixei provadores e vitrines impecáveis.", "Trabalhei em uma equipe de mais de 10 pessoas para manter a loja funcionando nos horários de pico."],
      ["Supervisionei um grupo de cerca de 20 crianças de 7 a 9 anos durante um acampamento residencial de várias semanas.", "Planejei e conduzi atividades diárias, incluindo esportes, natação e teatro.", "Resolvi conflitos entre os campistas e apoiei crianças com saudade de casa.", "Coordenei rotinas diárias: refeições, higiene, hora de dormir e transições entre atividades."],
      ["Supervisionei grupos de crianças de idades variadas, de 6 a 12 anos, ao longo do dia.", "Criei treinos, jogos e atividades adequados a cada idade.", "Garanti que cada criança se sentisse incluída, engajada e segura nas transições."],
      ["Comprometi-me com uma temporada competitiva completa enquanto acompanhava os estudos, chegando pontualmente a cada treino.", "Trabalhei em estreita colaboração com os colegas rumo a objetivos comuns, sob uma agenda exigente.", "Desenvolvi cedo a disciplina de gestão do tempo, conciliando treinos e carga acadêmica."],
    ],
    skills: ["Crescimento de receita", "Negociação e fechamento", "Relacionamento com clientes", "Prospecção e captação", "Comunicação bilíngue", "Geração de leads e marketing"],
    qualities: ["Autônomo", "Resiliente", "Persuasivo", "Orientado a resultados"],
    langNames: ["Inglês", "Francês"], native: "Nativo",
    eduCreds: ["DEC em Ciências Sociais", "Diploma do ensino médio"], eduDetail: ["Previsto maio 2026", "2024"],
    interests: [{ label: "Engenharia de áudio", text: "Engenheiro de mixagem há mais de 6 anos. Já mixei mais de 600 músicas de pop, rap, Afrobeat e outros gêneros para clientes pagantes, usando Logic Pro e FL Studio." }, { label: "Tecnologia", text: "Crio sites e pequenos aplicativos com ferramentas de IA como Claude e ChatGPT, e edito vídeos e montagens no Final Cut Pro." }],
  },
  de: {
    ui: { profile: "Profil", experience: "Berufserfahrung", education: "Ausbildung", interests: "Interessen", contact: "Kontakt", languages: "Sprachen", coreSkills: "Kernkompetenzen", qualities: "Eigenschaften" },
    roleTitle: "Zweisprachiger Vertrieb & Business Development",
    summary: "Zweisprachiger Student am Dawson College und Gründer. Ich habe ein profitables Eventunternehmen von Grund auf aufgebaut, über 1.500 Tickets verkauft und durch Kaltakquise und Verhandlung Sponsoren gewonnen. Ich generiere souverän Umsatz, schließe Verkäufe ab und baue Kundenbeziehungen auf Englisch und Französisch auf.",
    roles: ["Gründer", "Verkaufsmitarbeiter", "Campbetreuer", "Campbetreuer", "Teammitglied, Shooting Guard"],
    periods: ["Juli 2025 – heute", "Juli 2025 – August 2025", "Juli 2024 – August 2024", "Juli 2023 – August 2023", "Oktober 2019 – März 2020"],
    points: [
      ["Alleingründer, über 50.000 $ Umsatz bei rund 47 % Gewinnmarge mit 5 Events in weniger als einem Jahr erzielt.", "Über 1.500 Tickets ohne Werbebudget verkauft, alle Verkäufe durch organische Ansprache, Content und Mundpropaganda erzielt.", "Sponsoren und Markenpartnerschaften durch Kaltakquise und direkte Verhandlung gewonnen.", "Kundenbeziehungen über Tausende Interaktionen aufgebaut und gepflegt, Probleme gelöst und treue Stammkundschaft aufgebaut.", "Verträge mit Veranstaltungsorten und Lieferanten verhandelt, um die Margen zu schützen.", "Teams von über 10 Personen eingestellt und geführt, während ich in Vollzeit am Dawson College studierte."],
      ["Pro Schicht rund 300 Kundinnen und Kunden auf der Verkaufsfläche auf Englisch und Französisch betreut, Produktfragen beantwortet und Kaufentscheidungen gefördert.", "Ladenorganisation gepflegt, Ware aufgefüllt und Umkleiden sowie Auslagen präsentationsbereit gehalten.", "In einem Team von über 10 Personen mitgearbeitet, um den Verkaufsbetrieb in Stoßzeiten reibungslos zu halten."],
      ["Eine Gruppe von rund 20 Kindern im Alter von 7 bis 9 Jahren während eines mehrwöchigen Übernachtungscamps betreut.", "Tägliche Aktivitäten geplant und geleitet, darunter Sport, Schwimmen und Theater.", "Konflikte zwischen Kindern gelöst und Kinder mit Heimweh unterstützt.", "Tagesabläufe koordiniert: Mahlzeiten, Hygiene, Bettzeit und Übergänge zwischen Aktivitäten."],
      ["Altersgemischte Kindergruppen von 6 bis 12 Jahren den ganzen Tag betreut.", "Altersgerechte Trainings, Spiele und Aktivitäten gestaltet.", "Dafür gesorgt, dass sich jedes Kind einbezogen, motiviert und bei Übergängen sicher fühlte."],
      ["Eine ganze Wettkampfsaison absolviert und dabei die Schule gemeistert, pünktlich bei jedem Training.", "Eng mit Teamkollegen auf gemeinsame Ziele hingearbeitet, trotz anspruchsvollem Zeitplan.", "Früh Disziplin im Zeitmanagement entwickelt und Training mit schulischem Pensum vereinbart."],
    ],
    skills: ["Umsatzwachstum", "Verhandlung & Abschluss", "Kundenbeziehungen", "Akquise & Neukundengewinnung", "Zweisprachige Kommunikation", "Leadgenerierung & Marketing"],
    qualities: ["Eigenmotiviert", "Belastbar", "Überzeugend", "Ergebnisorientiert"],
    langNames: ["Englisch", "Französisch"], native: "Muttersprache",
    eduCreds: ["DEC in Sozialwissenschaften", "Hochschulreife (Abitur)"], eduDetail: ["Voraussichtlich Mai 2026", "2024"],
    interests: [{ label: "Audio-Engineering", text: "Seit über 6 Jahren Mixing-Engineer. Über 600 Songs aus Pop, Rap, Afrobeat und mehr für zahlende Kunden gemischt, mit Logic Pro und FL Studio." }, { label: "Technologie", text: "Ich baue Websites und kleine Apps mit KI-Tools wie Claude und ChatGPT und schneide Videos in Final Cut Pro." }],
  },
  it: {
    ui: { profile: "Profilo", experience: "Esperienza", education: "Istruzione", interests: "Interessi", contact: "Contatti", languages: "Lingue", coreSkills: "Competenze chiave", qualities: "Qualità" },
    roleTitle: "Vendite bilingue e sviluppo commerciale",
    summary: "Studente bilingue al Dawson College e fondatore. Ho creato da zero un'attività di eventi redditizia, venduto oltre 1.500 biglietti e ottenuto sponsorizzazioni tramite contatto a freddo e negoziazione. Mi trovo a mio agio nel generare ricavi, chiudere vendite e costruire relazioni con i clienti sia in inglese che in francese.",
    roles: ["Fondatore", "Addetto alle vendite", "Animatore di campo", "Animatore di campo", "Membro della squadra, guardia tiratrice"],
    periods: ["Luglio 2025 – Presente", "Luglio 2025 – Agosto 2025", "Luglio 2024 – Agosto 2024", "Luglio 2023 – Agosto 2023", "Ottobre 2019 – Marzo 2020"],
    points: [
      ["Unico fondatore, oltre 50.000 $ di ricavi con un margine di profitto di circa il 47% su 5 eventi in meno di un anno.", "Venduti oltre 1.500 biglietti senza spese pubblicitarie, generando tutte le vendite tramite contatto organico, contenuti e passaparola.", "Ottenute sponsorizzazioni e partnership di marca tramite contatto a freddo e negoziazione diretta.", "Costruite e gestite relazioni con i clienti su migliaia di interazioni, risolvendo problemi e fidelizzando una clientela ricorrente.", "Negoziati contratti con sedi e fornitori per proteggere i margini.", "Assunti e guidati team di oltre 10 persone studiando a tempo pieno al Dawson College."],
      ["Servito circa 300 clienti per turno in sala vendita, in inglese e francese, rispondendo alle domande e orientando le decisioni d'acquisto.", "Mantenuta l'organizzazione del negozio, rifornita la merce e tenuti camerini ed esposizioni in ordine.", "Lavorato in un team di oltre 10 persone per far funzionare il negozio nei momenti di maggiore affluenza."],
      ["Supervisionato un gruppo di circa 20 bambini dai 7 ai 9 anni durante un campo residenziale di più settimane.", "Pianificate e condotte attività quotidiane tra cui sport, nuoto e teatro.", "Risolti conflitti tra i partecipanti e supportati bambini con nostalgia di casa.", "Coordinate le routine quotidiane: pasti, igiene, ora di dormire e transizioni tra le attività."],
      ["Supervisionati gruppi di bambini di età diverse, dai 6 ai 12 anni, durante la giornata.", "Progettati allenamenti, giochi e attività adatti a ogni età.", "Fatto in modo che ogni bambino si sentisse incluso, coinvolto e al sicuro nelle transizioni."],
      ["Impegnato per un'intera stagione agonistica continuando a studiare, presente puntuale a ogni allenamento.", "Lavorato a stretto contatto con i compagni verso obiettivi comuni, con un calendario impegnativo.", "Sviluppata presto la disciplina nella gestione del tempo, conciliando allenamenti e carico scolastico."],
    ],
    skills: ["Crescita dei ricavi", "Negoziazione e chiusura", "Relazioni con i clienti", "Prospezione e acquisizione", "Comunicazione bilingue", "Generazione di lead e marketing"],
    qualities: ["Autonomo", "Resiliente", "Persuasivo", "Orientato ai risultati"],
    langNames: ["Inglese", "Francese"], native: "Madrelingua",
    eduCreds: ["DEC in Scienze sociali", "Diploma di scuola superiore"], eduDetail: ["Previsto maggio 2026", "2024"],
    interests: [{ label: "Ingegneria del suono", text: "Tecnico del missaggio da oltre 6 anni. Ho missato più di 600 brani di pop, rap, Afrobeat e altri generi per clienti paganti, usando Logic Pro e FL Studio." }, { label: "Tecnologia", text: "Creo siti web e piccole app con strumenti di IA come Claude e ChatGPT e monto video in Final Cut Pro." }],
  },
  zh: {
    ui: { profile: "简介", experience: "工作经历", education: "教育背景", interests: "兴趣爱好", contact: "联系方式", languages: "语言", coreSkills: "核心技能", qualities: "个人特质" },
    roleTitle: "双语销售与业务拓展",
    summary: "道森学院双语学生兼创始人。我从零打造了一家盈利的活动策划公司，售出 1,500 多张门票，并通过主动开发和谈判赢得赞助。我能熟练地创造营收、达成销售，并以英语和法语建立客户关系。",
    roles: ["创始人", "零售店员", "营地辅导员", "营地辅导员", "球队成员 · 得分后卫"],
    periods: ["2025年7月 – 至今", "2025年7月 – 2025年8月", "2024年7月 – 2024年8月", "2023年7月 – 2023年8月", "2019年10月 – 2020年3月"],
    points: [
      ["唯一创始人，在不到一年内通过 5 场活动创造超过 5 万美元营收，利润率约 47%。", "在零广告投入下售出 1,500 多张门票，全部销售来自自然开发、内容和口碑传播。", "通过主动开发和直接谈判赢得赞助及品牌合作。", "在数千次互动中建立并维护客户关系，解决问题并培养忠实的回头客。", "就场地和供应商合同进行谈判以保护利润。", "在道森学院全日制学习的同时，招聘并带领 10 人以上的团队。"],
      ["每班次以英语和法语服务约 300 名顾客，解答产品问题并促成购买决策。", "保持店面整洁，补货并使试衣间和陈列时刻保持最佳状态。", "在 10 人以上的团队中协作，确保高峰时段店面顺畅运营。"],
      ["在为期数周的住宿营中照护约 20 名 7 至 9 岁的儿童。", "策划并带领每日活动，包括运动、游泳和戏剧。", "化解营员之间的冲突，安抚想家的孩子。", "协调每日作息：用餐、卫生、就寝以及活动间的衔接。"],
      ["全天照护 6 至 12 岁的混龄儿童团体。", "设计适合各年龄段的训练、游戏和活动。", "确保每个孩子在过渡环节都感到被接纳、投入且安全。"],
      ["在兼顾学业的同时投入整个竞技赛季，每次训练都准时到场。", "在紧张的日程下与队友紧密协作，朝着共同目标努力。", "及早养成时间管理的自律，平衡训练与学业负担。"],
    ],
    skills: ["营收增长", "谈判与成交", "客户关系", "开发与拓客", "双语沟通", "获客与营销"],
    qualities: ["自驱力强", "抗压能力强", "有说服力", "结果导向"],
    langNames: ["英语", "法语"], native: "母语",
    eduCreds: ["社会科学 DEC 文凭", "高中文凭"], eduDetail: ["预计 2026 年 5 月", "2024"],
    interests: [{ label: "音频工程", text: "拥有 6 年以上混音经验。曾为付费客户混音 600 多首歌曲，涵盖流行、说唱、Afrobeat 等多种风格，使用 Logic Pro 和 FL Studio。" }, { label: "技术", text: "我使用 Claude、ChatGPT 等 AI 编程工具构建网站和小型应用，并用 Final Cut Pro 剪辑视频。" }],
  },
  ja: {
    ui: { profile: "プロフィール", experience: "職務経歴", education: "学歴", interests: "興味・関心", contact: "連絡先", languages: "言語", coreSkills: "主なスキル", qualities: "強み" },
    roleTitle: "バイリンガル営業・事業開発",
    summary: "ドーソン・カレッジに通うバイリンガルの学生であり起業家です。ゼロから収益性の高いイベント事業を立ち上げ、1,500 枚以上のチケットを販売し、新規開拓と交渉を通じてスポンサーを獲得しました。英語とフランス語の両方で、売上の創出、商談の成約、顧客との関係構築を得意としています。",
    roles: ["創業者", "販売スタッフ", "キャンプカウンセラー", "キャンプカウンセラー", "チームメンバー（シューティングガード）"],
    periods: ["2025年7月 – 現在", "2025年7月 – 2025年8月", "2024年7月 – 2024年8月", "2023年7月 – 2023年8月", "2019年10月 – 2020年3月"],
    points: [
      ["唯一の創業者として、1 年未満で 5 つのイベントから 5 万ドル超の売上を、約 47% の利益率で達成。", "広告費ゼロで 1,500 枚以上のチケットを販売し、すべての販売をオーガニックな開拓・コンテンツ・口コミで実現。", "新規開拓と直接交渉を通じてスポンサーとブランド提携を獲得。", "数千回のやり取りを通じて顧客関係を構築・維持し、問題を解決してリピーターを獲得。", "利益率を守るため、会場やベンダーとの契約を交渉。", "ドーソン・カレッジでフルタイムで学びながら、10 名以上のチームを採用・統率。"],
      ["1 シフトあたり約 300 名の顧客を英語とフランス語で接客し、商品の質問に答え購入を後押し。", "店舗の整理整頓、商品補充、試着室やディスプレイを常に整えた状態に維持。", "10 名以上のチームで連携し、混雑時も売場を円滑に運営。"],
      ["数週間の宿泊型キャンプで、7〜9 歳の約 20 名の子どもを担当。", "スポーツ、水泳、演劇など日々のアクティビティを企画・運営。", "参加者間の対立を解決し、ホームシックの子どもを支援。", "食事・衛生・就寝・活動間の移行など、日々のルーティンを調整。"],
      ["6〜12 歳の異年齢の子どもグループを一日を通じて担当。", "年齢に合ったトレーニング、ゲーム、アクティビティを設計。", "移行の場面でもすべての子どもが受け入れられ、楽しく安全だと感じられるよう配慮。"],
      ["学業と両立しながらシーズンを通して競技に取り組み、毎回の練習に遅れず参加。", "厳しいスケジュールの中、共通の目標に向けてチームメイトと緊密に連携。", "練習と学業を両立し、早くから時間管理の自律を身につけた。"],
    ],
    skills: ["売上成長", "交渉・クロージング", "顧客関係", "新規開拓", "バイリンガルコミュニケーション", "リード獲得・マーケティング"],
    qualities: ["自走力", "レジリエンス", "説得力", "成果志向"],
    langNames: ["英語", "フランス語"], native: "ネイティブ",
    eduCreds: ["社会科学 DEC（準学士相当）", "高校卒業"], eduDetail: ["2026年5月修了予定", "2024"],
    interests: [{ label: "オーディオエンジニアリング", text: "6 年以上のミキシングエンジニア経験。Logic Pro と FL Studio を使い、ポップ、ラップ、Afrobeat など 600 曲以上を有料クライアント向けにミックスしてきました。" }, { label: "テクノロジー", text: "Claude や ChatGPT などの AI コーディングツールでウェブサイトや小規模アプリを制作し、Final Cut Pro で動画編集も行います。" }],
  },
  ko: {
    ui: { profile: "프로필", experience: "경력", education: "학력", interests: "관심사", contact: "연락처", languages: "언어", coreSkills: "핵심 역량", qualities: "강점" },
    roleTitle: "이중 언어 영업 및 사업 개발",
    summary: "도슨 칼리지에 재학 중인 이중 언어 구사 학생이자 창업가입니다. 수익성 있는 이벤트 사업을 맨손으로 일궈 1,500장 이상의 티켓을 판매했고, 콜드 아웃리치와 협상을 통해 후원을 유치했습니다. 영어와 프랑스어 모두로 매출 창출, 영업 성사, 고객 관계 구축에 능숙합니다.",
    roles: ["창업자", "판매 직원", "캠프 카운슬러", "캠프 카운슬러", "팀원 · 슈팅 가드"],
    periods: ["2025년 7월 – 현재", "2025년 7월 – 2025년 8월", "2024년 7월 – 2024년 8월", "2023년 7월 – 2023년 8월", "2019년 10월 – 2020년 3월"],
    points: [
      ["단독 창업자로서 1년이 채 안 되어 5개 행사에서 약 47% 이익률로 5만 달러 이상의 매출을 달성.", "광고비 없이 티켓 1,500장 이상을 판매했으며, 모든 판매는 오가닉 아웃리치·콘텐츠·입소문으로 달성.", "콜드 아웃리치와 직접 협상을 통해 후원과 브랜드 파트너십을 유치.", "수천 건의 상호작용을 통해 고객 관계를 구축·관리하고, 문제를 해결하며 충성 단골을 확보.", "마진을 지키기 위해 장소 및 공급업체 계약을 협상.", "도슨 칼리지에서 풀타임으로 공부하면서 10명 이상의 팀을 채용하고 이끎."],
      ["교대근무마다 약 300명의 고객을 영어와 프랑스어로 응대하며 제품 문의에 답하고 구매 결정을 유도.", "매장 정리, 상품 보충, 탈의실과 디스플레이를 항상 깔끔하게 유지.", "10명 이상의 팀에서 협업하여 혼잡 시간대에도 매장이 원활히 운영되도록 함."],
      ["수 주간의 숙박형 캠프에서 7~9세 아동 약 20명을 지도.", "스포츠, 수영, 연극 등 매일의 활동을 기획하고 진행.", "캠프 참가자 간 갈등을 해결하고 향수병을 겪는 아이들을 지원.", "식사, 위생, 취침, 활동 간 전환 등 일과를 조율."],
      ["하루 종일 6~12세의 다양한 연령대 아동 그룹을 지도.", "연령에 맞는 운동, 게임, 활동을 기획.", "전환 시간에도 모든 아이가 소속감과 참여감, 안전을 느끼도록 함."],
      ["학업을 병행하며 한 시즌 전체를 소화했고, 모든 훈련에 정시 참석.", "빡빡한 일정 속에서 공동의 목표를 위해 팀원들과 긴밀히 협력.", "훈련과 학업을 병행하며 시간 관리의 자기 규율을 일찍 길렀음."],
    ],
    skills: ["매출 성장", "협상 및 클로징", "고객 관계", "신규 개발 및 영업", "이중 언어 커뮤니케이션", "리드 생성 및 마케팅"],
    qualities: ["자기주도적", "회복탄력성", "설득력", "성과 지향"],
    langNames: ["영어", "프랑스어"], native: "원어민",
    eduCreds: ["사회과학 DEC", "고등학교 졸업"], eduDetail: ["2026년 5월 취득 예정", "2024"],
    interests: [{ label: "오디오 엔지니어링", text: "6년 이상의 믹싱 엔지니어 경력. Logic Pro와 FL Studio로 팝, 랩, 아프로비트 등 600곡 이상을 유료 클라이언트를 위해 믹싱했습니다." }, { label: "기술", text: "Claude, ChatGPT 같은 AI 코딩 도구로 웹사이트와 소규모 앱을 만들고, Final Cut Pro로 영상을 편집합니다." }],
  },
  ru: {
    ui: { profile: "Профиль", experience: "Опыт работы", education: "Образование", interests: "Интересы", contact: "Контакты", languages: "Языки", coreSkills: "Ключевые навыки", qualities: "Качества" },
    roleTitle: "Двуязычные продажи и развитие бизнеса",
    summary: "Двуязычный студент колледжа Dawson и основатель. Я с нуля построил прибыльный бизнес по организации мероприятий, продал более 1 500 билетов и привлёк спонсоров благодаря холодным контактам и переговорам. Уверенно генерирую доход, закрываю продажи и выстраиваю отношения с клиентами на английском и французском языках.",
    roles: ["Основатель", "Продавец-консультант", "Вожатый лагеря", "Вожатый лагеря", "Игрок команды, атакующий защитник"],
    periods: ["Июль 2025 – настоящее время", "Июль 2025 – Август 2025", "Июль 2024 – Август 2024", "Июль 2023 – Август 2023", "Октябрь 2019 – Март 2020"],
    points: [
      ["Единственный основатель: более 50 000 $ выручки при марже около 47 % на 5 мероприятиях менее чем за год.", "Продал более 1 500 билетов без затрат на рекламу, обеспечив все продажи за счёт органического охвата, контента и сарафанного радио.", "Привлёк спонсоров и бренд-партнёрства за счёт холодных контактов и прямых переговоров.", "Выстроил и поддерживал отношения с клиентами в тысячах взаимодействий, решал вопросы и формировал лояльную постоянную аудиторию.", "Вёл переговоры по договорам с площадками и поставщиками для защиты маржи.", "Нанимал и руководил командами более 10 человек, обучаясь на дневном отделении колледжа Dawson."],
      ["Обслуживал около 300 клиентов за смену в торговом зале на английском и французском, отвечал на вопросы и помогал с выбором.", "Поддерживал порядок в магазине, пополнял товар и держал примерочные и витрины в идеальном виде.", "Работал в команде более 10 человек, обеспечивая бесперебойную работу зала в часы пик."],
      ["Курировал группу из примерно 20 детей 7–9 лет в течение многонедельного лагеря с проживанием.", "Планировал и проводил ежедневные занятия: спорт, плавание и театр.", "Разрешал конфликты между детьми и поддерживал тех, кто скучал по дому.", "Координировал распорядок дня: питание, гигиену, отбой и переходы между занятиями."],
      ["Курировал разновозрастные группы детей 6–12 лет в течение дня.", "Разрабатывал тренировки, игры и занятия с учётом возраста.", "Следил за тем, чтобы каждый ребёнок чувствовал себя принятым, вовлечённым и в безопасности."],
      ["Отыграл полный соревновательный сезон, совмещая с учёбой и не пропуская тренировки.", "Тесно работал с командой ради общих целей в условиях напряжённого графика.", "Рано выработал дисциплину тайм-менеджмента, совмещая тренировки и учебную нагрузку."],
    ],
    skills: ["Рост выручки", "Переговоры и закрытие сделок", "Отношения с клиентами", "Поиск и привлечение клиентов", "Двуязычная коммуникация", "Лидогенерация и маркетинг"],
    qualities: ["Самостоятельный", "Стрессоустойчивый", "Убедительный", "Ориентирован на результат"],
    langNames: ["Английский", "Французский"], native: "Родной",
    eduCreds: ["DEC по социальным наукам", "Аттестат о среднем образовании"], eduDetail: ["Ожидается в мае 2026", "2024"],
    interests: [{ label: "Звукорежиссура", text: "Сведение более 6 лет. Свёл более 600 треков в жанрах поп, рэп, Afrobeat и других для платных клиентов в Logic Pro и FL Studio." }, { label: "Технологии", text: "Создаю сайты и небольшие приложения с помощью ИИ-инструментов, таких как Claude и ChatGPT, и монтирую видео в Final Cut Pro." }],
  },
  ar: {
    ui: { profile: "الملف الشخصي", experience: "الخبرة", education: "التعليم", interests: "الاهتمامات", contact: "التواصل", languages: "اللغات", coreSkills: "المهارات الأساسية", qualities: "الصفات" },
    roleTitle: "مبيعات ثنائية اللغة وتطوير الأعمال",
    summary: "طالب ثنائي اللغة في كلية داوسون ومؤسس أعمال. بنيتُ شركة فعاليات مربحة من الصفر، وبِعتُ أكثر من 1500 تذكرة، وحصلتُ على رعايات عبر التواصل المباشر والتفاوض. أجيد تحقيق الإيرادات وإتمام المبيعات وبناء علاقات مع العملاء باللغتين الإنجليزية والفرنسية.",
    roles: ["مؤسس", "موظف مبيعات", "مشرف مخيم", "مشرف مخيم", "عضو فريق · حارس هجومي"],
    periods: ["يوليو 2025 – حتى الآن", "يوليو 2025 – أغسطس 2025", "يوليو 2024 – أغسطس 2024", "يوليو 2023 – أغسطس 2023", "أكتوبر 2019 – مارس 2020"],
    points: [
      ["المؤسس الوحيد، حقّقتُ أكثر من 50,000 دولار من الإيرادات بهامش ربح يقارب 47% عبر 5 فعاليات في أقل من عام.", "بِعتُ أكثر من 1,500 تذكرة دون أي إنفاق إعلاني، معتمدًا في كل المبيعات على التواصل العضوي والمحتوى والتوصيات الشفهية.", "حصلتُ على رعايات وشراكات علامات تجارية عبر التواصل المباشر والتفاوض.", "بنيتُ وأدرتُ علاقات مع العملاء عبر آلاف التفاعلات، محلًّا للمشكلات وبانيًا قاعدة عملاء أوفياء.", "تفاوضتُ على عقود القاعات والموردين للحفاظ على هوامش الربح.", "وظّفتُ وقدتُ فرقًا من أكثر من 10 أشخاص أثناء دراستي بدوام كامل في كلية داوسون."],
      ["خدمتُ نحو 300 عميل في كل وردية على أرض المبيعات بالإنجليزية والفرنسية، مجيبًا عن الأسئلة وداعمًا لقرارات الشراء.", "حافظتُ على تنظيم المتجر، وأعدتُ تعبئة البضائع، وأبقيتُ غرف القياس والعروض جاهزة.", "عملتُ ضمن فريق من أكثر من 10 أشخاص لضمان سير العمل بسلاسة في أوقات الذروة."],
      ["أشرفتُ على مجموعة من نحو 20 طفلًا بين 7 و9 سنوات طوال مخيم إقامة استمر عدة أسابيع.", "خطّطتُ وقدتُ أنشطة يومية تشمل الرياضة والسباحة والمسرح.", "حللتُ الخلافات بين المشاركين ودعمتُ الأطفال الذين يشعرون بالحنين إلى المنزل.", "نسّقتُ الروتين اليومي: الوجبات والنظافة والنوم والانتقال بين الأنشطة."],
      ["أشرفتُ على مجموعات من أطفال بأعمار متفاوتة من 6 إلى 12 عامًا طوال اليوم.", "صمّمتُ تمارين وألعابًا وأنشطة مناسبة لكل عمر.", "حرصتُ على أن يشعر كل طفل بالانتماء والمشاركة والأمان أثناء الانتقالات."],
      ["التزمتُ بموسم تنافسي كامل مع مواصلة الدراسة، حاضرًا في كل تدريب في وقته.", "عملتُ عن قرب مع زملائي نحو أهداف مشتركة ضمن جدول صعب.", "اكتسبتُ مبكرًا انضباط إدارة الوقت موازنًا بين التدريبات والعبء الدراسي."],
    ],
    skills: ["نمو الإيرادات", "التفاوض وإتمام الصفقات", "علاقات العملاء", "التنقيب عن العملاء", "تواصل ثنائي اللغة", "توليد العملاء المحتملين والتسويق"],
    qualities: ["مبادر ذاتيًا", "مرن", "مقنع", "موجّه نحو النتائج"],
    langNames: ["الإنجليزية", "الفرنسية"], native: "لغة أم",
    eduCreds: ["دبلوم DEC في العلوم الاجتماعية", "شهادة الثانوية العامة"], eduDetail: ["متوقع مايو 2026", "2024"],
    interests: [{ label: "هندسة الصوت", text: "مهندس مزج صوتي منذ أكثر من 6 سنوات. مزجتُ أكثر من 600 أغنية في البوب والراب والأفروبيت وغيرها لعملاء مدفوعين باستخدام Logic Pro وFL Studio." }, { label: "التقنية", text: "أبني مواقع وتطبيقات صغيرة باستخدام أدوات الذكاء الاصطناعي مثل Claude وChatGPT، وأحرّر مقاطع الفيديو في Final Cut Pro." }],
  },
  hi: {
    ui: { profile: "प्रोफ़ाइल", experience: "अनुभव", education: "शिक्षा", interests: "रुचियाँ", contact: "संपर्क", languages: "भाषाएँ", coreSkills: "मुख्य कौशल", qualities: "विशेषताएँ" },
    roleTitle: "द्विभाषी बिक्री और व्यवसाय विकास",
    summary: "डॉसन कॉलेज का द्विभाषी छात्र और संस्थापक। मैंने शून्य से एक लाभदायक इवेंट व्यवसाय खड़ा किया, 1,500+ टिकट बेचे, और कोल्ड आउटरीच व बातचीत के ज़रिए प्रायोजन हासिल किए। मैं अंग्रेज़ी और फ़्रेंच दोनों में राजस्व अर्जित करने, बिक्री पूरी करने और ग्राहक संबंध बनाने में सहज हूँ।",
    roles: ["संस्थापक", "रिटेल असोसिएट", "कैंप काउंसलर", "कैंप काउंसलर", "टीम सदस्य · शूटिंग गार्ड"],
    periods: ["जुलाई 2025 – वर्तमान", "जुलाई 2025 – अगस्त 2025", "जुलाई 2024 – अगस्त 2024", "जुलाई 2023 – अगस्त 2023", "अक्टूबर 2019 – मार्च 2020"],
    points: [
      ["एकमात्र संस्थापक, एक साल से कम समय में 5 आयोजनों से लगभग 47% लाभ मार्जिन के साथ 50,000 डॉलर से अधिक राजस्व अर्जित किया।", "बिना किसी विज्ञापन खर्च के 1,500+ टिकट बेचे, सभी बिक्री ऑर्गेनिक आउटरीच, कंटेंट और माउथ-पब्लिसिटी से की।", "कोल्ड आउटरीच और सीधी बातचीत के ज़रिए प्रायोजन और ब्रांड साझेदारियाँ हासिल कीं।", "हज़ारों इंटरैक्शन के दौरान ग्राहक संबंध बनाए और संभाले, समस्याएँ सुलझाईं और वफ़ादार दोहराने वाले ग्राहक तैयार किए।", "मार्जिन सुरक्षित रखने के लिए वेन्यू और वेंडर अनुबंधों पर बातचीत की।", "डॉसन कॉलेज में फुल-टाइम पढ़ाई करते हुए 10+ लोगों की टीमों को नियुक्त किया और नेतृत्व किया।"],
      ["हर शिफ्ट में लगभग 300 ग्राहकों को अंग्रेज़ी और फ़्रेंच में सेवा दी, उत्पाद संबंधी सवालों के जवाब दिए और खरीद निर्णयों को बढ़ावा दिया।", "स्टोर की व्यवस्था बनाए रखी, सामान दोबारा भरा, और फिटिंग रूम व डिस्प्ले हमेशा तैयार रखे।", "व्यस्त समय में स्टोर सुचारू रूप से चलाने के लिए 10+ लोगों की टीम के साथ काम किया।"],
      ["कई हफ़्तों के आवासीय शिविर में 7 से 9 वर्ष के लगभग 20 बच्चों की देखरेख की।", "खेल, तैराकी और नाटक सहित रोज़ाना की गतिविधियाँ योजनाबद्ध कीं और संचालित कीं।", "शिविरार्थियों के बीच झगड़े सुलझाए और घर की याद करने वाले बच्चों को सहारा दिया।", "रोज़ का क्रम संभाला: भोजन, स्वच्छता, सोने का समय और गतिविधियों के बीच बदलाव।"],
      ["दिनभर 6 से 12 वर्ष के मिश्रित आयु वर्ग के बच्चों की देखरेख की।", "हर आयु के अनुरूप वर्कआउट, खेल और गतिविधियाँ तैयार कीं।", "हर बच्चे को बदलावों के दौरान शामिल, सक्रिय और सुरक्षित महसूस कराया।"],
      ["पढ़ाई के साथ-साथ पूरे प्रतिस्पर्धी सीज़न में हिस्सा लिया, हर अभ्यास में समय पर उपस्थित रहा।", "कठिन कार्यक्रम के बावजूद साझा लक्ष्यों के लिए साथियों के साथ मिलकर काम किया।", "अभ्यास और पढ़ाई में संतुलन बनाकर समय-प्रबंधन का अनुशासन जल्दी विकसित किया।"],
    ],
    skills: ["राजस्व वृद्धि", "बातचीत और सौदा पक्का करना", "ग्राहक संबंध", "आउटरीच और प्रॉस्पेक्टिंग", "द्विभाषी संचार", "लीड जनरेशन और मार्केटिंग"],
    qualities: ["स्व-प्रेरित", "लचीला", "प्रेरक", "परिणाम-उन्मुख"],
    langNames: ["अंग्रेज़ी", "फ़्रेंच"], native: "मातृभाषा",
    eduCreds: ["सामाजिक विज्ञान में DEC", "हाई स्कूल डिप्लोमा"], eduDetail: ["मई 2026 अपेक्षित", "2024"],
    interests: [{ label: "ऑडियो इंजीनियरिंग", text: "6+ साल से मिक्सिंग इंजीनियर। मैंने Logic Pro और FL Studio में पॉप, रैप, Afrobeat आदि के 600+ गाने पेड क्लाइंट्स के लिए मिक्स किए हैं।" }, { label: "प्रौद्योगिकी", text: "मैं Claude और ChatGPT जैसे AI कोडिंग टूल्स से वेबसाइट और छोटे ऐप बनाता हूँ, और Final Cut Pro में वीडियो एडिट करता हूँ।" }],
  },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function template(code, dir) {
  const c = C[code];
  const jobs = c.roles
    .map(
      (role, i) => `
        <div class="job">
          <div class="job-head">
            <div class="job-role">${esc(role)} <span class="job-org">· ${esc(ORGS[i])}</span></div>
            <div class="job-period">${esc(c.periods[i])}</div>
          </div>
          <ul>${c.points[i].map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        </div>`
    )
    .join("");

  const skills = c.skills.map((s) => `<span class="pill">${esc(s)}</span>`).join("");
  const quals = c.qualities.map((q) => `<span class="pill">${esc(q)}</span>`).join("");
  const langs = c.langNames
    .map((n) => `<div class="lang"><span>${esc(n)}</span><span class="lvl">${esc(c.native)}</span></div>`)
    .join("");
  const edu = SCHOOLS.map(
    (school, i) => `<div class="edu"><div class="edu-school">${esc(school)}</div><div class="edu-detail">${esc(c.eduCreds[i])} <span class="yr">${esc(c.eduDetail[i])}</span></div></div>`
  ).join("");
  const interests = c.interests.map((it) => `<p class="int"><b>${esc(it.label)}.</b> ${esc(it.text)}</p>`).join("");

  return `<!DOCTYPE html>
<html lang="${code}" dir="${dir}">
<head><meta charset="utf-8" /><title>${esc(NAME)} — CV (${code})</title>
<style>
  @page { size: Letter; margin: 0; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Apple SD Gothic Neo", "Kohinoor Devanagari", "Geeza Pro", system-ui, sans-serif; color: #1a1a1a; font-size: 9.1px; line-height: 1.4; }
  .page { display: grid; grid-template-columns: 33% 67%; min-height: 100vh; }
  .side { background: #111114; color: #e8e8ea; padding: 30px 22px; }
  .side h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; color: #fff; }
  .side .role { margin-top: 7px; font-size: 9.5px; letter-spacing: 0.1em; text-transform: uppercase; color: #b6b6bd; }
  .side h2 { font-size: 9.5px; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; color: #fff; margin: 20px 0 9px; }
  .side .contact-item { display: block; color: #d6d6db; margin-bottom: 5px; word-break: break-word; }
  .side .pillset { display: flex; flex-direction: column; gap: 5px; }
  .side .pill { color: #d6d6db; }
  .side .pill::before { content: "▹"; color: #8a8a93; margin: 0 6px; }
  .lang { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
  .lang:last-child { border-bottom: none; }
  .lang .lvl { color: #9a9aa2; }
  .main { padding: 30px 28px; }
  .main h2 { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #111; padding-bottom: 5px; border-bottom: 1.5px solid #111; margin-bottom: 10px; }
  .section + .section { margin-top: 16px; }
  .summary { color: #333; }
  .job { margin-bottom: 9px; }
  .job:last-child { margin-bottom: 0; }
  .job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
  .job-role { font-size: 11.5px; font-weight: 700; color: #111; }
  .job-org { font-weight: 500; color: #444; }
  .job-period { font-size: 8.6px; color: #777; white-space: nowrap; font-style: italic; }
  .job ul { list-style: none; margin-top: 4px; }
  .job li { position: relative; padding-inline-start: 12px; color: #333; margin-bottom: 2.5px; }
  .job li::before { content: ""; position: absolute; inset-inline-start: 2px; top: 5px; width: 3.5px; height: 3.5px; border-radius: 50%; background: #111; }
  .edu { margin-bottom: 8px; }
  .edu-school { font-weight: 700; color: #111; font-size: 11px; }
  .edu-detail { color: #555; }
  .edu-detail .yr { float: right; color: #777; font-style: italic; }
  [dir="rtl"] .edu-detail .yr { float: left; }
  .int { margin-bottom: 7px; color: #333; }
  .int b { color: #111; }
</style>
</head>
<body>
  <div class="page">
    <aside class="side">
      <h1>${esc(NAME)}</h1>
      <div class="role">${esc(c.roleTitle)}</div>
      <h2>${esc(c.ui.contact)}</h2>
      ${CONTACT.map((x) => `<span class="contact-item">${esc(x)}</span>`).join("")}
      <h2>${esc(c.ui.languages)}</h2>
      ${langs}
      <h2>${esc(c.ui.coreSkills)}</h2>
      <div class="pillset">${skills}</div>
      <h2>${esc(c.ui.qualities)}</h2>
      <div class="pillset">${quals}</div>
    </aside>
    <main class="main">
      <div class="section"><h2>${esc(c.ui.profile)}</h2><p class="summary">${esc(c.summary)}</p></div>
      <div class="section"><h2>${esc(c.ui.experience)}</h2>${jobs}</div>
      <div class="section"><h2>${esc(c.ui.education)}</h2>${edu}</div>
      <div class="section"><h2>${esc(c.ui.interests)}</h2>${interests}</div>
    </main>
  </div>
</body>
</html>`;
}

// --- Build ---
fs.mkdirSync(buildDir, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

for (const { code, dir } of LANGS) {
  const html = template(code, dir);
  const htmlPath = path.join(buildDir, `cv-${code}.html`);
  const pdfPath = path.join(outDir, `noam-benjamin-cv-${code}.pdf`);
  fs.writeFileSync(htmlPath, html);
  execFileSync(CHROME, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`], { stdio: "ignore" });
  console.log(`✓ ${code} → ${path.relative(root, pdfPath)}`);
}

// Keep the default /noam-benjamin-cv.pdf pointing at English.
fs.copyFileSync(path.join(outDir, "noam-benjamin-cv-en.pdf"), path.join(root, "public", "noam-benjamin-cv.pdf"));
console.log("✓ default → public/noam-benjamin-cv.pdf (English)");
console.log(`Done: ${LANGS.length} languages.`);
