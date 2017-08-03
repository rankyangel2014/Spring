(function () {
'use strict';

angular
    .module('common')
    .directive('jnCurrencyFormat', [
        'jnHelper', '$filter', 
        function (jnHelper, $filter) {
            var isNumberObj = function (obj) {
                return Object.prototype.toString.call(obj) === '[object Number]';
            };
            
            // 非负浮点数（正浮点数 + 0 可带千分位）
            var isNumber = function (str) {
            	return (/^(\d+(,\d{3})*.(\d+)?)$/).test(str) || (/^\d*(\.)?$/).test(str);
            };
            
            var flag = true;
			
		    /**
		     * 格式化数字
		     * 
		     * @author jiangquan
		     * @date 2016-06-15
		     * @param v
		     *      要被格式化的数字
		     * @param format
		     *      格式化字符串(支持自定义，默认显示千分位并保留两位小数)
		     *      '0'：不带千分位和小数点
		     *      '0.00'：保留两位小数
		     *      '0,0.00'：带千分位并保留两位小数
		     */
			var xF = function(v, format) {
	            if (!format) {
	                return v;
	            }
	            
	            if (isNaN(v)) {
	                return '';
	            }
	            var comma = ',',
	                dec   = '.',
	                i18n  = false,
	                neg   = v < 0;

	            v = Math.abs(v);
	            if (format.substr(format.length - 2) == '/i') {
	                format = format.substr(0, format.length - 2);
	                i18n   = true;
	                comma  = '.';
	                dec    = ',';
	            }

	            var hasComma = format.indexOf(comma) != -1,
	                psplit   = (i18n ? format.replace(/[^\d\,]/g, '') : format.replace(/[^\d\.]/g, '')).split(dec);

	            if (1 < psplit.length) {
	                v = v.toFixed(psplit[1].length);
	            } else if(2 < psplit.length) {
	                throw ('NumberFormatException: invalid format, formats should have no more than 1 period: ' + format);
	            } else {
	                v = v.toFixed(0);
	            }

	            var fnum = v.toString();

	            psplit = fnum.split('.');

	            if (hasComma) {
	                var cnum = psplit[0], 
	                    parr = [], 
	                    j    = cnum.length, 
	                    m    = Math.floor(j / 3),
	                    n    = cnum.length % 3 || 3,
	                    i;

	                for (i = 0; i < j; i += n) {
	                    if (i != 0) {
	                        n = 3;
	                    }
	                    
	                    parr[parr.length] = cnum.substr(i, n);
	                    m -= 1;
	                }
	                fnum = parr.join(comma);
	                if (psplit[1]) {
	                    fnum += dec + psplit[1];
	                }
	            } else {
	                if (psplit[1]) {
	                    fnum = psplit[0] + dec + psplit[1];
	                }
	            }

	            return (neg ? '-' : '') + format.replace(/[\d,?\.?]+/, fnum);
	        };		
            
            return {
                template: '\
                    <input\
                        name="{{name}}"\
                	    placeholder="{{placeholder}}"\
                        type="text"\
                	    maxlength="{{maxlen}}"\
                        ng-model="value"\
                	    ng-readonly="ngReadonly"\
                    />',

                restrict: 'E',

                scope: {
                    ngReadonly: '=',
                    ngDisabled: '=',
                    ngModel: '=',
                    name: '@',
                    placeholder: '@',
                    maxlen: '@'
                },

                link: function ($scope, $element, $attr) {
                	// 获取相关属性
                	var numFormat = $attr.numformat;
                	var maxLength = $attr.maxlen;
                	
                	// 检查格式化字符串属性是否设置，否则给予默认值
                	if(numFormat == '' || numFormat == undefined){
                		numFormat = '0,0.00';
                	}
                	
                	// 检查最大长度属性是否设置，否则给予默认值
                	if(maxLength == '' || maxLength == undefined){
                		maxLength = 16;
                	}
                	
                	// 绑定相关监听事件
                	$element.children('input').on('click', function (event) {
                		//console.info('fire focus...');
                		flag=false;
                		$scope.$apply(function(){
                			var val = $scope.value;
                    		if(val){
                    			val = String(parseFloat(String(val).replace(/,/g, "")));
                    			if(val == '0'){
                    				val = '';
                    			}
                    			$scope.value = val;
                    		}else{
                    			if(!$scope.ngDisabled){
                    				if(val == 0){
                    					val = '';
                    					$scope.value = val;
                    				}
                    			}
                    		}
                		});
                	});
                	
                	$element.children('input').on('input', function (event) {
                		//console.info('fire input...' + $scope.value);
                		flag = false;
                		$scope.$apply(function(){
                			var newVal = $scope.value.replace(/,/g, "");
                    	    if(isNumber(newVal)){
                    	    	$scope.ngModel = newVal.replace(/,/g, "");
                    	    	if(newVal.length > maxLength){
                        			$element.addClass('err');
                        		}else{
                        			$element.removeClass('err');
                        		}
                    	    }else{
                    	    	jnHelper.alert("请输入有效的金额！");
                    	    	$scope.value = xF('0', numFormat);
                    	    }
            	    	});
                	});
                	
                	$element.children('input').on('blur', function (event) {
                		//console.info('fire blur...' + $scope.value);
                		flag = true;
                		$scope.$apply(function(){
                			var newVal = $scope.value.replace(/,/g, "");
                    	    if(isNumber(newVal)){
                    	    	$scope.value = xF(newVal, numFormat);
                    	    	if($scope.value.length > maxLength){
                        			$element.addClass('err');
                        		}else{
                        			$element.removeClass('err');
                        		}
                    	    	
                    	    	if($element.hasClass('err')){
                    	    		//$scope.value = xF(newVal, numFormat);
                    	    		//$element.children('input').triggerHandler('click');
                    	    	}
                    	    }else{
                    	    	$scope.value = '';
                    	    }
            	    	});
                	});
                	
                	
                	// 数据监视
                    $scope.$watch('ngModel', function (newVal, oldVal) {
                        //console.info('watch ngModel...' + newVal + ';' + oldVal);
                        if(flag){
                        	$scope.value = xF(newVal, numFormat);
                        }
                    });
                },
            };
        }
    ]);

})();
