(function() {

'use strict';

Lampa.Lang.add({

drxaos_themes: { ru: 'DRXAOS Темы', en: 'DRXAOS Themes', uk: 'DRXAOS Теми' },

drxaos_theme: { ru: 'Цветовая схема', en: 'Color Scheme', uk: 'Кольорова схема' },

drxaos_animations: { ru: 'Анимации', en: 'Animations', uk: 'Анімації' },

drxaos_glow: { ru: 'Свечение', en: 'Glow', uk: 'Світіння' },

drxaos_fullbuttons: { ru: 'Полные названия кнопок', en: 'Full Button Labels', uk: 'Повні назви кнопок' },

drxaos_transparency: { ru: 'Прозрачность', en: 'Transparency', uk: 'Прозорість' },

drxaos_theme_desc: { ru: 'Выберите цветовую схему интерфейса', en: 'Choose interface color scheme', uk: 'Виберіть кольорову схему інтерфейсу' },

drxaos_glow_desc: { ru: 'Интенсивность свечения карточек и кнопок при наведении', en: 'Intensity of cards and buttons glow on hover', uk: 'Інтенсивність світіння карток і кнопок при наведенні' },

drxaos_transparency_desc: { ru: 'Уровень прозрачности панелей навигации и настроек', en: 'Transparency level of navigation and settings panels', uk: 'Рівень прозорості панелей навігації та налаштувань' },

drxaos_fullbuttons_desc: { ru: 'Показывать текст кнопок в карточках фильмов (Онлайн/Торренты/Избранное)', en: 'Show button text in movie cards', uk: 'Показувати текст кнопок в картках фільмів' },

drxaos_animations_desc: { ru: 'Плавные анимации при наведении (отключите на слабых устройствах)', en: 'Smooth animations on hover (disable on weak devices)', uk: 'Плавні анімації при наведенні (вимкніть на слабких пристроях)' },

drxaos_quick_theme: { ru: 'Быстрый выбор темы', en: 'Quick Theme Selector', uk: 'Швидкий вибір теми' }

});

var prevtheme = '';

function applyTheme(theme) {

$('#drxaos_theme_style').remove();

if (prevtheme !== '' && ((prevtheme === 'default' && theme !== 'default') ||

(prevtheme !== 'default' && theme === 'default'))) {

window.location.reload();

}

prevtheme = theme;

if (theme === 'default') return;

var glow = Lampa.Storage.get('drxaos_glow', 'medium');

var transparency = Lampa.Storage.get('drxaos_transparency', 85);

var glowValues = { 'off': '0', 'low': '0.15em', 'medium': '0.3em', 'high': '0.5em' };

var glowSize = glowValues[glow] || '0.3em';

var alpha = transparency / 100;

var commonStyles = `

/* GPU ACCELERATION */

.card, .menu__item, .button, .settings-param, .files__item, .torrent-item,

.filter__item, .sort__item, .selectbox-item, .online__item, .online__item-line,

.online-prestige__item, .online-prestige__line, .online__tabs-item,

.full-start__button, .head__action, .bottom-bar__item, .bottom-bar__btn {

will-change: transform, opacity;

transform: translateZ(0);

backface-visibility: hidden;

perspective: 1000px;

}

/* ПЛЕЕР */

body .player, .player,

body .player__video, .player__video,

body .player__content, .player__content {

background: #000000 !important;

}

body .player__panel, .player__panel,

body .player-panel, .player-panel,

body .player-info, .player-info,

body .player-controls, .player-controls,

body .player-time, .player-time,

body .player-timeline, .player-timeline {

background: rgba(var(--bg-rgb), ${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-top: 2px solid var(--theme-accent) !important;

color: var(--text-main) !important;

}

body .player__play, .player__play,

body .player-button, .player-button {

background: rgba(var(--glass-bg), 0.45) !important;

border: 1.5px solid rgba(var(--glass-border), 0.4) !important;

border-radius: 50% !important;

transition: all 0.2s ease !important;

backdrop-filter: blur(20px) saturate(180%) !important;

-webkit-backdrop-filter: blur(20px) saturate(180%) !important;

}

body .player__play.focus, body .player__play:hover,

body .player-button.focus, body .player-button:hover {

background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary)) !important;

border: 2px solid var(--theme-accent) !important;

box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.6) !important;

transform: scale(1.1) translateZ(0) !important;

}

body .player-timeline__bar, .player-timeline__bar {

background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;

box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.6) !important;

}

body .player__info, .player__info,

body .player-title, .player-title {

color: var(--theme-accent) !important;

text-shadow: 0 0 10px var(--theme-accent), 0 1px 3px rgba(0,0,0,0.5) !important;

font-weight: 600 !important;

}

/* BOTTOM BAR */

body .bottom-bar, .bottom-bar,

body .bottom-bar__body, .bottom-bar__body {

background: rgba(var(--bg-rgb), ${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-top: 2px solid var(--theme-accent) !important;

box-shadow: 0 -4px 20px rgba(var(--primary-rgb), 0.2) !important;

}

body .bottom-bar__item, .bottom-bar__item,

body .bottom-bar__btn, .bottom-bar__btn {

background: transparent !important;

border: none !important;

color: var(--text-main) !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .bottom-bar__item svg, .bottom-bar__item svg,

body .bottom-bar__btn svg, .bottom-bar__btn svg {

fill: var(--text-main) !important;

color: var(--text-main) !important;

filter: drop-shadow(0 1px 3px rgba(0,0,0,0.5));

}

body .bottom-bar__item.active, body .bottom-bar__item:hover, body .bottom-bar__item.focus,

body .bottom-bar__btn.active, body .bottom-bar__btn:hover, body .bottom-bar__btn.focus {

background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary)) !important;

border-radius: 1em !important;

transform: scale(1.1) translateZ(0) !important;

box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.6) !important;

}

body .bottom-bar__item.active svg, body .bottom-bar__item:hover svg, body .bottom-bar__item.focus svg,

body .bottom-bar__btn.active svg, body .bottom-bar__btn:hover svg, body .bottom-bar__btn.focus svg {

fill: var(--text-contrast) !important;

color: var(--text-contrast) !important;

filter: drop-shadow(0 2px 4px rgba(0,0,0,0.6));

}

body .bottom-bar__item-text, .bottom-bar__item-text,

body .bottom-bar__btn-text, .bottom-bar__btn-text {

color: var(--text-main) !important;

text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important;

}

body .bottom-bar__item.active .bottom-bar__item-text,

body .bottom-bar__item:hover .bottom-bar__item-text,

body .bottom-bar__btn.active .bottom-bar__btn-text,

body .bottom-bar__btn:hover .bottom-bar__btn-text {

color: var(--text-contrast) !important;

text-shadow: 0 1px 3px rgba(0,0,0,0.6) !important;

font-weight: 600 !important;

}

/* КОНТЕЙНЕРЫ */

body .card, .card, body .rows, .rows, body .line, .line {

border: none !important;

box-shadow: none !important;

outline: none !important;

background: transparent !important;

}

.card.focus .card__view::after,

.card:hover .card__view::after {

border-color: var(--theme-accent) !important;

box-shadow: 0 0 ${glowSize} var(--theme-accent) !important;

}

body .menu__item, .menu__item {

border-radius: 2em !important;

overflow: visible !important;

}

/* ОНЛАЙН ПРОСМОТР */

body .online, .online,

body .online__body, .online__body,

body .online-view, .online-view {

background: rgba(var(--glass-bg), 0.45) !important;

border: 1.5px solid rgba(var(--glass-border), 0.4) !important;

border-radius: 1em !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

}

body .online__item, .online__item,

body .online__item-line, .online__item-line,

body .online-prestige__item, .online-prestige__item,

body .online-prestige__line, .online-prestige__line {

background: rgba(var(--glass-bg), 0.45) !important;

border: 1.5px solid rgba(var(--glass-border), 0.4) !important;

border-radius: 0.8em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

backdrop-filter: blur(20px) saturate(180%) !important;

-webkit-backdrop-filter: blur(20px) saturate(180%) !important;

color: var(--text-main) !important;

margin-bottom: 0.3em !important;

}

body .online__item *, .online__item *,

body .online__item-line *, .online__item-line *,

body .online-prestige__item *, .online-prestige__item *,

body .online-prestige__line *, .online-prestige__line * {

color: var(--text-main) !important;

text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important;

}

body .online__item.focus, body .online__item:hover, body .online__item.active,

body .online__item-line.focus, body .online__item-line:hover, body .online__item-line.active,

body .online-prestige__item.focus, body .online-prestige__item:hover, body .online-prestige__item.active,

body .online-prestige__line.focus, body .online-prestige__line:hover, body .online-prestige__line.active {

background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;

border: 2px solid var(--theme-accent) !important;

box-shadow: 0 4px 20px rgba(var(--primary-rgb), 0.6) !important;

transform: translateX(5px) scale(1.02) translateZ(0) !important;

color: var(--text-contrast) !important;

backdrop-filter: blur(30px) saturate(200%) !important;

-webkit-backdrop-filter: blur(30px) saturate(200%) !important;

}

body .online__item.focus *, body .online__item:hover *, body .online__item.active *,

body .online__item-line.focus *, body .online__item-line:hover *, body .online__item-line.active *,

body .online-prestige__item.focus *, body .online-prestige__item:hover *, body .online-prestige__item.active *,

body .online-prestige__line.focus *, body .online-prestige__line:hover *, body .online-prestige__line.active * {

color: var(--text-contrast) !important;

text-shadow: 0 1px 3px rgba(0,0,0,0.6) !important;

}

body .online__quality, .online__quality {

background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary)) !important;

font-weight: 700 !important;

color: var(--text-contrast) !important;

padding: 0.2em 0.5em !important;

border-radius: 0.3em !important;

text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;

}

body .online__title, .online__title,

body .online__name, .online__name {

color: var(--theme-accent) !important;

text-shadow: 0 0 10px var(--theme-accent), 0 1px 3px rgba(0,0,0,0.5) !important;

font-weight: 600 !important;

}

body .online__tabs, .online__tabs,

body .online__tabs-item, .online__tabs-item {

background: rgba(var(--glass-bg), 0.45) !important;

border: 1.5px solid rgba(var(--glass-border), 0.4) !important;

border-radius: 1.5em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

backdrop-filter: blur(20px) saturate(180%) !important;

-webkit-backdrop-filter: blur(20px) saturate(180%) !important;

color: var(--text-main) !important;

}

body .online__tabs-item.focus, body .online__tabs-item:hover, body .online__tabs-item.active {

background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;

border: 2px solid var(--theme-accent) !important;

box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.5) !important;

color: var(--text-contrast) !important;

}

/* ФАЙЛЫ И ТОРРЕНТЫ */

body .files, .files,

body .files__item, .files__item,

body .torrent-item, .torrent-item {

background: rgba(var(--glass-bg), 0.45) !important;

border: 1.5px solid rgba(var(--glass-border), 0.4) !important;

border-radius: 0.5em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

backdrop-filter: blur(20px) saturate(180%) !important;

-webkit-backdrop-filter: blur(20px) saturate(180%) !important;

color: var(--text-main) !important;

}

body .files__item.focus, body .files__item:hover,

body .torrent-item.focus, body .torrent-item:hover {

background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;

border: 2px solid var(--theme-accent) !important;

box-shadow: 0 4px 20px rgba(var(--primary-rgb), 0.6) !important;

transform: translateX(5px) translateZ(0) !important;

color: var(--text-contrast) !important;

backdrop-filter: blur(30px) saturate(200%) !important;

-webkit-backdrop-filter: blur(30px) saturate(200%) !important;

}

body .files__item *, .files__item *,

body .torrent-item *, .torrent-item * {

color: var(--text-main) !important;

text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important;

}

body .files__item.focus *, body .files__item:hover *,

body .torrent-item.focus *, body .torrent-item:hover * {

color: var(--text-contrast) !important;

text-shadow: 0 1px 3px rgba(0,0,0,0.6) !important;

}

body .files__item-quality, .files__item-quality {

background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary)) !important;

font-weight: 700;

color: var(--text-contrast) !important;

padding: 0.2em 0.5em;

border-radius: 0.3em;

text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;

}

/* РАЗМЕР ФАЙЛОВ/ТОРРЕНТОВ - ЧЁРНЫЙ ВО ВСЕХ ТЕМАХ */

body .torrent-item__size, .torrent-item__size,

body .files__item-size, .files__item-size,

body .online__size, .online__size {

background: #ffffff !important;

color: #000000 !important;

font-weight: 700 !important;

padding: 0.2em 0.5em !important;

border-radius: 0.3em !important;

text-shadow: none !important;

border: 1px solid rgba(0,0,0,0.1) !important;

}

/* МОДАЛЬНЫЕ ОКНА - ТОЛЬКО ВИЗУАЛЬНЫЕ СТИЛИ */

.selectbox__content.layer--height,

.selectbox__head,

.selectbox__body.layer--wheight {

background: rgba(var(--bg-rgb), ${alpha}) !important;

backdrop-filter: blur(40px) saturate(180%) !important;

-webkit-backdrop-filter: blur(40px) saturate(180%) !important;

}

.selectbox__title {

color: var(--theme-accent) !important;

text-shadow: 0 0 15px var(--theme-accent), 0 2px 4px rgba(0,0,0,0.6) !important;

font-weight: 700 !important;

}

.selectbox-item.selector,

.simple-button.simple-button--filter.selector.filter--search,

.simple-button.simple-button--filter.selector.filter--sort {

background: rgba(var(--glass-bg), 0.5) !important;

border: 1.5px solid rgba(var(--glass-border), 0.4) !important;

color: var(--text-main) !important;

text-shadow: 0 1px 3px rgba(0,0,0,0.5) !important;

border-radius: 1.5em !important;

}

.selectbox-item.selector.focus,

.selectbox-item.selector:hover,

.simple-button.simple-button--filter.selector.filter--search.focus,

.simple-button.simple-button--filter.selector.filter--search:hover,

.simple-button.simple-button--filter.selector.filter--sort.focus,

.simple-button.simple-button--filter.selector.filter--sort:hover {

background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;

border: 2px solid var(--theme-accent) !important;

box-shadow: 0 6px 20px rgba(var(--primary-rgb), 0.6) !important;

color: var(--text-contrast) !important;

text-shadow: 0 2px 4px rgba(0,0,0,0.7) !important;

font-weight: 600 !important;

}

/* НАСТРОЙКИ */

body .settings__content, .settings__content {

background: rgba(var(--glass-bg), ${alpha}) !important;

backdrop-filter: blur(40px) saturate(180%) !important;

-webkit-backdrop-filter: blur(40px) saturate(180%) !important;

border: 2px solid rgba(var(--glass-border), 0.5) !important;

border-radius: 1em !important;

}

body .settings-param__name, .settings-param__name,

body .settings-param__descr, .settings-param__descr,

body .settings-param__value, .settings-param__value {

background: transparent !important;

border: none !important;

color: var(--text-main) !important;

}

body .settings-param, .settings-param,

body .settings-folder, .settings-folder {

background: rgba(var(--glass-bg), 0.45) !important;

border: 1.5px solid rgba(var(--glass-border), 0.4) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

backdrop-filter: blur(20px) saturate(180%) !important;

-webkit-backdrop-filter: blur(20px) saturate(180%) !important;

color: var(--text-main) !important;

}

body .settings-param.focus, body .settings-param:hover,

body .settings-folder.focus, body .settings-folder:hover {

background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;

border: 2px solid var(--theme-accent) !important;

box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.5) !important;

transform: translateX(5px) translateZ(0) !important;

color: var(--text-contrast) !important;

}

body .settings-param.focus *, body .settings-param:hover *,

body .settings-folder.focus *, body .settings-folder:hover * {

color: var(--text-contrast) !important;

}

/* КНОПКИ В КАРТОЧКЕ ФИЛЬМА */

body .full-start__button, .full-start__button {

background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary)) !important;

border: 2px solid var(--theme-accent) !important;

color: var(--text-contrast) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

backdrop-filter: blur(20px) saturate(180%) !important;

-webkit-backdrop-filter: blur(20px) saturate(180%) !important;

}

body .full-start__button.focus, body .full-start__button:hover {

background: linear-gradient(90deg, var(--theme-secondary), var(--theme-primary)) !important;

box-shadow: 0 4px 20px rgba(var(--primary-rgb), 0.7) !important;

transform: scale(1.05) translateZ(0) !important;

}

body .full-start__button svg,

.full-start__button svg {

fill: var(--text-contrast) !important;

color: var(--text-contrast) !important;

}

`;

var style = $('<style id="drxaos_theme_style"></style>');

var themes = {

cyberpunk: `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #5a3494;

--theme-secondary: #0088bb;

--theme-accent: #00b8d4;

--text-contrast: #ffffff;

--text-main: #d4e9f0;

--primary-rgb: 0, 184, 212;

--bg-rgb: 18, 14, 28;

--glass-bg: 28, 23, 42;

--glass-border: 90, 52, 144;

}

*, body {

font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;

letter-spacing: 0.01em;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

font-feature-settings: 'kern' 1, 'liga' 1;

}

.card__title, .card__title * { color: #00B8D4 !important; text-shadow: 0 0 8px rgba(0,184,212,0.5), 0 1px 3px rgba(0,0,0,0.6) !important; font-weight: 600; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #A8D8E8 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #D4E9F0 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #0a0a1e 0%, #14091c 25%, #22072e 50%, #14091c 75%, #0a0a1e 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 20s ease infinite !important;

}

@keyframes gradientShift {

0%, 100% { background-position: 0% 50%; }

50% { background-position: 100% 50%; }

}

body .head__action, .head__action {

background: rgba(90,52,148,0.3) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(90,52,148,0.45) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #5a3494, #0088bb) !important;

box-shadow: 0 0 12px rgba(0,136,187,0.5) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(18,14,28,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #0088bb !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #5a3494, #0088bb) !important;

color: #FFFFFF !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(0,136,187,0.4) !important;

border: 2px solid #00b8d4 !important;

transform: translateX(5px) translateZ(0) !important;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #5a3494, #0088bb) !important;

font-weight: 700;

color: #FFFFFF !important;

text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;

}

::-webkit-scrollbar { width: 8px; }

::-webkit-scrollbar-track { background: rgba(90,52,148,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #5a3494, #0088bb) !important; border-radius: 4px; }

${commonStyles}

`,

matrix: `

@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #00b328;

--theme-secondary: #008a20;

--theme-accent: #28e850;

--text-contrast: #000000;

--text-main: #00b328;

--primary-rgb: 0, 179, 40;

--bg-rgb: 0, 16, 0;

--glass-bg: 0, 26, 0;

--glass-border: 0, 179, 40;

}

*, body {

font-family: 'Roboto Mono', monospace, -apple-system, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #00B328 !important; text-shadow: 0 0 10px rgba(0,179,40,0.7), 0 1px 3px rgba(0,0,0,0.8) !important; font-weight: 700; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #00B328 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.7) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #A8D882 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #000 0%, #001200 25%, #002400 50%, #001200 75%, #000 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 15s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(0,179,40,0.18) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(0,179,40,0.35) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #00b328, #28e850) !important;

box-shadow: 0 0 12px rgba(0,179,40,0.6) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(0,16,0,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #00b328 !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #00b328, #008a20) !important;

color: #000 !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(0,179,40,0.5) !important;

border: 2px solid #28e850 !important;

transform: translateX(5px) translateZ(0) !important;

font-weight: 700;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #00b328, #008a20) !important;

color: #000 !important;

font-weight: 700;

}

::-webkit-scrollbar-track { background: rgba(0,179,40,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #00b328, #008a20) !important; }

${commonStyles}

`,

retrowave: `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #c11850;

--theme-secondary: #8a23a0;

--theme-accent: #00c4e6;

--text-contrast: #ffffff;

--text-main: #eee;

--primary-rgb: 193, 24, 80;

--bg-rgb: 26, 1, 42;

--glass-bg: 38, 5, 56;

--glass-border: 193, 24, 80;

}

*, body {

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #00C4E6 !important; text-shadow: 0 0 12px rgba(0,196,230,0.8), 0 1px 3px rgba(0,0,0,0.7) !important; font-weight: 700; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #D4E8F5 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #EDD8F5 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #0d0221 0%, #1a012e 20%, #220734 40%, #360c3e 60%, #220734 80%, #0d0221 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 25s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(138,35,160,0.25) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(193,24,80,0.45) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #c11850, #8a23a0, #00c4e6) !important;

box-shadow: 0 0 12px rgba(193,24,80,0.6) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(26,1,42,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 3px solid transparent !important;

border-image: linear-gradient(90deg, #c11850, #8a23a0, #00c4e6) 1 !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #c11850, #8a23a0, #00c4e6) !important;

color: #FFF !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(193,24,80,0.5) !important;

border: 2px solid #c11850 !important;

transform: scale(1.04) translateZ(0) !important;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #c11850, #8a23a0, #00c4e6) !important;

font-weight: 800;

color: #FFF !important;

text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important;

}

::-webkit-scrollbar-track { background: rgba(138,35,160,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #c11850, #8a23a0, #00c4e6) !important; }

${commonStyles}

`,

iceblue: `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #0088bb;

--theme-secondary: #00b8cc;

--theme-accent: #3ac8d4;

--text-contrast: #001a1f;

--text-main: #0088bb;

--primary-rgb: 0, 136, 187;

--bg-rgb: 0, 22, 32;

--glass-bg: 0, 32, 44;

--glass-border: 0, 136, 187;

}

*, body {

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #00B8CC !important; text-shadow: 0 0 10px rgba(0,184,204,0.7), 0 1px 3px rgba(0,0,0,0.7) !important; font-weight: 600; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #00B8CC !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #A8D4E0 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #001218 0%, #002232 30%, #003446 50%, #002232 70%, #001218 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 18s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(0,136,187,0.25) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(0,136,187,0.45) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #0088bb, #00b8cc) !important;

box-shadow: 0 0 12px rgba(0,184,204,0.6) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(0,22,32,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #0088bb !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #0088bb, #00b8cc) !important;

color: #001a1f !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(0,184,204,0.5) !important;

border: 2px solid #3ac8d4 !important;

transform: translateX(5px) translateZ(0) !important;

font-weight: 600;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #0088bb, #00b8cc) !important;

font-weight: 700;

color: #001a1f !important;

}

::-webkit-scrollbar-track { background: rgba(0,136,187,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #0088bb, #00b8cc) !important; }

${commonStyles}

`,

monochrome: `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #d9d9d9;

--theme-secondary: #bfbfbf;

--theme-accent: #f5f5f5;

--text-contrast: #0a0a0a;

--text-main: #e6e6e6;

--primary-rgb: 217, 217, 217;

--bg-rgb: 10, 10, 10;

--glass-bg: 26, 26, 26;

--glass-border: 217, 217, 217;

}

*, body {

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #F5F5F5 !important; text-shadow: 0 0 8px rgba(245,245,245,0.5), 0 1px 3px rgba(0,0,0,0.8) !important; font-weight: 600; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #E6E6E6 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #D1D1D1 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #0a0a0a 0%, #161616 30%, #222222 50%, #161616 70%, #0a0a0a 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 20s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(217,217,217,0.15) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(217,217,217,0.3) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #d9d9d9, #bfbfbf) !important;

box-shadow: 0 0 12px rgba(217,217,217,0.5) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(10,10,10,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #d9d9d9 !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #d9d9d9, #bfbfbf) !important;

color: #0a0a0a !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(217,217,217,0.4) !important;

border: 2px solid #f5f5f5 !important;

transform: translateX(5px) translateZ(0) !important;

font-weight: 600;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #d9d9d9, #bfbfbf) !important;

font-weight: 700;

color: #0a0a0a !important;

}

::-webkit-scrollbar-track { background: rgba(217,217,217,0.08) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #d9d9d9, #bfbfbf) !important; }

${commonStyles}

`,

yinyang: `

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #1a1a1a;

--theme-secondary: #d9d9d9;

--theme-accent: #7a7a7a;

--text-contrast: #ffffff;

--text-main: #e6e6e6;

--primary-rgb: 122, 122, 122;

--bg-rgb: 14, 14, 14;

--glass-bg: 30, 30, 30;

--glass-border: 122, 122, 122;

}

*, body {

font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #E6E6E6 !important; text-shadow: 0 2px 5px rgba(0,0,0,0.9) !important; font-weight: 600; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #E6E6E6 !important; text-shadow: 0 1px 3px rgba(0,0,0,0.7) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #C4C4C4 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; }

html, body, .extensions {

background: radial-gradient(circle at 30% 50%, #000 0%, #161616 30%, #d9d9d9 31%, #d9d9d9 32%, #161616 33%, #000 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 30s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(122,122,122,0.25) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(217,217,217,0.3) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #1a1a1a, #d9d9d9, #1a1a1a) !important;

box-shadow: 0 0 12px rgba(122,122,122,0.6) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(14,14,14,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #7a7a7a !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #1a1a1a, #d9d9d9, #1a1a1a) !important;

color: #FFF !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(122,122,122,0.5) !important;

border: 2px solid #7a7a7a !important;

transform: translateX(5px) translateZ(0) !important;

font-weight: 600;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #1a1a1a, #d9d9d9) !important;

font-weight: 700;

color: #1a1a1a !important;

}

::-webkit-scrollbar-track { background: rgba(122,122,122,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #1a1a1a, #7a7a7a, #d9d9d9) !important; }

${commonStyles}

`,

sunset: `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #c8493f;

--theme-secondary: #d4711e;

--theme-accent: #e68f10;

--text-contrast: #ffffff;

--text-main: #f5d0a8;

--primary-rgb: 200, 73, 63;

--bg-rgb: 20, 8, 4;

--glass-bg: 32, 16, 8;

--glass-border: 200, 73, 63;

}

*, body {

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #E68F10 !important; text-shadow: 0 0 10px rgba(230,143,16,0.7), 0 1px 3px rgba(0,0,0,0.7) !important; font-weight: 600; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #F5D088 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #F5D0A8 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #140804 0%, #301610 25%, #c8493f 50%, #301610 75%, #140804 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 22s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(200,73,63,0.25) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(200,73,63,0.45) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #c8493f, #d4711e) !important;

box-shadow: 0 0 12px rgba(200,73,63,0.6) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(20,8,4,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #c8493f !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #c8493f, #d4711e) !important;

color: #FFF !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(200,73,63,0.5) !important;

border: 2px solid #e68f10 !important;

transform: translateX(5px) translateZ(0) !important;

font-weight: 600;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #c8493f, #d4711e) !important;

font-weight: 700;

color: #FFF !important;

text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;

}

::-webkit-scrollbar-track { background: rgba(200,73,63,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #c8493f, #d4711e, #e68f10) !important; }

${commonStyles}

`,

ocean: `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #004d6a;

--theme-secondary: #00699a;

--theme-accent: #18b0d8;

--text-contrast: #ffffff;

--text-main: #a8d8e8;

--primary-rgb: 6, 105, 154;

--bg-rgb: 4, 16, 24;

--glass-bg: 8, 29, 42;

--glass-border: 6, 105, 154;

}

*, body {

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #40CAE8 !important; text-shadow: 0 0 10px rgba(64,202,232,0.6), 0 1px 3px rgba(0,0,0,0.6) !important; font-weight: 600; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #94DCF0 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #A8D8E8 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #041018 0%, #092639 25%, #004d6a 50%, #092639 75%, #041018 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 20s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(6,105,154,0.25) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(6,105,154,0.45) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #004d6a, #00699a) !important;

box-shadow: 0 0 12px rgba(6,105,154,0.6) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(4,16,24,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #00699a !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #004d6a, #00699a) !important;

color: #FFF !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(6,105,154,0.5) !important;

border: 2px solid #18b0d8 !important;

transform: translateX(5px) translateZ(0) !important;

font-weight: 600;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #004d6a, #00699a) !important;

font-weight: 700;

color: #FFF !important;

text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;

}

::-webkit-scrollbar-track { background: rgba(6,105,154,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #004d6a, #00699a, #18b0d8) !important; }

${commonStyles}

`,

forest: `

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&subset=cyrillic,cyrillic-ext,latin,latin-ext&display=swap');

:root {

--theme-primary: #284612;

--theme-secondary: #446d0c;

--theme-accent: #68a00a;

--text-contrast: #ffffff;

--text-main: #d0e698;

--primary-rgb: 68, 109, 12;

--bg-rgb: 8, 16, 4;

--glass-bg: 16, 29, 8;

--glass-border: 68, 109, 12;

}

*, body {

font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;

text-rendering: optimizeLegibility;

-webkit-font-smoothing: antialiased;

-moz-osx-font-smoothing: grayscale;

}

.card__title, .card__title * { color: #9DCE54 !important; text-shadow: 0 0 10px rgba(157,206,84,0.6), 0 1px 3px rgba(0,0,0,0.7) !important; font-weight: 600; }

.full-start__title, .full-start__title *, .menu__item-title, .menu__item-title *, .settings__title, .settings__title * { color: #C2DC80 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important; }

.card__description, .card__description *, .info__line, .info__line * { color: #D0E698 !important; text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; }

html, body, .extensions {

background: linear-gradient(135deg, #081004 0%, #142206 25%, #284612 50%, #142206 75%, #081004 100%) !important;

background-size: 400% 400% !important;

animation: gradientShift 25s ease infinite !important;

}

body .head__action, .head__action {

background: rgba(68,109,12,0.25) !important;

backdrop-filter: blur(20px) saturate(180%) !important;

border: 1.5px solid rgba(68,109,12,0.45) !important;

border-radius: 2em !important;

transition: transform 0.15s ease, opacity 0.15s ease !important;

}

body .head__action.focus, body .head__action:hover {

background: linear-gradient(45deg, #284612, #446d0c) !important;

box-shadow: 0 0 12px rgba(68,109,12,0.6) !important;

transform: scale(1.08) translateZ(0) !important;

}

body .navigation-bar__body, .navigation-bar__body {

background: rgba(8,16,4,${alpha}) !important;

backdrop-filter: blur(30px) saturate(180%) !important;

-webkit-backdrop-filter: blur(30px) saturate(180%) !important;

border-bottom: 2px solid #446d0c !important;

}

body .menu__item.focus, body .menu__item:hover, body .button.focus, body .button:hover {

background: linear-gradient(90deg, #284612, #446d0c) !important;

color: #FFF !important;

border-radius: 2em !important;

box-shadow: 0 4px 18px rgba(68,109,12,0.5) !important;

border: 2px solid #68a00a !important;

transform: translateX(5px) translateZ(0) !important;

font-weight: 600;

}

.card__quality, .card__type::after {

background: linear-gradient(135deg, #284612, #446d0c) !important;

font-weight: 700;

color: #FFF !important;

text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;

}

::-webkit-scrollbar-track { background: rgba(68,109,12,0.12) !important; }

::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #284612, #446d0c, #68a00a) !important; }

${commonStyles}

`

};

style.html(themes[theme] || '');

$('head').append(style);

applyAnimations();

applyFullButtons();

}

function applyAnimations() {

var animations = Lampa.Storage.get('drxaos_animations', true);

$('#drxaos_animations_style').remove();

if (animations) {

$('<style id="drxaos_animations_style">.card, .menu__item, .button, .settings-param, .files__item, .torrent-item, .filter__item, .sort__item, .selectbox-item, .online__item, .online__item-line, .online-prestige__item, .online-prestige__line, .online__tabs-item, .full-start__button, .head__action { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important; }</style>').appendTo('head');

}

}

function applyFullButtons() {

var fullbuttons = Lampa.Storage.get('drxaos_fullbuttons', false);

$('#drxaos_fullbuttons_style').remove();

if (fullbuttons) {

$('<style id="drxaos_fullbuttons_style">.full-start__button span { display: inline !important; }</style>').appendTo('head');

} else {

$('<style id="drxaos_fullbuttons_style">.full-start__button span { display: none !important; }</style>').appendTo('head');

}

}

function createQuickThemeModal() {

var modal = $('<div class="drxaos-quick-theme-modal"></div>');

var overlay = $('<div class="drxaos-modal-overlay"></div>');

var content = $('<div class="drxaos-modal-content"></div>');

var title = $('<h2 class="drxaos-modal-title">🎨 Выберите тему</h2>');

var themesGrid = $('<div class="drxaos-themes-grid"></div>');

var themes = [

{ id: 'cyberpunk', name: '🔮 Киберпанк', icon: '🔮' },

{ id: 'matrix', name: '💚 Матрица', icon: '💚' },

{ id: 'retrowave', name: '🌈 Ретроволна', icon: '🌈' },

{ id: 'iceblue', name: '❄️ Ледяная', icon: '❄️' },

{ id: 'monochrome', name: '⚪ Монохром', icon: '⚪' },

{ id: 'yinyang', name: '☯️ Инь-Янь', icon: '☯️' },

{ id: 'sunset', name: '🌅 Закат', icon: '🌅' },

{ id: 'ocean', name: '🌊 Океан', icon: '🌊' },

{ id: 'forest', name: '🌲 Лес', icon: '🌲' },

{ id: 'default', name: '🎯 Стандарт', icon: '🎯' }

];

var currentTheme = Lampa.Storage.get('drxaos_theme', 'default');

themes.forEach(function(theme) {

var themeBtn = $('<div class="drxaos-theme-item' + (currentTheme === theme.id ? ' active' : '') + '" data-theme="' + theme.id + '"><span class="drxaos-theme-icon">' + theme.icon + '</span><span class="drxaos-theme-name">' + theme.name + '</span></div>');

themeBtn.on('click', function() {

var selectedTheme = $(this).data('theme');

Lampa.Storage.set('drxaos_theme', selectedTheme);

applyTheme(selectedTheme);

closeModal();

});

themesGrid.append(themeBtn);

});

content.append(title).append(themesGrid);

modal.append(overlay).append(content);

function closeModal() {

modal.fadeOut(300, function() {

modal.remove();

});

}

overlay.on('click', closeModal);

var styles = `

<style>

.drxaos-quick-theme-modal {

position: fixed;

top: 0;

left: 0;

width: 100%;

height: 100%;

z-index: 10000;

display: flex;

align-items: center;

justify-content: center;

font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

}

.drxaos-modal-overlay {

position: absolute;

top: 0;

left: 0;

width: 100%;

height: 100%;

background: rgba(0, 0, 0, 0.7);

backdrop-filter: blur(10px);

-webkit-backdrop-filter: blur(10px);

}

.drxaos-modal-content {

position: relative;

background: rgba(30, 30, 40, 0.95);

backdrop-filter: blur(40px) saturate(180%);

-webkit-backdrop-filter: blur(40px) saturate(180%);

border: 2px solid rgba(107, 63, 174, 0.6);

border-radius: 1.5em;

padding: 2em;

max-width: 90%;

width: 700px;

box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

animation: modalSlideIn 0.3s ease-out;

}

@keyframes modalSlideIn {

from {

opacity: 0;

transform: translateY(-30px) scale(0.95);

}

to {

opacity: 1;

transform: translateY(0) scale(1);

}

}

.drxaos-modal-title {

color: #00c8e6;

font-size: 1.8em;

font-weight: 700;

margin: 0 0 1em 0;

text-align: center;

text-shadow: 0 0 20px rgba(0, 200, 230, 0.6);

}

.drxaos-themes-grid {

display: grid;

grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));

gap: 1em;

}

.drxaos-theme-item {

background: rgba(50, 50, 70, 0.5);

border: 2px solid rgba(107, 63, 174, 0.3);

border-radius: 1em;

padding: 1.5em 1em;

cursor: pointer;

transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

display: flex;

flex-direction: column;

align-items: center;

gap: 0.5em;

backdrop-filter: blur(10px);

-webkit-backdrop-filter: blur(10px);

}

.drxaos-theme-item:hover {

background: linear-gradient(135deg, rgba(107, 63, 174, 0.4), rgba(0, 153, 204, 0.4));

border-color: #00c8e6;

transform: translateY(-5px) scale(1.05);

box-shadow: 0 10px 30px rgba(0, 200, 230, 0.4);

}

.drxaos-theme-item.active {

background: linear-gradient(135deg, #6b3fae, #0099cc);

border-color: #00c8e6;

box-shadow: 0 0 20px rgba(0, 200, 230, 0.6);

}

.drxaos-theme-icon {

font-size: 2.5em;

line-height: 1;

filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

}

.drxaos-theme-name {

color: #fff;

font-size: 0.9em;

font-weight: 600;

text-align: center;

text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

}

.drxaos-theme-item.active .drxaos-theme-name {

color: #fff;

font-weight: 700;

text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

}

</style>

`;

$('head').append(styles);

$('body').append(modal);

modal.hide().fadeIn(300);

}

function addQuickThemeButton() {

var checkInterval = setInterval(function() {

if ($('.head__actions').length > 0 && $('#drxaos-quick-theme-btn').length === 0) {

var btn = $('<div class="head__action drxaos-theme-quick-btn" id="drxaos-quick-theme-btn" title="Быстрый выбор темы"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z" fill="currentColor"/></svg></div>');

$('.head__actions').prepend(btn);

btn.on('click', function(e) {

e.preventDefault();

e.stopPropagation();

createQuickThemeModal();

});

clearInterval(checkInterval);

}

}, 100);

setTimeout(function() {

clearInterval(checkInterval);

}, 10000);

}

function addSettings() {

Lampa.SettingsApi.addComponent({

component: 'drxaos_themes',

name: Lampa.Lang.translate('drxaos_themes'),

icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" fill="currentColor"/></svg>',

order: 0

});

Lampa.SettingsApi.addParam({

component: 'drxaos_themes',

param: {

name: 'drxaos_theme',

type: 'select',

values: {

'default': 'Стандартная',

'cyberpunk': '🔮 Киберпанк',

'matrix': '💚 Матрица',

'retrowave': '🌈 Ретроволна',

'iceblue': '❄️ Ледяная',

'monochrome': '⚪ Монохром',

'yinyang': '☯️ Инь-Янь',

'sunset': '🌅 Закат',

'ocean': '🌊 Океан',

'forest': '🌲 Лес'

},

default: 'default'

},

field: {

name: Lampa.Lang.translate('drxaos_theme'),

description: Lampa.Lang.translate('drxaos_theme_desc')

},

onChange: applyTheme

});

Lampa.SettingsApi.addParam({

component: 'drxaos_themes',

param: {

name: 'drxaos_glow',

type: 'select',

values: {

'off': 'Выключено',

'low': 'Слабое',

'medium': 'Среднее',

'high': 'Сильное'

},

default: 'medium'

},

field: {

name: Lampa.Lang.translate('drxaos_glow'),

description: Lampa.Lang.translate('drxaos_glow_desc')

},

onChange: function() {

var theme = Lampa.Storage.get('drxaos_theme', 'default');

applyTheme(theme);

}

});

Lampa.SettingsApi.addParam({

component: 'drxaos_themes',

param: {

name: 'drxaos_transparency',

type: 'select',

values: {

'10': '10%',

'20': '20%',

'30': '30%',

'40': '40%',

'50': '50%',

'60': '60%',

'70': '70%',

'80': '80%',

'85': '85%',

'90': '90%',

'95': '95%',

'100': '100%'

},

default: '85'

},

field: {

name: Lampa.Lang.translate('drxaos_transparency'),

description: Lampa.Lang.translate('drxaos_transparency_desc')

},

onChange: function() {

var theme = Lampa.Storage.get('drxaos_theme', 'default');

applyTheme(theme);

}

});

Lampa.SettingsApi.addParam({

component: 'drxaos_themes',

param: {

name: 'drxaos_fullbuttons',

type: 'trigger',

default: false

},

field: {

name: Lampa.Lang.translate('drxaos_fullbuttons'),

description: Lampa.Lang.translate('drxaos_fullbuttons_desc')

},

onChange: applyFullButtons

});

Lampa.SettingsApi.addParam({

component: 'drxaos_themes',

param: {

name: 'drxaos_animations',

type: 'trigger',

default: true

},

field: {

name: Lampa.Lang.translate('drxaos_animations'),

description: Lampa.Lang.translate('drxaos_animations_desc')

},

onChange: applyAnimations

});

}

function reorderButtons() {

var buttonInterval = setInterval(function() {

var $buttonsContainer = $('.full-start__buttons');

if ($buttonsContainer.length > 0) {

var buttons = [];

var $onlineBtn = null;

var $torrentsBtn = null;

var $watchBtn = null;

var $favoriteBtn = null;

$buttonsContainer.find('.full-start__button').each(function() {

var $btn = $(this);

var text = $btn.find('span').text().trim();

if (text === 'Онлайн' || text === 'Online') {

$onlineBtn = $btn.clone();

$onlineBtn.find('svg').html('<path d="M8 5v14l11-7z" fill="currentColor"/>').attr('viewBox', '0 0 24 24');

} 

else if (text === 'Смотреть' || text === 'Watch' || text === 'Дивитися') {

$watchBtn = $btn.clone();

$watchBtn.find('svg').html('<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>').attr('viewBox', '0 0 24 24');

} 

else if (text === 'Торренты' || text === 'Torrents') {

$torrentsBtn = $btn.clone();

$torrentsBtn.find('svg').html('<path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-1.48 0-2.85.43-4.01 1.17l1.46 1.46C10.21 6.23 11.08 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 1.13-.64 2.11-1.56 2.62l1.45 1.45C23.16 18.16 24 16.68 24 15c0-2.64-2.05-4.78-4.65-4.96zM3 5.27l2.75 2.74C2.56 8.15 0 10.77 0 14c0 3.31 2.69 6 6 6h11.73l2 2L21 20.73 4.27 4 3 5.27zM7.73 10l8 8H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73z" fill="currentColor"/>').attr('viewBox', '0 0 24 24');

} 

else if (text === 'Избранное' || text === 'Favorite' || text === 'Обране') {

$favoriteBtn = $btn.clone();

}

});

if ($onlineBtn && $watchBtn) {

$buttonsContainer.empty();

$buttonsContainer.append($onlineBtn);

if ($torrentsBtn) {

$buttonsContainer.append($torrentsBtn);

}

$buttonsContainer.append($watchBtn);

if ($favoriteBtn) {

$buttonsContainer.append($favoriteBtn);

}

clearInterval(buttonInterval);

}

}

}, 100);

setTimeout(function() {

clearInterval(buttonInterval);

}, 5000);

}

function startPlugin() {

addSettings();

var theme = Lampa.Storage.get('drxaos_theme', 'default');

applyTheme(theme);

addQuickThemeButton();

reorderButtons();

Lampa.Listener.follow('full', function(e) {

if (e.type === 'complite') {

setTimeout(reorderButtons, 300);

}

});

}

if (window.appready) startPlugin();

else {

Lampa.Listener.follow('app', function(e) {

if (e.type == 'ready') startPlugin();

});

}

})();