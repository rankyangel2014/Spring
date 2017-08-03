(function() {
'use strict';

angular
    .module('common')
    .factory('jnTitleMenu', [
        function (
        ) {
            var service = {};

            var Menu = function (opt) {
                var self = this;
                var activePageEl, menuEl, itemsEl, itemEl;

                activePageEl = document.querySelector('[nav-view="active"]');

                menuEl = document.createElement('div');
                menuEl.classList.add('jn-title-menu');
                menuEl.addEventListener('click', function (e) {
                    self.hide();
                });
                activePageEl.appendChild(menuEl);

                itemsEl = document.createElement('ol');
                itemsEl.classList.add('jn-menu-items');
                menuEl.appendChild(itemsEl);

                opt.items.forEach(function (e) {
                    itemEl = document.createElement('li');
                    itemEl.classList.add('jn-menu-item');
                    itemEl.innerHTML = e.template;

                    if (e.onTap) {
                        itemEl.addEventListener('click', e.onTap);
                    }

                    itemsEl.appendChild(itemEl);
                });

                self._el = menuEl;
            };

            Menu.prototype.construtor = Menu;

            Menu.prototype.show = function () {
                this._el.classList.add('show');
            };

            Menu.prototype.hide = function () {
                this._el.classList.remove('show');
            };

            service.create = function (opt) {
                return new Menu(opt);
            };

            return service;
        }
    ]);
})();
