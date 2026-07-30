/* ============================================
   IEG Claude Academy — App Logic v6.0
   ============================================ */

// Login-Check läuft in <head> von index.html

// ===== STATE =====
var STORAGE_KEY = 'ieg-academy-progress-v1';
var state = loadLocalState();
var currentUser = { name: localStorage.getItem('ieg_user_name') || 'User' };
var currentUserId = null;

function loadLocalState() {
  try {
    var s = localStorage.getItem(STORAGE_KEY);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return { completed: [], finalPassed: false, finalScore: 0, userName: '', completionDate: '' };
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function logout() {
  if (window.sb) { try { window.sb.auth.signOut(); } catch (e) {} }
  localStorage.removeItem('ieg_logged_in');
  localStorage.removeItem('ieg_user_name');
  window.location.replace('login.html');
}

function resetProgress() {
  if (!confirm(t('reset.confirm'))) return;
  state = { completed: [], finalPassed: false, finalScore: 0, userName: '', completionDate: '', lastExam: null };
  saveState();
  // Reihenfolge wichtig: upsert (legt Zeile ggf. an) VOR update.
  saveProgressToSupabase().then(saveLastExamToSupabase);
  renderEverything();
  document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' });
}

// ===== LOCKING =====
function isModuleUnlocked(id) {
  if (id === 0) return true;
  return state.completed.indexOf(id - 1) !== -1;
}
function isFinalUnlocked() {
  for (var i = 0; i < CURRICULUM.length; i++) {
    if (state.completed.indexOf(CURRICULUM[i].id) === -1) return false;
  }
  return true;
}
function isModuleCompleted(id) { return state.completed.indexOf(id) !== -1; }

// ===== RENDER MODULES =====
function renderModules() {
  var grid = document.getElementById('modulesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  // Pick content source based on current language
  var lang = typeof getLang === 'function' ? getLang() : 'de';
  var curriculum = (lang === 'en' && typeof CURRICULUM_EN !== 'undefined') ? CURRICULUM_EN : CURRICULUM;

  curriculum.forEach(function(mod) {
    var unlocked = isModuleUnlocked(mod.id);
    var completed = isModuleCompleted(mod.id);
    var cls = completed ? 'completed' : (unlocked ? 'unlocked' : 'locked');
    var isNext = unlocked && !completed;

    var icon = completed
      ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>'
      : unlocked
        ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>'
        : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>';

    var status = completed
      ? t('mod.status.completed')
      : unlocked
        ? (isNext ? t('mod.status.next') : t('mod.status.available'))
        : t('mod.status.locked') + String(mod.id - 1).padStart(2, '0');

    var card = document.createElement('div');
    card.className = 'module-card ' + cls + (isNext ? ' module-next' : '');
    card.innerHTML =
      '<div class="module-header"><div class="module-number">' + mod.number + '</div><div class="module-status-icon ' + cls + '">' + icon + '</div></div>' +
      '<div class="module-meta">' + mod.meta + ' · ' + mod.duration + '</div>' +
      '<div class="module-title">' + mod.title + '</div>' +
      '<div class="module-desc">' + mod.desc + '</div>' +
      '<div class="module-status-bar"><div class="module-status-fill" style="width:' + (completed ? 100 : 0) + '%"></div></div>' +
      '<div class="module-footer"><span class="module-status">' + status + '</span>' +
      (unlocked
        ? '<span class="module-action">' + (completed ? t('mod.action.repeat') : t('mod.action.start')) + ' <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>'
        : '<span class="module-action" style="color:var(--text-faint);">' + t('mod.action.locked') + '</span>') +
      '</div>';

    if (unlocked) (function(mid) { card.onclick = function() { openModule(mid); }; })(mod.id);
    grid.appendChild(card);
  });

  // Final Exam card
  var fu = isFinalUnlocked(), fp = state.finalPassed;
  var fc = fp ? 'completed unlocked' : fu ? 'unlocked' : 'locked';
  var fi = fp
    ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>'
    : fu
      ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9Z"/></svg>'
      : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>';

  var fcard = document.createElement('div');
  fcard.className = 'module-card final-exam ' + fc;
  var reviewBtn = state.lastExam
    ? '<button class="final-review-btn" onclick="event.stopPropagation();openStoredExamReview()">' +
        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>' +
        t('exam.result.review') + '</button>'
    : '';
  fcard.innerHTML =
    '<div class="module-header"><div class="module-number">10</div><div class="module-status-icon ' + fc + '">' + fi + '</div></div>' +
    '<div class="module-meta">' + t('final.meta') + '</div>' +
    '<div class="module-title">' + t('final.title') + '</div>' +
    '<div class="module-desc">' + t('final.desc') + '</div>' +
    '<div class="module-footer"><span class="module-status">' +
      (fp ? t('final.status.passed') : fu ? t('final.status.available') : t('final.status.locked')) +
    '</span>' +
    (fu
      ? '<span class="module-action">' + (fp ? t('final.action.repeat') : t('final.action.start')) + ' <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>'
      : '<span class="module-action" style="color:rgba(255,255,255,0.4);">' + t('mod.action.locked') + '</span>') +
    '</div>' + reviewBtn;
  if (fu) fcard.onclick = startFinalExam;
  grid.appendChild(fcard);
}

function renderProgress() {
  var total = CURRICULUM.length, c = Math.min(state.completed.length, total);
  var p = Math.min(Math.round(c / total * 100), 100);
  var el;
  if ((el = document.getElementById('progressFill')))    el.style.width = p + '%';
  if ((el = document.getElementById('progressText')))    el.textContent = c + t('progress.of') + total + t('progress.modules');
  if ((el = document.getElementById('progressPercent'))) el.textContent = p + '%';
  if ((el = document.getElementById('navProgress')))     el.textContent = c + '/' + total;
}

// ===== MODULE =====
function openModule(id) {
  var lang = (typeof getLang === 'function') ? getLang() : 'de';
  var suffix = (lang === 'en') ? '.en.html' : '.html';
  window.location.href = 'modules/modul-' + String(id).padStart(2, '0') + suffix;
}
function closeModule() { var m = document.getElementById('moduleModal'); if (m) { m.style.display = 'none'; document.body.style.overflow = ''; } }
function openGlossary() {
  var lang = (typeof getLang === 'function') ? getLang() : 'de';
  var suffix = (lang === 'en') ? '.en.html' : '.html';
  window.location.href = 'glossar' + suffix;
}

function openMyNotes() {
  var lang = (typeof getLang === 'function') ? getLang() : 'de';
  var suffix = (lang === 'en') ? '.en.html' : '.html';
  window.location.href = 'notizen' + suffix;
}

// ===== SITE-WIDE SEARCH =====
function stripHtml(html) {
  var div = document.createElement('div');
  div.innerHTML = html || '';
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
}

function buildSearchIndex() {
  var lang = (typeof getLang === 'function') ? getLang() : 'de';
  var curriculum = (lang === 'en' && typeof CURRICULUM_EN !== 'undefined') ? CURRICULUM_EN : CURRICULUM;
  var index = [];
  curriculum.forEach(function (mod) {
    var parts = [];
    if (mod.title) parts.push(mod.title);
    if (mod.desc) parts.push(mod.desc);
    if (mod.content) parts.push(stripHtml(mod.content));
    if (mod.quiz && mod.quiz.length) {
      mod.quiz.forEach(function (item) { if (item.q) parts.push(item.q); });
    }
    index.push({
      id: mod.id,
      title: mod.title,
      searchText: parts.join(' \u2022 ')
    });
  });
  return index;
}

function escapeHtmlForSearch(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function buildSnippet(text, query) {
  var lower = text.toLowerCase();
  var qLower = query.toLowerCase();
  var idx = lower.indexOf(qLower);
  if (idx === -1) return escapeHtmlForSearch(text.slice(0, 140)) + '…';
  var start = Math.max(0, idx - 60);
  var end = Math.min(text.length, idx + query.length + 80);
  var prefix = start > 0 ? '…' : '';
  var suffix = end < text.length ? '…' : '';
  var before = escapeHtmlForSearch(text.slice(start, idx));
  var match = escapeHtmlForSearch(text.slice(idx, idx + query.length));
  var after = escapeHtmlForSearch(text.slice(idx + query.length, end));
  return prefix + before + '<mark>' + match + '</mark>' + after + suffix;
}

function filterSiteSearch(rawQuery) {
  var query = rawQuery.trim();
  var resultsEl = document.getElementById('siteSearchResults');
  var gridEl = document.getElementById('modulesGrid');
  var progressEl = document.getElementById('progressTrackWrap');
  var clearBtn = document.getElementById('siteSearchClear');
  clearBtn.style.display = query ? 'block' : 'none';

  if (!query) {
    resultsEl.style.display = 'none';
    resultsEl.innerHTML = '';
    gridEl.style.display = '';
    if (progressEl) progressEl.style.display = '';
    return;
  }

  gridEl.style.display = 'none';
  if (progressEl) progressEl.style.display = 'none';
  resultsEl.style.display = 'flex';

  var lang = (typeof getLang === 'function') ? getLang() : 'de';
  var suffix = (lang === 'en') ? '.en.html' : '.html';
  var index = buildSearchIndex();
  var qLower = query.toLowerCase();
  var matches = index.filter(function (entry) {
    return entry.searchText.toLowerCase().indexOf(qLower) !== -1;
  });

  if (!matches.length) {
    var noResultsText = (lang === 'en') ? 'No matching module found. Try a different search term.' : 'Kein passendes Modul gefunden. Versuche einen anderen Suchbegriff.';
    resultsEl.innerHTML = '<div class="site-search-no-results">' + noResultsText + '</div>';
    return;
  }

  var moduleLabel = (lang === 'en') ? 'Module ' : 'Modul ';
  resultsEl.innerHTML = matches.map(function (m) {
    var href = 'modules/modul-' + String(m.id).padStart(2, '0') + suffix;
    var snippet = buildSnippet(m.searchText, query);
    return '<a class="site-search-result" href="' + href + '">' +
      '<div class="site-search-result-module">' + moduleLabel + m.id + '</div>' +
      '<div class="site-search-result-title">' + escapeHtmlForSearch(m.title) + '</div>' +
      '<div class="site-search-result-snippet">' + snippet + '</div>' +
      '</a>';
  }).join('');
}

function clearSiteSearch() {
  var input = document.getElementById('siteSearch');
  input.value = '';
  filterSiteSearch('');
  input.focus();
}

document.addEventListener('ieg:langchange', function () {
  var input = document.getElementById('siteSearch');
  if (input && input.value.trim()) filterSiteSearch(input.value);
});

// ===== QUIZ =====
var currentQuiz = null;

function startQuiz(moduleId, isFinal) {
  var lang = typeof getLang === 'function' ? getLang() : 'de';
  var curriculum = (lang === 'en' && typeof CURRICULUM_EN !== 'undefined') ? CURRICULUM_EN : CURRICULUM;
  var activeFinalExam = (typeof getLang === 'function' && getLang() === 'en' && typeof FINAL_EXAM_EN !== 'undefined') ? FINAL_EXAM_EN : FINAL_EXAM;
  var qs = isFinal ? activeFinalExam : curriculum.find(function(m) { return m.id === moduleId; }).quiz;
  currentQuiz = {
    moduleId: moduleId, isFinal: !!isFinal, questions: qs, currentIndex: 0,
    answers: new Array(qs.length).fill(null),
    title: isFinal ? t('exam.eyebrow') : 'Modul ' + String(moduleId).padStart(2,'0') + ' · Quiz',
    subtitle: qs.length + ' Fragen · ' + PASS_THRESHOLD + '%'
  };
  var m = document.getElementById('quizModal');
  if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  renderQuizQuestion();
}

function renderQuizQuestion() {
  var q = currentQuiz.questions[currentQuiz.currentIndex];
  var i = currentQuiz.currentIndex, n = currentQuiz.questions.length;
  var ua = currentQuiz.answers[i], done = ua !== null;

  var dots = currentQuiz.questions.map(function(_, j) {
    return '<div class="quiz-dot' + (j === i ? ' active' : currentQuiz.answers[j] !== null ? ' done' : '') + '"></div>';
  }).join('');

  var opts = q.options.map(function(o, j) {
    var c = 'quiz-option' + (done ? (j === q.correct ? ' correct' : j === ua ? ' wrong' : '') : '');
    return '<button class="' + c + '" ' + (done ? 'disabled' : '') + ' onclick="answerQuestion(' + j + ')"><span class="quiz-option-marker">' + String.fromCharCode(65+j) + '</span><span>' + o + '</span></button>';
  }).join('');

  var expl = done
    ? '<div class="quiz-explanation"><strong>' + (ua === q.correct ? t('quiz.correct') : t('quiz.wrong')) + '</strong> ' + q.explanation + '</div>'
    : '';

  var last = i === n - 1;
  var all = currentQuiz.answers.every(function(a) { return a !== null; });
  var nav = '<div class="quiz-nav">' +
    '<button class="btn btn-ghost" onclick="prevQuestion()" style="color:var(--text);border:1px solid var(--bone-soft);' + (i === 0 ? 'opacity:.3' : '') + '" ' + (i === 0 ? 'disabled' : '') + '>' + t('quiz.back') + '</button>' +
    (done
      ? (last && all
          ? '<button class="btn btn-primary" onclick="finishQuiz()">' + t('quiz.finish') + '</button>'
          : '<button class="btn btn-primary" onclick="nextQuestion()">' + t('quiz.next') + '</button>')
      : '<span style="color:var(--text-faint);font-size:13px;">' + t('quiz.choose') + '</span>') +
    '</div>';

  var b = document.getElementById('quizModalBody');
  if (b) b.innerHTML =
    '<div class="quiz-header"><div class="quiz-eyebrow">' + currentQuiz.title + '</div>' +
    '<div class="quiz-title">' + t('exam.question') + ' ' + (i+1) + t('exam.of') + n + '</div>' +
    '<div class="quiz-subtitle">' + currentQuiz.subtitle + '</div></div>' +
    '<div class="quiz-progress">' + dots + '</div>' +
    '<div class="quiz-question">' + q.q + '</div>' +
    '<div class="quiz-options">' + opts + '</div>' + expl + nav;
}

function answerQuestion(j) { currentQuiz.answers[currentQuiz.currentIndex] = j; renderQuizQuestion(); }
function nextQuestion() { if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) { currentQuiz.currentIndex++; renderQuizQuestion(); } }
function prevQuestion() { if (currentQuiz.currentIndex > 0) { currentQuiz.currentIndex--; renderQuizQuestion(); } }

function finishQuiz() {
  var total = currentQuiz.questions.length, c = 0;
  currentQuiz.questions.forEach(function(q, i) { if (currentQuiz.answers[i] === q.correct) c++; });
  var pct = Math.round(c / total * 100), pass = pct >= PASS_THRESHOLD;

  if (pass) {
    if (currentQuiz.isFinal) {
      state.finalPassed = true;
      state.finalScore = pct;
      if (!state.completionDate) state.completionDate = new Date().toISOString();
    } else if (state.completed.indexOf(currentQuiz.moduleId) === -1) {
      state.completed.push(currentQuiz.moduleId);
    }
    saveState();
    saveProgressToSupabase();
  }

  var b = document.getElementById('quizModalBody');
  if (b) b.innerHTML =
    '<div class="quiz-result">' +
    '<div class="quiz-result-icon ' + (pass ? 'pass' : 'fail') + '">' + (pass ? '✓' : '!') + '</div>' +
    '<div class="quiz-result-title">' + (pass ? (currentQuiz.isFinal ? t('quiz.result.pass.final') : t('quiz.result.pass')) : t('quiz.result.fail')) + '</div>' +
    '<div class="quiz-result-score">' + c + '/' + total + ' · ' + pct + '%</div>' +
    '<div class="quiz-result-msg">' + (pass
      ? (currentQuiz.isFinal ? t('quiz.result.cert') : t('quiz.result.unlocked'))
      : t('quiz.result.min') + PASS_THRESHOLD + t('quiz.result.min2')) + '</div>' +
    '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
    (pass
      ? (currentQuiz.isFinal
          ? '<button class="btn btn-primary" onclick="closeQuiz();showCertificate();">' + t('quiz.result.tocert') + '</button>'
          : '<button class="btn btn-primary" onclick="closeQuiz();renderEverything();">' + t('quiz.result.continue') + '</button>')
      : '<button class="btn btn-primary" onclick="restartQuiz()">' + t('quiz.result.retry') + '</button>') +
    '</div></div>';
}

function restartQuiz() { startQuiz(currentQuiz.moduleId, currentQuiz.isFinal); }
function closeQuiz() {
  if (currentQuiz && currentQuiz.isFinal && !currentQuiz.submitted) saveExamState();
  clearExamTimer();
  var m = document.getElementById('quizModal');
  if (m) { m.style.display = 'none'; document.body.style.overflow = ''; }
  currentQuiz = null;
  renderEverything();
}

// ============================================
//  FINAL EXAM
// ============================================

var EXAM_STORAGE_KEY = 'ieg-academy-final-exam-v1';
function getFinalExam() { return (typeof getLang === 'function' && getLang() === 'en' && typeof FINAL_EXAM_EN !== 'undefined') ? FINAL_EXAM_EN : FINAL_EXAM; }

// Fisher-Yates-Shuffle (in place)
function shuffleArray(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

// Baut eine gemischte Prüfungs-Kopie: Fragenreihenfolge UND Antwortoptionen zufällig,
// wobei der Index der richtigen Antwort korrekt neu zugeordnet wird.
function buildExamQuestions() {
  var src = getFinalExam();
  var qs = src.map(function(q) {
    var order = q.options.map(function(_, i) { return i; });
    shuffleArray(order);
    return {
      q: q.q,
      options: order.map(function(i) { return q.options[i]; }),
      correct: order.indexOf(q.correct),
      explanation: q.explanation
    };
  });
  shuffleArray(qs);
  return qs;
}

var FINAL_EXAM_DURATION_SEC = 40 * 60;
var examTimerId = null;

function saveExamState() {
  if (!currentQuiz || !currentQuiz.isFinal) return;
  try {
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify({
      started: currentQuiz.started, submitted: currentQuiz.submitted,
      currentIndex: currentQuiz.currentIndex, answers: currentQuiz.answers,
      flagged: currentQuiz.flagged, endsAt: currentQuiz.endsAt,
      durationSec: currentQuiz.durationSec, startedAt: currentQuiz.startedAt,
      questions: currentQuiz.questions,
      timeLeft: Math.max(0, Math.round((currentQuiz.endsAt - Date.now()) / 1000)),
      savedAt: Date.now()
    }));
  } catch (e) {}
}
function loadExamState() {
  try { var s = localStorage.getItem(EXAM_STORAGE_KEY); if (s) return JSON.parse(s); } catch (e) {}
  return null;
}
function clearExamState() { try { localStorage.removeItem(EXAM_STORAGE_KEY); } catch (e) {} }

function normalizeExamArray(arr, len, fill) {
  var out = new Array(len);
  for (var i = 0; i < len; i++) {
    out[i] = (arr && i < arr.length && arr[i] !== undefined && arr[i] !== null) ? arr[i] : fill;
  }
  return out;
}

function clearExamTimer() { if (examTimerId) { clearInterval(examTimerId); examTimerId = null; } }
function startExamTimer() { clearExamTimer(); examTimerId = setInterval(tickExamTimer, 1000); tickExamTimer(); }
function examRemainingSec() { if (!currentQuiz) return 0; return Math.max(0, Math.round((currentQuiz.endsAt - Date.now()) / 1000)); }
function tickExamTimer() {
  if (!currentQuiz || !currentQuiz.isFinal || currentQuiz.submitted) { clearExamTimer(); return; }
  var remaining = examRemainingSec();
  updateTimerDisplay(remaining);
  if (remaining <= 0) { clearExamTimer(); finishExam(true); }
}
function updateTimerDisplay(sec) {
  var el = document.getElementById('examTimer');
  if (el) el.textContent = formatExamTime(sec);
  var pill = document.getElementById('examTimerPill');
  if (pill) pill.classList.toggle('warn', sec <= 300);
}
function formatExamTime(sec) {
  var m = Math.floor(sec / 60), s = sec % 60;
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}
function openExamModal() {
  var m = document.getElementById('quizModal');
  if (m) { m.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
}

function startFinalExam() {
  if (!isFinalUnlocked()) return;
  if (!state.userName) { state.userName = currentUser.name; saveState(); }
  var saved = loadExamState();
  if (saved && saved.started && !saved.submitted) { resumeExam(saved, false); return; }
  openExamModal();
  renderExamIntro();
}

function submitName() {
  var inp = document.getElementById('userNameInput'), n = inp ? inp.value.trim() : '';
  if (n.length < 2) { if (inp) inp.style.borderColor = 'var(--rust)'; return; }
  state.userName = n; saveState();
  var nm = document.getElementById('nameModal');
  if (nm) { nm.style.display = 'none'; document.body.style.overflow = ''; }
  beginExam();
}

function beginExam() {
  clearExamTimer();
  var questions = buildExamQuestions();
  var n = questions.length;
  currentQuiz = {
    isFinal: true, started: true, submitted: false,
    questions: questions, currentIndex: 0,
    answers: new Array(n).fill(null), flagged: new Array(n).fill(false),
    durationSec: FINAL_EXAM_DURATION_SEC, startedAt: Date.now(),
    endsAt: Date.now() + FINAL_EXAM_DURATION_SEC * 1000, restored: false
  };
  saveExamState(); openExamModal(); startExamTimer(); renderExamQuestion();
}

function resumeExam(saved, showBanner) {
  clearExamTimer();
  var questions = (saved.questions && saved.questions.length) ? saved.questions : buildExamQuestions();
  var n = questions.length;
  currentQuiz = {
    isFinal: true, started: true, submitted: false, questions: questions,
    currentIndex: Math.min(Math.max(saved.currentIndex || 0, 0), n - 1),
    answers: normalizeExamArray(saved.answers, n, null),
    flagged: normalizeExamArray(saved.flagged, n, false),
    durationSec: saved.durationSec || FINAL_EXAM_DURATION_SEC,
    startedAt: saved.startedAt || Date.now(),
    endsAt: saved.endsAt || (Date.now() + (saved.timeLeft || FINAL_EXAM_DURATION_SEC) * 1000),
    restored: !!showBanner
  };
  openExamModal();
  if (examRemainingSec() <= 0) { finishExam(true); return; }
  startExamTimer(); renderExamQuestion();
}

function restoreExamUI() {
  if (typeof FINAL_EXAM === 'undefined' || !getFinalExam().length) return;
  var saved = loadExamState();
  if (!saved || !saved.started || saved.submitted) return;
  resumeExam(saved, true);
}

function selectExamAnswer(j) {
  if (!currentQuiz || currentQuiz.submitted) return;
  currentQuiz.answers[currentQuiz.currentIndex] = j; saveExamState(); renderExamQuestion();
}
function toggleExamFlag() {
  if (!currentQuiz) return;
  var i = currentQuiz.currentIndex;
  currentQuiz.flagged[i] = !currentQuiz.flagged[i]; saveExamState(); renderExamQuestion();
}
function examGoto(i) {
  if (!currentQuiz || i < 0 || i >= currentQuiz.questions.length) return;
  currentQuiz.currentIndex = i; saveExamState(); renderExamQuestion();
}
function examNext() { examGoto(currentQuiz.currentIndex + 1); }
function examPrev() { examGoto(currentQuiz.currentIndex - 1); }

function confirmExamSubmit() { renderExamConfirm(); }
function cancelExamSubmit() { renderExamQuestion(); }

function finishExam(auto) {
  clearExamTimer();
  if (!currentQuiz || currentQuiz.submitted) return;
  currentQuiz.submitted = true;
  var total = currentQuiz.questions.length, c = 0;
  currentQuiz.questions.forEach(function(q, i) { if (currentQuiz.answers[i] === q.correct) c++; });
  var pct = Math.round(c / total * 100), pass = pct >= PASS_THRESHOLD;
  if (pass) {
    state.finalPassed = true; state.finalScore = pct;
    if (!state.completionDate) state.completionDate = new Date().toISOString();
    saveState(); saveProgressToSupabase();
  } else if (pct > (state.finalScore || 0)) {
    state.finalScore = pct; saveState(); saveProgressToSupabase();
  }
  clearExamState();
  state.lastExam = {
    questions: currentQuiz.questions, answers: currentQuiz.answers,
    c: c, total: total, pct: pct, pass: pass, date: new Date().toISOString()
  };
  saveState();
  currentQuiz.lastResult = { c: c, total: total, pct: pct, pass: pass, auto: !!auto };
  saveProgressToSupabase().then(saveLastExamToSupabase);
  renderExamResult(c, total, pct, pass, !!auto);
}

function retryExam() { clearExamState(); beginExam(); }

function renderExamHtml(html) { var b = document.getElementById('quizModalBody'); if (b) b.innerHTML = html; }

function renderExamIntro() {
  var n = FINAL_EXAM.length, mins = Math.round(FINAL_EXAM_DURATION_SEC / 60);
  renderExamHtml(
    '<div class="exam-intro">' +
    '<div class="quiz-eyebrow">' + t('exam.eyebrow') + '</div>' +
    '<h2 class="quiz-title" style="text-align:center;">' + t('exam.title') + '</h2>' +
    '<div class="exam-intro-meta">' +
      '<span><strong>' + n + '</strong>' + t('exam.intro.q') + '</span>' +
      '<span><strong>' + PASS_THRESHOLD + '%</strong>' + t('exam.intro.pass') + '</span>' +
      '<span><strong>' + mins + '</strong>' + t('exam.intro.time') + '</span>' +
    '</div>' +
    '<div class="exam-intro-rules">' +
      examRule(t('exam.intro.rule1')) + examRule(t('exam.intro.rule2')) +
      examRule(t('exam.intro.rule3')) + examRule(t('exam.intro.rule4')) +
    '</div>' +
    '<div style="text-align:center;">' +
      '<button class="btn btn-primary" onclick="beginExam()">' + t('exam.start') +
      ' <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button>' +
    '</div></div>'
  );
}

function examRule(text) {
  return '<div class="exam-intro-rule">' +
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;color:var(--ieg-blue);margin-top:1px;"><path d="M20 6L9 17l-5-5"/></svg>' +
    '<span>' + text + '</span></div>';
}

function renderExamQuestion() {
  if (!currentQuiz) return;
  var i = currentQuiz.currentIndex, n = currentQuiz.questions.length, q = currentQuiz.questions[i];
  var answeredCount = currentQuiz.answers.filter(function(a) { return a !== null; }).length;
  var remaining = examRemainingSec(), pctDone = Math.round(answeredCount / n * 100);

  var head =
    '<div class="exam-head">' +
    '<div class="exam-head-row">' +
      '<div class="exam-head-left">' +
        '<div class="exam-eyebrow">' + t('exam.eyebrow') + '</div>' +
        '<div class="exam-qnum">' + t('exam.question') + ' <strong>' + (i+1) + '</strong>' + t('exam.of') + n + '</div>' +
      '</div>' +
      '<div class="exam-head-right">' +
        '<div class="exam-answered"><span>' + t('exam.answered') + '</span><strong>' + answeredCount + ' / ' + n + '</strong></div>' +
        '<div class="exam-timer-pill' + (remaining <= 300 ? ' warn' : '') + '" id="examTimerPill">' +
          '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' +
          '<span id="examTimer">' + formatExamTime(remaining) + '</span>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="exam-progress-line"><div class="exam-progress-line-fill" style="width:' + pctDone + '%"></div></div>' +
    '</div>';

  var banner = currentQuiz.restored
    ? '<div class="exam-restored-banner">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>' +
        '<span>' + t('exam.restored') + '</span>' +
      '</div>'
    : '';

  var ua = currentQuiz.answers[i];
  var opts = q.options.map(function(o, j) {
    var cls = 'quiz-option' + (j === ua ? ' selected' : '');
    return '<button class="' + cls + '" onclick="selectExamAnswer(' + j + ')">' +
      '<span class="quiz-option-marker">' + String.fromCharCode(65+j) + '</span><span>' + o + '</span></button>';
  }).join('');

  var flagged = currentQuiz.flagged[i];
  var flagBtn = '<button class="exam-flag-btn' + (flagged ? ' active' : '') + '" onclick="toggleExamFlag()">' +
    '<svg viewBox="0 0 24 24" width="15" height="15" fill="' + (flagged ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>' +
    (flagged ? t('exam.unflag') : t('exam.flag')) + '</button>';

  var actions =
    '<div class="exam-actions">' +
    '<button class="btn btn-secondary"' + (i === 0 ? ' disabled' : '') + ' onclick="examPrev()">' + t('exam.prev') + '</button>' +
    '<div class="exam-actions-right">' +
      '<button class="btn btn-secondary"' + (i === n-1 ? ' disabled' : '') + ' onclick="examNext()">' + t('exam.next') + '</button>' +
      '<button class="btn btn-primary" onclick="confirmExamSubmit()">' + t('exam.submit') + '</button>' +
    '</div></div>';

  renderExamHtml(head + banner +
    '<div class="quiz-question">' + q.q + '</div>' +
    '<div class="quiz-options">' + opts + '</div>' +
    '<div class="exam-flag-row">' + flagBtn + '</div>' + actions);

  currentQuiz.restored = false;
}

function renderExamConfirm() {
  if (!currentQuiz) return;
  var n = currentQuiz.questions.length;
  var answered = currentQuiz.answers.filter(function(a) { return a !== null; }).length;
  var unanswered = n - answered;
  var flaggedCount = currentQuiz.flagged.filter(Boolean).length;

  var warn = (unanswered > 0 || flaggedCount > 0)
    ? '<div class="exam-confirm-summary">' +
        (unanswered > 0 ? '<div class="exam-confirm-row warn"><strong>' + unanswered + '</strong>' + (unanswered === 1 ? t('exam.confirm.question') : t('exam.confirm.questions')) + ' ' + t('exam.confirm.unanswered') + '</div>' : '') +
        (flaggedCount > 0 ? '<div class="exam-confirm-row"><strong>' + flaggedCount + '</strong>' + (flaggedCount === 1 ? t('exam.confirm.question') : t('exam.confirm.questions')) + ' ' + t('exam.confirm.flagged') + '</div>' : '') +
      '</div>'
    : '<div class="exam-confirm-summary"><div class="exam-confirm-row ok">' + t('exam.confirm.all') + n + t('exam.confirm.all2') + '</div></div>';

  renderExamHtml(
    '<div class="exam-confirm">' +
    '<div class="quiz-eyebrow">' + t('exam.confirm.eyebrow') + '</div>' +
    '<h2 class="quiz-title" style="text-align:center;">' + t('exam.confirm.title') + '</h2>' +
    '<p class="exam-confirm-lede">' + t('exam.confirm.lede') + '</p>' +
    warn +
    '<div class="exam-confirm-actions">' +
      '<button class="btn btn-secondary" onclick="cancelExamSubmit()">' + t('exam.confirm.back') + '</button>' +
      '<button class="btn btn-danger" onclick="finishExam(false)">' + t('exam.confirm.final') + '</button>' +
    '</div></div>'
  );
}

function renderExamResult(c, total, pct, pass, auto) {
  renderExamHtml(
    '<div class="quiz-result">' +
    '<div class="quiz-result-icon ' + (pass ? 'pass' : 'fail') + '">' + (pass ? '✓' : '!') + '</div>' +
    '<div class="quiz-result-title">' + (pass ? t('exam.result.pass') : t('exam.result.fail')) + '</div>' +
    '<div class="quiz-result-score">' + c + '/' + total + ' · ' + pct + '%</div>' +
    (auto ? '<div class="exam-result-auto">' + t('exam.result.auto') + '</div>' : '') +
    '<div class="quiz-result-msg">' + (pass ? t('exam.result.cert') : t('exam.result.min') + PASS_THRESHOLD + t('exam.result.min2')) + '</div>' +
    '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">' +
      '<button class="btn btn-secondary" onclick="renderExamReview(\'all\')">' + t('exam.result.review') + '</button>' +
      (pass
        ? '<button class="btn btn-primary" onclick="closeQuiz();showCertificate();">' + t('exam.result.tocert') + '</button>'
        : '<button class="btn btn-primary" onclick="retryExam()">' + t('exam.result.retry') + '</button>' +
          '<button class="btn btn-secondary" onclick="closeQuiz()">' + t('exam.result.close') + '</button>') +
    '</div></div>'
  );
}

function openStoredExamReview() {
  var le = state.lastExam;
  if (!le || !le.questions) return;
  currentQuiz = {
    isFinal: true, started: true, submitted: true, reviewOnly: true,
    questions: le.questions, answers: le.answers || [],
    lastResult: { c: le.c, total: le.total, pct: le.pct, pass: le.pass, auto: false }
  };
  openExamModal();
  renderExamReview('all');
}

function backToExamResult() {
  var r = currentQuiz && currentQuiz.lastResult;
  if (!r) { closeQuiz(); return; }
  renderExamResult(r.c, r.total, r.pct, r.pass, r.auto);
}

function renderExamReview(filter) {
  if (!currentQuiz || !currentQuiz.questions) return;
  filter = filter || 'all';
  var qs = currentQuiz.questions, ans = currentQuiz.answers || [];
  var correctCount = 0, wrongCount = 0;
  qs.forEach(function(q, i) { if (ans[i] === q.correct) correctCount++; else wrongCount++; });

  var items = qs.map(function(q, i) {
    var ua = (ans[i] === undefined) ? null : ans[i];
    var isCorrect = ua === q.correct;
    if (filter === 'wrong' && isCorrect) return '';
    var badgeCls = ua === null ? 'unanswered' : (isCorrect ? 'correct' : 'wrong');
    var badgeTxt = ua === null ? t('exam.review.unanswered') : (isCorrect ? t('exam.review.correctBadge') : t('exam.review.wrongBadge'));
    var opts = q.options.map(function(o, j) {
      var cls = 'quiz-option';
      if (j === q.correct) cls += ' correct';
      else if (j === ua) cls += ' wrong';
      return '<div class="' + cls + '"><span class="quiz-option-marker">' + String.fromCharCode(65+j) + '</span><span>' + o + '</span></div>';
    }).join('');
    return '<div class="exam-review-item">' +
      '<div class="exam-review-qhead"><span class="exam-review-num">' + t('exam.question') + ' ' + (i+1) + '</span>' +
        '<span class="exam-review-badge ' + badgeCls + '">' + badgeTxt + '</span></div>' +
      '<div class="quiz-question">' + q.q + '</div>' +
      '<div class="quiz-options">' + opts + '</div>' +
      (q.explanation ? '<div class="quiz-explanation"><strong>' + t('exam.review.why') + '</strong> ' + q.explanation + '</div>' : '') +
      '</div>';
  }).join('');

  if (filter === 'wrong' && wrongCount === 0) {
    items = '<div class="exam-review-empty">' + t('exam.review.none') + '</div>';
  }

  renderExamHtml(
    '<div class="exam-review">' +
    '<div class="exam-review-head">' +
      '<div class="exam-review-summary"><strong>' + correctCount + ' / ' + qs.length + '</strong> ' + t('exam.review.summary') + ' · <strong>' + wrongCount + '</strong> ' + t('exam.review.mistakes') + '</div>' +
      '<div class="exam-review-filter">' +
        '<button class="' + (filter === 'all' ? 'active' : '') + '" onclick="renderExamReview(\'all\')">' + t('exam.review.all') + '</button>' +
        '<button class="' + (filter === 'wrong' ? 'active' : '') + '" onclick="renderExamReview(\'wrong\')">' + t('exam.review.onlyWrong') + '</button>' +
      '</div>' +
    '</div>' +
    '<div class="exam-review-list">' + items + '</div>' +
    '<div class="exam-review-actions"><button class="btn btn-primary" onclick="backToExamResult()">' + t('exam.review.back') + '</button></div>' +
    '</div>'
  );
}

function examBeforeUnload(e) {
  if (currentQuiz && currentQuiz.isFinal && currentQuiz.started && !currentQuiz.submitted) {
    saveExamState(); e.preventDefault(); e.returnValue = ''; return '';
  }
}
window.addEventListener('beforeunload', examBeforeUnload);

// ===== CERTIFICATE =====
function showCertificate() { var el = document.getElementById('certificate'); if (el) el.scrollIntoView({behavior:'smooth'}); renderCertificate(); }

function renderCertificate() {
  var lo = document.getElementById('certLockedState'), un = document.getElementById('certUnlockedState');
  if (!lo || !un) return;
  if (!state.finalPassed) {
    lo.style.display = 'block'; un.style.display = 'none';
    var s = document.getElementById('certStatus');
    if (s) s.textContent = isFinalUnlocked()
      ? t('cert.status.exam')
      : t('cert.status.progress') + state.completed.length + '/' + CURRICULUM.length + ' Module';
    return;
  }
  lo.style.display = 'none'; un.style.display = 'block';
  var d = new Date(state.completionDate || Date.now());
  var lang = typeof getLang === 'function' ? getLang() : 'de';
  var ds = d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'de-DE', {year:'numeric',month:'long',day:'numeric'});

  if (!state.credentialId) {
    state.credentialId = 'IEG-' + d.getFullYear() + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0') + '-' + Math.random().toString(36).substr(2,6).toUpperCase();
    saveState();
  }
  var cid = state.credentialId;

  un.innerHTML =
    '<div class="section-eyebrow">/ Certificate</div>' +
    '<h2 class="section-title">' + t('cert.heading') + '</h2>' +
    '<p class="section-lede" style="margin-bottom:48px">' + t('cert.lede2') + '</p>' +
    '<div class="certificate" id="certDoc">' +
      '<div class="cert-corner cert-corner-tl"></div><div class="cert-corner cert-corner-tr"></div>' +
      '<div class="cert-corner cert-corner-bl"></div><div class="cert-corner cert-corner-br"></div>' +
      '<img src="assets/ieg-logo.png" alt="IEG" class="cert-logo-img">' +
      '<div class="cert-issuing-line">' + t('cert.issuing.line') + '</div>' +
      '<div class="cert-this-certifies">' + t('cert.certifies') + '</div>' +
      '<div class="cert-name">' + esc(state.userName) + '</div>' +
      '<div class="cert-completed">' + t('cert.completed') + '</div>' +
      '<div class="cert-program">IEG Claude Academy</div>' +
      '<div class="cert-program-sub">' + t('cert.program.sub') + '</div>' +
      '<div class="cert-meta">' +
        '<div class="cert-meta-item"><div class="cert-meta-label">' + t('cert.date.label') + '</div><div class="cert-meta-value">' + ds + '</div></div>' +
        '<div class="cert-meta-item"><div class="cert-meta-label">' + t('cert.cred.label') + '</div><div class="cert-meta-value cert-meta-mono">' + cid + '</div></div>' +
        '<div class="cert-meta-item"><div class="cert-meta-label">' + t('cert.issued.label') + '</div><div class="cert-meta-value cert-signature">Stefan Heilmann</div><div class="cert-meta-role">Group CEO, IEG</div></div>' +
      '</div>' +
      '<div class="cert-verify">Credential ID: <span class="cert-meta-mono">' + cid + '</span></div>' +
    '</div>' +
    '<div class="cert-actions">' +
      '<button class="btn btn-primary" onclick="printCertificate()">' +
        '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
        t('cert.download') +
      '</button>' +
    '</div>';
}

let _html2pdfLoadPromise = null;
function loadHtml2Pdf() {
  if (window.html2pdf) return Promise.resolve();
  if (_html2pdfLoadPromise) return _html2pdfLoadPromise;
  _html2pdfLoadPromise = new Promise(function (resolve, reject) {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return _html2pdfLoadPromise;
}

function printCertificate() {
  var cert = document.getElementById('certDoc');
  if (!cert) return;
  var btn = document.querySelector('.cert-actions .btn-primary');
  var originalLabel = btn ? btn.innerHTML : null;
  if (btn) { btn.disabled = true; btn.style.opacity = '0.6'; }

  loadHtml2Pdf().then(function () {
    var wasDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (wasDark) document.documentElement.setAttribute('data-theme', 'light');
    var filename = 'IEG-Claude-Academy-Zertifikat-' + (state.credentialId || 'certificate') + '.pdf';
    var opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    window.html2pdf().set(opt).from(cert).save().then(function () {
      if (wasDark) document.documentElement.setAttribute('data-theme', 'dark');
      if (btn) { btn.disabled = false; btn.style.opacity = ''; if (originalLabel) btn.innerHTML = originalLabel; }
    }).catch(function () {
      if (wasDark) document.documentElement.setAttribute('data-theme', 'dark');
      printCertificateFallback(cert);
      if (btn) { btn.disabled = false; btn.style.opacity = ''; if (originalLabel) btn.innerHTML = originalLabel; }
    });
  }).catch(function () {
    // No internet access to CDN or blocked — fall back to browser print dialog
    printCertificateFallback(cert);
    if (btn) { btn.disabled = false; btn.style.opacity = ''; if (originalLabel) btn.innerHTML = originalLabel; }
  });
}

function printCertificateFallback(cert) {
  var html = cert.outerHTML;
  var win = window.open('', '_blank', 'width=1200,height=800');
  win.document.write('<!DOCTYPE html><html lang="' + (typeof getLang === 'function' ? getLang() : 'de') + '"><head><meta charset="UTF-8">');
  win.document.write('<base href="' + window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/') + '">');
  win.document.write('<link rel="preconnect" href="https://fonts.googleapis.com">');
  win.document.write('<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">');
  win.document.write('<link rel="stylesheet" href="styles.css">');
  win.document.write('<style>@page{size:A4 landscape;margin:0}body{margin:0;padding:40px;background:white;display:flex;align-items:center;justify-content:center;min-height:100vh;box-sizing:border-box}.certificate{box-shadow:none!important;border:2px solid #0A1A33;max-width:900px;width:100%}</style>');
  win.document.write('</head><body>' + html + '</body></html>');
  win.document.close();
  win.onload = function() { win.focus(); win.print(); };
}

function esc(s) { return String(s).replace(/[&<>"']/g, function(c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

// ===== USER DISPLAY =====
function updateUserDisplay() {
  var el = document.getElementById('userDisplayName');
  if (el) el.textContent = currentUser.name;
  if (!state.userName) { state.userName = currentUser.name; saveState(); }
}

// ===== NAV =====
function setupNavObserver() {
  var secs = ['home','curriculum','team','certificate'];
  var links = document.querySelectorAll('.nav-link');
  var obs = new IntersectionObserver(function(es) {
    es.forEach(function(e) { if (e.isIntersecting) links.forEach(function(l) { l.classList.toggle('active', l.dataset.nav === e.target.id); }); });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
  secs.forEach(function(id) { var el = document.getElementById(id); if (el) obs.observe(el); });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { var q = document.getElementById('quizModal'); if (q && q.style.display === 'flex') closeQuiz(); }
});

// Re-render dynamic content when language is toggled
document.addEventListener('ieg:langchange', function() { renderEverything(); });

// ===== RENDER =====
function renderEverything() { updateUserDisplay(); renderModules(); renderProgress(); renderCertificate(); setupHeroResumeButton(); }

function setupHeroResumeButton() {
  var btn = document.getElementById('heroPrimaryBtn');
  var label = document.getElementById('heroPrimaryBtnLabel');
  if (!btn || !label) return;
  var total = CURRICULUM.length;
  var done = state.completed.length;

  if (done === 0) {
    label.textContent = t('hero.cta.start');
    btn.onclick = function () { document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' }); };
    return;
  }

  if (done >= total) {
    label.textContent = t(state.finalPassed ? 'hero.cta.certificate' : 'hero.cta.exam');
    btn.onclick = function () { document.getElementById('certificate').scrollIntoView({ behavior: 'smooth' }); };
    return;
  }

  var nextId = null;
  for (var i = 0; i < total; i++) {
    if (state.completed.indexOf(CURRICULUM[i].id) === -1) { nextId = CURRICULUM[i].id; break; }
  }
  label.textContent = t('hero.cta.resume');
  btn.onclick = function () { if (nextId !== null) openModule(nextId); };
}

// ===== SUPABASE PROGRESS SYNC =====
async function loadProgressFromSupabase() {
  if (!window.sb || !currentUserId) return;
  var localCompleted = Array.isArray(state.completed) ? state.completed.slice() : [];
  var localFinalPassed = !!state.finalPassed, localScore = state.finalScore || 0, localDate = state.completionDate || '';
  var res = await window.sb.from('user_progress')
    .select('completed_modules, final_passed, final_score, completion_date')
    .eq('user_id', currentUserId).maybeSingle();
  if (res.error) { console.warn('Supabase load error:', res.error.message); return; }
  var remoteCompleted = [], remoteFinalPassed = false, remoteScore = 0, remoteDate = '';
  if (res.data) {
    remoteCompleted = Array.isArray(res.data.completed_modules) ? res.data.completed_modules : [];
    remoteFinalPassed = !!res.data.final_passed; remoteScore = res.data.final_score || 0; remoteDate = res.data.completion_date || '';
  }
  var mergedSet = {};
  localCompleted.concat(remoteCompleted).forEach(function(id) { mergedSet[id] = true; });
  var merged = Object.keys(mergedSet).map(Number).sort(function(a, b) { return a - b; });
  state.completed = merged; state.finalPassed = localFinalPassed || remoteFinalPassed;
  state.finalScore = Math.max(localScore, remoteScore); state.completionDate = remoteDate || localDate || '';
  saveState();
  var localAhead = !res.data || merged.length > remoteCompleted.length || (state.finalPassed && !remoteFinalPassed) || (state.finalScore > remoteScore);
  if (localAhead) await saveProgressToSupabase();
}

async function saveProgressToSupabase() {
  if (!window.sb || !currentUserId) return;
  var res = await window.sb.from('user_progress').upsert({
    user_id: currentUserId, completed_modules: state.completed,
    final_passed: state.finalPassed, final_score: state.finalScore || 0,
    completion_date: state.completionDate || null
  }, { onConflict: 'user_id' });
  if (res.error) console.warn('Supabase save error:', res.error.message);
}

// Getrennt gespeichert: falls die Spalte 'last_exam' (noch) nicht existiert,
// schlaegt nur DIESER Aufruf fehl — der Fortschritt bleibt davon unberuehrt.
// Hinweis: Der Guard prueft absichtlich NICHT auf state.lastExam — beim
// Zuruecksetzen des Fortschritts muss 'null' geschrieben werden, sonst bleibt
// die alte Pruefungsauswertung serverseitig stehen und wird neu geladen.
async function saveLastExamToSupabase() {
  if (!window.sb || !currentUserId) return;
  try {
    var res = await window.sb.from('user_progress')
      .update({ last_exam: state.lastExam || null }).eq('user_id', currentUserId);
    if (res.error) console.warn('Supabase last_exam save skipped:', res.error.message);
  } catch (e) { console.warn('Supabase last_exam save skipped:', e && e.message); }
}

async function loadLastExamFromSupabase() {
  if (!window.sb || !currentUserId) return;
  try {
    var res = await window.sb.from('user_progress')
      .select('last_exam').eq('user_id', currentUserId).maybeSingle();
    if (res.error) { console.warn('Supabase last_exam load skipped:', res.error.message); return; }
    if (res.data && res.data.last_exam && res.data.last_exam.questions) {
      state.lastExam = res.data.last_exam; saveState();
    }
  } catch (e) { console.warn('Supabase last_exam load skipped:', e && e.message); }
}

// ===== START =====
async function initApp() {
  renderEverything();
  setupNavObserver();
  restoreExamUI();
  if (!window.sb) return;
  var ures = await window.sb.auth.getUser();
  var user = ures && ures.data ? ures.data.user : null;
  if (user) {
    currentUserId = user.id;
    if (user.user_metadata && user.user_metadata.full_name) currentUser.name = user.user_metadata.full_name;
    await loadProgressFromSupabase();
    await loadLastExamFromSupabase();
    renderEverything();
  }
}

initApp();
