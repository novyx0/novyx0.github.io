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
        // Шаблон карточки
        Lampa.Template.add('card', "<div class=\"card selector layer--visible layer--render\">\n    <div class=\"card__view\">\n        <img src=\"./img/img_load.svg\" class=\"card__img\" />\n\n        <div class=\"card__icons\">\n            <div class=\"card__icons-inner\">\n                \n            </div>\n        </div>\n        \n        <div class=\"card__vote hide\"></div>\n        <div class=\"card__age\">{release_year}</div>\n        <div class=\"card__marker hide\"></div>\n    </div>\n\n    <div class=\"card__title\">{title}</div>\n</div>");

        // Шаблон эпизода
        Lampa.Template.add('card_episode', "<div class=\"card-episode selector layer--visible layer--render\">\n    <div class=\"card-episode__body\">\n        <div class=\"full-episode\">\n            <div class=\"full-episode__img\">\n                <img />\n            </div>\n\n            <div class=\"full-episode__body\">\n                <div class=\"card__title\">{title}</div>\n                <div class=\"card__age\">{release_year}</div>\n                <div class=\"full-episode__num hide\">{num}</div>\n                <div class=\"full-episode__name\">{name}</div>\n                <div class=\"full-episode__date\">{date}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-episode__footer hide\">\n        <div class=\"card__imgbox\">\n            <div class=\"card__view\">\n                <img class=\"card__img\" />\n            </div>\n        </div>\n\n        <div class=\"card__left\">\n            <div class=\"card__title\">{title}</div>\n            <div class=\"card__age\">{release_year}</div>\n        </div>\n    </div>\n</div>");

        // CSS стили
        var universal_styles = "<style id=\"lampa_ui_universal_styles\">\n" +
            "@media screen and (max-width: 480px) { .full-start-new__head, .full-start-new__title, .full-start__title-original, .full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, .full-start-new__buttons, .full-start-new__details, .full-start-new__tagline { -webkit-justify-content: center; justify-content: center; text-align: center; }\n" +
            ".full-start__title-original { max-width: 100%; }\n" +
            ".full-start-new__right { background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%); }}\n" +
            ".selectbox-item__checkbox { border-radius: 100%; }\n" +
            ".selectbox-item--checked .selectbox-item__checkbox { background: #ccc; }\n" +
            ".full-start-new__rate-line .full-start__pg { font-size: 1em; background: #fff; color: #000; }\n" +
            ".full-start__rate { border-radius: 0.25em; padding: 0.3em; background-color: rgba(0, 0, 0, 0.3); }\n" +
            ".card__title { height: 3.6em; text-overflow: ellipsis; -webkit-line-clamp: 3; line-clamp: 3; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }\n" +
            // ============ КРИТИЧНАЯ ЧАСТЬ: ПОЗИЦИОНИРОВАНИЕ ГОДА ============
            ".card__view { position: relative; }\n" +
            ".card__age { position: absolute; right: 0em; bottom: 0em; z-index: 10; background: rgba(0, 0, 0, 0.6); color: #ffffff; font-weight: 700; padding: 0.4em 0.6em; border-radius: 0.48em 0 0.48em 0; line-height: 1.0; font-size: 1.0em; }\n" +
            // ============ РЕЙТИНГ ВВЕРХУ СПРАВА ============
            ".card__vote { position: absolute; bottom: auto; right: 0em; top: 0em; background: rgba(0, 0, 0, 0.6); font-weight: 700; color: #fff; border-radius: 0 0.34em 0 0.34em; line-height: 1.0; font-size: 1.4em; padding: 0.3em 0.5em; }\n" +
            // ============ ИКОНКИ ЛЕВЫЙ ВЕРХНИЙ УГОЛ ============
            ".card__icons { position: absolute; top: 2em; left: 0; right: auto; display: flex; justify-content: center; align-items: center; background: rgba(0, 0, 0, 0.6); color: #fff; border-radius: 0 0.5em 0.5em 0; padding: 0.3em; }\n" +
            ".card__icons-inner { background: rgba(0, 0, 0, 0); }\n" +
            // ============ МАРКЕР СТАТУСА ============
            ".card__marker { position: absolute; left: 0em; top: 4em; bottom: auto; background: rgba(0, 0, 0, 0.6); border-radius: 0 0.5em 0.5em 0; font-weight: 700; font-size: 1.0em; padding: 0.4em 0.6em; display: flex; align-items: center; line-height: 1.2; max-width: 12em; }\n" +
            ".card__marker > span { max-width: 12em; }\n" +
            // ============ РАССТОЯНИЕ И СКРУГЛЕНИЯ ============
            ".items-line.items-line--type-cards + .items-line.items-line--type-cards { margin-top: 1em; }\n" +
            ".card--small .card__view { margin-bottom: 2em; }\n" +
            ".items-line--type-cards { min-height: 18em; }\n" +
            "@media screen and (min-width: 580px) { .full-start-new { min-height: 80vh; display: flex; } }\n" +
            ".full-start__background.loaded { opacity: 0.8; }\n" +
            ".full-start__background.dim { opacity: 0.2; }\n" +
            ".full-review-add, .full-review, .extensions__item, .extensions__block-add, .search-source, .bookmarks-folder__layer, .bookmarks-folder__body, .card__img, .card__promo, .full-episode--next .full-episode__img:after, .full-episode__img img, .full-episode__body, .full-person__photo, .card-more__box, .full-start__button, .simple-button, .register { border-radius: 0.5em; }\n" +
            ".extensions__item.focus::after, .extensions__block-add.focus::after, .full-episode.focus::after, .full-review-add.focus::after, .card-parser.focus::after, .card-episode.focus .full-episode::after, .card-episode.hover .full-episode::after, .card.focus .card__view::after, .card.hover .card__view::after, .card-more.focus .card-more__box::after, .register.focus::after { border-radius: 1em; }\n" +
            ".search-source.focus, .simple-button.focus, .menu__item.focus, .menu__item.traverse, .menu__item.hover, .full-start__button.focus, .full-descr__tag.focus, .player-panel .button.focus, .full-person.selector.focus, .tag-count.selector.focus { border-radius: 0.5em; }\n" +
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
     * Анимации элементов
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
                ".extensions__item, .extensions__block-add, .full-review-add, .full-review, .tag-count, .full-person, .full-episode, .simple-button, .full-start__button, .items-cards .selector, .card-more, .explorer-card__head-img.selector, .card-episode { transform: scale(1); transition: transform 0.3s ease; }\n" +
                ".extensions__item.focus, .extensions__block-add.focus, .full-review-add.focus, .full-review.focus, .tag-count.focus, .full-person.focus, .full-episode.focus, .simple-button.focus, .full-start__button.focus, .items-cards .selector.focus, .card-more.focus, .explorer-card__head-img.selector.focus, .card-episode.focus { transform: scale(1.03); }\n" +
                ".menu__item { transition: transform 0.3s ease; }\n" +
                ".menu__item.focus { transform: translateX(-0.2em); }\n" +
                ".selectbox-item, .settings-folder, .settings-param { transition: transform 0.3s ease; }\n" +
                ".selectbox-item.focus, .settings-folder.focus, .settings-param.focus { transform: translateX(0.2em); }\n" +
                "</style>\n";
            $('body').append(animations_style);
        }
    }

    /**
     * Размер кнопок в карточке
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
     * Инициализирует плагин и создает меню в настройках
     */
    function initializePlugin() {
        // Установка значений по умолчанию
        if (!localStorage.getItem('lampa_ui_layout_animations')) {
            localStorage.setItem('lampa_ui_layout_animations', 'true');
        }
        if (!localStorage.getItem('lampa_ui_layout_custom_card')) {
            localStorage.setItem('lampa_ui_layout_custom_card', 'false');
        }   
        if (!localStorage.getItem('lampa_ui_layout_big_buttons')) {
            localStorage.setItem('lampa_ui_layout_big_buttons', 'false');
        }

        // Создание меню в настройках
        Lampa.SettingsApi.addComponent({
            component: "lampa_ui_layout",
            name: Lampa.Lang.translate('lampa_ui_layout'),
            icon: '<svg viewBox="0 0 512.00026 512" xmlns="http://www.w3.org/2000/svg"><path d="m491.238281 20.761719c-14.375-14.375-34.265625-21.890625-54.550781-20.625-20.289062 1.269531-39.078125 11.207031-51.550781 27.261719l-98.660157 127.007812-41.109374-41.109375c-12.015626-12.019531-27.996094-18.636719-44.988282-18.636719-16.996094 0-32.972656 6.617188-44.992187 18.636719l-142.363281 142.363281c-17.363282 17.363282-17.363282 45.617188 0 62.980469l180.335937 180.335937c8.679687 8.683594 20.085937 13.023438 31.488281 13.023438 11.40625 0 22.808594-4.339844 31.492188-13.023438l142.363281-142.363281c12.019531-12.019531 18.636719-27.996093 18.636719-44.992187 0-16.992188-6.617188-32.972656-18.636719-44.988282l-41.109375-41.109374 127.007812-98.660157c16.054688-12.472656 25.992188-31.261719 27.261719-51.550781 1.269531-20.292969-6.25-40.175781-20.625-54.550781zm-276.386719 456.722656-15.898437-15.898437 22.957031-22.957032c5.933594-5.9375 5.933594-15.558594 0-21.496094-5.933594-5.933593-15.558594-5.933593-21.492187 0l-22.957031 22.957032-10.152344-10.148438 44.210937-44.210937c5.9375-5.933594 5.9375-15.558594 0-21.492188-5.933593-5.9375-15.558593-5.9375-21.492187 0l-44.210938 44.210938-42.265625-42.265625 22.957031-22.957032c5.9375-5.9375 5.9375-15.558593 0-21.496093-5.933593-5.933594-15.558593-5.933594-21.492187 0l-22.957031 22.957031-10.152344-10.148438 44.210938-44.210937c5.9375-5.933594 5.9375-15.558594 0-21.492187-5.933594-5.9375-15.558594-5.9375-21.492188 0l-44.210938 44.210937-15.898437-15.898437c-5.511719-5.511719-5.511719-14.484376 0-19.996094l77.199219-77.195313 200.328125 200.328125-77.199219 77.199219c-5.511719 5.511719-14.480469 5.511719-19.992188 0zm118.6875-98.695313-200.328124-200.328124 18.175781-18.175782 200.328125 200.328125zm53.40625-67.167968c0 8.875-3.457031 17.222656-9.734374 23.496094l-4 4.003906-191.484376-191.480469-8.847656-8.847656 4.003906-4.003907c6.273438-6.277343 14.621094-9.730468 23.496094-9.730468s17.21875 3.453125 23.492188 9.730468l153.339844 153.335938c6.277343 6.277344 9.734374 14.621094 9.734374 23.496094zm94.578126-238.210938c-.726563 11.589844-6.398438 22.324219-15.570313 29.449219l-130.019531 101-27.796875-27.792969 101.003906-130.019531c7.125-9.171875 17.855469-14.847656 29.449219-15.570313 11.578125-.71875 22.945312 3.566407 31.15625 11.777344 8.210937 8.210938 12.503906 19.570313 11.777344 31.15625zm0 0" fill="currentColor" style="fill: rgb(255, 255, 255);"></path></svg>'
        });

        // Параметры настроек
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

        // Применяем все функции при инициализации
        applyUniversalStyles();
        applyAnimations();
        applyButtonSizing();
        translateSeriesStatuses();
    }

    // Ожидание загрузки приложения и инициализация плагина
    if (window.appready) {
        initializePlugin();
    } else {
        Lampa.Listener.follow('app', function(event) {
            if (event.type === 'ready') {
                initializePlugin();
            }
        });
    }

    // Регистрация плагина
    Lampa.Manifest.plugins = {
        name: 'lampa_ui_layout',
        version: '1.0.0',
        description: 'Улучшенный интерфейс Lampa'
    };

    window.lampa_ui_layout = lampa_ui_layout;
})();
