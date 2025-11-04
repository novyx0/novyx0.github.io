(function() {
    'use strict';

    // Проверка версии
    if (!Lampa.Manifest || Lampa.Manifest.app_digital < 300) {
        console.log('lampa_ui_layout требует Lampa 3.0+');
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
     * Главные CSS стили с !important
     */
    function applyGlobalStyles() {
        var styles = `
        <style id="lampa_ui_global_styles">
            :root {
                --card-year-z: 20 !important;
                --card-rate-z: 19 !important;
            }

            /* КРИТИЧЕСКОЕ ПОЗИЦИОНИРОВАНИЕ */
            .card__view {
                position: relative !important;
            }

            /* Год - внизу справа */
            .card__age {
                position: fixed !important;
                z-index: 1000 !important;
            }

            /* Перехватываем все рейтинги */
            [class*="rate"] {
                position: relative !important;
                z-index: 5 !important;
            }

            /* Рейтинг IMDb, TMDB, Кинопоиск */
            .full-start__rate {
                position: relative !important;
                z-index: 5 !important;
                border-radius: 0.25em !important;
                padding: 0.3em !important;
                background-color: rgba(0, 0, 0, 0.3) !important;
            }

            /* Иконки */
            .card__icons {
                position: relative !important;
                z-index: 15 !important;
            }

            /* Базовые скругления */
            .card__img {
                border-radius: 0.5em !important;
                overflow: hidden !important;
            }

            .card__view {
                border-radius: 0.5em !important;
                overflow: hidden !important;
            }

            .card.focus .card__view::after {
                border-radius: 0.8em !important;
            }

            /* Чекбоксы */
            .selectbox-item__checkbox {
                border-radius: 100% !important;
            }

            /* Текст карточки */
            .card__title {
                display: -webkit-box !important;
                -webkit-line-clamp: 2 !important;
                -webkit-box-orient: vertical !important;
                overflow: hidden !important;
            }

            /* Анимации и фокус */
            .card {
                transition: transform 0.3s ease !important;
            }

            .card.focus {
                transform: scale(1.03) !important;
            }

            /* Тип контента - скрыть */
            .card__type {
                display: none !important;
            }

            /* Меню слева */
            .menu__item.focus {
                border-radius: 0 0.5em 0.5em 0 !important;
            }

            /* Спецэффекты кнопок */
            .simple-button.focus,
            .full-start__button.focus {
                border-radius: 0.5em !important;
                transform: scale(1.03) !important;
            }

            .simple-button {
                transition: all 0.3s ease !important;
            }

            .full-start__button {
                transition: all 0.3s ease !important;
            }

            /* Эпизоды */
            .full-episode.focus {
                transform: scale(1.03) !important;
            }

            .full-episode__img img {
                border-radius: 0.5em !important;
            }

            /* Промо видео */
            .card__promo {
                border-radius: 0.5em !important;
            }

            /* Расстояние между рядами */
            .items-line.items-line--type-cards {
                margin-top: 1em !important;
            }

            /* Фокус элементов */
            .selector.focus {
                outline: none !important;
            }

            /* Мобильная адаптация */
            @media screen and (max-width: 480px) {
                .card__title {
                    font-size: 0.9em !important;
                }
                
                .card__view {
                    min-height: 200px !important;
                }
            }
        </style>
        `;

        $('#lampa_ui_global_styles').remove();
        $('body').append(styles);
    }

    /**
     * Модульное переопределение через Lampa.Maker.map
     */
    function applyModularOverrides() {
        try {
            // Переопределяем модуль Style для Card
            if (Lampa.Maker && Lampa.Maker.map && Lampa.Maker.map('Card')) {
                var CardStyle = Lampa.Maker.map('Card').Style;
                if (CardStyle) {
                    var originalRender = CardStyle.onCreateAndAppend || function(){};
                    CardStyle.onCreateAndAppend = function() {
                        if (typeof originalRender === 'function') {
                            originalRender.call(this);
                        }
                        // Добавляем дополнительные стили к карточке
                        if (this.render && this.render.node) {
                            $(this.render.node).css({
                                'border-radius': '0.5em',
                                'overflow': 'hidden'
                            });
                        }
                    };
                }
            }
        } catch(e) {
            console.log('Lampa.Maker.map недоступен');
        }
    }

    /**
     * Перехват событий создания карточек
     */
    function interceptCardCreation() {
        // Слушаем событие создания карточек
        Lampa.Listener.follow('card', function(e) {
            if (e.type === 'created') {
                var card = e.object;
                if (card && card.node) {
                    // Добавляем стили напрямую к DOM
                    card.node.style.borderRadius = '0.5em';
                    card.node.style.overflow = 'hidden';
                    card.node.style.transition = 'transform 0.3s ease';
                }
            }
        });
    }

    /**
     * Инициализация плагина
     */
    function initialize() {
        // Значения по умолчанию
        localStorage.setItem('lampa_ui_layout_animations', 'true');
        localStorage.setItem('lampa_ui_layout_big_buttons', 'false');

        // Добавляем компонент в настройки
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
                name: 'Большие кнопки',
                description: 'На мобильных - только иконки'
            }
        });

        // Применяем все изменения
        applyGlobalStyles();
        applyModularOverrides();
        interceptCardCreation();
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

})();
