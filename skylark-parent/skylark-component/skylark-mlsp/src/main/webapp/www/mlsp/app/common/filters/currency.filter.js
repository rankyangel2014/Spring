/**
 * 格式化货币
 */

(function () {
'use strict';

angular
    .module('common')
    .filter('jnCurrency', [
        '$filter',
        function ($filter) {
            return function (input) {
                return $filter('currency')(input, '');
            };
        }
    ])
	.filter('jnCurrencyW', [
       '$filter',
       function ($filter) {
    	   return function (input) {
    		   if(input / 10000 < 1 ){
    			   return $filter('currency')(input, '') + "（元）";
    		   }
    		   if(input / 10000 >= 1){
    			   return $filter('currency')(input/10000, '',2) + "（万元）";
    		   }
    	   };
       }
    ])
    .filter('jnRate', [
        '$filter',
        function ($filter) {
            return function (input,num) {
                return $filter('currency')(input, '',num);
            };
        }
    ]);

})();
