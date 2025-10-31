'use strict';

function addonStart() {
    console.log('Theme Manager started');

    // Функция загрузки плагина (как в оригинале)
    function itemON(url, name, author, type, nthChildIndex) {
        console.log('Installing:', name, 'from:', url);
        
        // Проверяем наличие скрипта
        var exists = false;
        var allScripts = document.getElementsByTagName('script');
        for (var i = 0; i < allScripts.length; i++) {
            if (allScripts[i].src === url) {
                exists = true;
                break;
            }
        }
        
        if (exists) {
            console.log('Already installed:', name);
            // Обновляем статус
            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex || 0);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait').addClass('active');
                    item.addClass('hideInstall');
                }
            }, 100);
            return;
        }
        
        // Добавляем в active_plugins
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        activePlugins = JSON.parse(activePlugins);
        var isActive = false;
        for (var j = 0; j < activePlugins.length; j++) {
            if (activePlugins[j].url === url) {
                isActive = true;
                activePlugins[j].status = 1;
                break;
            }
        }
        if (!isActive) {
            activePlugins.push({
                url: url,
                name: name,
                author: author,
                type: type,
                status: 1
            });
        }
        Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
        
        // Загружаем скрипт
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
        
        script.onload = function() {
            console.log('Loaded:', name);
            
            // Обновляем plugins
            var plugins = Lampa.Storage.get('plugins', '[]');
            plugins = JSON.parse(plugins);
            var found = false;
            for (var k = 0; k < plugins.length; k++) {
                if (plugins[k].url === url) {
                    plugins[k].status = 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                plugins.push({
                    url: url,
                    name: name,
                    author: author,
                    type: type,
                    status: 1
                });
            }
            Lampa.Storage.set('plugins', JSON.stringify(plugins));
            
            // Статус в DOM
            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex || 0);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait').addClass('active');
                    item.addClass('hideInstall');
                }
            }, 100);
        };
        
        script.onerror = function() {
            console.error('Failed to load:', name);
            
            // Удаляем из active_plugins
            var activePlugins = Lampa.Storage.get('active_plugins', '[]');
            activePlugins = JSON.parse(activePlugins);
            var newActive = [];
            for (var l = 0; l < activePlugins.length; l++) {
                if (activePlugins[l].url !== url) {
                    newActive.push(activePlugins[l]);
                }
            }
            Lampa.Storage.set('active_plugins', JSON.stringify(newActive));
            
            // Статус error
            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex || 0);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait').addClass('error');
                }
            }, 100);
        };
    }

    // Функция удаления (как в оригинале)
    function deletePlugin(url, nthChildIndex) {
        console.log('Deleting:', url);
        
        // Удаляем из active_plugins
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        activePlugins = JSON.parse(activePlugins);
        var newActive = [];
        for (var m = 0; m < activePlugins.length; m++) {
            if (activePlugins[m].url !== url) {
                newActive.push(activePlugins[m]);
            }
        }
        Lampa.Storage.set('active_plugins', JSON.stringify(newActive));
        
        // Удаляем из plugins
        var plugins = Lampa.Storage.get('plugins', '[]');
        plugins = JSON.parse(plugins);
        var newPlugins = [];
        for (var n = 0; n < plugins.length; n++) {
            if (plugins[n].url !== url) {
                newPlugins.push(plugins[n]);
            }
        }
        Lampa.Storage.set('plugins', JSON.stringify(newPlugins));
        
        // Удаляем скрипт
        var allScripts = document.getElementsByTagName('script');
        for (var p = 0; p < allScripts.length; p++) {
            if (allScripts[p].src === url && allScripts[p].parentNode) {
                allScripts[p].parentNode.removeChild(allScripts[p]);
            }
        }
        
        // Сброс статуса
        setTimeout(function() {
            var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex || 0);
            if (item.length) {
                item.find('.settings-param__status').removeClass('active error wait');
                item.removeClass('hideInstall');
            }
        }, 100);
        
        // Перезагрузка
        setTimeout(function() {
            location.reload();
        }, 1000);
    }

    // Проверка статуса (как в оригинале)
    function checkPlugin(url) {
        var plugins = Lampa.Storage.get('plugins', '[]');
        plugins = JSON.parse(plugins);
        for (var q = 0; q < plugins.length; q++) {
            if (plugins[q].url === url) {
                return plugins[q].status === 1;
            }
        }
        return false;
    }

    // Проверка готовности (как в оригинале)
    if (typeof Lampa === 'undefined' || !Lampa.SettingsApi) {
        setTimeout(addonStart, 100);
        return;
    }

    // Проверяем, есть ли уже param для drxaos_themes
    if ($('.settings-param[data-name="drxaos_themes"]').length) {
        console.log('Theme param already exists');
        // Обновляем статус
        var url = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
        var myResult = checkPlugin(url);
        setTimeout(function() {
            var item = $('.settings-param[data-name="drxaos_themes"]');
            if (item.length && !item.find('.settings-param__status').length) {
                item.append('<div class="settings-param__status"></div>');
            }
            var status = item.find('.settings-param__status');
            if (myResult) {
                status.addClass('active');
                item.addClass('hideInstall');
            } else {
                status.addClass('wait');
                status.css('background-color', '#ffa500');
            }
        }, 100);
        return;
    }

    // Добавляем folder для интерфейса (как в оригинале для других)
    Lampa.SettingsApi.addParam({
        component: 'plugins',
        param: {
            name: 'interface_folder',
            type: 'folder',
            default: '1',
            field: {
                name: 'Інтерфейс',
                description: 'Теми інтерфейсу'
            },
            onRender: function(item) {
                item.find('.settings-param__name').css('color', '#f3d900');
                item.on('hover:enter', function() {
                    Lampa.Settings.open('interface_plugins');
                });
            }
        }
    });

    // Добавляем param для темы под компонентом interface_plugins
    var nthChildIndex = 0;
    
    Lampa.SettingsApi.addParam({
        component: 'interface_plugins',
        param: {
            name: 'drxaos_themes',
            type: 'select',
            html: 'Вибір',
            values: ['1', '2'],
            default: Lampa.Storage.get('drxaos_themes', '1'),
            field: {
                name: 'DrXaos Themes',
                description: 'Теми інтерфейсу від DrXaos'
            },
            onChange: function(value) {
                var url = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
                if (value == '1') {
                    itemON(url, 'DrXaos Themes', '@novyx0', 'interface', nthChildIndex);
                    console.log("nthChildIndex, переданный в itemON:", nthChildIndex);
                }
                if (value == '2') {
                    var pluginToRemoveUrl = url;
                    deletePlugin(pluginToRemoveUrl, nthChildIndex);
                    console.log("nthChildIndex, переданный в deletePlugin:", nthChildIndex);
                }
            },
            onRender: function(item) {
                item.find('.settings-param__name').css('color', '#f3d900');
                item.addClass('hideInstall');
                
                var url = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
                var myResult = checkPlugin(url);
                
                setTimeout(function() {
                    item.append('<div class="settings-param__status"></div>');
                    var status = item.find('.settings-param__status');
                    if (myResult) {
                        status.removeClass('active error wait').addClass('active');
                    } else {
                        status.removeClass('active error wait').addClass('wait');
                        status.css('background-color', '#ffa500');
                    }
                }, 100);
            }
        }
    });

    console.log('Theme Manager initialized');
}

addonStart();
