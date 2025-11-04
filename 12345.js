(function() {
    'use strict';

    // Проверка версии Lampa 3.0+
    if (!Lampa.Manifest || Lampa.Manifest.app_digital < 300) {
        console.log('lampa_ui_layout: требуется Lampa 3.0+');
        return;
    }

    Lampa.Lang.add({
        lampa_ui_layout: {
            ru: "Улучшенный интерфейс",
            en: "Enhanced UI",
            uk: "Покращений інтерфейс"
        }
    });

    /**
     * Применяем стили через модульную систему
     */
    function applyModularStyles() {
        var universal_styles = `
        <style id="lampa_ui_universal_styles">
            /* Адаптация под мобильные */
            @media screen and (max-width: 480px) {
                .full-start-new__head, .full-start-new__title, 
                .full-start__title-original, .full-start__rate,
                .full-start-new__reactions, .full-start-new__rate-line,
                .full-start-new__buttons, .full-start-new__details,
                .full-start-new__tagline {
                    justify-content: center;
                    text-align: center;
                }
            }

            /* Круглые чекбоксы */
            .selectbox-item__checkbox {
                border-radius: 100%;
            }
            .selectbox-item--checked .selectbox-item__checkbox {
                background: #ccc;
            }

            /* Рейтинг в карточке */
            .full-start-new__rate-line .full-start__pg {
                font-size: 1em;
                background: #fff;
                color: #000;
            }
            .full-start__rate {
                border-radius: 0.25em;
                padding: 0.3em;
                background-color: rgba(0, 0, 0, 0.3);
            }

            /* Заголовок карточки */
            .card__title {
                height: 3.6em;
                text-overflow: ellipsis;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            /* Год выпуска - правый нижний угол */
            .card__age {
                position: absolute !important;
                right: 0.5em !important;
                bottom: 0.5em !important;
                left: auto !important;
                top: auto !important;
                z-index: 10;
                background: rgba(0, 0, 0, 0.6);
                color: #ffffff;
                font-weight: 700;
                padding: 0.4em 0.6em;
                border-radius: 0.48em;
                line-height: 1.0;
                font-size: 1.0em;
            }

            /* Рейтинг - правый верхний угол */
            .card__vote {
                position: absolute !important;
                right: 0.5em !important;
                top: 0.5em !important;
                bottom: auto !important;
                left: auto !important;
                background: rgba(0, 0, 0, 0.6);
                font-weight: 700;
                color: #fff;
                border-radius: 0.34em;
                line-height: 1.0;
                font-size: 1.4em;
                padding: 0.3em 0.5em;
            }

            /* Иконки закладок - левый верхний угол */
            .card__icons {
                position: absolute !important;
                top: 0.5em !important;
                left: 0.5em !important;
                right: auto !important;
                bottom: auto !important;
                display: flex;
                justify-content: center;
                background: rgba(0, 0, 0, 0.6);
                color: #fff;
                border-radius: 0.5em;
                padding: 0.3em;
            }
            .card__icons-inner {
                background: rgba(0, 0, 0, 0);
            }

            /* Маркер статуса */
            .card__marker {
                position: absolute !important;
                left: 0.5em !important;
                top: 3em !important;
                bottom: auto !important;
                right: auto !important;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 0.5em;
                font-weight: 700;
                font-size: 1.0em;
                padding: 0.4em 0.6em;
                display: flex;
                align-items: center;
                line-height: 1.2;
                max-width: 12em;
            }

            /* Скрываем тип контента */
            .card__type {
                display: none !important;
            }

            /* Уменьшаем расстояние между рядами */
            .items-line.items-line--type-cards + .items-line.items-line--type-cards {
                margin-top: 1em;
            }
            .card--small .card__view {
                margin-bottom: 2em;
            }
            .items-line--type-cards {
                min-height: 18em;
            }

            /* Скругления */
            .card__img, .card__promo, .full-episode__img img,
            .full-episode__body, .full-person__photo, .card-more__box,
            .full-start__button, .simple-button {
                border-radius: 0.5em;
            }

            .card.focus .card__view::after,
            .card.hover .card__view::after {
                border-radius: 1em;
            }

            .simple-button.focus, .menu__item.focus,
            .full-start__button.focus {
                border-radius: 0.5em;
            }

            /* Меню слева */
            .menu__item.focus {
                border-radius: 0 0.5em 0.5em 0;
            }
            .menu__list {
                padding-left: 0em;
            }
            .menu__item.focus .menu__ico {
                filter: invert(1);
            }

            /* Фон в карточке */
            .full-start__background.loaded {
                opacity: 0.8;
            }
            .full-start__background.dim {
                opacity: 0.2;
            }
        </style>
        `;

        $('#lampa_ui_universal_styles').remove();
        $('body').append(universal_styles);
    }

    /**
     * Анимации через CSS
     */
    function applyAnimations() {
        var enabled = localStorage.getItem('lampa_ui_layout_animations') === 'true';
        $('#lampa_ui_animations').remove();
        
        if (enabled) {
            var animations = `
            <style id="lampa_ui_animations">
                .card {
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }
                .card.focus {
                    transform: scale(1.03);
                }
                .torrent-item, .online-prestige {
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }
                .torrent-item.focus, .online-prestige.focus {
                    transform: scale(1.01);
                }
                .full-episode, .simple-button, .full-start__button {
                    transform: scale(1);
                    transition: transform 0.3s ease;
                }
                .full-episode.focus, .simple-button.focus, .full-start__button.focus {
                    transform: scale(1.03);
                }
                .menu__item {
                    transition: transform 0.3s ease;
                }
                .menu__item.focus {
                    transform: translateX(-0.2em);
                }
            </style>
            `;
            $('body').append(animations);
        }
    }

    /**
     * Размер кнопок
     */
    function applyButtonSizing() {
        var enabled = localStorage.getItem('lampa_ui_layout_big_buttons') === 'true';
        $('#lampa_ui_big_buttons').remove();
        
        if (enabled) {
            var styles = `
            <style id="lampa_ui_big_buttons">
                .full-start-new__buttons .full-start__button:not(.focus) span {
                    display: inline;
                }
                @media screen and (max-width: 580px) {
                    .full-start-new__buttons {
                        overflow: auto;
                    }
                    .full-start-new__buttons .full-start__button:not(.focus) span {
                        display: none;
                    }
                }
            </style>
            `;
            $('body').append(styles);
        }
    }

    /**
     * Перевод статусов сериалов
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
     * Инициализация
     */
    function initialize() {
        // Значения по умолчанию
        if (!localStorage.getItem('lampa_ui_layout_animations')) {
            localStorage.setItem('lampa_ui_layout_animations', 'true');
        }
        if (!localStorage.getItem('lampa_ui_layout_big_buttons')) {
            localStorage.setItem('lampa_ui_layout_big_buttons', 'false');
        }

        // Настройки
        Lampa.SettingsApi.addComponent({
            component: "lampa_ui_layout",
            name: Lampa.Lang.translate('lampa_ui_layout'),
            icon: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m491.238281 20.761719c-14.375-14.375-34.265625-21.890625-54.550781-20.625-20.289062 1.269531-39.078125 11.207031-51.550781 27.261719l-98.660157 127.007812-41.109374-41.109375c-12.015626-12.019531-27.996094-18.636719-44.988282-18.636719-16.996094 0-32.972656 6.617188-44.992187 18.636719l-142.363281 142.363281c-17.363282 17.363282-17.363282 45.617188 0 62.980469l180.335937 180.335937c8.679687 8.683594 20.085937 13.023438 31.488281 13.023438 11.40625 0 22.808594-4.339844 31.492188-13.023438l142.363281-142.363281c12.019531-12.019531 18.636719-27.996093 18.636719-44.992187 0-16.992188-6.617188-32.972656-18.636719-44.988282l-41.109375-41.109374 127.007812-98.660157c16.054688-12.472656 25.992188-31.261719 27.261719-51.550781 1.269531-20.292969-6.25-40.175781-20.625-54.550781zm0 0" fill="currentColor"/></svg>'
        });

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
            onChange: function() {
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
            onChange: function() {
                applyButtonSizing();
            }
        });

        // Применяем стили
        applyModularStyles();
        applyAnimations();
        applyButtonSizing();
        translateSeriesStatuses();
    }

    // Запуск после инициализации Lampa
    if (window.appready) {
        initialize();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type === 'ready') initialize();
        });
    }

})();
