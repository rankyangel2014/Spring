(function () {
'use strict';

angular
    .module('common')
    .directive('jnNumberFormat', [
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
            
            /* 
        	将数值四舍五入后格式化. 
        	@param num 数值(Number或者String) 
        	@param cent 要保留的小数位(Number) 
        	@param isThousand 是否需要千分位 0:不需要,1:需要(数值类型); 
        	@return 格式的字符串,如'1,234,567.45' 
        	@type String 
        	*/ 
			var formatNumber = function(num, cent,
										isThousand) {
									num = num.toString().replace(/\$|\,/g, '');
									if (isNaN(num))// 检查传入数值为数值类型.
										num = "0";
									if (isNaN(cent))// 确保传入小数位为数值型数值.
										cent = 0;
									cent = parseInt(cent);
									cent = Math.abs(cent);// 求出小数位数,确保为正整数.
									if (isNaN(isThousand))// 确保传入是否需要千分位为数值类型.
										isThousand = 0;
									isThousand = parseInt(isThousand);
									if (isThousand < 0)
										isThousand = 0;
									if (isThousand >= 1) // 确保传入的数值只为0或1
										isThousand = 1;
									var sign = (num == (num = Math.abs(num)));// 获取符号(正/负数)
									// Math.floor:返回小于等于其数值参数的最大整数
									num = Math.floor(num * Math.pow(10, cent)
											+ 0.50000000001);// 把指定的小数位先转换成整数.多余的小数位四舍五入.
									var cents = num % Math.pow(10, cent); // 求出小数位数值.
									num = Math.floor(num / Math.pow(10, cent))
											.toString();// 求出整数位数值.
									cents = cents.toString();// 把小数位转换成字符串,以便求小数位长度.
									while (cents.length < cent) {// 补足小数位到指定的位数.
										cents = "0" + cents;
									}
									if (isThousand == 0) // 不需要千分位符.
										return (((sign) ? '' : '-') + num + '.' + cents);
									// 对整数部分进行千分位格式化.
									for ( var i = 0; i < Math
											.floor((num.length - (1 + i)) / 3); i++)
										num = num.substring(0, num.length
												- (4 * i + 3))
												+ ','
												+ num.substring(num.length
														- (4 * i + 3));
									return (((sign) ? '' : '-') + num + '.' + cents);
								};
			
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
                		numFormat = '0.00';
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
                    	    	jnHelper.alert("请输入有效的数字！");
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
                    
                    /*
                    $scope.$watch('value', function (newVal, oldVal) {
                    	console.info('watch value...' + newVal + ';' + oldVal);
                    	newVal = String(newVal);
                    	if(!isNumber(newVal)){
                    		$scope.value = '';
                    	}else{
                    		if(newVal.length > maxLength){
                    			$element.addClass('err');
                    			//jnHelper.alert("长度超出限制！");
                    		}else{
                    			$element.removeClass('err');
                    		}
                    	}
                    	
                		/*$scope.ngModel = $filter('number')(newVal, 2);
                		$scope.name = new Number(newVal).toFixed(2);
                    	var v = formatNumber(newVal, 2, 1);
                    	var v1 = xF(newVal, '0');
                    	var v2 = xF(newVal, '0.00');
                    	var v3 = xF(newVal, '0,0.00');
                    	var v4 = xF(newVal, '0,0');
                    	console.info(">>>v1:" + v1 + ';v2:' + v2 + ';v3:' + v3 + ';v4:' + v4);
                        console.info('watch value...' + newVal + ';' + $scope.name + ';' + v3);
                    });*/
                },
            };
        }
    ]);

})();
