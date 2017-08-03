/**
 * 单选控件
 *
 * 用法:
 *      # <jn-select options="5021"></jn-select>
 *
 *      会自动生成如下代码：
 *
 *      # <select>
 *      #   <option value="">-- 请选择 --</option>
 *      #   <option value="0">正常</option>
 *      #   <option value="1">关注</option>
 *      #   <option value="2">次级</option>
 *      #   <option value="3">可疑</option>
 *      #   <option value="4">损失</option>
 *      # </select>
 *
 * 参数:
 *      options: 字符串。必需。系统数据库中下拉参数的ID或自定义的ID。
 *      placeholder: 字符串。默认为 "-- 请选择 --"。
 *      exclude: 字符串。用来删除不需要的选项。
 *               其格式为任意非字母非数字字符分隔的值序列。
 *               比如 "0|1|2"，"0, 1, 2"，"0/1/2"……
 */

(function () {
'use strict';

var makeOptTag = function (value, label) {
    var opt = document.createElement('option');
    opt.text = label;
    opt.value = value;
    return opt;
};

angular
    .module('common')
    .directive('jnSelect', [
        'jnDirective', 'jnConstant',
        function (jnDirective, jnConstant) {
            var compileOptions = function (select, optionsId, exclude) {
                var options = jnConstant.get(optionsId);
                var optTag, k, v, re;

                if (exclude) {
                    for (k in options) {
                        v = options[k];
                        re = RegExp('\\b' + k + '\\b');

                        if (! re.test(exclude)) {
                            optTag = makeOptTag(k, v);
                            select.appendChild(optTag);
                        }
                    }

                } else {
                    for (k in options) {
                        v = options[k];
                        optTag = makeOptTag(k, v);
                        select.appendChild(optTag);
                    }
                }
            };

            return {
                restrict: 'E',
                compile: function ($element, $attr) {
                    var select = document.createElement('select');
                    var placeholder = $attr.placeholder || '-- 请选择 --';

                    $element.append(select);
                    select.appendChild(makeOptTag('', placeholder));

                    jnDirective.copyAttr($attr, select, [
                        'options', 'placeholder']);

                    compileOptions(select, $attr.options, $attr.exclude);
                },
            };
        }
    ]);

})();
