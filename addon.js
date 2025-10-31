(function () {
    'use strict';

    function addonStart() {
        
        /*
         * * * Иконки разделов плагина (только для интерфейса)
         */
        var icon_add_interface_plugin = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><path fill="currentColor" d="M18 8a2 2 0 1 1-4 0a2 2 0 0 1 4 0"/><path fill="currentColor" fill-rule="evenodd" d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.088c0 1.909 0 3.471-.104 4.743c-.104 1.28-.317 2.347-.795 3.235q-.314.586-.785 1.057c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.793-.793-1.203-1.78-1.42-3.006c-.215-1.203-.254-2.7-.262-4.558Q1.25 12.792 1.25 12v-.058c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386v.844l1.001-.876a2.3 2.3 0 0 1 3.141.104l4.29 4.29a2 2 0 0 0 2.564.222l.298-.21a3 3 0 0 1 3.732.225l2.83 2.547c.286-.598.455-1.384.545-2.493c.098-1.205.099-2.707.099-4.653c0-2.378-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176" clip-rule="evenodd"/></svg></div><div style="font-size:1.3em">Интерфейс</div></div>';
        var nthChildIndex = null; // Объявляем переменную для хранения индекса nth-child
        
        /* Регулярно вызываемые функции */
        Lampa.Storage.set('needReboot', false);
        Lampa.Storage.set('needRebootSettingExit', false);
        
        /* Запрос на перезагрузку в модальном окне */
        function showReload(reloadText){
            if (document.querySelector('.modal') == null) {
                Lampa.Modal.open({
                    title: '',
                    align: 'center',
                    zIndex: 300,
                    html: $('<div class="about">' + reloadText + '</div>'),
                    buttons: [{
                        name: 'Нет',
                        onSelect: function onSelect() {
                            $('.modal').remove();
                            Lampa.Controller.toggle('content')
                        }
                    }, {
                        name: 'Да',
                        onSelect: function onSelect() {
                            window.location.reload();
                        }
                    }]
                });
            }
        }

        /* Функция анимации установки плагина */
        function showLoadingBar() {
            // Создаем элемент для полосы загрузки
            var loadingBar = document.createElement('div');
            loadingBar.className = 'loading-bar';
            loadingBar.style.position = 'fixed';
            loadingBar.style.top = '50%';
            loadingBar.style.left = '50%';
            loadingBar.style.transform = 'translate(-50%, -50%)'; // Центрируем по центру
            loadingBar.style.zIndex = '9999';
            loadingBar.style.display = 'none';
            loadingBar.style.width = '30em';
            loadingBar.style.height = '2.5em'; 
            loadingBar.style.backgroundColor = '#595959';
            loadingBar.style.borderRadius = '4em';

            // Создаем элемент для индикатора загрузки
            var loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.style.position = 'absolute';
            loadingIndicator.style.left = '0';
            loadingIndicator.style.top = '0';
            loadingIndicator.style.bottom = '0';
            loadingIndicator.style.width = '0';
            loadingIndicator.style.backgroundColor = '#64e364';
            loadingIndicator.style.borderRadius = '4em';

            // Создаем элемент для отображения процента загрузки
            var loadingPercentage = document.createElement('div');
            loadingPercentage.className = 'loading-percentage';
            loadingPercentage.style.position = 'absolute';
            loadingPercentage.style.top = '50%';
            loadingPercentage.style.left = '50%';
            loadingPercentage.style.transform = 'translate(-50%, -50%)';
            loadingPercentage.style.color = '#fff';
            loadingPercentage.style.fontWeight = 'bold';
            loadingPercentage.style.fontSize = '1.7em';

            // Добавляем элементы на страницу
            loadingBar.appendChild(loadingIndicator);
            loadingBar.appendChild(loadingPercentage);
            document.body.appendChild(loadingBar);

            // Отображаем полосу загрузки
            loadingBar.style.display = 'block';

            // Анимация с использованием setTimeout
            var startTime = Date.now();
            var duration = 1000; // 1 секунда
            var interval = setInterval(function() {
                var elapsed = Date.now() - startTime;
                var progress = Math.min((elapsed / duration) * 100, 100);

                loadingIndicator.style.width = progress + '%';
                loadingPercentage.textContent = Math.round(progress) + '%';

                if (elapsed >= duration) {
                    clearInterval(interval);
                    setTimeout(function() {
                        loadingBar.style.display = 'none';
                        loadingBar.parentNode.removeChild(loadingBar);
                    }, 250);
                }
            }, 16);
        }

        /* Функция анимации удаления плагина */
        function showDeletedBar() {
            // Создаем элемент для полосы загрузки
            var loadingBar = document.createElement('div');
            loadingBar.className = 'loading-bar';
            loadingBar.style.position = 'fixed';
            loadingBar.style.top = '50%';
            loadingBar.style.left = '50%';
            loadingBar.style.transform = 'translate(-50%, -50%)'; // Центрируем по центру
            loadingBar.style.zIndex = '9999';
            loadingBar.style.display = 'none';
            loadingBar.style.width = '30em';
            loadingBar.style.height = '2.5em';
            loadingBar.style.backgroundColor = '#595959';
            loadingBar.style.borderRadius = '4em';

            // Создаем элемент для индикатора загрузки
            var loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.style.position = 'absolute';
            loadingIndicator.style.left = '0';
            loadingIndicator.style.top = '0';
            loadingIndicator.style.bottom = '0';
            loadingIndicator.style.width = '0';
            loadingIndicator.style.backgroundColor = '#ff2121';
            loadingIndicator.style.borderRadius = '4em';

            // Создаем элемент для отображения процента загрузки
            var loadingPercentage = document.createElement('div');
            loadingPercentage.className = 'loading-percentage';
            loadingPercentage.style.position = 'absolute';
            loadingPercentage.style.top = '50%';
            loadingPercentage.style.left = '50%';
            loadingPercentage.style.transform = 'translate(-50%, -50%)';
            loadingPercentage.style.color = '#fff';
            loadingPercentage.style.fontWeight = 'bold';
            loadingPercentage.style.fontSize = '1.7em';

            // Добавляем элементы на страницу
            loadingBar.appendChild(loadingIndicator);
            loadingBar.appendChild(loadingPercentage);
            document.body.appendChild(loadingBar);

            // Отображаем полосу загрузки
            loadingBar.style.display = 'block';

            // Анимация с использованием setTimeout
            var startTime = Date.now();
            var duration = 1000; // 1 секунда
            var interval = setInterval(function() {
                var elapsed = Date.now() - startTime;
                var progress = 100 - Math.min((elapsed / duration) * 100, 100);

                loadingIndicator.style.width = progress + '%';
                loadingPercentage.textContent = Math.round(progress) + '%';

                if (elapsed >= duration) {
                    clearInterval(interval);
                    setTimeout(function() {
                        loadingBar.style.display = 'none';
                        loadingBar.parentNode.removeChild(loadingBar);
                    }, 250);
                }
            }, 16);
        }

        /* Следим за настройками */
        function settingsWatch() {
            /* проверяем флаг перезагрузки и ждём выхода из настроек */
            if (Lampa.Storage.get('needRebootSettingExit')) {
                var intervalSettings = setInterval(function() {
                    var elementSettings = $('#app > div.settings > div.settings__content.layer--height > div.settings__body > div');
                    if (!elementSettings.length > 0){
                        clearInterval(intervalSettings);
                        showReload('Для полного удаления плагина перезагрузите приложение!');
                    }
                }, 1000)
            }
        }

        function itemON(sourceURL, sourceName, sourceAuthor, itemName) {
            if ($('DIV[data-name="' + itemName + '"]').find('.settings-param__status').hasClass('active')) {
                Lampa.Noty.show("Плагин уже установлен!");
            } else if ($('DIV[data-name="' + itemName + '"]').find('.settings-param__status').css('background-color') === 'rgb(255, 165, 0)') {
                Lampa.Noty.show("Плагин уже установлен, но отключен в расширениях!");
            } else {
                if (!Lampa.Storage.get('needReboot')) {
                    var pluginsArray = Lampa.Storage.get('plugins');
                    pluginsArray.push({
                        "author": sourceAuthor,
                        "url": sourceURL,
                        "name": sourceName,
                        "status": 1
                    });
                    Lampa.Storage.set('plugins', pluginsArray);
                    var script = document.createElement ('script');
                    script.src = sourceURL;
                    document.getElementsByTagName ('head')[0].appendChild (script);
                    showLoadingBar();
                    setTimeout(function() {
                        Lampa.Settings.update();
                        Lampa.Noty.show("Плагин " + sourceName + " успешно установлен")
                    }, 1500);
                    setTimeout(function() {
                        if (nthChildIndex) {
                            var F = document.querySelector("#app > div.settings.animate > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(" + nthChildIndex + ")");
                            Lampa.Controller.focus(F);
                            Lampa.Controller.toggle('settings_component');
                        } else {
                            console.error("Ошибка: Элемент с индексом nth-child " + nthChildIndex + " не найден.");
                        }
                    }, 2000);
                }
            }
        }

        function hideInstall() {
            $("#hideInstall").remove();
            $('body').append('<div id="hideInstall"><style>div.settings-param__value{opacity: 0%!important;display: none;}</style><div>')
        }

        function deletePlugin(pluginToRemoveUrl) {
            var plugins = Lampa.Storage.get('plugins');
            var updatedPlugins = plugins.filter(function(obj) {return obj.url !== pluginToRemoveUrl});
            Lampa.Storage.set('plugins', updatedPlugins);
            setTimeout(function() {
                Lampa.Settings.update();
                Lampa.Noty.show("Плагин успешно удален");
            }, 1500);
            setTimeout(function() {
                if (nthChildIndex) {
                    var F = document.querySelector("#app > div.settings.animate > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(" + nthChildIndex + ")");
                    Lampa.Controller.focus(F);
                    Lampa.Controller.toggle('settings_component');
                } else {
                    console.error("Ошибка: Элемент с индексом nth-child " + nthChildIndex + " не найден.");
                }
            }, 2000);
            Lampa.Storage.set('needRebootSettingExit', true);
            settingsWatch();
            showDeletedBar();
        };

        function checkPlugin(pluginToCheck) {
            var plugins = Lampa.Storage.get('plugins');
            var checkResult = plugins.filter(function(obj) {return obj.url == pluginToCheck});
            console.log('search', 'checkResult: ' + JSON.stringify(checkResult));
            console.log('search', 'pluginToCheck: ' + pluginToCheck);
            if (JSON.stringify(checkResult) !== '[]') {return true} else {return false}
        };

        // Функция для получения индекса параметра
        function focus_back(event) {
            var targetElement = event.target;
            var parentElement = targetElement.parentElement;
            var children = Array.from(parentElement.children);
            var index = children.indexOf(targetElement);
            var nthChildIndex = index + 1;
            return nthChildIndex;
        }

        // Проверка готовности Lampa
        if (typeof Lampa === 'undefined' || !Lampa.SettingsApi) {
            setTimeout(addonStart, 100);
            return;
        }

        /* Компонент для интерфейса */
        var componentExists = false;
        for (var i = 0; i < Lampa.SettingsApi.components.length; i++) {
            if (Lampa.SettingsApi.components[i].name === 'addinterfaceplugin') {
                componentExists = true;
                break;
            }
        }
        if (!componentExists) {
            Lampa.SettingsApi.addComponent({
                component: 'addinterfaceplugin',
                name: 'Интерфейс',
                icon: icon_add_interface_plugin
            });
        }

        /* Добавление папки в plugins */
        var folderExists = false;
        for (var j = 0; j < Lampa.SettingsApi.params.length; j++) {
            if (Lampa.SettingsApi.params[j].component === 'plugins' && Lampa.SettingsApi.params[j].param && Lampa.SettingsApi.params[j].param.name === 'addinterfaceplugin') {
                folderExists = true;
                break;
            }
        }
        if (!folderExists) {
            Lampa.SettingsApi.addParam({
                component: 'plugins',
                param: {
                    name: 'addinterfaceplugin',
                    type: 'folder',
                    html: icon_add_interface_plugin,
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

        /* Listener для открытия main */
        Lampa.Settings.listener.follow('open', function (e) {
            if (e.name == 'main') {
                hideInstall();
                setTimeout(function() {
                    $('div[data-component=plugins]').before($('div[data-component=addinterfaceplugin]'));
                }, 30);
            }
        });

        /* Добавление параметра drxaos_themes в addinterfaceplugin */
        var paramExists = false;
        for (var k = 0; k < Lampa.SettingsApi.params.length; k++) {
            if (Lampa.SettingsApi.params[k].component === 'addinterfaceplugin' && Lampa.SettingsApi.params[k].param && Lampa.SettingsApi.params[k].param.name === 'drxaos_themes') {
                paramExists = true;
                break;
            }
        }
        if (!paramExists) {
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
                    html: '<div class="settings-param selector" data-name="drxaos_themes" data-type="select"><div class="settings-param__name">DrXaos Themes</div><div class="settings-param__value">Темы интерфейса от DrXaos</div><div class="settings-param__status"></div></div>',
                    onChange: function(value) {
                        var pluginUrl = 'https://novyx0.github.io/my-plugins/drxaos_themes.js';
                        var itemName = 'drxaos_themes';
                        if (value == '1') {
                            itemON(pluginUrl, 'DrXaos Themes', '@novyx0', itemName);
                        }
                        if (value == '2') {
                            deletePlugin(pluginUrl);
                        }
                    },
                    onRender: function(item) {
                        item.find('.settings-param__name').css('color', '#f3d900');
                        item.addClass('hideInstall');

                        var myResult = checkPlugin('https://novyx0.github.io/my-plugins/drxaos_themes.js');
                        setTimeout(function() {
                            if (!item.find('.settings-param__status').length) {
                                item.append('<div class="settings-param__status"></div>');
                            }
                            var statusDiv = item.find('.settings-param__status');
                            if (myResult) {
                                statusDiv.removeClass('active error wait').addClass('active');
                            } else {
                                statusDiv.removeClass('active error wait').addClass('wait').css('background-color', '#ffa500');
                            }
                        }, 100);

                        item.on('hover:enter', function(e) {
                            nthChildIndex = focus_back(e);
                            console.log('nthChildIndex:', nthChildIndex);
                        });
                    }
                }
            });
        } else {
            var myResult = checkPlugin('https://novyx0.github.io/my-plugins/drxaos_themes.js');
            setTimeout(function() {
                var item = $('[data-name="drxaos_themes"]');
                if (item.length) {
                    if (!item.find('.settings-param__status').length) {
                        item.append('<div class="settings-param__status"></div>');
                    }
                    var statusDiv = item.find('.settings-param__status');
                    if (myResult) {
                        statusDiv.removeClass('active error wait').addClass('active');
                        item.addClass('hideInstall');
                    } else {
                        statusDiv.removeClass('active error wait').addClass('wait').css('background-color', '#ffa500');
                    }
                }
            }, 100);
        }

        console.log('Interface Themes Manager ready - original structure');

        /* Счётчик Яндекса */    
        (function(m, e, t, r, i, k, a) {
            m[i] = m[i] || function() {
                (m[i].a = m[i].a || []).push(arguments)
            };
            m[i].l = 1 * new Date();
            for(var j = 0; j < document.scripts.length; j++) {
                if(document.scripts[j].src === r) {
                    return;
                }
            }
            k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
        })
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(93937344, "init", {clickmap: true,trackLinks: true,accurateTrackBounce: true})
        var METRIKA = '<noscript><div><img src="https://mc.yandex.ru/watch/93937344" style="position:absolute; left:-9999px;" alt="" /></div></noscript>';
        $('body').append(METRIKA);
    } // /* addonStart */

    if (!!window.appready) addonStart();
    else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') addonStart()});

})();
