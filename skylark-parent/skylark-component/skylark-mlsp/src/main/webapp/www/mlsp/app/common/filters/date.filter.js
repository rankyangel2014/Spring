/**
 * 格式化日期
 * 
 * 参数 format: 可选。格式化字符串，详见 AngularJS Date Filter
 * 
 * 示例 {{ '20130517' | jnDate }} // '2013-05-17' {{ '20130517' | jnDate :'MMM dd
 * yyyy' }} // 'May 17 2013' {{ '20130517-20130520' | jnDate }} //
 * '2013-05-17-2013-05-20' {{ '20130517~20130520' | jnDate }} //
 * '2013-05-17~2013-05-20'
 */

(function() {
    'use strict';

angular
.module('common')
.filter(
        'jnDate',
[
        '$filter',
    function($filter) {
        return function(input, format) {
            if (input) {
                var date = '';
                if (input.indexOf('~')!=-1
                        || input.indexOf('-')!=-1) {
                    date = input
                            .replace(
                                    /(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)[-~]?(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/,
                                    '$1-$2-$3~$4-$5-$6');
                } else {

                    date = input
                            .replace(
                                    /(\d\d\d\d)[-\/]?(\d\d)[-\/]?(\d\d)/,
                                    '$1-$2-$3');
                    if (format) {
                        date = $filter('date')(date,
                                    format);
                        }
                    }
                return date;
                }
            };
        } ]);

})();
