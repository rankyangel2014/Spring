/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

/* Fix for Opera, which does not seem to include the map function on Array's */
if (!Array.prototype.map) {
    Array.prototype.map = function(fun){
        var len = this.length;
        if (typeof fun != 'function') {
            throw new TypeError();
        }
        var res = new Array(len);
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                res[i] = fun.call(thisp, this[i], i, this);
            }
        }
        return res;
    };
}
// ============   filter   ===============//     
// 数组的一些方法  every(), filter(), forEach(), map(), some()  
// IE8 及以下不支持  
if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }
    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }
    return res;
  };
} 
 

Ext.ns('Ext.ux.data');

/**
 * @class Ext.ux.data.PagingMemoryProxy
 * @extends Ext.data.MemoryProxy
 * <p>Paging Memory Proxy, allows to use paging grid with in memory dataset</p>
 */
Ext.ux.data.PagingMemoryProxy = Ext.extend(Ext.data.MemoryProxy, {
    constructor : function(data){
        Ext.ux.data.PagingMemoryProxy.superclass.constructor.call(this);
        this.data = data;
    },
    doRequest : function(action, rs, params, reader, callback, scope, options){
        params = params || {};
         var t1 = new Date().getTime();
        var result;
        try {
            result = reader.readRecords(this.data);
        } 
        catch (e) {
            this.fireEvent('loadexception', this, options, null, e);
            callback.call(scope, null, options, false);
            return;
        }
        var t2 = new Date().getTime();
		console.log("加载原始数据耗时:"+(t2-t1)+"ms");
        // filtering
        if (params.filterCol !== undefined) {
        	var isfilter = false;
        	for(var i in params.filterCol ){
        		  var xatt = params.filterCol[i].col || 0;
        		  isfilter =  !Ext.isEmpty(params[xatt]);
        		  if(isfilter){
        		  		break;
        		  }
        	}
        	if(isfilter){
	            result.records = result.records.filter(function(el){
	                if (typeof(el) == 'object') {
	                	var flag = true;
	                	for(var i in params.filterCol ){
	                		 var att = params.filterCol[i].col || 0;
	                		 if( params.filterCol[i].type == 'index'){
	                    	 	flag = flag && String(el.data[att]).indexOf(params[att]) == 0 ? true : false;
	                    	 }else if( params.filterCol[i].type == 'match'){
	                    	 	flag = flag && String(el.data[att]).match(params[att]) ? true : false;
	                    	 }else{
	                    	 	flag = flag && String(el.data[att]).match(params[att]) ? true : false;
	                    	 }
	                	}
	                   	return flag;
	                }
	                else {
	                    return String(el).indexOf(params.filter) == 0 ? true : false;
	                }
	            });
            }
            result.totalRecords = result.records.length;
        }
         var t3 = new Date().getTime();
		console.log("过滤原始数据耗时:"+(t3-t2)+"ms");
        // sorting
        if (params.sort !== undefined) {
            // use integer as params.sort to specify column, since arrays are not named
            // params.sort=0; would also match a array without columns
            var dir = String(params.dir).toUpperCase() == 'DESC' ? -1 : 1;
            var fn = function(v1, v2){
                return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
            };
            result.records.sort(function(a, b){
                var v = 0;
                if (typeof(a) == 'object') {
                    v = fn(a.data[params.sort], b.data[params.sort]) * dir;
                }
                else {
                    v = fn(a, b) * dir;
                }
                if (v == 0) {
                    v = (a.index < b.index ? -1 : 1);
                }
                return v;
            });
        }
        // paging (use undefined cause start can also be 0 (thus false))
        if (params.start !== undefined && params.limit !== undefined) {
            result.records = result.records.slice(params.start, params.start + params.limit);
        }
      
        callback.call(scope, result, options, true);
        var t5 = new Date().getTime();
        console.log("调用父类默认方法总耗时:"+(t5-t3)+"ms");
    }
});

//backwards compat.
Ext.data.PagingMemoryProxy = Ext.ux.data.PagingMemoryProxy;
