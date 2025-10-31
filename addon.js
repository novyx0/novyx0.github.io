'use strict';

function addonStart() {
    console.log('Theme Manager Plugin started - exact original structure');
    
    // Функция загрузки плагина (точно как в оригинале)
    function itemON(url, name, author, type, nthChildIndex) {
        console.log('Installing plugin:', name, 'from:', url);
        
        // Проверяем наличие в DOM
        var exists = false;
        var scripts = document.querySelectorAll('script[src="' + url + '"]');
        if (scripts.length > 0) {
            exists = true;
        }
        
        if (exists) {
            console.log('Plugin already installed:', name);
            // Обновляем статус в DOM
            setTimeout(function() {
                if (nthChildIndex !== undefined) {
                    var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                    if (item.length) {
                        item.find('.settings-param__status').removeClass('active error wait').addClass('active');
                    }
                }
            }, 100);
            return;
        }
        
        // Добавляем в active_plugins (массив объектов как в оригинале)
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        try {
            activePlugins = JSON.parse(activePlugins);
            var alreadyActive = false;
            for (var i = 0; i < activePlugins.length; i++) {
                if (activePlugins[i].url === url) {
                    alreadyActive = true;
                    activePlugins[i].status = 1;
                    break;
                }
            }
            if (!alreadyActive) {
                activePlugins.push({
                    url: url,
                    name: name,
                    author: author || '@novyx0',
                    status: 1,
                    type: type || 'interface'
                });
            }
            Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
        } catch (e) {
            console.log('Error updating active_plugins:', e);
        }
        
        // Загружаем скрипт
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
        
        script.onload = function() {
            console.log('Plugin loaded:', name);
            
            // Обновляем plugins cache
            var pluginsCache = Lampa.Storage.get('plugins', '[]');
            try {
                pluginsCache = JSON.parse(pluginsCache);
                var found = false;
                for (var i = 0; i < pluginsCache.length; i++) {
                    if (pluginsCache[i].url === url) {
                        pluginsCache[i].status = 1;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    pluginsCache.push({
                        url: url,
                        name: name,
                        author: author || '@novyx0',
                        status: 1,
                        type: type || 'interface'
                    });
                }
                Lampa.Storage.set('plugins', JSON.stringify(pluginsCache));
            } catch (e) {
                console.log('Error updating plugins cache:', e);
            }
            
            // Обновляем статус в DOM
            setTimeout(function() {
                if (nthChildIndex !== undefined) {
                    var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                    if (item.length) {
                        item.find('.settings-param__status').removeClass('active error wait').addClass('active');
                        // Скрываем индикатор установки
                        item.addClass('hideInstall');
                    }
                }
            }, 100);
            
            // Инициализация плагина, если есть
            if (typeof window.addonStart === 'function') {
                try {
                    window.addonStart();
                } catch (e) {
                    console.log('Plugin addonStart error:', e);
                }
            }
        };
        
        script.onerror = function() {
            console.error('Failed to load plugin:', name, url);
            
            // Удаляем из active_plugins
            var activePlugins = Lampa.Storage.get('active_plugins', '[]');
            try {
                activePlugins = JSON.parse(activePlugins);
                var newActive = [];
                for (var i = 0; i < activePlugins.length; i++) {
                    if (activePlugins[i].url !== url) {
                        newActive.push(activePlugins[i]);
                    }
                }
                Lampa.Storage.set('active_plugins', JSON.stringify(newActive));
            } catch (e) {
                console.log('Error removing failed plugin:', e);
            }
            
            // Обновляем статус error
            setTimeout(function() {
                if (nthChildIndex !== undefined) {
                    var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                    if (item.length) {
                        item.find('.settings-param__status').removeClass('active error wait').addClass('error');
                    }
                }
            }, 100);
        };
    }
    
    // Функция удаления плагина (точно как в оригинале)
    function deletePlugin(url, nthChildIndex) {
        console.log('Deleting plugin:', url);
        
        // Удаляем из active_plugins
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        try {
            activePlugins = JSON.parse(activePlugins);
            var newActive = [];
            for (var i = 0; i < activePlugins.length; i++) {
                if (activePlugins[i].url !== url) {
                    newActive.push(activePlugins[i]);
                }
            }
            Lampa.Storage.set('active_plugins', JSON.stringify(newActive));
        } catch (e) {
            console.log('Error deleting from active_plugins:', e);
        }
        
        // Удаляем из plugins cache
        var pluginsCache = Lampa.Storage.get('plugins', '[]');
        try {
            pluginsCache = JSON.parse(pluginsCache);
            var newCache = [];
            for (var i = 0; i < pluginsCache.length; i++) {
                if (pluginsCache[i].url !== url) {
                    newCache.push(pluginsCache[i]);
                }
            }
            Lampa.Storage.set('plugins', JSON.stringify(newCache));
        } catch (e) {
            console.log('Error deleting from plugins cache:', e);
        }
        
        // Удаляем script из DOM
        var scripts = document.querySelectorAll('script[src="' + url + '"]');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].parentNode) {
                scripts[i].parentNode.removeChild(scripts[i]);
            }
        }
        
        // Сбрасываем статус в DOM
        setTimeout(function() {
            if (nthChildIndex !== undefined) {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait');
                    // Показываем индикатор ожидания, если нужно
                    item.removeClass('hideInstall');
                }
            }
        }, 100);
        
        // Перезагрузка для очистки
        setTimeout(function() {
            location.reload();
        }, 500);
    }
    
    // Функция проверки статуса (как в оригинале)
    function checkPlugin(url) {
        var pluginsCache = Lampa.Storage.get('plugins', '[]');
        try {
            pluginsCache = JSON.parse(pluginsCache);
            for (var i = 0; i < pluginsCache.length; i++) {
                if (pluginsCache[i].url === url) {
                    return pluginsCache[i].status === 1;
                }
            }
        } catch (e) {
            console.log('Error checking plugin:', e);
        }
        return false;
    }
    
    // Проверка готовности Lampa (как в оригинале)
    if (typeof Lampa === 'undefined' || typeof Lampa.SettingsApi === 'undefined') {
        setTimeout(addonStart, 100);
        return;
    }
    
    // Проверяем наличие компонента (как в оригинале)
    var componentExists = Lampa.SettingsApi.params.find(function(param) {
        return param.component === 'addinterfaceplugin';
    });
    
    if (componentExists) {
        console.log('Interface component already exists');
        // Обновляем статус нашего плагина
        var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
        var myResult = checkPlugin(pluginUrl);
        
        setTimeout(function() {
            var item = $('.settings-param[data-name="drxaos_themes"]');
            if (item.length) {
                item.append('<div class="settings-param__status ' + (myResult ? 'active' : '') + '"></div>');
                
                var statusDiv = item.find('.settings-param__status');
                if (myResult) {
                    statusDiv.addClass('active');
                } else {
                    statusDiv.addClass('wait').css('background-color', '#ffa500');
                }
                
                // Скрываем install если активен
                if (myResult) {
                    item.addClass('hideInstall');
                }
            }
        }, 100);
        return;
    }
    
    // Добавляем компонент интерфейса (как в оригинале)
    Lampa.SettingsApi.addComponent({
        name: 'addinterfaceplugin',
        type: 'group',
        default: true,
        order: 5
    });
    
    // Добавляем параметр для темы (единственный плагин)
    var nthChildIndex = 0;
    
    Lampa.SettingsApi.addParam({
        component: 'addinterfaceplugin',
        param: {
            name: 'drxaos_themes',
            type: 'select',
            html: 'Вибір',
            values: [
                {id: '1', name: 'Вмикнути'},
                {id: '2', name: 'Вимкнути'}
            ],
            default: Lampa.Storage.get('drxaos_themes_enabled', '1'),
            interface: true,
            field: {
                name: 'DrXaos Themes',
                description: 'Теми інтерфейсу для персоналізації Lampac'
            },
            onSelect: function(value) {
                Lampa.Storage.set('drxaos_themes_enabled', value);
            },
            onChange: function(value) {
                var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
                if (value === '1') {
                    itemON(pluginUrl, 'DrXaos Themes', '@novyx0', 'themes', nthChildIndex);
                    console.log('nthChildIndex passed to itemON:', nthChildIndex);
                }
                if (value === '2') {
                    var pluginToRemoveUrl = pluginUrl;
                    deletePlugin(pluginToRemoveUrl, nthChildIndex);
                    console.log('nthChildIndex passed to deletePlugin:', nthChildIndex);
                }
            },
            onRender: function(item) {
                // Цвет названия как в оригинале
                item.find('.settings-param__name').css({
                    color: '#f3d900',
                    'font-weight': 'bold'
                });
                
                // Добавляем статус индикатор
                item.append('<div class="settings-param__status"></div>');
                
                // Проверяем статус
                var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
                var myResult = checkPlugin(pluginUrl);
                
                setTimeout(function() {
                    var statusDiv = item.find('.settings-param__status');
                    if (myResult) {
                        statusDiv.removeClass('active error wait').addClass('active');
                        item.addClass('hideInstall');
                    } else {
                        statusDiv.removeClass('active error wait').addClass('wait').css('background-color', '#ffa500');
                    }
                }, 100);
                
                // Фиксируем индекс для onChange
                item.data('nthChildIndex', nthChildIndex);
                
                // Обработчик hover для фокуса (как в оригинале)
                item.on('hover:enter', function() {
                    nthChildIndex = $(this).index();
                    console.log('nthChildIndex on hover:', nthChildIndex);
                });
            }
        }
    });
    
    // Добавляем папку "Интерфейс" в основной раздел плагинов (как в оригинале)
    Lampa.SettingsApi.addParam({
        component: 'plugins', // Предполагаем, что основной компонент - plugins
        param: {
            name: 'addinterfaceplugin',
            type: 'folder',
            html: 'Папка',
            default: true,
            field: {
                name: '<div class="folder-icon"><i class="icon-interface"></i></div><div>Інтерфейс</div>',
                description: '<div style="text-align: center; color: #aaa;">Теми та модифікації інтерфейсу</div>'
            },
            onRender: function(item) {
                // Иконка SVG для папки
                item.find('.folder-icon').html(`
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V8C21 6.9 20.1 6 19 6H12L10 4H5C3.9 4 3 4.9 3 6V5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `);
                
                item.on('hover:enter', function() {
                    // Открываем раздел интерфейса
                    Lampa.Settings.open('addinterfaceplugin');
                });
                
                item.on('hover:long', function() {
                    // Дополнительные опции, если нужно
                });
            }
        }
    });
    
    console.log('Theme Manager fully set up like original');
}

// Инициализация
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(addonStart, 500);
    });
} else {
    setTimeout(addonStart, 500);
}

// Listener на готовность app (как в оригинале)
Lampa.Listener.follow('app', function(e) {
    if (e.type === 'ready') {
        if (typeof addonStart === 'function') {
            addonStart();
        }
    }
});
