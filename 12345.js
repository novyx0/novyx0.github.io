(function() {
    'use strict';

    Lampa.Lang.add({
        lampa_ui_layout: {
            ru: "Улучшенный интерфейс",
            en: "Enhanced UI",
            uk: "Покращений інтерфейс",
            be: "Палепшаны інтэрфейс",
            zh: "增强用户界面",
            pt: "Interface melhorada",
            bg: "Подобрен интерфейс",
            he: "ממשק משופר",
            cs: "Vylepšené rozhraní"
        }
    });

    var lampa_ui_layout = {
        name: 'lampa_ui_layout',
        version: '1.0.0',
        settings: {}
    };

    /**
     * Добавляет универсальные стили и переопределяет шаблоны карточек
     */
    function applyUniversalStyles() {
        // === ШАБЛОН КАРТОЧКИ - ОРИГИНАЛЬНЫЙ ===
        Lampa.Template.add('card', "<div class=\"card selector layer--visible layer--render\">\n    <div class=\"card__view\">\n        <img src=\"./img/img_load.svg\" class=\"card__img\" />\n\n        <div class=\"card__icons\">\n            <div class=\"card__icons-inner\">\n                \n            </div>\n        </div>\n        \n        <div class=\"card__vote hide\"></div>\n        <div class=\"card__age\">{release_year}</div>\n        <div class=\"card__marker hide\"></div>\n    </div>\n\n    <div class=\"card__title\">{title}</div>\n</div>");

        Lampa.Template.add('card_episode', "<div class=\"card-episode selector layer--visible layer--render\">\n    <div class=\"card-episode__body\">\n        <div class=\"full-episode\">\n            <div class=\"full-episode__img\">\n                <img />\n            </div>\n\n            <div class=\"full-episode__body\">\n                <div class=\"card__title\">{title}</div>\n                <div class=\"card__age\">{release_year}</div>\n                <div class=\"full-episode__num hide\">{num}</div>\n                <div class=\"full-episode__name\">{name}</div>\n                <div class=\"full-episode__date\">{date}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-episode__footer hide\">\n        <div class=\"card__imgbox\">\n            <div class=\"card__view\">\n                <img class=\"card__img\" />\n            </div>\n        </div>\n\n        <div class=\"card__left\">\n            <div class=\"card__title\">{title}</div>\n            <div class=\"card__age\">{release_year}</div>\n        </div>\n    </div>\n</div>");

        // === CSS СТИЛИ ===
        var universal_styles = "<style id=\"lampa_ui_universal_styles\">\n" +
            // По центру в мобилке
            "@media screen and (max-width: 480px) { .full-start-new__head, .full-start-new__title, .full-start__title-original, .full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, .full-start-new__buttons, .full-start-new__details, .full-start-new__tagline { -webkit-justify-content: center; justify-content: center; text-align: center; }\n" +
            ".full-start__title-original { max-width: 100%; }\n" +
            ".full-start-new__right { background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%); }}\n" +
            // Круглые чек-боксы
            ".selectbox-item__checkbox { border-radius: 100%; }\n" +
            ".selectbox-item--checked .selectbox-item__checkbox { background: #ccc; }\n" +
            // Рейтинги в карточке
            ".full-start-new__rate-line .full-start__pg { font-size: 1em; background: #fff; color: #000; }\n" +
            ".full-start__rate { border-radius: 0.25em; padding: 0.3em; background-color: rgba(0, 0, 0, 0.3); }\n" +
            // Заголовок карточки
            ".card__title { height: 3.6em; text-overflow: ellipsis; -webkit-line-clamp: 3; line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }\n" +
            // *** ГОД - В УГЛУ ПОСТЕРА КРАСИВО ***
            ".card__view { position: relative; }\n" +
            ".card__age { position: absolute; right: 0.5em; bottom: 0.5em; z-index: 10; background: rgba(0, 0, 0, 0.7); color: #ffffff; font-weight: 700; padding: 0.5em 0.7em; border-radius: 0.5em; line-height: 1.0; font-size: 1.1em; }\n" +
            // Рейтинг
            ".card__vote { position: absolute; bottom: auto; right: 0em; top: 0em; background: rgba(0, 0, 0, 0.6); font-weight: 700; color: #fff; border-radius: 0 0.34em 0 0.34em; line-height: 1.0; font-size: 1.4em; }\n" +
            // Иконки закладок
            ".card__icons { position: absolute; top: 0.5em; left: 0.5em; right: auto; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.6); color: #fff; border-radius: 0.5em; padding: 0.3em; }\n" +
            ".card__icons-inner { background: rgba(0, 0, 0, 0); }\n" +
            // Маркер статуса
            ".card__marker { position: absolute; left: 0.5em; top: 3em; bottom: auto; background: rgba(0, 0, 0, 0.6); border-radius: 0.5em; font-weight: 700; font-size: 1.0em; padding: 0.4em 0.6em; display: flex; align-items: center; line-height: 1.2; max-width: 12em; }\n" +
            // Расстояние между рядами
            ".items-line.items-line--type-cards + .items-line.items-line--type-cards { margin-top: 1em; }\n" +
            ".card--small .card__view { margin-bottom: 2em; }\n" +
            ".items-line--type-cards { min-height: 18em; }\n" +
            // Фулл скрин
            "@media screen and (min-width: 580px) { .full-start-new { min-height: 80vh; display: flex; } }\n" +
            // Постер
            ".full-start__background.loaded { opacity: 0.8; }\n" +
            ".full-start__background.dim { opacity: 0.2; }\n" +
            // Скругления
            ".card__img, .card__promo, .full-episode__img img, .full-episode__body, .full-person__photo, .card-more__box, .full-start__button, .simple-button, .register, .extensions__item, .extensions__block-add, .search-source, .full-review-add, .full-review, .bookmarks-folder__layer, .bookmarks-folder__body { border-radius: 0.5em; }\n" +
            ".card.focus .card__view::after, .card.hover .card__view::after, .card-more.focus .card-more__box::after, .full-episode.focus::after, .extensions__item.focus::after, .full-review-add.focus::after, .register.focus::after { border-radius: 1em; }\n" +
            ".search-source.focus, .simple-button.focus, .menu__item.focus, .full-start__button.focus, .full-descr__tag.focus, .full-person.selector.focus, .tag-count.selector.focus { border-radius: 0.5em; }\n" +
            // Меню
            ".menu__item.focus { border-radius: 0 0.5em 0.5em 0; }\n" +
            ".menu__list { padding-left: 0em; }\n" +
            ".menu__item.focus .menu__ico { filter: invert(1); }\n" +
            ".explorer__files .torrent-filter .simple-button { font-size: 1.2em; border-radius: 0.5em; }\n" +
            ".card__type { display: none; }\n" +
            "</style>\n";

        Lampa.Template.add('universal_styles_css', universal_styles);
        $('body').append(Lampa.Template.get('universal_styles_css', {}, true));
    }

    /**
     * Анимации
     */
    function applyAnimations() {
        var animationsEnabled = localStorage.getItem('lampa_ui_layout_animations') === 'true';
        $('#lampa_ui_animations').remove();
        if (animationsEnabled) {
            var animations_style = "<style id=\"lampa_ui_animations\">\n" +
                ".card { transform: scale(1); transition: transform 0.3s ease; }\n" +
                ".card.focus { transform: scale(1.03); }\n" +
                ".torrent-item, .online-prestige { transform: scale(1); transition: transform 0.3s ease; }\n" +
                ".torrent-item.focus, .online-prestige.focus { transform: scale(1.01); }\n" +
                ".extensions__item, .extensions__block-add, .full-review-add, .full-review, .tag-count, .full-person, .full-episode, .simple-button, .full-start__button, .items-cards .selector, .card-more, .card-episode { transform: scale(1); transition: transform 0.3s ease; }\n" +
                ".extensions__item.focus, .extensions__block-add.focus, .full-review-add.focus, .full-review.focus, .tag-count.focus, .full-person.focus, .full-episode.focus, .simple-button.focus, .full-start__button.focus, .items-cards .selector.focus, .card-more.focus, .card-episode.focus { transform: scale(1.03); }\n" +
                ".menu__item { transition: transform 0.3s ease; }\n" +
                ".menu__item.focus { transform: translateX(-0.2em); }\n" +
                ".selectbox-item, .settings-folder, .settings-param { transition: transform 0.3s ease; }\n" +
                ".selectbox-item.focus, .settings-folder.focus, .settings-param.focus { transform: translateX(0.2em); }\n" +
                "</style>\n";
            $('body').append(animations_style);
        }
    }

    /**
     * Размер кнопок
     */
    function applyButtonSizing() {
        var bigButtonsEnabled = localStorage.getItem('lampa_ui_layout_big_buttons') === 'true';
        $('#lampa_ui_big_buttons').remove();
        if (bigButtonsEnabled) {
            var big_buttons_style = "<style id=\"lampa_ui_big_buttons\">\n" +
                ".full-start-new__buttons .full-start__button:not(.focus) span { display: inline; }\n" +
                "@media screen and (max-width: 580px) { .full-start-new__buttons { overflow: auto; } .full-start-new__buttons .full-start__button:not(.focus) span { display: none; } }\n" +
                "</style>\n";
            $('body').append(big_buttons_style);
        }
    }

    /**
     * Переводы статусов сериалов
     */
    function translateSeriesStatuses() {
        Lampa.Lang.add({
            tv_status_returning_series: { ru: "Идет" },
            tv_status_planned: { ru: "Запланирован" },
            tv_status_in_production: { ru: "В производстве" },
            tv_status_ended: { ru: "Завершен" },
            tv_status_canceled: { ru: "Отменен" },
            tv_status_pilot: { ru: "Пилот" },
            tv_status_released: { ru: "Вышел" },
            tv_status_rumored: { ru: "По слухам" },
            tv_status_post_production: { ru: "Скоро" }
        });
    }

    /**
     * Инициализация плагина
     */
    function initializePlugin() {
        // Значения по умолчанию
        if (!localStorage.getItem('lampa_ui_layout_animations')) {
            localStorage.setItem('lampa_ui_layout_animations', 'true');
        }
        if (!localStorage.getItem('lampa_ui_layout_big_buttons')) {
            localStorage.setItem('lampa_ui_layout_big_buttons', 'false');
        }

        // Компонент в настройках
        Lampa.SettingsApi.addComponent({
            component: "lampa_ui_layout",
            name: Lampa.Lang.translate('lampa_ui_layout'),
            icon: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512Z" fill="currentColor"/></svg>'
        });

        // Параметры
        Lampa.SettingsApi.addParam({
            component: 'lampa_ui_layout',
            param: {
                name: 'lampa_ui_layout_animations',
                type: "trigger",
                default: true
            },
            field: {
                name: 'Анимации элементов',
                description: 'Масштабирование при фокусе'
            },
            onChange: function(value) {
                applyAnimations();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'lampa_ui_layout',
            param: {
                name: 'lampa_ui_layout_big_buttons',
                type: "trigger",
                default: false
            },
            field: {
                name: 'Большие кнопки в карточке',
                description: 'На мобильных - только иконки'
            },
            onChange: function(value) {
                applyButtonSizing();
            }
        });

        // Применяем
        applyUniversalStyles();
        applyAnimations();
        applyButtonSizing();
        translateSeriesStatuses();
    }

    // Запуск
    if (window.appready) {
        initializePlugin();
    } else {
        Lampa.Listener.follow('app', function(event) {
            if (event.type === 'ready') {
                initializePlugin();
            }
        });
    }

    // Регистрация
    Lampa.Manifest.plugins = {
        name: 'lampa_ui_layout',
        version: '1.0.0',
        description: 'Улучшенный интерфейс Lampa'
    };

    window.lampa_ui_layout = lampa_ui_layout;
})();
