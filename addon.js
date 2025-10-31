'use strict';

function addonStart() {
    console.log('Plugin Manager started - simplified version');
    
    // Ждем полной загрузки Lampa
    if (typeof Lampa === 'undefined' || !Lampa.Settings || !Lampa.Settings.main) {
        setTimeout(addonStart, 500);
        return;
    }

    // Проверяем, не добавлен ли уже менеджер
    if (Lampa.Settings.main().render().find('[data-component="plugin_manager"]').length) {
        console.log('Plugin Manager already exists');
        return;
    }

    // Основной контейнер для настроек плагина
    var pluginHtml = createPluginHtml();
    
    // Добавляем в главное меню настроек
    Lampa.Settings.main(function() {
        var main = this.render();
        main.find('.settings-panel').append(pluginHtml);
        
        // Инициализируем обработчики после добавления
        initPluginHandlers();
        
        // Проверяем активные плагины при старте
        checkAndActivatePlugins();
        
        console.log('Plugin Manager initialized successfully');
    });
    
    // Обработчик готовности приложения
    Lampa.Listener.follow('app', function(e) {
        if (e.type === 'ready') {
            checkAndActivatePlugins();
        }
    });

    // Функция создания HTML для менеджера
    function createPluginHtml() {
        var html = $('<div></div>');
        
        // Заголовок с иконкой
        html.append(`
            <div class="settings-folder selector" data-component="plugin_manager" data-parent="1">
                <div class="settings-folder__icon">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <style type="text/css">
                                .st0{fill:#FFFFFF;}
                            </style>
                            <path class="st0" d="M432.531,229.906c-9.906,0-19.125,2.594-27.313,6.375v-51.656c0-42.938-34.922-77.875-77.859-77.875h-51.641
                                c3.781-8.156,6.375-17.375,6.375-27.281C282.094,35.656,246.438,0,202.625,0c-43.828,0-79.484,35.656-79.484,79.469
                                c0,9.906,2.594,19.125,6.359,27.281H77.875C34.938,106.75,0,141.688,0,184.625l0.047,23.828H0l0.078,33.781
                                c0,23.031,8.578,36.828,12.641,42.063c12.219,15.797,27.094,18.172,34.891,18.172c11.953,0,23.141-4.953,33.203-14.703
                                l0.906-0.422l1.516-2.141c1.391-1.359,6.328-5.484,14.016-5.5c16.344,0,29.656,13.297,29.656,29.672
                                c0,16.344-13.313,29.656-29.672,29.656c-7.672,0-12.609-4.125-14-5.5l-1.516-2.141l-0.906-0.422
                                c-10.062-9.75-21.25-14.703-33.203-14.703c-7.797,0-22.672,2.375-34.891,18.172c-4.063,5.234-12.641,19.031-12.641,42.063
                                v33.781l-0.078,0h0l0.047-23.828C0,141.688,34.938,106.75,77.875,106.75h51.656c-3.766,8.156-6.359,17.375-6.359,27.281
                                c0,43.828,35.656,79.484,79.484,79.484c9.906,0,17.406-2.484,27.281-6.375v51.656c0,42.938,34.922,77.859,77.859,77.859h51.641
                                c-3.781,8.156-6.375,17.375-6.375,27.281c0,43.828,35.656,79.484,79.484,79.484s79.484-35.656,79.484-79.484
                                c0-9.906-2.594-19.125-6.375-27.281h51.641c42.938,0,77.875-34.922,77.875-77.859v-51.656c-9.875-3.891-17.375-6.375-27.281-6.375
                                C512.031,309.406,476.375,273.75,432.531,229.906z M432.531,359.344c-35.844,0-65-29.156-65-65s29.156-65,65-65s65,29.156,65,65
                                S468.375,359.344,432.531,359.344z M202.625,78.531c-21.922,0-39.781,17.859-39.781,39.938s17.859,39.938,39.781,39.938
                                s39.781-17.859,39.781-39.938S224.547,78.531,202.625,78.531z M77.875,184.625c-21.922,0-39.781,17.859-39.781,39.938
                                c0,21.922,17.859,39.938,39.781,39.938s39.781-17.859,39.781-39.938C117.656,202.484,99.797,184.625,77.875,184.625z M77.875,314.969
                                c-21.922,0-39.781,17.859-39.781,39.938c0,21.922,17.859,39.938,39.781,39.938s39.781-17.859,39.781-39.938
                                C117.656,332.828,99.797,314.969,77.875,314.969z M432.531,443.875c-21.922,0-39.781,17.859-39.781,39.938
                                c0,21.922,17.859,39.938,39.781,39.938s39.781-17.859,39.781-39.938C472.312,461.734,454.453,443.875,432.531,443.875z
                                M507.875,443.875c-21.922,0-39.781,17.859-39.781,39.938c0,21.922,17.859,39.938,39.781,39.938s39.781-17.859,39.781-39.938
                                C547.656,461.734,529.797,443.875,507.875,443.875z M507.875,314.969c-21.922,0-39.781,17.859-39.781,39.938
                                c0,21.922,17.859,39.938,39.781,39.938s39.781-17.859,39.781-39.938C547.656,332.828,529.797,314.969,507.875,314.969z"/>
                        </g>
                    </svg>
                </div>
                <div class="settings-folder__name">Менеджер тем</div>
                <div class="settings-folder__icon-right"></div>
            </div>
        `);

        return html;
    }

    // Инициализация обработчиков событий
    function initPluginHandlers() {
        // Обработчик клика на менеджер
        $(document).on('hover:enter', '[data-component="plugin_manager"]', function(e) {
            e.preventDefault();
            showPluginPanel();
        });
    }

    // Показать панель управления плагином
    function showPluginPanel() {
        var content = createPluginPanel();
        
        // Показываем модальное окно настроек
        var modal = $('<div class="simple-settings settings-layer--top settings-layer--keyboard">' +
            '<div class="settings-panel settings-panel--simple">' +
                '<div class="settings-panel__left">' +
                    '<div class="selector">' + content + '</div>' +
                '</div>' +
            '</div>' +
        '</div>');

        Lampa.Settings.update({
            title: 'Менеджер тем',
            component: 'plugin_manager_panel',
            html: modal
        });
    }

    // Создание содержимого панели плагина
    function createPluginPanel() {
        var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
        var pluginName = 'DrXaos Themes';
        var pluginKey = 'drxaos_themes_enabled';
        var isEnabled = Lampa.Storage.get(pluginKey, 'false') === 'true';
        
        var html = `
            <div class="settings-folder selector-item ${isEnabled ? 'active' : ''}" data-action="toggle_plugin">
                <div class="settings-folder__icon">
                    <i class="icon-theme"></i>
                </div>
                <div class="settings-folder__name">${pluginName}</div>
                <div class="settings-folder__status ${isEnabled ? 'active' : ''}"></div>
                <div class="settings-folder__description">Темы интерфейса от DrXaos</div>
            </div>
            <div class="simple-settings__footer">
                <div class="selector-item active" data-action="close">Закрыть</div>
            </div>
        `;
        
        return html;
    }

    // Переключение состояния плагина
    function togglePlugin() {
        var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
        var pluginName = 'DrXaos Themes';
        var pluginKey = 'drxaos_themes_enabled';
        var isEnabled = Lampa.Storage.get(pluginKey, 'false') === 'true';
        
        if (isEnabled) {
            // Отключаем плагин
            disablePlugin(pluginUrl, pluginName);
            Lampa.Storage.set(pluginKey, 'false');
            console.log('DrXaos Themes disabled');
        } else {
            // Включаем плагин
            enablePlugin(pluginUrl, pluginName);
            Lampa.Storage.set(pluginKey, 'true');
            console.log('DrXaos Themes enabled');
        }
        
        // Обновляем интерфейс
        updatePluginUI();
        
        // Перезагружаем настройки
        Lampa.Settings.update();
    }

    // Включение плагина
    function enablePlugin(url, name) {
        // Добавляем в список активных плагинов
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        try {
            activePlugins = JSON.parse(activePlugins);
            if (!activePlugins.includes(url)) {
                activePlugins.push(url);
                Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
            }
        } catch(e) {
            console.log('Error parsing active plugins', e);
        }
        
        // Загружаем скрипт
        loadPluginScript(url, name, true);
    }

    // Отключение плагина
    function disablePlugin(url, name) {
        // Удаляем из списка активных плагинов
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        try {
            activePlugins = JSON.parse(activePlugins);
            var index = activePlugins.indexOf(url);
            if (index > -1) {
                activePlugins.splice(index, 1);
                Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
            }
        } catch(e) {
            console.log('Error parsing active plugins', e);
        }
        
        // Удаляем скрипт
        removePluginScript(url);
        
        // Перезагружаем страницу для полного отключения
        setTimeout(function() {
            location.reload();
        }, 500);
    }

    // Загрузка скрипта плагина
    function loadPluginScript(url, name, isPlugin) {
        console.log('Loading plugin:', name, 'URL:', url);
        
        // Проверяем, не загружен ли уже
        if (document.querySelector('script[src="' + url + '"]')) {
            console.log('Plugin already loaded:', name);
            return;
        }
        
        // Создаем скрипт
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = false;
        
        script.onload = function() {
            console.log('Plugin loaded successfully:', name);
            
            // Вызываем инициализацию, если плагин ее поддерживает
            if (typeof window.addonStart === 'function') {
                try {
                    window.addonStart();
                } catch(e) {
                    console.log('Plugin init error:', e);
                }
            }
            
            // Обновляем интерфейс Lampa
            if (typeof Lampa !== 'undefined') {
                Lampa.Listener.send('plugins', {type: 'updated'});
                Lampa.Settings.update();
            }
        };
        
        script.onerror = function() {
            console.error('Failed to load plugin:', name, url);
            // Удаляем из активных при ошибке
            disablePlugin(url, name);
        };
        
        // Добавляем в head
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(script);
    }

    // Удаление скрипта плагина
    function removePluginScript(url) {
        // Находим и удаляем script tag
        var scripts = document.querySelectorAll('script[src="' + url + '"]');
        scripts.forEach(function(script) {
            script.parentNode.removeChild(script);
        });
        
        console.log('Plugin script removed:', url);
    }

    // Обновление UI плагина
    function updatePluginUI() {
        var pluginKey = 'drxaos_themes_enabled';
        var isEnabled = Lampa.Storage.get(pluginKey, 'false') === 'true';
        
        // Обновляем статус в DOM
        $(document).find('[data-action="toggle_plugin"]').each(function() {
            $(this).toggleClass('active', isEnabled);
            var status = $(this).find('.settings-folder__status');
            status.toggleClass('active', isEnabled);
            
            var nameEl = $(this).find('.settings-folder__name');
            if (isEnabled) {
                nameEl.html(nameEl.html().replace(' ✓', '')).append(' ✓');
            } else {
                nameEl.find(' ✓').remove();
            }
        });
    }

    // Проверка и активация плагинов при старте
    function checkAndActivatePlugins() {
        var pluginKey = 'drxaos_themes_enabled';
        var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
        
        // Проверяем storage
        var isEnabled = Lampa.Storage.get(pluginKey, 'false') === 'true';
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        
        try {
            activePlugins = JSON.parse(activePlugins);
            var shouldBeActive = isEnabled && activePlugins.includes(pluginUrl);
            
            if (shouldBeActive && !document.querySelector('script[src="' + pluginUrl + '"]')) {
                // Плагин должен быть активен, но не загружен - загружаем
                enablePlugin(pluginUrl, 'DrXaos Themes');
            } else if (!isEnabled && document.querySelector('script[src="' + pluginUrl + '"]')) {
                // Плагин отключен, но загружен - удаляем
                disablePlugin(pluginUrl, 'DrXaos Themes');
            }
        } catch(e) {
            console.log('Error checking plugins', e);
        }
    }

    // Делегирование событий для панели плагинов
    $(document).on('hover:enter', '[data-action="toggle_plugin"]', function(e) {
        e.preventDefault();
        togglePlugin();
    });
    
    $(document).on('hover:enter', '[data-action="close"]', function(e) {
        e.preventDefault();
        Lampa.Settings.update({
            title: 'Настройки',
            component: 'main',
            html: ''
        });
    });
}

// Запуск плагина после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addonStart);
} else {
    addonStart();
}

// Дополнительная проверка через интервал
var initCheck = setInterval(function() {
    if (typeof Lampa !== 'undefined' && Lampa.Settings && Lampa.Settings.main) {
        clearInterval(initCheck);
        if (typeof addonStart === 'function') {
            addonStart();
        }
    }
}, 200);

// Очистка интервала при загрузке
window.addEventListener('load', function() {
    clearInterval(initCheck);
});
