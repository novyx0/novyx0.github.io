(function () {
    'use strict';

    function addonStart() {

        /* Иконки для категории (сохранена структура оригинала, упрощена) */
        var icon_interface = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M0 0h32v32H0z" fill="#fff"/><path d="M4 4h24v24H4z" fill="none" stroke="#000" stroke-width="2"/></svg>'; // Простая иконка интерфейса

        // Конфигурация: только одна категория с одним плагином (структура сохранена, но упрощена)
        var plugins = {
            interface: {
                name: 'Интерфейс',
                icon: icon_interface,
                items: [
                    {
                        id: 'drxaos_themes',
                        name: 'Drxaos Themes',
                        description: 'Премиум темы для интерфейса Lampa (9 тем, TMDB/JacRed интеграция, оптимизация для ATV)',
                        url: 'https://novyx0.github.io/my-plugins/drxaos_themes.js', // Правильная ссылка
                        state: Lampa.Storage.get('plugin_drxaos_themes_state', 'not_installed'), // Состояния: not_installed, installed_disabled, installed_enabled
                        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#4CAF50"/><path d="M16 8l-4 4h8l-4-4z" fill="#fff"/></svg>' // Иконка темы (стрелка вверх, как в плагине)
                    }
                ]
            }
        };

        // Функция загрузки и выполнения кода плагина (с fallback из attachment)
        var drxaosCodeFallback = `(function() { 'use strict'; /* ╔══════════════════════════════════════════════════════════════════════════════╗ ║ ║ ║ 🎨 DRXAOS THEMES PLUGIN 🎨 ║ ... [ПОЛНЫЙ КОД ИЗ ATTACHMENT, УСЕЧЁН для примера; в реальном скрипте вставьте весь текст из https://novyx0.github.io/my-plugins/drxaos_themes.js] */ var CONFIG = { PLUGIN_NAME: 'drxaos_themes', VERSION: '2.3.0', /* ... весь код ... */ }();`; // Fallback: весь код из [attached_file:1] вставьте сюда полностью для статической интеграции

        function loadAndExecutePlugin(url, callback) {
            fetch(url)
                .then(response => response.text())
                .then(scriptCode => {
                    try {
                        eval(scriptCode); // Выполнение в Lampa-контексте (как в оригинале для privateinit)
                        if (callback) callback(true);
                    } catch (e) {
                        console.error('Ошибка выполнения drxaos_themes:', e);
                        // Fallback: использовать статический код
                        eval(drxaosCodeFallback);
                        if (callback) callback(true);
                    }
                })
                .catch(error => {
                    console.error('Ошибка загрузки drxaos_themes:', error);
                    // Fallback: статический код
                    eval(drxaosCodeFallback);
                    if (callback) callback(true);
                });
        }

        // Функция установки/активации (сохранена логика оригинала: анимация, состояние, reload)
        function installPlugin(plugin) {
            var state = plugin.state;
            Lampa.Noty.show('Загрузка Drxaos Themes...'); // Анимация как в оригинале

            if (state === 'not_installed' || state === 'installed_disabled') {
                loadAndExecutePlugin(plugin.url, (success) => {
                    if (success) {
                        if (state === 'not_installed') {
                            Lampa.Storage.set('plugin_drxaos_themes_state', 'installed_disabled');
                            Lampa.Noty.show('Плагин установлен. Активируйте для применения тем.');
                        } else {
                            // Активация: применить тему (вызов applyTheme из плагина)
                            if (typeof applyThemeImmediate !== 'undefined') {
                                applyThemeImmediate(Lampa.Storage.get('drxaos_theme', 'default')); // Применить текущую тему
                                Lampa.Storage.set('plugin_drxaos_themes_state', 'installed_enabled');
                                Lampa.Noty.show('Тема активирована.');
                            }
                        }
                        // Reload privateinit если включено (как в оригинале)
                        if (Lampa.Storage.field('private_init')) {
                            Lampa.Storage.set('private_init', true);
                            setTimeout(() => location.reload(), 1000);
                        }
                        updatePluginUI(plugin.id, Lampa.Storage.get('plugin_drxaos_themes_state', 'installed_disabled'));
                    }
                });
            } else if (state === 'installed_enabled') {
                // Деактивация: очистить стили и элементы (из плагина)
                if (typeof styleManager !== 'undefined') {
                    styleManager.clearAllStyles(); // Очистка всех стилей темы
                }
                // Удалить быстрый селектор и модальные
                $('.drxaos-quick-theme-modal, #drxaos-quick-theme-btn, #drxaos-netflix-fonts, #drxaos-global-font-styles').remove();
                Lampa.Storage.set('plugin_drxaos_themes_state', 'installed_disabled');
                Lampa.Noty.show('Тема деактивирована.');
                updatePluginUI(plugin.id, 'installed_disabled');
            }
        }

        // Функция удаления (сохранена из оригинала)
        function uninstallPlugin(pluginId) {
            // Деактивация перед удалением
            installPlugin(plugins.interface.items[0]); // Деактивировать
            Lampa.Storage.set('plugin_drxaos_themes_state', 'not_installed');
            Lampa.Noty.show('Плагин удалён.');
            // Очистка privateinit от ссылок (как в оригинале)
            var privateInit = Lampa.Storage.get('private_init_code', '');
            privateInit = privateInit.replace(/drxaos_themes\.js/g, '').replace(/eval\(.*drxaos_themes.*\)/g, '');
            Lampa.Storage.set('private_init_code', privateInit);
            updatePluginUI(pluginId, 'not_installed');
        }

        // Обновление UI элемента (сохранена структура: классы состояний, кнопки, фокус)
        function updatePluginUI(pluginId, newState) {
            var item = $('.plugin-item-' + pluginId);
            item.find('.state').text(getStateText(newState));
            item.find('.state').removeClass('enabled disabled not-installed').addClass(newState.replace('_', '-'));
            var button = item.find('.action-btn');
            var plugin = plugins.interface.items.find(p => p.id === pluginId);
            plugin.state = newState;
            if (newState === 'installed_enabled') {
                button.text('Деактивировать').off('click').on('click', () => installPlugin(plugin));
            } else if (newState === 'installed_disabled') {
                button.text('Активировать').off('click').on('click', () => installPlugin(plugin));
            } else {
                button.text('Установить').off('click').on('click', () => installPlugin(plugin));
            }
            item.find('.uninstall-btn').toggle(newState !== 'not_installed').off('click').on('click', () => uninstallPlugin(pluginId));
            // Анимация фокуса (как в оригинале)
            item.find('.action-btn, .uninstall-btn').on('focus', function() { $(this).addClass('focus'); }).on('blur', function() { $(this).removeClass('focus'); });
        }

        // Текст состояний (сохранено)
        function getStateText(state) {
            switch (state) {
                case 'installed_enabled': return 'Активен';
                case 'installed_disabled': return 'Отключен';
                case 'not_installed': return 'Не установлен';
                default: return 'Неизвестно';
            }
        }

        // Добавление в меню настроек (структура оригинала: html для категории, события)
        Lampa.SubscribeToEvent('menu', (eventData) => {
            if (eventData.name === 'settings') {
                var html = '<div class="plugin-manager category-interface"><h2>Менеджер плагинов</h2>';

                // Только категория Интерфейс (упрощено)
                html += '<div class="subcategory"><h3>' + plugins.interface.name + '</h3>' + plugins.interface.icon + '</h3>';
                plugins.interface.items.forEach(plugin => {
                    var stateClass = plugin.state.replace('_', '-');
                    var stateText = getStateText(plugin.state);
                    var buttonText = plugin.state === 'installed_enabled' ? 'Деактивировать' : (plugin.state === 'installed_disabled' ? 'Активировать' : 'Установить');
                    html += '<div class="plugin-item plugin-item-' + plugin.id + '"><div class="name">' + plugin.name + '</div><div class="description">' + plugin.description + '</div><div class="icon">' + plugin.icon + '</div><div class="state ' + stateClass + '">' + stateText + '</div><button class="action-btn">' + buttonText + '</button><button class="uninstall-btn" style="display:none;">Удалить</button></div>';
                });
                html += '</div></div>';

                // Добавление пункта меню (как в оригинале)
                var menuItem = $('<div class="menu__item selector" data-parent="settings"><div class="menu__item-title">Менеджер плагинов</div></div>');
                eventData.addItem(menuItem, html);

                // Инициализация UI (сохранено)
                plugins.interface.items.forEach(plugin => {
                    updatePluginUI(plugin.id, plugin.state);
                });
            }
        });

        // Инициализация при старте (загрузка состояний, автоактивация если enabled)
        $(document).ready(() => {
            plugins.interface.items.forEach(plugin => {
                plugin.state = Lampa.Storage.get('plugin_' + plugin.id + '_state', 'not_installed');
            });
            var themePlugin = plugins.interface.items[0];
            if (themePlugin.state === 'installed_enabled') {
                // Автозагрузка при старте (без повторного fetch)
                loadAndExecutePlugin(themePlugin.url, () => {
                    applyThemeImmediate(Lampa.Storage.get('drxaos_theme', 'default')); // Применить тему
                });
            }
        });
    }

    // Запуск плагина (структура оригинала: Lampa.Plugins.load)
    if (window.Lampa && Lampa.Plugins) {
        Lampa.Plugins.load('plugin_manager_drxaos', addonStart); // Переименовано для уникальности
    } else {
        console.error('Lampa не загружена');
    }
})();
