/*
 * ion-autocomplete 0.3.2
 * Copyright 2016 Danny Povolotski
 * Copyright modifications 2016 Guy Brand
 * https://github.com/guylabs/ion-autocomplete
 */
(function() {

    'use strict';

    angular.module('ion-autocomplete', []).directive('ionAutocomplete', [
        '$ionicBackdrop', '$ionicScrollDelegate', '$document', '$q', '$parse', '$interpolate', '$ionicPlatform', '$compile', '$templateRequest',
        function($ionicBackdrop, $ionicScrollDelegate, $document, $q, $parse, $interpolate, $ionicPlatform, $compile, $templateRequest) {
            return {
                require: ['ngModel', 'ionAutocomplete'],
                restrict: 'A',
                priority: 1,
                terminal: true,
                scope: {},
                bindToController: {
                    ngModel: '=',
                    ngDisabled: '=',
                    templateData: '=',
                    itemsMethod: '&',
                    itemsClickedMethod: '&',
                    itemsRemovedMethod: '&',
                    modelToItemMethod: '&',
                    cancelButtonClickedMethod: '&',
                    confirmButtonClickedMethod: "&",
                    moreRecordButtonClickedMethod: "&",
                    cancelLabel: '@',
                    confirmLabel: '@',
                    titleLabel: '@',
                    selectItemsLabel: '@',
                    selectedItemsLabel: '@',
                    templateUrl: '@',
                    itemValueKey: '@',
                    itemViewValueKey: '@',
                    moreRecord: '@', //用于分页
                    custNo: '@',
                    custType: '@',
                    custName: '@',
                    cardNo: '@',
                    cardType: '@',
                    phoneNo: '@'
                },
                controllerAs: 'viewModel',
                controller: ['$attrs', '$timeout', '$scope', function($attrs, $timeout, $scope) {

                    var valueOrDefault = function(value, defaultValue) {
                        return !value ? defaultValue : value;
                    };

                    var controller = this;

                    // set the default values of the one way binded attributes
                    $timeout(function() {

                        controller.cancelLabel = valueOrDefault(controller.cancelLabel, '取消');
                        controller.confirmLabel = valueOrDefault(controller.confirmLabel, '确定');
                        controller.titleLabel = valueOrDefault(controller.titleLabel, '请选择');
                        controller.selectItemsLabel = valueOrDefault(controller.selectItemsLabel, "待选列表:");
                        // controller.selectedItemsLabel = valueOrDefault(controller.selectedItemsLabel, $interpolate("Selected items{{maxSelectedItems ? ' (max. ' + maxSelectedItems + ')' : ''}}:")(controller));
                        controller.selectedItemsLabel = valueOrDefault(controller.selectedItemsLabel, '当前选择:');
                        controller.templateUrl = valueOrDefault(controller.templateUrl, undefined);
                        controller.itemValueKey = valueOrDefault(controller.itemValueKey, undefined);
                        controller.itemViewValueKey = valueOrDefault(controller.itemViewValueKey, undefined);
                    });

                    // set the default values of the passed in attributes
                    this.maxSelectedItems = valueOrDefault($attrs.maxSelectedItems, "1");
                    this.itemsMethodValueKey = valueOrDefault($attrs.itemsMethodValueKey, undefined);
                    this.componentId = valueOrDefault($attrs.componentId, undefined);
                    this.loadingIcon = valueOrDefault($attrs.loadingIcon, undefined);
                    this.manageExternally = valueOrDefault($attrs.manageExternally, "false");
                    this.ngModelOptions = valueOrDefault($scope.$eval($attrs.ngModelOptions), {});
                    this.placeholder = valueOrDefault($attrs.placeholder, '输入客户名称搜索');

                    // loading flag if the items-method is a function
                    this.showLoadingIcon = false;

                    // the items, selected items and the query for the list
                    this.searchItems = [];
                    this.selectedItems = [];
                    this.searchQuery = undefined;

                    this.isArray = function(array) {
                        return angular.isArray(array);
                    };
                }],
                link: function(scope, element, attrs, controllers) {

                    // get the two needed controllers
                    var ngModelController = controllers[0];
                    var ionAutocompleteController = controllers[1];

                    // use a random css class to bind the modal to the component
                    ionAutocompleteController.randomCssClass = "ion-autocomplete-random-" + Math.floor((Math.random() * 1000) + 1);

                    var template = [
                        '<div class="ion-autocomplete-container ' + ionAutocompleteController.randomCssClass + ' modal" style="display: none;">',
                        '<div class="bar bar-header bar-positive item-input-inset">',
                        '<button class="button button-clear ion-autocomplete-cancel" ng-click="viewModel.cancelClick()">{{viewModel.cancelLabel}}</button>',
                        '<h1 class="title">{{viewModel.titleLabel}}</h1>',
                        '<button class="ion-autocomplete-cancel button button-clear" ng-click="viewModel.confirmClick()">{{viewModel.confirmLabel}}</button>',
                        '</div>',
                        '<ion-content class="has-header">',
                        '<div class="bar bar-header item-input-inset" style="background-image:none">',
                        '<label class="item-input-wrapper">',
                        '<i class="icon placeholder-icon"></i>',
                        '<input type="search" class="ion-autocomplete-search" ng-model="viewModel.searchQuery" ng-change="viewModel.searchQueryFun()" ng-model-options="viewModel.ngModelOptions" placeholder="{{viewModel.placeholder}}"/>',
                        '</label>',
                        '</div>',
                        '<ion-item class="ion-autocomplete-item" ng-class="{\'jn-item-selected\' : viewModel.getItemValue(item, viewModel.custNo) == viewModel.getItemValue(viewModel.selectedItems, viewModel.custNo)}" ng-repeat="item in viewModel.searchItems track by $index" ng-click="viewModel.selectItem(item)">',
                        '<div class="jn-item-title jn-name" cust-type="{{viewModel.getItemValue(item, viewModel.custType)}}">{{viewModel.getItemValue(item, viewModel.custName)}}</div>',
                        '<div class="jn-tel-no" ng-if="viewModel.getItemValue(item, viewModel.phoneNo)">{{viewModel.getItemValue(item, viewModel.phoneNo)}}</div>',
                        '<div class="jn-card-id" ng-if="viewModel.getItemValue(item, viewModel.cardNo)">{{viewModel.getItemValue(item, viewModel.cardNo)}}</div>',
                        '</ion-item>',
                        '<div ng-if="0 === viewModel.searchItems.length" class="no_record">无符合条件的记录</div>',
                        '<button ng-click="viewModel.moreRecord()" ng-if="viewModel.searchItems[viewModel.searchItems.length-1].moreRecord" class="button button-clear button-full button-positive">点击加载更多</button>',
                        '</ion-content>',
                        '</div>'
                    ].join('');

                    // load the template synchronously or asynchronously
                    $q.when().then(function() {

                        // first check if a template url is set and use this as template
                        if (ionAutocompleteController.templateUrl) {
                            return $templateRequest(ionAutocompleteController.templateUrl);
                        } else {
                            return template;
                        }
                    }).then(function(template) {

                        // compile the template
                        var searchInputElement = $compile(angular.element(template))(scope);

                        // append the template to body
                        $document.find('body').append(searchInputElement);


                        // returns the value of an item
                        ionAutocompleteController.getItemValue = function(item, key) {

                            // if it's an array, go through all items and add the values to a new array and return it
                            if (angular.isArray(item)) {
                                var items = [];
                                angular.forEach(item, function(itemValue) {
                                    if (key && angular.isObject(item)) {
                                        items.push($parse(key)(itemValue));
                                    } else {
                                        items.push(itemValue);
                                    }
                                });
                                return items;
                            } else {
                                if (key && angular.isObject(item)) {
                                    return $parse(key)(item);
                                }
                            }
                            return item;
                        };

                        //【选择item】
                        ionAutocompleteController.selectItem = function(item) {
                            //存储【选择的】item
                            ionAutocompleteController.selectedItems = item;

                            if (ionAutocompleteController.itemViewValueKey) {
                                //ionAutocompleteController.searchQuery = undefined;
                                //设置placeHolder
                                ionAutocompleteController.placeholder = item[ionAutocompleteController.itemViewValueKey];
                            }
                        };
                        
                        // 搜索事件触发
                        ionAutocompleteController.searchQueryFun = function() {
                        	
                        	 ionAutocompleteController.fetchSearchQuery(ionAutocompleteController.searchQuery, false);
                        };

//                        // 检测查询条件的变化
//                        scope.$watch('viewModel.searchQuery', function(query) {
//                        	
//                            ionAutocompleteController.fetchSearchQuery(query, false);
//                        });

                        // 根据查询条件【查询】
                        ionAutocompleteController.fetchSearchQuery = function(query, isInitializing) {

                            if (query === undefined) {
                                return;
                            }

                            if (query === null) {
                                ionAutocompleteController.placeholder = attrs.placeholder;
                                //清空选择的item
                                ionAutocompleteController.selectedItems = [];
                                ionAutocompleteController.searchItems = [];
                                scope.$apply();
                                return;
                            }

                            if (query === "") {
                                ionAutocompleteController.placeholder = attrs.placeholder;
                                //清空选择的item
                                ionAutocompleteController.selectedItems = [];
                                ionAutocompleteController.searchItems = [];
                                // return;
                            }

                            if (angular.isDefined(attrs.itemsMethod)) {

                                //清空选择的item
                                ionAutocompleteController.selectedItems = [];

                                //初始化查询参数
                                var queryObject = { query: query };
                                if (ionAutocompleteController.componentId) {
                                    queryObject = {
                                        query: query,
                                        componentId: ionAutocompleteController.componentId
                                    }
                                }

                                // 回调promise对象
                                var promise = $q.when(ionAutocompleteController.itemsMethod(queryObject));

                                promise.then(function(promiseData) {
                                    if (!promiseData) {
                                        return;
                                    }
                                    // 设置查询出的列表
                                    ionAutocompleteController.searchItems = promiseData;

                                    // 重新页面大小
                                    $ionicScrollDelegate.resize();
                                }, function(error) {
                                    return $q.reject(error);
                                }).finally(function() {});
                            }
                        };

                        var searchContainerDisplayed = false;

                        ionAutocompleteController.showModal = function() {
                            if (searchContainerDisplayed) {
                                return;
                            }

                            // show the backdrop and the search container
                            $ionicBackdrop.retain();
                            angular.element($document[0].querySelector('div.ion-autocomplete-container.' + ionAutocompleteController.randomCssClass)).css('display', 'block');

                            // hide the container if the back button is pressed
                            scope.$deregisterBackButton = $ionicPlatform.registerBackButtonAction(function() {
                                ionAutocompleteController.hideModal();
                            }, 300);

                            // get the compiled search field
                            var searchInputElement = angular.element($document[0].querySelector('div.ion-autocomplete-container.' + ionAutocompleteController.randomCssClass + ' input'));

                            // focus on the search input field
                            if (searchInputElement.length > 0) {
                                searchInputElement[0].focus();
                                setTimeout(function() {
                                    searchInputElement[0].focus();
                                }, 0);
                            }

                            // force the collection repeat to redraw itself as there were issues when the first items were added
                            $ionicScrollDelegate.resize();

                            searchContainerDisplayed = true;
                        };

                        ionAutocompleteController.hideModal = function() {
                            angular.element($document[0].querySelector('div.ion-autocomplete-container.' + ionAutocompleteController.randomCssClass)).css('display', 'none');
                            ionAutocompleteController.searchQuery = undefined;
                            $ionicBackdrop.release();
                            scope.$deregisterBackButton && scope.$deregisterBackButton();
                            searchContainerDisplayed = false;
                        };

                        // object to store if the user moved the finger to prevent opening the modal
                        var scrolling = {
                            moved: false,
                            startX: 0,
                            startY: 0
                        };

                        // store the start coordinates of the touch start event
                        var onTouchStart = function(e) {
                            scrolling.moved = false;
                            // Use originalEvent when available, fix compatibility with jQuery
                            if (typeof(e.originalEvent) !== 'undefined') {
                                e = e.originalEvent;
                            }
                            scrolling.startX = e.touches[0].clientX;
                            scrolling.startY = e.touches[0].clientY;
                        };

                        // check if the finger moves more than 10px and set the moved flag to true
                        var onTouchMove = function(e) {
                            // Use originalEvent when available, fix compatibility with jQuery
                            if (typeof(e.originalEvent) !== 'undefined') {
                                e = e.originalEvent;
                            }
                            if (Math.abs(e.touches[0].clientX - scrolling.startX) > 10 ||
                                Math.abs(e.touches[0].clientY - scrolling.startY) > 10) {
                                scrolling.moved = true;
                            }
                        };

                        // click handler on the input field to show the search container
                        var onClick = function(event) {
                            if (scope.viewModel.ngDisabled) {
                                return;
                            }

                            // only open the dialog if was not touched at the beginning of a legitimate scroll event
                            if (scrolling.moved) {
                                return;
                            }

                            // prevent the default event and the propagation
                            event.preventDefault();
                            event.stopPropagation();

                            // call the fetch search query method once to be able to initialize it when the modal is shown
                            // use an empty string to signal that there is no change in the search query
                            ionAutocompleteController.fetchSearchQuery("", true);

                            // show the ionic backdrop and the search container
                            ionAutocompleteController.showModal();
                        };

                        var isKeyValueInObjectArray = function(objectArray, key, value) {
                            if (angular.isArray(objectArray)) {
                                for (var i = 0; i < objectArray.length; i++) {
                                    if (ionAutocompleteController.getItemValue(objectArray[i], key) === value) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        };

                        // function to call the model to item method and select the item
                        var resolveAndSelectModelItem = function(modelValue) {
                            // convert the given function to a $q promise to support promises too
                            var promise = $q.when(ionAutocompleteController.modelToItemMethod({ modelValue: modelValue }));

                            promise.then(function(promiseData) {
                                // select the item which are returned by the model to item method
                                ionAutocompleteController.selectItem(promiseData);
                            }, function(error) {
                                // reject the error because we do not handle the error here
                                return $q.reject(error);
                            });
                        };

                        // if the click is not handled externally, bind the handlers to the click and touch events of the input field
                        if (ionAutocompleteController.manageExternally == "false") {
                            element.bind('touchstart', onTouchStart);
                            element.bind('touchmove', onTouchMove);
                            element.bind('touchend click focus', onClick);
                        }

                        //【取消】按钮逻辑，默认关闭modal
                        ionAutocompleteController.cancelClick = function() {
                            ionAutocompleteController.hideModal();

                            // call cancel button clicked callback
                            if (angular.isDefined(attrs.cancelButtonClickedMethod)) {
                                ionAutocompleteController.cancelButtonClickedMethod({
                                    callback: {
                                        selectedItems: angular.isArray(ionAutocompleteController.selectedItems) ? ionAutocompleteController.selectedItems.slice() : ionAutocompleteController.selectedItems,
                                        componentId: ionAutocompleteController.componentId
                                    }
                                });
                            }
                        };

                        //【确定】按钮逻辑，默认关闭modal
                        ionAutocompleteController.confirmClick = function() {
                            var selectedItem = ionAutocompleteController.selectedItems.length !== 0 ? ionAutocompleteController.selectedItems : ionAutocompleteController.searchQuery;

                            ionAutocompleteController.hideModal();


                            // call cancel button clicked callback
                            if (angular.isDefined(attrs.confirmButtonClickedMethod)) {
                                ionAutocompleteController.confirmButtonClickedMethod({
                                    callback: {
                                        selectedItem: selectedItem,
                                        componentId: ionAutocompleteController.componentId,
                                    }
                                });
                            }
                        };

                        //【加载更多】按钮逻辑
                        ionAutocompleteController.moreRecord = function() {
                            if (angular.isDefined(attrs.moreRecordButtonClickedMethod)) {
                                var queryObject = {
                                    query: ionAutocompleteController.searchQuery,
                                    componentId: ionAutocompleteController.componentId ? ionAutocompleteController.componentId : "noId",
                                    isFetchMore: 'more',
                                };

                                // 回调自定义方法，并获取promise对象
                                var promise = $q.when(ionAutocompleteController.moreRecordButtonClickedMethod(queryObject));

                                promise.then(function(promiseData) {
                                    if (!promiseData) {
                                        return;
                                    }

                                    // 加载更多
                                    ionAutocompleteController.searchItems = ionAutocompleteController.searchItems.concat(promiseData);

                                    // 重新计算大小
                                    $ionicScrollDelegate.resize();
                                }, function(error) {
                                    return $q.reject(error);
                                }).finally(function() {});
                            }
                        }


                        // remove the component from the dom when scope is getting destroyed
                        scope.$on('$destroy', function() {
                            $ionicBackdrop.release();

                            // angular takes care of cleaning all $watch's and listeners, but we still need to remove the modal
                            searchInputElement.remove();
                        });

                        // render the view value of the model
                        ngModelController.$render = function() {
                            element.val(ionAutocompleteController.getItemValue(ngModelController.$viewValue, ionAutocompleteController.itemViewValueKey));
                        };

                        // set the view value of the model
                        ngModelController.$formatters.push(function(modelValue) {
                            var viewValue = ionAutocompleteController.getItemValue(modelValue, ionAutocompleteController.itemViewValueKey);
                            return viewValue == undefined ? "" : viewValue;
                        });

                        // set the model value of the model
                        ngModelController.$parsers.push(function(viewValue) {
                            return ionAutocompleteController.getItemValue(viewValue, ionAutocompleteController.itemValueKey);
                        });

                    });

                }
            };
        }
    ]);

})();
