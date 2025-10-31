'use strict';

function addonStart() {
    console.log('Plugin Manager started - simplified to interface only');

    // Функции из оригинала (без изменений)
    function itemON(url, name, author, type, nthChildIndex) {
        console.log('Installing plugin:', name, 'from:', url);
        
        // Проверяем, установлен ли уже плагин
        var exists = false;
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src.indexOf(url) > -1) {
                exists = true;
                break;
            }
        }
        
        if (exists) {
            console.log('Plugin already installed:', name);
            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait').addClass('active');
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
                status: 1,
                type: type
            });
        }
        Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));
        
        // Загружаем скрипт
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
        
        script.onload = function() {
            console.log('Plugin loaded:', name);
            
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
                    status: 1,
                    type: type
                });
            }
            Lampa.Storage.set('plugins', JSON.stringify(plugins));
            
            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
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
            
            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait').addClass('error');
                }
            }, 100);
        };
    }

    function deletePlugin(url, nthChildIndex) {
        console.log('Deleting plugin:', url);
        
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
        var scripts = document.getElementsByTagName('script');
        for (var p = 0; p < scripts.length; p++) {
            if (scripts[p].src.indexOf(url) > -1) {
                scripts[p].parentNode.removeChild(scripts[p]);
            }
        }
        
        setTimeout(function() {
            var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
            if (item.length) {
                item.find('.settings-param__status').removeClass('active error wait');
                item.removeClass('hideInstall');
            }
        }, 100);
        
        setTimeout(function() {
            location.reload();
        }, 1000);
    }

    function checkPlugin(url) {
        var plugins = Lampa.Storage.get('plugins', '[]');
        plugins = JSON.parse(plugins);
        for (var q = 0; q < plugins.length; q++) {
            if (plugins[q].url === url) {
                return plugins[q].status;
            }
        }
        return 0;
    }

    // Проверка готовности
    if (typeof Lampa === 'undefined' || !Lampa.SettingsApi) {
        setTimeout(addonStart, 100);
        return;
    }

    // Проверяем наличие компонента addinterfaceplugin (как в оригинале)
    var interfaceComponent = false;
    for (var r = 0; r < Lampa.SettingsApi.params.length; r++) {
        if (Lampa.SettingsApi.params[r].component === 'addinterfaceplugin') {
            interfaceComponent = true;
            break;
        }
    }

    if (!interfaceComponent) {
        // Добавляем компонент только если нет (как в оригинале)
        Lampa.SettingsApi.addComponent({
            name: 'addinterfaceplugin',
            type: 'folder',
            icon: 'interface'
        });
    }

    // Проверяем наличие папки в основном меню (как в оригинале)
    var folderExists = false;
    for (var s = 0; s < Lampa.SettingsApi.params.length; s++) {
        if (Lampa.SettingsApi.params[s].param && Lampa.SettingsApi.params[s].param.name === 'addinterfaceplugin') {
            folderExists = true;
            break;
        }
    }

    if (!folderExists) {
        // Добавляем папку в основной раздел плагинов (как в оригинале)
        Lampa.SettingsApi.addParam({
            component: 'plugins',
            param: {
                name: 'addinterfaceplugin',
                type: 'folder',
                html: '<div class="settings-folder__icon"><i class="icon-interface"></i></div><div>Интерфейс</div>',
                description: 'Темы интерфейса',
                onRender: function(item) {
                    item.find('.settings-folder__name').css('color', '#f3d900');
                    item.on('hover:enter', function() {
                        Lampa.Settings.open('addinterfaceplugin');
                    });
                }
            }
        });
    }

    // Проверяем наличие параметра drxaos_themes (как в оригинале для других плагинов)
    var paramExists = false;
    for (var t = 0; t < Lampa.SettingsApi.params.length; t++) {
        if (Lampa.SettingsApi.params[t].param && Lampa.SettingsApi.params[t].param.name === 'drxaos_themes') {
            paramExists = true;
            break;
        }
    }

    if (!paramExists) {
        // Добавляем только один параметр для DrXaos Themes (упрощение оригинала)
        var nthChildIndex = 0;
        
        Lampa.SettingsApi.addParam({
            component: 'addinterfaceplugin',
            param: {
                name: 'drxaos_themes',
                type: 'select',
                html: 'Выбор',
                values: ['1', '2'],
                default: Lampa.Storage.get('drxaos_themes', '1'),
                field: {
                    name: 'DrXaos Themes',
                    description: 'Проксирование тем для интерфейса Lampa'
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
                    
                    var myResult = checkPlugin('https://novyx0.github.io/my-plugins/drxaos_themes.js');
                    setTimeout(function() {
                        item.append('<div class="settings-param__status"></div>');
                        var status = item.find('.settings-param__status');
                        if (myResult) {
                            status.removeClass('active error wait').addClass('active');
                        } else {
                            status.removeClass('active error wait').addClass('wait').css('background-color', '#ffa500');
                        }
                    }, 100);
                }
            }
        });
    } else {
        // Если уже есть, обновляем статус
        var myResult = checkPlugin('https://novyx0.github.io/my-plugins/drxaos_themes.js');
        setTimeout(function() {
            var item = $('.settings-param[data-name="drxaos_themes"]');
            if (item.length) {
                if (!item.find('.settings-param__status').length) {
                    item.append('<div class="settings-param__status"></div>');
                }
                var status = item.find('.settings-param__status');
                if (myResult == 1) {
                    status.removeClass('active error wait').addClass('active');
                } else {
                    status.removeClass('active error wait').addClass('wait').css('background-color', '#ffa500');
                }
                if (myResult == 1) {
                    item.addClass('hideInstall');
                }
            }
        }, 100);
    }

    console.log('Simplified Plugin Manager initialized');
}

// Запуск (как в оригинале)
addonStart();
