(function() {
    'use strict';

    // Основний об'єкт плагіна
    var lampa_ui_layout = {
        name: 'lampa_ui_layout',
        version: '1.0.0',
        settings: {}
    };

    /**
     * Додає базові стилі для карточок
     */
    function applyUniversalStyles() {
        // Шаблон карточки
        Lampa.Template.add('card', "<div class=\"card selector layer--visible layer--render\">\n    <div class=\"card__view\">\n        <img src=\"./img/img_load.svg\" class=\"card__img\" />\n\n        <div class=\"card__icons\">\n            <div class=\"card__icons-inner\">\n                \n            </div>\n        </div>\n    <div class=\"card__age\">{release_year}</div>\n    </div>\n\n    <div class=\"card__title\">{title}</div>\n    </div>");

        // CSS стилі
        var universal_styles = "<style id=\"lampa_ui_universal_styles\">\n" +
            // Заголовок карточки
            ".card__title { height: 3.6em; text-overflow: ellipsis; -o-text-overflow: ellipsis; -webkit-line-clamp: 3; line-clamp: 3; }\n" +
            // Рік випуску - правий нижній кут
            ".card__age { position: absolute; right: 0em; bottom: 0em; z-index: 10; background: rgba(0, 0, 0, 0.6); color: #ffffff; font-weight: 700; padding: 0.5em 0.7em; border-radius: 0.48em 0 0.48em 0; line-height: 1.0; font-size: 1.15em; }\n" +
            // Приховуємо іконки закладок
            ".card__icons { display: none; }\n" +
            // Приховуємо рейтинг
            ".card__vote { display: none; }\n" +
            // Приховуємо статус закладок
            ".card__marker { display: none; }\n" +
            // Скругления карточок
            ".card__img, .card__promo { border-radius: 0.5em; }\n" +
            ".card.focus .card__view::after, .card.hover .card__view::after { border-radius: 1em; }\n" +
            "</style>\n";

        Lampa.Template.add('universal_styles_css', universal_styles);
        $('body').append(Lampa.Template.get('universal_styles_css', {}, true));
    }

    /**
     * Автоматично приховує мітку "TV"
     */
    function autoTranslateTVLabels() {
        var tv_translate_style = "<style id=\"lampa_ui_tv_translate\">\n" +
            ".card__type { display: none !important; }\n" +
            ".card--tv .card__type { display: none !important; }\n" +
            ".card__type::after { display: none !important; }\n" +
            "</style>\n";
        $('#lampa_ui_tv_translate').remove();
        $('body').append(tv_translate_style);
    }

    /**
     * Ініціалізує плагін
     */
    function initializePlugin() {
        applyUniversalStyles();
        autoTranslateTVLabels();
    }

    // Очікування завантаження додатку та ініціалізація плагіна
    if (window.appready) {
        initializePlugin();
    } else {
        Lampa.Listener.follow('app', function(event) {
            if (event.type === 'ready') {
                initializePlugin();
            }
        });
    }

    // Реєстрація плагіна
    Lampa.Manifest.plugins = {
        name: 'lampa_ui_layout',
        version: '1.0.0',
        description: 'Мінімалістичний інтерфейс Lampa'
    };

    window.lampa_ui_layout = lampa_ui_layout;
})();
