'use strict';

function addonStart() {
    console.log('Theme Manager Plugin started');
    
    // Функция загрузки плагина
    function itemON(url, name, author, type, nthChildIndex) {
        console.log('Loading theme plugin:', name, 'URL:', url);
        
        // Проверяем, не загружен ли уже
        if (document.querySelector('script[src="' + url + '"]')) {
            console.log('Plugin already loaded:', name);
            return;
        }
        
        // Добавляем в storage активных плагинов
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        try {
            activePlugins = JSON.parse(activePlugins);
            if (!activePlugins.includes(url)) {
                activePlugins.push({
                    url: url,
                    name: name,
                    author: author,
                    status: 1,
                    type: type
                });
                Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
            }
        } catch(e) {
            console.log('Error with active plugins storage:', e);
            Lampa.Storage.set('active_plugins', JSON.stringify([{url: url, name: name, author: author, status: 1, type: type}]));
        }
        
        // Создаем и загружаем скрипт
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.async = false;
        
        script.onload = function() {
            console.log('Theme plugin loaded successfully:', name);
            
            // Добавляем статус в DOM для отображения
            setTimeout(function() {
                if (nthChildIndex !== undefined && nthChildIndex !== null) {
                    var pluginElement = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                    if (pluginElement.length) {
                        pluginElement.find('.settings-param__status').removeClass('active error wait').addClass('active');
                    }
                }
                
                // Обновляем кэш плагинов
                if (Lampa.Storage.get('plugins')) {
                    var pluginsArray = JSON.parse(Lampa.Storage.get('plugins', '[]'));
                    var exists = false;
                    for (var i = 0; i < pluginsArray.length; i++) {
                        if (pluginsArray[i].url === url) {
                            pluginsArray[i].status = 1;
                            exists = true;
                            break;
                        }
                    }
                    if (!exists) {
                        pluginsArray.push({url: url, name: name, author: author, status: 1, type: type});
                    }
                    Lampa.Storage.set('plugins', JSON.stringify(pluginsArray));
                }
                
                // Если есть функция инициализации в плагине
                if (typeof window.addonStart === 'function') {
                    try {
                        window.addonStart();
                    } catch(e) {
                        console.log('Plugin init error:', e);
                    }
                }
                
                // Отправляем событие обновления плагинов
                if (Lampa.Listener && Lampa.Listener.send) {
                    Lampa.Listener.send('plugins', {type: 'updated'});
                }
                
            }, 100);
        };
        
        script.onerror = function() {
            console.error('Failed to load theme plugin:', name, url);
            
            // Удаляем из storage при ошибке
            var activePlugins = Lampa.Storage.get('active_plugins', '[]');
            try {
                activePlugins = JSON.parse(activePlugins);
                var index = -1;
                for (var i = 0; i < activePlugins.length; i++) {
                    if (activePlugins[i].url === url) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    activePlugins.splice(index, 1);
                    Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
                }
            } catch(e) {
                console.log('Error removing failed plugin from storage:', e);
            }
            
            // Обновляем статус в DOM
            setTimeout(function() {
                if (nthChildIndex !== undefined && nthChildIndex !== null) {
                    var pluginElement = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                    if (pluginElement.length) {
                        pluginElement.find('.settings-param__status').removeClass('active error wait').addClass('error');
                    }
                }
            }, 100);
        };
        
        // Добавляем в head
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(script);
    }
    
    // Функция удаления плагина
    function deletePlugin(url, nthChildIndex) {
        console.log('Removing theme plugin:', url);
        
        // Удаляем из storage активных плагинов
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        try {
            activePlugins = JSON.parse(activePlugins);
            var newPlugins = [];
            for (var i = 0; i < activePlugins.length; i++) {
                if (activePlugins[i].url !== url) {
                    newPlugins.push(activePlugins[i]);
                }
            }
            Lampa.Storage.set('active_plugins', JSON.stringify(newPlugins));
        } catch(e) {
            console.log('Error removing plugin from storage:', e);
        }
        
        // Удаляем из общего списка плагинов
        var pluginsArray = Lampa.Storage.get('plugins', '[]');
        try {
            pluginsArray = JSON.parse(pluginsArray);
            var newPluginsArray = [];
            for (var i = 0; i < pluginsArray.length; i++) {
                if (pluginsArray[i].url !== url) {
                    newPluginsArray.push(pluginsArray[i]);
                }
            }
            Lampa.Storage.set('plugins', JSON.stringify(newPluginsArray));
        } catch(e) {
            console.log('Error updating plugins list:', e);
        }
        
        // Удаляем script tag
        var scripts = document.querySelectorAll('script[src="' + url + '"]');
        scripts.forEach(function(script) {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        });
        
        // Обновляем статус в DOM
        setTimeout(function() {
            if (nthChildIndex !== undefined && nthChildIndex !== null) {
                var pluginElement = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                if (pluginElement.length) {
                    pluginElement.find('.settings-param__status').removeClass('active error wait');
                }
            }
        }, 100);
        
        console.log('Theme plugin removed:', url);
        
        // Перезагружаем страницу для полного очистки
        setTimeout(function() {
            location.reload();
        }, 1000);
    }
    
    // Функция проверки статуса плагина
    function checkPlugin(url) {
        var pluginsArray = Lampa.Storage.get('plugins', '[]');
        try {
            pluginsArray = JSON.parse(pluginsArray);
            for (var i = 0; i < pluginsArray.length; i++) {
                if (pluginsArray[i].url === url) {
                    return pluginsArray[i].status;
                }
            }
        } catch(e) {
            console.log('Error checking plugin status:', e);
        }
        return 0;
    }
    
    // Ждем готовности Settings API
    if (typeof Lampa === 'undefined' || !Lampa.SettingsApi) {
        setTimeout(addonStart, 500);
        return;
    }
    
    // Проверяем, добавлен ли уже компонент
    if ($('[data-component="addinterfaceplugin"]').length) {
        console.log('Interface plugins component already exists');
        // Проверяем и обновляем статус нашего плагина
        var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
        var myResult = checkPlugin(pluginUrl);
        var pluginStatus = null;
        var pluginsArray = Lampa.Storage.get('plugins', '[]');
        try {
            pluginsArray = JSON.parse(pluginsArray);
            for (var i = 0; i < pluginsArray.length; i++) {
                if (pluginsArray[i].url === pluginUrl) {
                    pluginStatus = pluginsArray[i].status;
                    break;
                }
            }
        } catch(e) {}
        
        setTimeout(function() {
            var pluginElement = $('[data-name="drxaos_themes"]');
            if (pluginElement.length) {
                pluginElement.append('<div class="settings-param__status"></div>');
                var statusDiv = pluginElement.find('.settings-param__status');
                
                if (myResult && pluginStatus != 0) {
                    statusDiv.removeClass('active error wait').addClass('active');
                } else if (pluginStatus == 0) {
                    statusDiv.removeClass('active error wait').css('background-color', 'rgb(255, 165, 0)');
                } else {
                    statusDiv.removeClass('active error wait').addClass('error');
                }
            }
        }, 100);
        return;
    }
    
    // Создаем компонент для интерфейсных плагинов
    Lampa.SettingsApi.addComponent('addinterfaceplugin', {
        name: 'Интерфейс',
        type: 'folder',
        icon: 'interface',
        order: 10
    });
    
    // Добавляем наш плагин DrXaos Themes
    var nthChildIndex = 0; // Только один плагин, индекс 0
    
    Lampa.SettingsApi.addParam({
        component: 'addinterfaceplugin',
        param: {
            name: 'drxaos_themes',
            type: 'select',
            values: [
                {id: '1', name: 'Включить'},
                {id: '2', name: 'Выключить'}
            ],
            default: Lampa.Storage.get('drxaos_themes', '1'),
            field: {
                name: 'DrXaos Themes',
                description: 'Темы интерфейса от DrXaos для персонализации Lampac'
            },
            onChange: function(value) {
                var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
                if (value == '1') {
                    itemON(pluginUrl, 'DrXaos Themes', '@novyx0', 'interface', nthChildIndex);
                    console.log('nthChildIndex в itemON:', nthChildIndex);
                }
                if (value == '2') {
                    deletePlugin(pluginUrl, nthChildIndex);
                    console.log('nthChildIndex в deletePlugin:', nthChildIndex);
                }
            },
            onRender: function(item) {
                // Стилизуем название
                item.find('.settings-param__name').css('color', '#f3d900');
                
                // Скрываем индикатор установки по умолчанию
                item.addClass('hideInstall');
                
                // Проверяем статус плагина
                var myResult = checkPlugin('https://novyx0.github.io/my-plugins/drxaos_themes.js');
                var pluginStatus = null;
                var pluginsArray = Lampa.Storage.get('plugins', '[]');
                
                setTimeout(function() {
                    // Добавляем статусный индикатор
                    item.append('<div class="settings-param__status"></div>');
                    
                    try {
                        pluginsArray = JSON.parse(pluginsArray);
                        for (var i = 0; i < pluginsArray.length; i++) {
                            if (pluginsArray[i].url === 'https://novyx0.github.io/my-plugins/drxaos_themes.js') {
                                pluginStatus = pluginsArray[i].status;
                                break;
                            }
                        }
                    } catch(e) {
                        console.log('Error parsing plugins array:', e);
                    }
                    
                    var statusDiv = item.find('.settings-param__status');
                    
                    if (myResult && pluginStatus != 0) {
                        statusDiv.removeClass('active error wait').addClass('active');
                    } else if (pluginStatus == 0) {
                        statusDiv.removeClass('active error wait').css('background-color', 'rgb(255, 165, 0)');
                    } else {
                        statusDiv.removeClass('active error wait').addClass('error');
                    }
                }, 100);
                
                // Обработчик клика для фокуса
                item.on('hover:enter', function(event) {
                    nthChildIndex = $(this).index();
                    var focusBackEvent = event;
                    console.log('Plugin item clicked, nthChildIndex:', nthChildIndex);
                });
            }
        }
    });
    
    // Создаем иконку для раздела интерфейсных плагинов
    Lampa.SettingsApi.addParam({
        component: 'addplugin',
        param: {
            name: 'addinterfaceplugin',
            type: 'static',
            default: true,
            field: {
                name: `
                    <div class="settings-folder" style="padding: 0 !important">
                        <div style="display: block; margin: 0 auto; height: 2.3em; padding-right: .1em;">
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g style="fill: none; stroke: #ffffff; stroke-width: 12px; stroke-linecap: round; stroke-linejoin: round">
                                        <path d="M 50,10 0,35"></path>
                                        <path d="M 20,29 C 4,52 15,90 50,90 85,90 100,47 74,20"></path>
                                    </g>
                                    <path style="fill: #ffffff" d="M 2,21 29,-2 2,29"></path>
                                </g>
                            </svg>
                        </div>
                        <div>Интерфейс</div>
                    </div>
                `,
                description: `
                    <div style="text-align: center;">
                        Темы и модификации интерфейса
                    </div>
                `
            },
            onRender: function(item) {
                item.on('hover:enter', function() {
                    Lampa.Settings.create('addinterfaceplugin');
                    Lampa.Controller.enabled().controller.back(function() {
                        Lampa.Settings.create('addplugin');
                    });
                });
            }
        }
    });
    
    console.log('Theme Manager Plugin fully initialized');
}

// Запускаем плагин
addonStart();

// Дополнительная проверка готовности через интервал
var initCheck = setInterval(function() {
    if (typeof Lampa !== 'undefined' && Lampa.SettingsApi) {
        clearInterval(initCheck);
        if (typeof addonStart === 'function') {
            addonStart();
        }
    }
}, 300);

// Остановка проверки после загрузки
window.addEventListener('load', function() {
    if (initCheck) {
        clearInterval(initCheck);
    }
});
