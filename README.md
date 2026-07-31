[README.md](https://github.com/user-attachments/files/30580431/README.md)
# IEG Claude Academy

Eine interne Lern-Website (GitHub Pages) für IEG-Mitarbeiter zur
Claude-Zertifizierung. Verfügbar auf **Deutsch und Englisch** mit
Sprach-Toggle.

**Repo:** https://github.com/IEG-Office/IEG-Zertifikat
**Live:** https://ieg-office.github.io/IEG-Zertifikat/

> Reine statische Website — **kein Build-Schritt, kein Framework**:
> HTML + CSS + Vanilla-JavaScript. Extern werden nur Google Fonts und
> die Supabase-JS-Library (CDN) geladen. Supabase dient für Login und
> optionale Fortschritts-Synchronisation.

---

## ⚠️ So starten Sie die Seite RICHTIG (lokal)

Wenn Sie `index.html` per Doppelklick öffnen, **funktioniert sie nicht
zuverlässig** (Browser blockieren lokale Skript-Ladevorgänge über das
`file://`-Protokoll).

### Lokal testen

```bash
cd IEG-Zertifikat
python3 -m http.server 8000
# Dann im Browser öffnen: http://localhost:8000
```

### Auf GitHub Pages hosten

Einfach in den `main`-Branch pushen, unter **Settings → Pages**
„Deploy from branch: main" aktivieren — dann funktioniert alles
automatisch unter der Pages-URL.

---

## 📚 Modul-Struktur

**10 Module (IDs 0–9)**, jedes mit einer **eigenen HTML-Seite pro
Sprache** im Ordner `modules/`. Danach folgt die **Abschlussprüfung**,
die in der Übersicht als **„Modul 10"** dargestellt wird (die Zahl „10"
ist dort allerdings fest im Code hinterlegt, siehe Fallstricke).

| ID | Modul | Deutsche Datei | Englische Datei | Quiz | Dauer |
|----|-------|-----------------|-------------------|:----:|:-----:|
| 00 | Das Claude-Ökosystem im Überblick | `modules/modul-00.html` | `modules/modul-00.en.html` | 10 | 25 Min. |
| 01 | Claude — Der komplette Grundkurs (2026) | `modules/modul-01.html` | `modules/modul-01.en.html` | 10 | 45 Min. |
| 02 | Prompting und strukturierte Anweisungen | `modules/modul-02.html` | `modules/modul-02.en.html` | 10 | 60 Min. |
| 03 | Sicherer Umgang mit Daten und Tools | `modules/modul-03.html` | `modules/modul-03.en.html` | 7 | 15 Min. |
| 04 | Skills und wiederverwendbare Arbeitsabläufe | `modules/modul-04.html` | `modules/modul-04.en.html` | 5 | 30 Min. |
| 05 | Skills in Finance-Workflows | `modules/modul-05.html` | `modules/modul-05.en.html` | 10 | 30 Min. |
| 06 | Claude Cowork — Der autonome Desktop-Agent | `modules/modul-06.html` | `modules/modul-06.en.html` | 10 | 45 Min. |
| 07 | Claude in Microsoft Office (Excel, PowerPoint & Word) | `modules/modul-07.html` | `modules/modul-07.en.html` | 11 | 30 Min. |
| 08 | @Claude in Slack — Claude Tag | `modules/modul-08.html` | `modules/modul-08.en.html` | 5 | 20 Min. |
| 09 | Umgang mit Nutzungslimits: Effizient mit Claude arbeiten | `modules/modul-09.html` | `modules/modul-09.en.html` | 6 | 20 Min. |

Insgesamt **84 Modul-Quizfragen** (`CURRICULUM`/`CURRICULUM_EN`,
per Skript gezählt). Zusätzlich gibt es die **Abschlussprüfung**
(`FINAL_EXAM` / `FINAL_EXAM_EN`) mit aktuell **46 Fragen**,
Bestehensgrenze **70 %** (`PASS_THRESHOLD`).

---

## 🧠 Wie die Inhalte technisch aufgebaut sind (WICHTIG)

Es gibt zwei Content-Ebenen — bitte den Unterschied beachten, sonst
sucht man Text an der falschen Stelle:

1. **Fließtext der Module** steht **direkt in der jeweiligen
   `modules/modul-XX(.en).html`** (im `<main class="module-content">`).
   Das Feld `content:` in `content.js`/`content.en.js` wird auf den
   Modulseiten **nicht** ausgegeben. Willst du den Lehrtext eines
   Moduls ändern, bearbeitest du also die HTML-Datei.

2. **Videos, Bilder und optionaler Zusatztext (`longContent`)** aus
   `content.js` / `content.en.js` werden von `modules/module.js` in
   den Platzhalter `<div id="dynamicContent">` der Modulseite
   injiziert.

   > **Achtung, uneinheitliche Praxis:** Nicht alle Bilder laufen über
   > das `images:`-Array. Modul 06 z. B. hat `images: []` (leer) —
   > die beiden zugehörigen Screenshots
   > (`assets/modul-06-cowork-profile.png`,
   > `assets/modul-06-cowork-files.png`) sind stattdessen **direkt als
   > `<img>`-Tag im Fließtext von `modul-06(.en).html`** eingebettet,
   > genau wie der übrige Lehrtext. Beim Ergänzen neuer Bilder also
   > vorher prüfen, welches der beiden Muster für das jeweilige Modul
   > passt.

Die **Modul-Übersichtskarten** auf der Startseite (`title`, `desc`,
`meta`, `duration`, Quiz) sowie der **Such-Index** (siehe unten) werden
aus `CURRICULUM` (DE) bzw. `CURRICULUM_EN` (EN) gerendert.

> Hinweis zu Videos: `module.js` wandelt YouTube-`embed`-URLs in ein
> anklickbares Vorschaubild (Link auf `watch?v=…`) um; nur bei nicht
> einbettbaren URLs entsteht ein direktes iframe.

---

## 🌍 DE/EN Sprachumschaltung — wie sie funktioniert

- Sprache wird im `localStorage` unter dem Key `ieg_lang` gespeichert
  (Default: `de`). Umschaltung über den Button oben rechts
  (`toggleLang()` in `i18n.js`).
- `i18n.js` ersetzt alle Elemente mit `data-i18n` (Text) bzw.
  `data-i18n-html` (HTML) und feuert danach das Event `ieg:langchange`.
  `app.js` und `module.js` rendern daraufhin ihre dynamischen Inhalte
  neu (inkl. Suchergebnisse, Highlights, Notizen-Links).
- `app.js` → `openModule()` leitet je nach Sprache weiter:
  EN → `modul-XX.en.html`, DE → `modul-XX.html`. Dasselbe gilt für
  `openGlossary()` und `openMyNotes()` (siehe unten).
- **Wichtig:** Der Inline-Block auf jeder Modulseite
  (`MODULE_QUIZ = CURRICULUM.find(...)`) verweist **immer auf
  `CURRICULUM` (Deutsch)**, unabhängig davon, ob es sich um die
  `.html`- oder `.en.html`-Seite handelt. Die tatsächlich angezeigten
  Quizfragen werden zur Laufzeit sprachabhängig neu ermittelt
  (`startQuiz()` in `module.js` wählt `CURRICULUM_EN`, wenn
  `getLang() === 'en'`) — der Inline-Wert `MODULE_QUIZ` selbst wird
  dafür nicht verwendet.
- **UI-Texte** (Navigation, Buttons, Labels, Prüfungs-/Zertifikatstexte)
  liegen komplett in `i18n.js` unter `I18N.de` bzw. `I18N.en`.

⚠️ **Bekannter Fallstrick:** Neue Inhalte immer in **beiden** Sprachen
pflegen (`content.js` + `content.en.js`, ggf. `i18n.js` de + en).
Aktuell besteht bereits eine Lücke: **Modul 07 hat auf Deutsch 2
Videos, auf Englisch nur 1** (siehe „Offene Punkte").

---

## 🔎 Weitere Funktionen (bisher undokumentiert)

Neben Curriculum, Quiz und Zertifikat bietet die Seite vier
Zusatzfunktionen, die beim Ändern von Struktur/Content mitbedacht
werden sollten:

| Funktion | Datei(en) | Speicherort | Kurzbeschreibung |
|---|---|---|---|
| **Website-weite Suche** | `app.js` (`filterSiteSearch`, `buildSearchIndex`), Suchfeld in `index.html` | — | Durchsucht Titel, Beschreibung, Fließtext und Quizfragen aller Module aus `CURRICULUM`/`CURRICULUM_EN`. |
| **Persönliche Notizen** | `modules/module.js` (`renderNotesSection`), `notizen.html` / `.en.html` | `localStorage['ieg-academy-notes-v1']` | Freitext-Notizfeld pro Modul (auf der Modulseite), Übersicht über alle Notizen auf `notizen.html`. |
| **Text-Highlighting** | `modules/module.js` (`initHighlighting`) | `localStorage['ieg-academy-highlights-v1']` | Markieren von Textpassagen im Modul-Fließtext per Mausauswahl; wird beim erneuten Öffnen wiederhergestellt. |
| **Lese-Fortschrittsbalken** | `modules/module.js` (`initSectionProgressBar`) | — | Zeigt den Scroll-Fortschritt innerhalb der aktuellen Modulseite an. |
| **Glossar** | `glossar.html` / `glossar.en.html` | — | Statische Begriffsliste mit Verlinkung auf die jeweiligen Module (`class="glossary-mod-link"`). |

> Sowohl `notizen(.en).html` als auch `glossar(.en).html` sind
> eigenständige, sprachgetrennte Seiten (analog zu den Modulseiten) —
> beim Anlegen neuer Inhalte ebenfalls an DE **und** EN denken.

---

## 🔐 Authentifizierung & Zugriff (Supabase)

- **`login.html`** führt Registrierung (`auth.signUp`) und Login
  (`auth.signInWithPassword`) über **Supabase** durch. Bei Erfolg
  setzt es die `localStorage`-Werte `ieg_logged_in = 'yes'` und
  `ieg_user_name` und leitet auf `index.html`.
- **`reset.html`** setzt per `auth.updateUser({ password })` ein neues
  Passwort (Aufruf über den E-Mail-Reset-Link).
- **`index.html`** prüft im `<head>` lediglich das Flag
  `localStorage['ieg_logged_in'] === 'yes'` und leitet andernfalls auf
  `login.html` um.
- **`supabase-config.js`** enthält `SUPABASE_URL` und den
  `anon`/`public`-Key, zugewiesen an `window._SB_URL` /
  `window._SB_KEY`.

> ⚠️ **Aktuelle Einschränkung (bewusst so belassen):** Die
> **Modul-Seiten (`modules/modul-XX.html`) enthalten keinen
> Login-Guard** — nur `index.html` prüft das Flag. Wer einen Direktlink
> auf eine Modulseite hat, gelangt ohne Anmeldung dorthin. Dieser Guard
> ist ohnehin rein clientseitig (ein `localStorage`-Flag) und **kein
> echter Schutz**. Verbindlicher Zugriffsschutz muss über
> **Supabase Row-Level-Security** auf der Datenbank erfolgen.

**⚠️ Sicherheitshinweis für `supabase-config.js`:** Der
`anon`/`public`-Key darf im Frontend sichtbar sein (eingeschränkte
Rechte gemäß RLS). **Niemals** einen `service_role`-Key eintragen — der
hat volle DB-Rechte und darf nie im Browser-Code stehen. Die Zugangsdaten
liegen derzeit mehrfach vor (`supabase-config.js`, `modules/module.js`
und inline in `login.html`/`reset.html`); bei einer Key-Rotation an
**allen** Stellen ändern.

---

## 📈 Fortschritt & Locking

- Fortschritt liegt lokal in `localStorage['ieg-academy-progress-v1']`
  (`completed[]`, `finalPassed`, `finalScore`, `completionDate`,
  `userName`). `credentialId` wird **nicht** beim Start angelegt,
  sondern erst lazy beim ersten Rendern des Zertifikats erzeugt und
  danach im selben State-Objekt persistiert (`app.js`, Zertifikats-
  Funktion).
- **Locking:** Modul 0 ist immer frei; Modul *n* ist frei, sobald das
  Quiz von Modul *n−1* mit ≥ 70 % bestanden wurde (`isModuleUnlocked`
  in `app.js`, iteriert dynamisch über `CURRICULUM`). Die
  **Abschlussprüfung** ist frei, sobald **alle** Modul-IDs abgeschlossen
  sind (`isFinalUnlocked`).
- **Zwei getrennte „Nächstes Modul"-Mechanismen, die beide aktuell
  hartkodiert sind** (wichtig beim Hinzufügen eines neuen Moduls,
  siehe Checkliste unten):
  1. Der statische `nav-card-next`-Link unten auf jeder Modulseite
     (fester `href` in der jeweiligen `modul-XX(.en).html`).
  2. Der dynamische „Weiter"-Button im Quiz-Ergebnis
     (`modules/module.js`, `finishQuiz()`): `const hasNext =
     nextModuleId <= 9;`
- **Supabase-Sync:** Ist der Nutzer eingeloggt, wird der Fortschritt in
  die Tabelle `user_progress` geschrieben (Spalten `user_id`,
  `completed_modules`, `final_passed`, `final_score`, `completion_date`,
  `last_exam`) und beim Laden mit dem lokalen Stand zusammengeführt
  (`loadProgressFromSupabase`/`saveProgressToSupabase` in `app.js`).

---

## 🎓 Abschlussprüfung & Zertifikat

- Eigenständiger, **zeitgesteuerter Prüfungsmodus** in `app.js`:
  40-Minuten-Timer, Fragen-Markierung (Flag), zufällige Durchmischung
  von Fragenreihenfolge **und** Antwortoptionen je Versuch
  (`buildExamQuestions`/`shuffleArray`), automatische Abgabe bei
  Zeitablauf und Wiederaufnahme aus
  `localStorage['ieg-academy-final-exam-v1']`.
- Bei ≥ 70 % wird `finalPassed` gesetzt; danach wird das persönliche
  **Zertifikat** (Name, generierte `credentialId`, Datum) in `app.js`
  erzeugt und über ein Druckfenster als PDF ausgegeben
  (`printCertificate()` mit Fallback `printCertificateFallback()`,
  falls die Supabase-CDN nicht erreichbar ist).

---

## ✍️ Inhalte hinzufügen / ändern

### Quiz- oder Prüfungsfrage
In `content.js` (DE) **und** `content.en.js` (EN). Frageobjekt-Format:

```javascript
{
  q: 'Ihre Frage hier?',
  options: ['Antwort A', 'Antwort B', 'Antwort C', 'Antwort D'],
  correct: 1,  // 0=A, 1=B, 2=C, 3=D
  explanation: 'Erklärung nach Auswahl'
}
```

Modul-Quiz: im jeweiligen Modul-Objekt unter `quiz: [...]`.
Abschlussprüfung: in `FINAL_EXAM` (DE) bzw. `FINAL_EXAM_EN` (EN).

### Video / Bild
Im `videos:`- bzw. `images:`-Array des Moduls in **beiden**
Content-Dateien:

```javascript
videos: [
  { url: 'https://www.youtube.com/embed/VIDEO_ID', title: 'Titel', caption: 'Video 1.1 · Beschreibung (5:32)' },
],
images: [
  { src: '../assets/grafik-1.png', alt: 'Beschreibung', caption: 'Abbildung 1.1 · Quelle: …' },
],
```
(Bilddateien vorher nach `assets/` legen.) Alternativ — siehe Hinweis
oben zu Modul 06 — kann ein Bild auch direkt als `<img>` im Fließtext
der `modul-XX(.en).html` eingebettet werden, statt über das
`images:`-Array zu laufen.

### Modul-Fließtext
Direkt in `modules/modul-XX.html` (DE) und `modules/modul-XX.en.html`
(EN), innerhalb von `<main class="module-content">`.

### UI-Texte / Labels
In `i18n.js` unter `I18N.de` und `I18N.en`.

### Glossar-Eintrag
In `glossar.html` und `glossar.en.html`, als
`<h4>Begriff <span class="glossary-tag">(<a class="glossary-mod-link" href="modules/modul-XX.html">Modul X</a>)</span></h4>`.

---

## ➕ Neues Modul hinzufügen (Checkliste)

1. Neues Objekt im `CURRICULUM`-Array in `content.js` anlegen
   (fortlaufende `id`, passende `number` als zweistelliger String).
2. Dasselbe auf Englisch im `CURRICULUM_EN`-Array in `content.en.js`
   (dort gilt: `var`, **kein** `PASS_THRESHOLD`).
3. Fragen für die Abschlussprüfung bei Bedarf in `FINAL_EXAM` **und**
   `FINAL_EXAM_EN` ergänzen.
4. `modules/modul-XX.html` (DE) erstellen — am besten eine bestehende
   Modulseite kopieren und `MODULE_ID`, Titel/Breadcrumb, Meta-Angaben
   (Dauer/Quiz-Anzahl als Text) und Fließtext anpassen.
5. `modules/modul-XX.en.html` (EN) analog.
6. **Beide** „Nächstes Modul"-Mechanismen aktualisieren (siehe Abschnitt
   „Fortschritt & Locking"):
   - Statischen `nav-card-next`-Link im bisher letzten Modul
     (`modul-09(.en).html`) auf das neue Modul umbiegen; das neue
     Modul erhält den Link zur Prüfung (`../index.html#certificate`).
   - In `modules/module.js` die Grenze anpassen:
     `const hasNext = nextModuleId <= 9;` (9 = aktuell höchste
     Modul-ID; bei neuem höchsten Modul entsprechend erhöhen).
7. Prüfen, ob die neue `number` mit der **fest codierten „10"** der
   Abschlussprüfungs-Kachel in `app.js` (`renderModules()`,
   Final-Exam-Card) kollidiert.
8. Alle Stellen mit der festen Gesamtzahl „10 Module" prüfen und ggf.
   erhöhen: `index.html` (Hero-Stat, Curriculum-Überschrift/-Lede,
   `navProgress`-Anfangswert) sowie `i18n.js`
   (`curriculum.progress`, `curriculum.lede`, `cert.program.sub` —
   jeweils DE und EN).
9. Optional: passende Glossar-Einträge in `glossar(.en).html`
   ergänzen, falls das Modul neue Fachbegriffe einführt.
10. Vor dem Hochladen lokal prüfen:
    `node --check content.js` und `node --check content.en.js`.

---

## 📂 Dateistruktur

```
IEG-Zertifikat/
├── index.html               # Startseite (Übersicht, Suche); Login-Flag-Check im <head>
├── login.html               # Login/Registrierung (Supabase Auth)
├── reset.html                # Passwort-Reset (Supabase Auth)
├── glossar.html              # Glossar (DE)
├── glossar.en.html            # Glossar (EN)
├── notizen.html               # Übersicht aller persönlichen Notizen/Highlights (DE)
├── notizen.en.html             # dito (EN)
├── supabase-config.js        # Supabase-URL + anon/public-Key
├── content.js                # ★ DE: CURRICULUM, FINAL_EXAM, PASS_THRESHOLD (=70)
├── content.en.js              # ★ EN: CURRICULUM_EN, FINAL_EXAM_EN (KEIN PASS_THRESHOLD!)
├── app.js                    # Startseiten-Logik: Rendering, Suche, Locking, Prüfung, Zertifikat, Sync
├── i18n.js                    # UI-Texte DE/EN + getLang()/t()/toggleLang()
├── styles.css                 # Styles der Startseite (Fonts: Fraunces / Inter Tight / JetBrains Mono)
├── assets/
│   ├── ieg-logo.png
│   └── modul-06-*.png        # direkt im Modul-06-Fließtext eingebettete Screenshots
├── modules/
│   ├── modul-00.html         # Modul 00 (DE) — Fließtext im HTML
│   ├── modul-00.en.html      # Modul 00 (EN)
│   ├── …                     # bis modul-09(.en).html
│   ├── module.js             # ⚠️ liegt HIER: Quiz-Engine, Notizen, Highlighting, dynamischer Content, hasNext-Logik
│   └── module-styles.css     # Styles der Modulseiten
└── README.md
```

> ⚠️ `module.js` und `module-styles.css` liegen im Ordner `modules/`,
> **nicht** im Projekt-Root.

---

## 📜 Ladeordnung

**`index.html`** (am Seitenende, in dieser Reihenfolge):
`content.en.js` → `content.js` → `app.js`. `i18n.js` bereits im
`<head>`.

**Modulseiten** (`modules/modul-XX(.en).html`):
`i18n.js` → `../content.en.js` → `../content.js` → Inline-Block
(`MODULE_ID`/`MODULE_TITLE`/`MODULE_QUIZ`) → `module.js`.

Wichtig: `content.en.js` benutzt `var` und definiert **kein**
`PASS_THRESHOLD`, weil beide Content-Dateien im selben globalen Scope
geladen werden — ein zweites `const PASS_THRESHOLD` würde einen
„Identifier has already been declared"-Fehler auslösen.

---

## 🛠️ Bekannte Fallstricke

1. **Inhalte nur einsprachig gepflegt** — Videos/Fragen/Texte immer in
   `content.js` **und** `content.en.js` (bzw. `i18n.js` de + en)
   pflegen. Aktuell bereits betroffen: Modul 07 (siehe unten).
2. **`PASS_THRESHOLD` in `content.en.js`** — darf dort nicht stehen
   (Redeclaration-Fehler, da `content.js` im selben Scope geladen wird).
3. **`const` statt `var` in `content.en.js`** — dort grundsätzlich
   `var` verwenden, um versehentliche Redeclaration-Fehler zu
   vermeiden.
4. **Zwei getrennte „Nächstes Modul"-Stellen** — der statische
   `nav-card-next`-Link in der HTML-Datei **und** `hasNext` in
   `modules/module.js` (`nextModuleId <= 9`) müssen beide angepasst
   werden; eine der beiden zu vergessen bricht nur einen der beiden
   Navigationswege, nicht beide gleichzeitig — der Fehler fällt also
   leicht nicht sofort auf.
5. **Modul-IDs müssen zum Dateinamen passen** — `id: 8` gehört zu
   `modul-08.html` / `modul-08.en.html`.
6. **Modul-Fließtext im falschen File gesucht** — der Text steht in der
   `modul-XX.html`, nicht in `content.js` (siehe Abschnitt „Wie die
   Inhalte technisch aufgebaut sind").
7. **Bilder: zwei mögliche Ablageorte** — `images:`-Array in
   `content(.en).js` **oder** direkt im Fließtext eingebettet (wie bei
   Modul 06) — vor dem Ergänzen prüfen, welches Muster im jeweiligen
   Modul bereits verwendet wird.
8. **Fest codierte „10 Module"-Zahl** an mehreren Stellen
   (`index.html`, `i18n.js`) sowie die fest codierte „10" der
   Abschlussprüfungs-Kachel in `app.js` — bei einer Modul-Anzahl-
   Änderung überall mit anpassen (siehe Checkliste oben).
9. **Syntax vor Upload prüfen:** `node --check content.js` /
   `content.en.js`.

---

## 🔎 Offene Punkte (bewusst nicht geändert)

- **Kein Login-Guard auf Modulseiten** (siehe Abschnitt
  „Authentifizierung"). Verbindlicher Schutz gehört auf die Supabase-
  RLS-Ebene.
- **Modul 07 hat unterschiedlich viele Videos:** DE 2, EN 1. Bei
  Bedarf das fehlende englische Video im `videos:`-Array von
  `content.en.js` (Modul `id: 7`) ergänzen.
- **Fest codierte Zahl „10"** an mehreren Stellen im Code (siehe
  Fallstricke 4 und 8) statt durchgängig aus `CURRICULUM.length`
  berechnet — bewusst nicht refaktoriert, um bestehendes Verhalten
  nicht ungefragt zu verändern.

---

## Support

Bei Fragen zur Website oder zum Curriculum wenden Sie sich an Ihren
internen IEG-Ansprechpartner.

© 2026 IEG · Internes Schulungsmaterial
