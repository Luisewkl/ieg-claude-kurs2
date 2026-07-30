/* ============================================
   IEG Claude Academy — i18n
   Language toggle: DE / EN
   v1.0
   ============================================ */

const I18N = {
  de: {
    /* Navigation */
    'nav.home':         'Übersicht',
    'nav.curriculum':   'Curriculum',
    'nav.team':         'Team',
    'nav.certificate':  'Zertifikat',
    'nav.glossary':     'Glossar',
    'nav.mynotes':      'Meine Notizen',
    'search.placeholder': 'Kurs durchsuchen … (Module, Inhalte, Quizfragen)',
    'nav.progress':     'Fortschritt',
    'nav.logout':       'Abmelden',

    /* Hero */
    'hero.eyebrow':     'Internes Trainingsprogramm · Onboarding für Analysts & Interns · 2026',
    'hero.title':       'Claude im Investment Banking',
    'hero.lede':        'Ein zehnteiliger Einführungskurs für den strukturierten Einsatz von Claude im Investment-Banking-Alltag. Der Kurs richtet sich an neue Mitarbeitende und Interns und vermittelt Grundlagen, Anwendungsfälle und praktische Workflows für typische Aufgaben im Team — mit klarem Blick auf Sicherheit und Einsatzgrenzen.',
    'hero.stat.modules':      'Module',
    'hero.stat.quizzes':      'Quizze',
    'hero.stat.time':         'Lernzeit',
    'hero.stat.time.unit':    'Std.',
    'hero.stat.certificate':  'Teilnahmezertifikat',
    'hero.cta.start':         'Curriculum starten',
    'hero.cta.resume':        'Weiter da, wo ich aufgehört habe',
    'hero.cta.exam':          'Zur Abschlussprüfung',
    'hero.cta.certificate':   'Zum Zertifikat',
    'hero.cta.team':          'Über das IEG Team',

    /* Curriculum */
    'curriculum.eyebrow':     '/ Curriculum',
    'curriculum.title':       'Zehn Module für den strukturierten Einstieg.',
    'curriculum.lede':        'Jedes Modul schließt mit einem Quiz ab. Nach erfolgreichem Abschluss wird das nächste Modul freigeschaltet. Nach allen zehn Modulen folgt eine Abschlussprüfung mit internem Teilnahmezertifikat.',
    'curriculum.progress':    '0 von 10 Modulen abgeschlossen',

    /* Team */
    'team.eyebrow':   '/ Team',
    'team.title':     'Die Menschen hinter IEG',
    'team.lede':      'Eine kurze Einführung in das IEG Team und seine Mitglieder. Besonders hilfreich für neue Praktikantinnen, Praktikanten und Analystinnen bzw. Analysten im Onboarding.',
    'team.locations': 'Standorte',

    /* Team bios */
    'team.heilmann.bio':    'Mitbegründer und Global CEO der IEG Investment Banking Group. Über 30 Jahre Erfahrung als Tech Investment Banker, Entrepreneur und Investor. Leidenschaft für digitale Gesundheit, Blockchain-Protokolle und Robotik (IoT).',
    'team.heide.bio':       'Managing Partner mit über 15 Jahren Erfahrung. Global Head des SmartCity-Teams — treibt Innovationen in CleanTech, eMobility, Energy Transition und Software.',
    'team.wyrowinski.bio':  'Investment Banking als unermüdliches Streben nach finanzieller Exzellenz — Schwerpunkt auf Deep Tech (insb. Robotik) und Cybersecurity.',
    'team.specht.bio':      'M&A als perfekte Mischung aus Strategie, Menschen und Wandel. Fokussiert auf HealthTech und CleanTech.',
    'team.kapoor.bio':      '20+ Jahre Investment Banking. Managing Partner für Südostasien. Spezialist für TMT und cross-border M&A mit asiatischen Unicorns.',
    'team.qumsieh.bio':     'Managing Partner Middle East. Über 20 Jahre Erfahrung in der Begleitung wachstumsstarker Tech- und Startup-Unternehmen durch komplexe Transaktionen.',
    'team.gorrissen.bio':   'Tech Investment Banker mit Stationen in Oslo, London, Paris und New York. Ehemals BCG, Microsoft Executive — mit Leidenschaft für Software.',
    'team.rossoff.bio':     'Harvard MBA. Ehemals JP Morgan, Banc of America, Dillon Read. Associated Partner bei IEG seit 2015.',
    'team.schwemme.bio':    'Bringt Menschen und Prozesse zusammen. Erste Anlaufstelle für neue Teammitglieder in Sachen Onboarding und Office.',
    'team.krassowsky.bio':  'Strukturiert, kommunikativ, zuverlässig — Lena koordiniert das Tagesgeschäft und ist die richtige Adresse für organisatorische Fragen.',
    'team.dubber.bio':      'Schwerpunkt auf HealthTech und FinTech. Schätzt das Navigieren komplexer finanzieller Transaktionen und kollaboratives Arbeiten.',
    'team.fakhfakh.bio':    'Managing Director und Mitgründer von IEG Tunesien. Über 20 Jahre Bankerfahrung mit Schwerpunkt auf KMU-Finanzierung, Fundraising, Restrukturierung und M&A.',
    'team.attia.bio':       'Mitgründer und Managing Director von IEG Tunesien. Fachwissen in Corporate Finance; seit 2012 in Restrukturierung, M&A und Fundraising über zahlreiche Branchen hinweg.',
    'team.schmidtbadoux.bio':'Über zwei Jahrzehnte Erfahrung in Corporate Finance, vorwiegend mit Schweizer Unternehmen im internationalen Umfeld. Leidenschaft für M&A im Technologiesektor.',
    'team.abdelkhalek.bio': 'Director mit Fokus auf M&A. Begeistert von KI-Anwendungen — insbesondere in HealthTech, AgriTech und FinTech mit Blick auf finanzielle Inklusion in Afrika.',
    'team.benfayala.bio':   'Vice President mit Leidenschaft für FinTech, B2C-SaaS und CleanTech. Engagiert im sozialen Unternehmertum zur Förderung benachteiligter Gemeinschaften.',
    'team.alhajji.bio':     'Vice President mit umfassender Erfahrung im Investment Banking. Schwerpunkte: Kapitalbeschaffung, M&A und Restrukturierung in wachstumsstarken Märkten.',
    'team.helland.bio':     'Associate Partner mit Hintergrund in der Unternehmensberatung. Seit 15 Jahren Berater von Wachstumsunternehmen, zuletzt mit Fokus auf CleanTech und ClimateTech.',
    'team.karam.bio':       'Senior Analyst mit Erfahrung als VC-Analyst und Projektleiter in einem Tech-Startup. Begleitet Gründerinnen und Gründer von der Idee bis zum Exit.',
    'team.khecharem.bio':   'Senior Associate mit Interesse an Retail Intelligence und innovativem E-Commerce sowie an FinTech — insbesondere Krypto und Asset Management.',
    'team.maercklin.bio':   'Head of Accounting mit großer Leidenschaft für analytisches Denken und Zahlen. Sorgt mit Sorgfalt und Genauigkeit für präzise Finanzplanung.',
    'team.alhusseini.bio':  'Analyst mit Master of Finance (University of Maryland) und NYU-Abu-Dhabi-Alumnus. Unterstützt wachstumsstarke Unternehmen bei Akquisitionen, Kapitalbeschaffung und strategischer Beratung.',
    'team.gruell.bio':      'Financial Analyst mit Begeisterung für M&A und strategisches Denken. Besonderes Interesse an HealthTech und FinTech.',

    /* Certificate */
    'cert.eyebrow':   '/ Zertifikat',
    'cert.title':     'Ihr IEG Claude Teilnahmezertifikat',
    'cert.lede':      'Schließen Sie alle zehn Module und die Abschlussprüfung ab, um Ihr persönliches, auf Ihren Namen ausgestelltes Zertifikat zu erhalten.',
    'cert.status':    'Status: noch nicht freigeschaltet',

    /* Name modal */
    'modal.name.title':       'Wer schreibt die Abschlussprüfung?',
    'modal.name.lede':        'Bitte geben Sie Ihren vollständigen Namen ein. Dieser erscheint auf Ihrem Zertifikat.',
    'modal.name.placeholder': 'z. B. Max Mustermann',
    'modal.name.cta':         'Zur Abschlussprüfung',

    /* Footer */
    'footer.academy':   'Academy',
    'footer.internal':  'Internal',
    'footer.contact':   'Kontakt',
    'footer.about':     'Über uns',
    'footer.reset':     'Fortschritt zurücksetzen',
    'footer.copy':      '© 2026 IEG Investment Banking Group · Internal Training Material · v1.0',

    /* Module cards — dynamic */
    'mod.status.completed':   'Abgeschlossen',
    'mod.status.available':   'Verfügbar',
    'mod.status.next':        '▶ Jetzt verfügbar',
    'mod.status.locked':      'Erst nach Modul ',
    'mod.action.repeat':      'Wiederholen',
    'mod.action.start':       'Jetzt starten',
    'mod.action.locked':      '🔒 Gesperrt',

    /* Final exam card */
    'final.meta':             'Abschlussprüfung · 46 Fragen',
    'final.title':            'IEG Claude Academy — Abschlussprüfung',
    'final.desc':             'Das Abschluss-Examen über alle Module. Pass-Threshold: 70 %.',
    'final.status.passed':    'Bestanden',
    'final.status.available': 'Verfügbar',
    'final.status.locked':    'Alle Module abschließen',
    'final.action.repeat':    'Wiederholen',
    'final.action.start':     'Prüfung starten',

    /* Progress */
    'progress.of':            ' von ',
    'progress.modules':       ' Modulen abgeschlossen',

    /* Quiz UI */
    'quiz.back':              '← Zurück',
    'quiz.next':              'Nächste →',
    'quiz.finish':            'Auswerten →',
    'quiz.choose':            'Antwort wählen',
    'quiz.correct':           '✓ Richtig.',
    'quiz.wrong':             '✗ Nicht ganz.',
    'quiz.result.pass':       'Modul abgeschlossen',
    'quiz.result.fail':       'Knapp daneben',
    'quiz.result.pass.final': 'Bestanden!',
    'quiz.result.unlocked':   'Nächstes Kapitel freigeschaltet.',
    'quiz.result.cert':       'Ihr Zertifikat wartet.',
    'quiz.result.min':        'Mindestens ',
    'quiz.result.min2':       '% nötig.',
    'quiz.result.continue':   'Weiter →',
    'quiz.result.retry':      'Nochmal',
    'quiz.result.tocert':     'Zum Zertifikat →',

    /* Exam UI */
    'exam.eyebrow':           'Abschlussprüfung',
    'exam.title':             'IEG Claude Academy — Abschlussprüfung',
    'exam.answered':          'Beantwortet',
    'exam.question':          'Frage',
    'exam.of':                ' von ',
    'exam.restored':          'Dein Prüfungsfortschritt wurde automatisch gespeichert und wiederhergestellt.',
    'exam.flag':              'Zur Überprüfung markieren',
    'exam.unflag':            'Markierung entfernen',
    'exam.prev':              '← Zurück',
    'exam.next':              'Weiter →',
    'exam.submit':            'Prüfung abgeben',
    'exam.start':             'Prüfung starten',
    'exam.intro.q':           ' Fragen',
    'exam.intro.pass':        '% zum Bestehen',
    'exam.intro.time':        ' Min. Bearbeitungszeit',
    'exam.intro.rule1':       'Die Zeit läuft ab dem Start. Bei Ablauf wird die Prüfung automatisch abgegeben.',
    'exam.intro.rule2':       'Ihr Fortschritt wird automatisch gespeichert — Sie können die Prüfung jederzeit fortsetzen.',
    'exam.intro.rule3':       'Sie können Fragen frei wählen, beantworten, ändern und zur Überprüfung markieren.',
    'exam.intro.rule4':       'Die Auswertung erfolgt erst nach der endgültigen Abgabe.',
    'exam.confirm.eyebrow':   'Bestätigung',
    'exam.confirm.title':     'Prüfung endgültig abgeben?',
    'exam.confirm.lede':      'Nach der Abgabe kann die Prüfung nicht mehr bearbeitet werden. Die Auswertung erfolgt sofort.',
    'exam.confirm.all':       'Alle ',
    'exam.confirm.all2':      ' Fragen beantwortet.',
    'exam.confirm.unanswered':'noch unbeantwortet',
    'exam.confirm.flagged':   'zur Überprüfung markiert',
    'exam.confirm.question':  ' Frage',
    'exam.confirm.questions': ' Fragen',
    'exam.confirm.back':      '← Zurück zur Prüfung',
    'exam.confirm.final':     'Endgültig abgeben',
    'exam.result.pass':       'Bestanden!',
    'exam.result.fail':       'Nicht bestanden',
    'exam.result.auto':       'Die Bearbeitungszeit ist abgelaufen — die Prüfung wurde automatisch abgegeben.',
    'exam.result.cert':       'Ihr Zertifikat wartet.',
    'exam.result.min':        'Mindestens ',
    'exam.result.min2':       '% nötig. Sie können die Prüfung erneut versuchen.',
    'exam.result.tocert':     'Zum Zertifikat →',
    'exam.result.retry':      'Erneut versuchen',
    'exam.result.close':      'Schließen',
    'exam.result.review':     'Antworten überprüfen',
    'exam.review.summary':    'richtig',
    'exam.review.mistakes':   'Fehler',
    'exam.review.all':        'Alle Fragen',
    'exam.review.onlyWrong':  'Nur Fehler',
    'exam.review.correctBadge':'Richtig',
    'exam.review.wrongBadge': 'Falsch',
    'exam.review.unanswered': 'Nicht beantwortet',
    'exam.review.why':        'Erklärung:',
    'exam.review.back':       'Zurück zum Ergebnis',
    'exam.review.none':       'Keine Fehler — alle Fragen richtig beantwortet.',

    /* Certificate */
    'cert.download':          'Als PDF speichern',
    'cert.heading':           'Ihr Zertifikat',
    'cert.lede2':             'Herzlichen Glückwunsch — laden Sie Ihr persönliches Zertifikat als PDF herunter.',
    'cert.certifies':         'Hiermit wird bestätigt, dass',
    'cert.completed':         'den folgenden Kurs erfolgreich abgeschlossen hat:',
    'cert.program.sub':       'Künstliche Intelligenz im Investment Banking · 10 Module · Final Examination',
    'cert.date.label':        'Abschlussdatum',
    'cert.cred.label':        'Credential ID',
    'cert.issued.label':      'Ausgestellt von',
    'cert.issuing.line':      'IEG Investment Banking Group · Internal Training',
    'cert.status.exam':       'Status: Prüfung verfügbar',
    'cert.status.progress':   'Status: ',

    /* Misc */
    'reset.confirm':          'Gesamten Lernfortschritt zurücksetzen?',
    /* module.js — Quiz engine */
    'mod.quiz.eyebrow':          'Modul {n} \u00b7 Quiz',
    'mod.notes.title':           'Meine Notizen',
    'mod.notes.placeholder':     'Eigene Merksätze zu diesem Modul \u2014 wird nur lokal in deinem Browser gespeichert.',
    'mod.notes.saved':           'Gespeichert \u2713',
    'mod.notes.viewall':         'Alle meine Notizen ansehen \u2192',
    'mod.highlight.mark':        '\u270f\ufe0f Markieren',
    'mod.highlight.remove':      'Klicken zum Entfernen der Markierung',
    'mod.quiz.question':         'Frage {i} von {total}',
    'mod.quiz.subtitle':         '{total} Fragen \u00b7 Pass-Threshold {pass}%',
    'mod.quiz.keyhint':          'Tastatur: 1\u20134 wählen \u00b7 Enter bestätigt \u00b7 \u2190 \u2192 blättern',
    'mod.quiz.choose':           'W\u00e4hlen Sie eine Antwort',
    'mod.quiz.back':             '\u2190 Zur\u00fcck',
    'mod.quiz.next':             'N\u00e4chste Frage \u2192',
    'mod.quiz.finish':           'Quiz auswerten \u2192',
    'mod.quiz.correct':          '\u2713 Richtig.',
    'mod.quiz.wrong':            '\u2717 Nicht ganz.',
    'mod.quiz.result.pass':      'Modul abgeschlossen',
    'mod.quiz.result.fail':      'Knapp daneben',
    'mod.quiz.result.correct':   'richtig',
    'mod.quiz.result.msg.pass':  'Sie haben Modul {n} erfolgreich abgeschlossen. Das n\u00e4chste Kapitel ist nun freigeschaltet.',
    'mod.quiz.result.msg.fail':  'Sie ben\u00f6tigen mindestens {pass}% zum Bestehen. Sehen Sie sich das Material noch einmal an und versuchen Sie es erneut.',
    'mod.quiz.result.next':      'Zu Modul {n} \u2192',
    'mod.quiz.result.final':     'Zum Final Examination \u2192',
    'mod.quiz.result.overview':  'Zur \u00dcbersicht',
    'mod.quiz.retry':            'Quiz erneut versuchen',
    'mod.quiz.reread':           'Material erneut lesen',
    'mod.quiz.locked':           '🔒 Erst nach bestandenem Quiz (\u2265 {pass} %)',
  },

  en: {
    /* Navigation */
    'nav.home':         'Overview',
    'nav.curriculum':   'Curriculum',
    'nav.team':         'Team',
    'nav.certificate':  'Certificate',
    'nav.glossary':     'Glossary',
    'nav.mynotes':      'My Notes',
    'search.placeholder': 'Search the course … (modules, content, quiz questions)',
    'nav.progress':     'Progress',
    'nav.logout':       'Log out',

    /* Hero */
    'hero.eyebrow':     'Internal Training Programme · Onboarding for Analysts & Interns · 2026',
    'hero.title':       'Claude in Investment Banking',
    'hero.lede':        'A ten-part introductory course for the structured use of Claude in everyday investment banking. The course is aimed at new staff and interns and covers fundamentals, use cases and practical workflows for typical team tasks — with a clear focus on security and limitations.',
    'hero.stat.modules':      'Modules',
    'hero.stat.quizzes':      'Quizzes',
    'hero.stat.time':         'Learning time',
    'hero.stat.time.unit':    'hrs.',
    'hero.stat.certificate':  'Certificate of completion',
    'hero.cta.start':         'Start curriculum',
    'hero.cta.resume':        'Resume where you left off',
    'hero.cta.exam':          'Go to final exam',
    'hero.cta.certificate':   'View certificate',
    'hero.cta.team':          'About the IEG team',

    /* Curriculum */
    'curriculum.eyebrow':     '/ Curriculum',
    'curriculum.title':       'Ten modules for a structured start.',
    'curriculum.lede':        'Each module concludes with a quiz. After passing, the next module is unlocked. After all ten modules, a final exam leads to an internal certificate of completion.',
    'curriculum.progress':    '0 of 10 modules completed',

    /* Team */
    'team.eyebrow':   '/ Team',
    'team.title':     'The people behind IEG',
    'team.lede':      'A brief introduction to the IEG team and its members. Particularly helpful for new interns and analysts during onboarding.',
    'team.locations': 'Locations',

    /* Team bios */
    'team.heilmann.bio':    'Co-founder and Global CEO of IEG Investment Banking Group. Over 30 years of experience as a tech investment banker, entrepreneur and investor. Passionate about digital health, blockchain protocols and robotics (IoT).',
    'team.heide.bio':       'Managing Partner with over 15 years of experience. Global Head of the SmartCity team — driving innovation in CleanTech, eMobility, energy transition and software.',
    'team.wyrowinski.bio':  'Investment banking as a relentless pursuit of financial excellence — focused on Deep Tech (especially robotics) and cybersecurity.',
    'team.specht.bio':      'M&A as the perfect blend of strategy, people and change. Focused on HealthTech and CleanTech.',
    'team.kapoor.bio':      '20+ years in investment banking. Managing Partner for Southeast Asia. Specialist in TMT and cross-border M&A with Asian unicorns.',
    'team.qumsieh.bio':     'Managing Partner Middle East. Over 20 years of experience guiding high-growth tech and startup companies through complex transactions.',
    'team.gorrissen.bio':   'Tech investment banker with stints in Oslo, London, Paris and New York. Former BCG, Microsoft Executive — passionate about software.',
    'team.rossoff.bio':     'Harvard MBA. Formerly JP Morgan, Banc of America, Dillon Read. Associated Partner at IEG since 2015.',
    'team.schwemme.bio':    'Brings people and processes together. First point of contact for new team members on onboarding and office matters.',
    'team.krassowsky.bio':  'Structured, communicative, reliable — Lena coordinates day-to-day operations and is the right person for organisational questions.',
    'team.dubber.bio':      'Focused on HealthTech and FinTech. Values navigating complex financial transactions and collaborative working.',
    'team.fakhfakh.bio':    'Managing Director and co-founder of IEG Tunisia. Over 20 years in banking, focused on SME financing, fundraising, restructuring and M&A.',
    'team.attia.bio':       'Co-founder and Managing Director of IEG Tunisia. Expertise in corporate finance; leading restructuring, M&A and fundraising projects across many sectors since 2012.',
    'team.schmidtbadoux.bio':'Over two decades of corporate finance experience, primarily with Swiss corporations on an international scale. Passionate about M&A in the technology sector.',
    'team.abdelkhalek.bio': 'Director focused on M&A. Passionate about AI applications — especially in HealthTech, AgriTech and FinTech, with an eye on financial inclusion in Africa.',
    'team.benfayala.bio':   'Vice President passionate about FinTech, B2C SaaS and CleanTech. Committed to social entrepreneurship supporting disadvantaged communities.',
    'team.alhajji.bio':     'Vice President with extensive investment banking experience. Focused on capital raising, M&A and corporate restructuring in high-growth markets.',
    'team.helland.bio':     'Associate Partner with a management consulting background. Fifteen years advising growth companies, most recently focused on clean-tech and climate-tech.',
    'team.karam.bio':       'Senior Analyst with experience as a VC analyst and tech-startup project lead. Supports founders throughout the journey from inception to exit.',
    'team.khecharem.bio':   'Senior Associate interested in retail intelligence and innovative e-commerce, as well as FinTech — particularly crypto and asset management.',
    'team.maercklin.bio':   'Head of Accounting with a passion for analytical thinking and numbers. Ensures precise financial planning with thoroughness and diligence.',
    'team.alhusseini.bio':  'Analyst with a Master of Finance (University of Maryland) and NYU Abu Dhabi alumnus. Supports high-growth companies with acquisitions, capital raising and strategic advisory.',
    'team.gruell.bio':      'Financial Analyst enthusiastic about M&A and strategic thinking. Particularly interested in HealthTech and FinTech.',

    /* Certificate */
    'cert.eyebrow':   '/ Certificate',
    'cert.title':     'Your IEG Claude Certificate of Completion',
    'cert.lede':      'Complete all ten modules and the final exam to receive your personal certificate issued in your name.',
    'cert.status':    'Status: not yet unlocked',

    /* Name modal */
    'modal.name.title':       'Who is taking the final exam?',
    'modal.name.lede':        'Please enter your full name. It will appear on your certificate.',
    'modal.name.placeholder': 'e.g. Jane Smith',
    'modal.name.cta':         'Go to final exam',

    /* Footer */
    'footer.academy':   'Academy',
    'footer.internal':  'Internal',
    'footer.contact':   'Contact',
    'footer.about':     'About us',
    'footer.reset':     'Reset progress',
    'footer.copy':      '© 2026 IEG Investment Banking Group · Internal Training Material · v1.0',

    /* Module cards — dynamic */
    'mod.status.completed':   'Completed',
    'mod.status.available':   'Available',
    'mod.status.next':        '▶ Available now',
    'mod.status.locked':      'After module ',
    'mod.action.repeat':      'Review',
    'mod.action.start':       'Start now',
    'mod.action.locked':      '🔒 Locked',

    /* Final exam card */
    'final.meta':             'Final exam · 46 questions',
    'final.title':            'IEG Claude Academy — Final Exam',
    'final.desc':             'The final examination covering all modules. Pass threshold: 70%.',
    'final.status.passed':    'Passed',
    'final.status.available': 'Available',
    'final.status.locked':    'Complete all modules first',
    'final.action.repeat':    'Retake',
    'final.action.start':     'Start exam',

    /* Progress */
    'progress.of':            ' of ',
    'progress.modules':       ' modules completed',

    /* Quiz UI */
    'quiz.back':              '← Back',
    'quiz.next':              'Next →',
    'quiz.finish':            'Submit →',
    'quiz.choose':            'Choose an answer',
    'quiz.correct':           '✓ Correct.',
    'quiz.wrong':             '✗ Not quite.',
    'quiz.result.pass':       'Module completed',
    'quiz.result.fail':       'Not quite there',
    'quiz.result.pass.final': 'Passed!',
    'quiz.result.unlocked':   'Next chapter unlocked.',
    'quiz.result.cert':       'Your certificate is waiting.',
    'quiz.result.min':        'At least ',
    'quiz.result.min2':       '% required.',
    'quiz.result.continue':   'Continue →',
    'quiz.result.retry':      'Try again',
    'quiz.result.tocert':     'Go to certificate →',

    /* Exam UI */
    'exam.eyebrow':           'Final exam',
    'exam.title':             'IEG Claude Academy — Final Exam',
    'exam.answered':          'Answered',
    'exam.question':          'Question',
    'exam.of':                ' of ',
    'exam.restored':          'Your exam progress was automatically saved and restored.',
    'exam.flag':              'Flag for review',
    'exam.unflag':            'Remove flag',
    'exam.prev':              '← Back',
    'exam.next':              'Next →',
    'exam.submit':            'Submit exam',
    'exam.start':             'Start exam',
    'exam.intro.q':           ' questions',
    'exam.intro.pass':        '% to pass',
    'exam.intro.time':        ' min. time limit',
    'exam.intro.rule1':       'The timer starts when you begin. The exam is submitted automatically when time runs out.',
    'exam.intro.rule2':       'Your progress is saved automatically — you can resume the exam at any time.',
    'exam.intro.rule3':       'You can freely navigate between questions, change answers and flag questions for review.',
    'exam.intro.rule4':       'Results are shown only after final submission.',
    'exam.confirm.eyebrow':   'Confirmation',
    'exam.confirm.title':     'Submit exam?',
    'exam.confirm.lede':      'Once submitted, the exam cannot be edited. Results are shown immediately.',
    'exam.confirm.all':       'All ',
    'exam.confirm.all2':      ' questions answered.',
    'exam.confirm.unanswered':'still unanswered',
    'exam.confirm.flagged':   'flagged for review',
    'exam.confirm.question':  ' question',
    'exam.confirm.questions': ' questions',
    'exam.confirm.back':      '← Back to exam',
    'exam.confirm.final':     'Submit final',
    'exam.result.pass':       'Passed!',
    'exam.result.fail':       'Not passed',
    'exam.result.auto':       'Time is up — the exam was submitted automatically.',
    'exam.result.cert':       'Your certificate is waiting.',
    'exam.result.min':        'At least ',
    'exam.result.min2':       '% required. You may try again.',
    'exam.result.tocert':     'Go to certificate →',
    'exam.result.retry':      'Try again',
    'exam.result.close':      'Close',
    'exam.result.review':     'Review answers',
    'exam.review.summary':    'correct',
    'exam.review.mistakes':   'mistakes',
    'exam.review.all':        'All questions',
    'exam.review.onlyWrong':  'Mistakes only',
    'exam.review.correctBadge':'Correct',
    'exam.review.wrongBadge': 'Incorrect',
    'exam.review.unanswered': 'Not answered',
    'exam.review.why':        'Explanation:',
    'exam.review.back':       'Back to result',
    'exam.review.none':       'No mistakes — all questions answered correctly.',

    /* Certificate */
    'cert.download':          'Save as PDF',
    'cert.heading':           'Your Certificate',
    'cert.lede2':             'Congratulations — download your personal certificate as a PDF.',
    'cert.certifies':         'This is to certify that',
    'cert.completed':         'has successfully completed the following course:',
    'cert.program.sub':       'Artificial Intelligence in Investment Banking · 10 Modules · Final Examination',
    'cert.date.label':        'Completion date',
    'cert.cred.label':        'Credential ID',
    'cert.issued.label':      'Issued by',
    'cert.issuing.line':      'IEG Investment Banking Group · Internal Training',
    'cert.status.exam':       'Status: exam available',
    'cert.status.progress':   'Status: ',

    /* Misc */
    'reset.confirm':          'Reset all learning progress?',
    /* module.js — Quiz engine */
    'mod.quiz.eyebrow':          'Module {n} \u00b7 Quiz',
    'mod.notes.title':           'My Notes',
    'mod.notes.placeholder':     'Your own notes on this module \u2014 saved only locally in your browser.',
    'mod.notes.saved':           'Saved \u2713',
    'mod.notes.viewall':         'View all my notes \u2192',
    'mod.highlight.mark':        '\u270f\ufe0f Highlight',
    'mod.highlight.remove':      'Click to remove highlight',
    'mod.quiz.question':         'Question {i} of {total}',
    'mod.quiz.subtitle':         '{total} questions \u00b7 Pass threshold {pass}%',
    'mod.quiz.keyhint':          'Keyboard: 1\u20134 to select \u00b7 Enter to confirm \u00b7 \u2190 \u2192 to navigate',
    'mod.quiz.choose':           'Choose an answer',
    'mod.quiz.back':             '\u2190 Back',
    'mod.quiz.next':             'Next question \u2192',
    'mod.quiz.finish':           'Submit quiz \u2192',
    'mod.quiz.correct':          '\u2713 Correct.',
    'mod.quiz.wrong':            '\u2717 Not quite.',
    'mod.quiz.result.pass':      'Module completed',
    'mod.quiz.result.fail':      'Not quite there',
    'mod.quiz.result.correct':   'correct',
    'mod.quiz.result.msg.pass':  'You have successfully completed Module {n}. The next chapter is now unlocked.',
    'mod.quiz.result.msg.fail':  'You need at least {pass}% to pass. Review the material and try again.',
    'mod.quiz.result.next':      'Go to Module {n} \u2192',
    'mod.quiz.result.final':     'Go to Final Exam \u2192',
    'mod.quiz.result.overview':  'Back to overview',
    'mod.quiz.retry':            'Retry quiz',
    'mod.quiz.reread':           'Re-read material',
    'mod.quiz.locked':           '🔒 Complete the quiz first (\u2265 {pass}%)',
  },
};

/* ── Toggle logic ── */
(function () {
  const STORAGE_KEY = 'ieg_lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'de';
  }

  function t(key) {
    const lang = getLang();
    return (I18N[lang] && I18N[lang][key]) || (I18N['de'][key]) || key;
  }

  function applyLang() {
    const lang = getLang();

    /* Update all elements with data-i18n */
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = (I18N[lang] && I18N[lang][key]) || (I18N['de'][key]) || key;
      if (el.tagName === 'INPUT') {
        el.placeholder = val;
      } else {
        el.textContent = val;
      }
    });

    /* Update all elements with data-i18n-html (for content with HTML entities) */
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = (I18N[lang] && I18N[lang][key]) || (I18N['de'][key]) || key;
      el.innerHTML = val;
    });

    /* Update html lang attribute */
    document.documentElement.lang = lang;

    /* Update toggle button label */
    const btn = document.getElementById('langToggleBtn');
    if (btn) btn.textContent = lang === 'de' ? 'EN' : 'DE';

    /* Fire event so app.js / module.js can re-render dynamic content */
    document.dispatchEvent(new CustomEvent('ieg:langchange', { detail: { lang } }));
  }

  function toggleLang() {
    const next = getLang() === 'de' ? 'en' : 'de';
    localStorage.setItem(STORAGE_KEY, next);
    applyLang();
  }

  /* Expose globally */
  window.t      = t;
  window.getLang = getLang;
  window.toggleLang = toggleLang;

  /* Apply on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyLang);
  } else {
    applyLang();
  }

  /* ===== DARK MODE (runs on every page that loads i18n.js) ===== */
  const THEME_KEY = 'ieg-academy-theme';

  function getTheme() {
    try { return localStorage.getItem(THEME_KEY) || 'light'; } catch (e) { return 'light'; }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
      btn.title = theme === 'dark'
        ? (getLang() === 'en' ? 'Switch to light mode' : 'Zu hellem Modus wechseln')
        : (getLang() === 'en' ? 'Switch to dark mode' : 'Zu dunklem Modus wechseln');
    }
  }

  window.toggleTheme = function () {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyTheme(next);
  };

  const SUN_ICON  = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const MOON_ICON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function injectThemeToggle() {
    if (document.getElementById('themeToggleBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'themeToggleBtn';
    btn.className = 'theme-toggle-fab';
    btn.setAttribute('onclick', 'toggleTheme()');
    btn.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(btn);
    applyTheme(getTheme());
  }

  /* Apply theme immediately (before paint) to avoid flash-of-wrong-theme */
  document.documentElement.setAttribute('data-theme', getTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectThemeToggle);
  } else {
    injectThemeToggle();
  }
})();
