/**
 * 根据下拉参数编号自动填充 <select>
 *
 * 用法：
 *
 *      # <select jn-options="5021"></select>
 *
 *      会自动生成如下代码：
 *
 *      # <select jn-options="5021">
 *      #   <option value="">-- 请选择 --</option>
 *      #   <option value="0">正常</option>
 *      #   <option value="1">关注</option>
 *      #   <option value="2">次级</option>
 *      #   <option value="3">可疑</option>
 *      #   <option value="4">损失</option>
 *      # </select>
 *
 *      可选参数 jn-options-exclude 用来删除不需要的选项
 *      其格式为任意非字母非数字字符分隔的值序列
 *
 *      # <select jn-options="5021" jn-options-exclude="0|1|2"></select>
 *      # <select jn-options="5021" jn-options-exclude="0, 1, 2"></select>
 *      # <select jn-options="5021" jn-options-exclude="0, 1, 2"></select>
 *
 *      都会生成
 *
 *      # <select jn-options="5021">
 *      #   <option value="">-- 请选择 --</option>
 *      #   <option value="3">可疑</option>
 *      #   <option value="4">损失</option>
 *      # </select>
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
    .directive('jnOptions', [
        'jnConstant',
        function (jnConstant) {
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
                restrict: 'A',
                compile: function ($element, $attr) {
                    var placeholder = $attr.placeholder || '-- 请选择 --';
                    $element.append(makeOptTag('', placeholder));
                    compileOptions(
                        $element[0], $attr.jnOptions, $attr.jnOptionsExclude);
                },
            };
        }]
    );

})();
