/**
 * 根据当前时间格式化日期
 *
 */

(function () {
'use strict';

angular
    .module('common')
    .filter('jnDateFormat', [
        '$filter',
        function ($filter) {
            return function (input) {
            	if(!input){
            		return "";
            	}
                var now = new Date();
                input = input.replace(/-/g, "/"); 
                var date = new Date(input);
                if($filter('date')(date, 'yyyyMMdd')===$filter('date')(now, 'yyyyMMdd')){
                    var value = $filter('date')(date, 'HH:mm');
                    if(value=="00:00"){
                        value = $filter('date')(date, 'MM/dd');
                    }
                    return value;
                }else if($filter('date')(date, 'yyyy')===$filter('date')(now, 'yyyy')){
                    return $filter('date')(date, 'MM/dd');
                }else{
                    return $filter('date')(date, 'yyyy-MM-dd');
                }
                return date;
            };
        }
    ]);

})();
