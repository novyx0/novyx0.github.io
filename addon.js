'use strict';

function addonStart() {
    console.log('AddonStart - exact original structure for interface themes');

    // Переменные из оригинала
    var nthChildIndex = null; // Для хранения индекса nth-child

    // Иконки из оригинала (используем только для interface)
    var icon_add_interface_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/><path fill="currentColor" fill-rule="evenodd" d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.088c0 1.909 0 3.471-.104 4.743c-.104 1.28-.317 2.347-.795 3.235q-.314.586-.785 1.057c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.793-.793-1.203-1.78-1.42-3.006c-.215-1.203-.254-2.7-.262-4.558Q1.25 12.792 1.25 12v-.058c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386v.844l1.001-.876a2.3 2.3 0 0 1 3.141.104l4.29 4.29a2 2 0 0 0 2.564.222l.298-.21a3 3 0 0 1 3.732.225l2.83 2.547c.286-.598.455-1.384.545-2.493c.098-1.205.099-2.707.099-4.653c0-2.378-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176" clip-rule="evenodd"/></svg></div><div style="font-size:1.3em">Интерфейс</div></div>';

    // Функции из оригинала (без изменений)
    function itemON(url, name, author, type, nthChildIndex) {
        console.log('nthChildIndex в itemON:', nthChildIndex);
        console.log('Installing:', name);

        // Проверка существования
        var exists = false;
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src == url) {
                exists = true;
                break;
            }
        }

        if (exists) {
            console.log('Already installed:', name);
            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait').addClass('active');
                }
            }, 100);
            return;
        }

        // Добавление в active_plugins
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        activePlugins = JSON.parse(activePlugins);
        var already = false;
        for (var j = 0; j < activePlugins.length; j++) {
            if (activePlugins[j].url == url) {
                already = true;
                activePlugins[j].status = 1;
                break;
            }
        }
        if (!already) {
            activePlugins.push({url: url, name: name, author: author, status: 1, type: type || 'interface'});
        }
        Lampa.Storage.set('active_plugins', JSON.stringify(activePlugins));

        // Загрузка скрипта
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);

        script.onload = function() {
            console.log('Loaded:', name);

            // Обновление plugins cache
            var plugins = Lampa.Storage.get('plugins', '[]');
            plugins = JSON.parse(plugins);
            var found = false;
            for (var k = 0; k < plugins.length; k++) {
                if (plugins[k].url == url) {
                    plugins[k].status = 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                plugins.push({url: url, name: name, author: author, status: 1, type: type || 'interface'});
            }
            Lampa.Storage.set('plugins', JSON.stringify(plugins));

            setTimeout(function() {
                var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
                if (item.length) {
                    item.find('.settings-param__status').removeClass('active error wait').addClass('active');
                }
                item.addClass('hideInstall');
            }, 100);
        };

        script.onerror = function() {
            console.log('Error loading:', name);

            // Удаление из active_plugins
            var activePlugins = Lampa.Storage.get('active_plugins', '[]');
            activePlugins = JSON.parse(activePlugins);
            var newActive = [];
            for (var l = 0; l < activePlugins.length; l++) {
                if (activePlugins[l].url != url) {
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
        console.log('nthChildIndex в deletePlugin:', nthChildIndex);
        console.log('Deleting:', url);

        // Удаление из active_plugins
        var activePlugins = Lampa.Storage.get('active_plugins', '[]');
        activePlugins = JSON.parse(activePlugins);
        var newActive = [];
        for (var m = 0; m < activePlugins.length; m++) {
            if (activePlugins[m].url != url) {
                newActive.push(activePlugins[m]);
            }
        }
        Lampa.Storage.set('active_plugins', JSON.stringify(newActive));

        // Удаление из plugins
        var plugins = Lampa.Storage.get('plugins', '[]');
        plugins = JSON.parse(plugins);
        var newPlugins = [];
        for (var n = 0; n < plugins.length; n++) {
            if (plugins[n].url != url) {
                newPlugins.push(plugins[n]);
            }
        }
        Lampa.Storage.set('plugins', JSON.stringify(newPlugins));

        // Удаление скрипта
        var scripts = document.getElementsByTagName('script');
        for (var p = 0; p < scripts.length; p++) {
            if (scripts[p].src == url) {
                scripts[p].parentNode.removeChild(scripts[p]);
            }
        }

        setTimeout(function() {
            var item = $('.settings-param[data-name="drxaos_themes"]').eq(nthChildIndex);
            if (item.length) {
                item.find('.settings-param__status').removeClass('active error wait');
            }
            item.removeClass('hideInstall');
        }, 100);

        setTimeout(function() {
            location.reload();
        }, 1000);
    }

    function checkPlugin(url) {
        var plugins = Lampa.Storage.get('plugins', '[]');
        plugins = JSON.parse(plugins);
        for (var q = 0; q < plugins.length; q++) {
            if (plugins[q].url == url) {
                return plugins[q].status;
            }
        }
        return 0;
    }

    // Регулярные настройки из оригинала
    Lampa.Storage.set('needReboot', false);
    Lampa.Storage.set('needRebootSettingExit', false);

    // Функция модального окна из оригинала
    function showReload(reloadText) {
        if (document.querySelector('.modal') == null) {
            Lampa.Modal.open({
                title: '',
                align: 'center',
                zIndex: 300,
                html: $('<div class="about">' + reloadText + '</div>'),
                buttons: [{
                    name: 'Нет',
                    onSelect: function() {
                        $('.modal').remove();
                        Lampa.Controller.toggle('content');
                    }
                }, {
                    name: 'Да',
                    onSelect: function() {
                        window.location.reload();
                    }
                }]
            });
        }
    }

    // Проверка готовности (из оригинала)
    if (typeof Lampa === 'undefined' || !Lampa.SettingsApi) {
        setTimeout(addonStart, 100);
        return;
    }

    // Проверка наличия папки interface в plugins (из оригинала)
    var folderExists = false;
    for (var x = 0; x < Lampa.SettingsApi.params.length; x++) {
        if (Lampa.SettingsApi.params[x].component === 'plugins' && Lampa.SettingsApi.params[x].param && Lampa.SettingsApi.params[x].param.name === 'addinterfaceplugin') {
            folderExists = true;
            break;
        }
    }

    if (!folderExists) {
        // Добавление папки в plugins с оригинальной иконкой (как в оригинале для interface)
        Lampa.SettingsApi.addParam({
            component: 'plugins',
            param: {
                name: 'addinterfaceplugin',
                type: 'folder',
                default: true,
                field: {
                    name: icon_add_interface_plugin,
                    description: 'Плагины интерфейса и тем'
                },
                onRender: function(item) {
                    item.find('.settings-folder__name').css('color', '#f3d900');
                    item.on('hover:enter', function() {
                        Lampa.Settings.open('addinterfaceplugin');
                    });
                }
            }
        });
    }

    // Проверка компонента addinterfaceplugin (из оригинала)
    var componentExists = false;
    for (var y = 0; y < Lampa.SettingsApi.components.length; y++) {
        if (Lampa.SettingsApi.components[y].name === 'addinterfaceplugin') {
            componentExists = true;
            break;
        }
    }

    if (!componentExists) {
        // Добавление компонента (как в оригинале)
        Lampa.SettingsApi.addComponent({
            name: 'addinterfaceplugin',
            type: 'folder',
            icon: 'interface',
            default: true
        });
    }

    // Проверка параметра drxaos_themes (из оригинала)
    var paramExists = false;
    for (var z = 0; z < Lampa.SettingsApi.params.length; z++) {
        if (Lampa.SettingsApi.params[z].component === 'addinterfaceplugin' && Lampa.SettingsApi.params[z].param && Lampa.SettingsApi.params[z].param.name === 'drxaos_themes') {
            paramExists = true;
            break;
        }
    }

    if (!paramExists) {
        // Добавление параметра (копия оригинальной структуры для TMDB Proxy)
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
                    }
                    if (value == '2') {
                        var pluginToRemoveUrl = pluginUrl;
                        deletePlugin(pluginToRemoveUrl, nthChildIndex);
                    }
                },
                onRender: function(item) {
                    item.css('color', '#f3d900');
                    item.addClass('hideInstall');

                    var myResult = checkPlugin('https://novyx0.github.io/my-plugins/drxaos_themes.js');
                    setTimeout(function() {
                        item.append('<div class="settings-param__status"></div>');
                        var statusDiv = item.find('.settings-param__status');
                        if (myResult == 1) {
                            statusDiv.removeClass('active error wait').addClass('active');
                        } else {
                            statusDiv.removeClass('active error wait').addClass('wait').css('background-color', '#ffa500');
                        }
                    }, 100);

                    // Установка nthChildIndex на hover (как в оригинале)
                    item.on('hover:enter', function() {
                        nthChildIndex = $(this).index();
                        console.log('nthChildIndex:', nthChildIndex);
                    });
                }
            }
        });
    } else {
        // Обновление статуса если уже существует (как в оригинале)
        var myResult = checkPlugin('https://novyx0.github.io/my-plugins/drxaos_themes.js');
        setTimeout(function() {
            var item = $('[data-name="drxaos_themes"]');
            if (item.length) {
                if (!item.find('.settings-param__status').length) {
                    item.append('<div class="settings-param__status"></div>');
                }
                var statusDiv = item.find('.settings-param__status');
                if (myResult == 1) {
                    statusDiv.removeClass('active error wait').addClass('active');
                    item.addClass('hideInstall');
                } else {
                    statusDiv.removeClass('active error wait').addClass('wait').css('background-color', '#ffa500');
                }
            }
        }, 100);
    }

    console.log('Interface Themes Manager initialized like original');
}

// Запуск (как в оригинале)
addonStart();
