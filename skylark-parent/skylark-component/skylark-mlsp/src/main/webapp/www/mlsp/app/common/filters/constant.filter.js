/**
 * 把常量的值转化成名称
 *
 * 参数
 *     num: 常量的序号
 *
 * 示例
 *     {{ 1 | jnConstant :5028 }} // '企业'
 */

(function () {
'use strict';

angular
    .module('common')
    .filter('jnConstant', [
        'jnConstant',
        function (jnConstant) {
            return function (input, num) {
                var output = '';
                if(input && input.indexOf(',')!=-1){
                    
                    input.split(',').forEach(function(d){
                        output += jnConstant.get(num)[d]+',';
                    });
                }else{
                    
                    output =  jnConstant.get(num)[input];
                }
                return output;
            };
        }
    ])
    .filter('jnConstantAbbr', [
        'jnConstant',
        function (jnConstant) {
            return function (input, num) {
                return jnConstant.getAbbr(num)[input];
            };
        }
    ]);

})();
