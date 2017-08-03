/**
 * 解析html字符串 
 */

(function() {
    'use strict';

    angular.module('common').filter('toHtml', [ '$sce', function($sce) {

        return function(text) {
        	if(text){
	        	//去除内网链接地址
	        	text = text.replace(/<a([\S ]*?>[\S ]*?)<\/a>/gi, '<span$1</span>');  
	        	//去除HTML自定义样式及其他属性
	        	text = text.replace(/(<[^\s\/>]+)\b[^>]*>/gi,"$1>");
	            return $sce.trustAsHtml(text);
        	}
        	return '';
        };
    } ]);
})();
