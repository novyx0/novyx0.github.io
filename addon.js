'use strict';

function addonStart() {
    // Основная функция запуска плагина
    console.log('Plugin Manager started');

    // Проверяем наличие Settings API
    if (typeof Lampa.Settings !== 'undefined' && Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="plugin_manager"]').length) {
        // Создаем основную секцию настроек
        var html = $('<div></div>');
        
        // Заголовок плагина
        html.append(`
            <div class="settings-folder selector" data-component="plugin_manager">
                <div class="settings-folder__icon">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="256px" height="256px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
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
                <div class="settings-folder__name">Менеджер плагинов</div>
                <div class="settings-folder__icon-right"></div>
            </div>
        `);

        // Функция для создания элемента списка плагинов
        function createPluginItem(url, name, author, category, index) {
            var pluginKey = 'plugin_' + category + '_' + index;
            return `
                <div class="settings-folder selector-item" data-url="${url}" data-name="${name}" data-key="${pluginKey}">
                    <div class="settings-folder__icon">
                        <i class="icon-${category === 'interface' ? 'interface' : 'plugin'}"></i>
                    </div>
                    <div class="settings-folder__name">${name}</div>
                    <div class="settings-folder__status toggle-${Lampa.Storage.get(pluginKey, '0')}"></div>
                    <div class="settings-folder__description">Плагин ${category === 'interface' ? 'интерфейса' : 'расширения'}</div>
                </div>
            `;
        }

        // Основной контейнер для плагинов
        var pluginContainer = $('<div class="simple-settings__content"></div>');

        // Только категория "Интерфейс" с твоим плагином
        var interfacePlugins = [
            {
                url: 'https://novyx0.github.io/my-plugins/drxaos_themes.js',
                name: 'DrXaos Themes',
                author: '@novyx0',
                category: 'interface'
            }
        ];

        // Добавляем плагины интерфейса
        interfacePlugins.forEach(function(plugin, index) {
            var itemHtml = createPluginItem(plugin.url, plugin.name, plugin.author, plugin.category, index);
            pluginContainer.append(itemHtml);
        });

        // Обработчик клика на раздел "Менеджер плагинов"
        html.find('[data-component="plugin_manager"]').on('hover:enter', function() {
            Lampa.Settings.main().render().find('.settings-panel').html(`
                <div class="about">
                    <div class="selector">` + pluginContainer.html() + `</div>
                </div>
            `);

            // Обработчики для каждого плагина
            pluginContainer.find('.selector-item').on('hover:enter', function(e) {
                var url = $(this).data('url');
                var name = $(this).data('name');
                var pluginKey = $(this).data('key');
                var currentValue = Lampa.Storage.get(pluginKey, '0');

                // Переключаем состояние
                var newValue = currentValue === '0' ? '1' : '0';
                Lampa.Storage.set(pluginKey, newValue);

                // Активируем или деактивируем плагин
                if (newValue === '1') {
                    itemON(url, name, 'Менеджер плагинов', name, 0);
                    $(this).find('.settings-folder__status').removeClass('toggle-0').addClass('toggle-1');
                    $(this).find('.settings-folder__name').append(' ✓');
                } else {
                    var pluginToRemoveUrl = url;
                    deletePlugin(pluginToRemoveUrl, 0);
                    $(this).find('.settings-folder__status').removeClass('toggle-1').addClass('toggle-0');
                    $(this).find('.settings-folder__name').find(' ✓').remove();
                }

                // Обновляем интерфейс
                updateInterface();
            });
        });

        // Функция активации плагина
        function itemON(url, name, source, type, nthChildIndex) {
            console.log('Installing plugin:', name, 'from:', url);
            
            // Добавляем в storage список активных плагинов
            var activePlugins = Lampa.Storage.get('active_plugins', '[]');
            activePlugins = JSON.parse(activePlugins);
            if (!activePlugins.includes(url)) {
                activePlugins.push(url);
                Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
            }

            // Загружаем скрипт динамически
            if (window.addPlugin) {
                window.addPlugin(url);
            } else {
                // Fallback: создаем script tag
                var script = document.createElement('script');
                script.src = url;
                script.onload = function() {
                    console.log('Plugin loaded:', name);
                    if (typeof addonStart === 'function') {
                        addonStart();
                    }
                };
                document.head.appendChild(script);
            }

            // Показываем прогресс загрузки (если есть)
            if (window.showPluginProgress) {
                window.showPluginProgress(name, 100);
            }
        }

        // Функция удаления плагина
        function deletePlugin(url, nthChildIndex) {
            console.log('Removing plugin:', url);
            
            // Удаляем из storage
            var activePlugins = Lampa.Storage.get('active_plugins', '[]');
            activePlugins = JSON.parse(activePlugins);
            var index = activePlugins.indexOf(url);
            if (index > -1) {
                activePlugins.splice(index, 1);
                Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
            }

            // Перезагружаем страницу для полного удаления
            if (window.removePlugin) {
                window.removePlugin(url);
            } else {
                // Fallback: перезагрузка
                setTimeout(function() {
                    location.reload();
                }, 1000);
            }
        }

        // Функция обновления интерфейса
        function updateInterface() {
            // Перерисовываем плагины с актуальными статусами
            pluginContainer.find('.selector-item').each(function() {
                var pluginKey = $(this).data('key');
                var status = Lampa.Storage.get(pluginKey, '0');
                $(this).find('.settings-folder__status').removeClass('toggle-0 toggle-1').addClass('toggle-' + status);
                if (status === '1') {
                    $(this).find('.settings-folder__name').append(' ✓');
                } else {
                    $(this).find('.settings-folder__name').find(' ✓').remove();
                }
            });

            // Проверяем активные плагины при запуске
            checkActivePlugins();
        }

        // Функция проверки активных плагинов при инициализации
        function checkActivePlugins() {
            var activePlugins = Lampa.Storage.get('active_plugins', '[]');
            activePlugins = JSON.parse(activePlugins);
            
            interfacePlugins.forEach(function(plugin, index) {
                var pluginKey = 'plugin_interface_' + index;
                var isActive = activePlugins.includes(plugin.url);
                if (isActive && Lampa.Storage.get(pluginKey, '0') === '0') {
                    Lampa.Storage.set(pluginKey, '1');
                }
            });
        }

        // Добавляем в главное меню настроек
        Lampa.Settings.main().render().find('.settings-panel').append(html);

        // Инициализируем при первом запуске
        checkActivePlugins();
        updateInterface();

        // Обработчик фокуса для стилизации
        html.find('.settings-folder').on('focus', function() {
            $(this).addClass('focus');
        }).on('blur', function() {
            $(this).removeClass('focus');
        });

        // Инициализация иконки и стилей
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') {
                updateInterface();
            }
        });
    }
}

// Запуск плагина
addonStart();
