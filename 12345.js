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
     * Глобальные CSS стили
     */
    function applyGlobalStyles() {
        var styles = `
        <style id="lampa_ui_global_styles">
            /* Чекбоксы */
            .selectbox-item__checkbox { border-radius: 100%; }
            .selectbox-item--checked .selectbox-item__checkbox { background: #ccc; }

            /* Рейтинги */
            .full-start-new__rate-line .full-start__pg { font-size: 1em; background: #fff; color: #000; }
            .full-start__rate { border-radius: 0.25em; padding: 0.3em; background-color: rgba(0, 0, 0, 0.3); }

            /* Скругления */
            .card__img, .card__promo, .full-episode__img img, .full-episode__body, 
            .full-person__photo, .card-more__box, .full-start__button, .simple-button, 
            .register, .extensions__item, .extensions__block-add, .search-source, 
            .full-review-add, .full-review, .bookmarks-folder__layer, .bookmarks-folder__body { 
                border-radius: 0.5em; 
            }

            .card.focus .card__view::after, .card.hover .card__view::after, 
            .card-more.focus .card-more__box::after, .full-episode.focus::after, 
            .extensions__item.focus::after, .full-review-add.focus::after, 
            .register.focus::after { 
                border-radius: 1em; 
            }

            .search-source.focus, .simple-button.focus, .menu__item.focus, 
            .full-start__button.focus, .full-descr__tag.focus, .full-person.selector.focus, 
            .tag-count.selector.focus { 
                border-radius: 0.5em; 
            }

            /* Тип контента - скрыть */
            .card__type { display: none; }

            /* Меню */
            .menu__item.focus { border-radius: 0 0.5em 0.5em 0; }
            .menu__list { padding-left: 0em; }
            .menu__item.focus .menu__ico { filter: invert(1); }

            /* Фон */
            .full-start__background.loaded { opacity: 0.8; }
            .full-start__background.dim { opacity: 0.2; }

            /* Расстояния */
            .items-line.items-line--type-cards + .items-line.items-line--type-cards { margin-top: 1em; }
            .card--small .card__view { margin-bottom: 2em; }
            .items-line--type-cards { min-height: 18em; }

            @media screen and (max-width: 480px) { 
                .full-start-new__head, .full-start-new__title, .full-start__title-original, 
                .full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, 
                .full-start-new__buttons, .full-start-new__details, .full-start-new__tagline { 
                    justify-content: center; 
                    text-align: center; 
                }
                .full-start__title-original { max-width: 100%; }
            }

            @media screen and (min-width: 580px) { 
                .full-start-new { min-height: 80vh; display: flex; } 
            }

            /* КРИТИЧЕСКИЙ СТИЛЬ для года на карточке */
            .card__age-badge {
                position: absolute !important;
                bottom: 0.6em !important;
                right: 0.6em !important;
                background: rgba(0, 0, 0, 0.7) !important;
                color: #ffffff !important;
                font-weight: 700 !important;
                padding: 0.5em 0.7em !important;
                border-radius: 0.5em !important;
                line-height: 1.0 !important;
                font-size: 1.1em !important;
                z-index: 20 !important;
                pointer-events: none !important;
            }

            .card__view {
                position: relative !important;
            }
        </style>
        `;

        $('#lampa_ui_global_styles').remove();
        $('body').append(styles);
    }

    /**
     * Перехватываем создание карточек и добавляем год в угол
     */
    function injectYearBadges() {
        // Используем MutationObserver для отслеживания новых карточек
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                $(mutation.addedNodes).each(function() {
                    var $node = $(this);
                    
                    // Ищем карточки, в которых есть год, но нет badge
                    $node.find('.card__view').each(function() {
                        var $cardView = $(this);
                        var $card = $cardView.closest('.card');
                        
                        // Проверяем, есть ли уже badge
                        if (!$cardView.find('.card__age-badge').length) {
                            var year = $card.data('release_year') || 
                                      $card.find('[data-release-year]').data('release-year') ||
                                      '';
                            
                            // Извлекаем год из текста внутри карточки
                            var text = $card.text();
                            var yearMatch = text.match(/\b(19|20)\d{2}\b/);
                            if (yearMatch) {
                                year = yearMatch[0];
                            }
                            
                            if (year) {
                                $cardView.append(
                                    '<div class="card__age-badge">' + year + '</div>'
                                );
                            }
                        }
                    });
                    
                    // Если сам элемент является карточкой
                    if ($node.hasClass('card')) {
                        var $cardView = $node.find('.card__view');
                        if ($cardView.length && !$cardView.find('.card__age-badge').length) {
                            var year = $node.data('release_year') || '';
                            var text = $node.text();
                            var yearMatch = text.match(/\b(19|20)\d{2}\b/);
                            if (yearMatch) {
                                year = yearMatch[0];
                            }
                            
                            if (year) {
                                $cardView.append(
                                    '<div class="card__age-badge">' + year + '</div>'
                                );
                            }
                        }
                    }
                });
            });
        });

        // Конфигурация observer
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });

        return observer;
    }

    /**
     * Анимации
     */
    function applyAnimations() {
        var enabled = localStorage.getItem('lampa_ui_layout_animations') !== 'false';
        $('#lampa_ui_animations').remove();
        if (enabled) {
            var styles = `
            <style id="lampa_ui_animations">
                .card { transform: scale(1); transition: transform 0.3s ease; }
                .card.focus { transform: scale(1.03); }
                .torrent-item, .online-prestige { transform: scale(1); transition: transform 0.3s ease; }
                .torrent-item.focus, .online-prestige.focus { transform: scale(1.01); }
                .extensions__item, .extensions__block-add, .full-review-add, .full-review, 
                .tag-count, .full-person, .full-episode, .simple-button, .full-start__button { 
                    transform: scale(1); 
                    transition: transform 0.3s ease; 
                }
                .extensions__item.focus, .extensions__block-add.focus, .full-review-add.focus, 
                .full-review.focus, .tag-count.focus, .full-person.focus, .full-episode.focus, 
                .simple-button.focus, .full-start__button.focus { 
                    transform: scale(1.03); 
                }
                .menu__item { transition: transform 0.3s ease; }
                .menu__item.focus { transform: translateX(-0.2em); }
                .selectbox-item, .settings-folder, .settings-param { transition: transform 0.3s ease; }
                .selectbox-item.focus, .settings-folder.focus, .settings-param.focus { transform: translateX(0.2em); }
            </style>
            `;
            $('body').append(styles);
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
                .full-start-new__buttons .full-start__button:not(.focus) span { display: inline; }
                @media screen and (max-width: 580px) { 
                    .full-start-new__buttons { overflow: auto; } 
                    .full-start-new__buttons .full-start__button:not(.focus) span { display: none; } 
                }
            </style>
            `;
            $('body').append(styles);
        }
    }

    /**
     * Переводы статусов
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
        localStorage.setItem('lampa_ui_layout_animations', 'true');
        localStorage.setItem('lampa_ui_layout_big_buttons', 'false');

        // Компонент настроек
        Lampa.SettingsApi.addComponent({
            component: "lampa_ui_layout",
            name: Lampa.Lang.translate('lampa_ui_layout'),
            icon: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512ZM256 448C329.4 448 400 377.4 400 304C400 230.6 329.4 160 256 160C182.6 160 112 230.6 112 304C112 377.4 182.6 448 256 448Z" fill="currentColor"/></svg>'
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
            onChange: function() { applyAnimations(); }
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
            onChange: function() { applyButtonSizing(); }
        });

        // Применяем
        applyGlobalStyles();
        applyAnimations();
        applyButtonSizing();
        translateSeriesStatuses();
        injectYearBadges();
    }

    // Запуск
    if (window.appready) {
        initialize();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type === 'ready') {
                initialize();
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
