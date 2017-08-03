/**
	@author：JNGF——yubangjun
	reference：http://www.cnblogs.com/city22/archive/2007/04/15/714532.html
	http://www.phpchina.com/12834/viewspace_29629.html
**/


JSCommon={
	DynamicLoadJs:{}
};

/**
 * 根据ur生成script的标签ID
 * @param {} jsdir
 * @return {}
 */
JSCommon.DynamicLoadJs.produceJsID=function getJsId(jsdir){
	var res=jsdir.replace(/\\/g,"_");
	res=res.replace(/\./g,'_');
	res=res.replace(/[/]/g,'_');
	return res;
}


/**
 * 
 * 删除根据URL生成的scripts标签的id的script标签@param {} jsUrl
 */
JSCommon.DynamicLoadJs.removeloadedJs=function(jsUrl){
	var strId = JSCommon.DynamicLoadJs.produceJsID(jsUrl);
	var scriptId = document.getElementById(strId);
	var headObj=document.getElementsByTagName("head")[0];
	if(typeof(scriptId) !="undefined"  && scriptId!=null){
		headObj.removeChild(scriptId);
	}
}

/**
 * 异步加载一个JS文件的rul缓存
 * @param {} strSrc
 * @param {} succFun
 */
JSCommon.DynamicLoadJs.loadScript = function(strSrc, succFun) {
	var strId = JSCommon.DynamicLoadJs.produceJsID(strSrc);
	var scrīptId = document.getElementById(strId);
	// 在界面上加入
	if (scrīptId == null) {
		var element = document.createElement("script");
		element.src = strSrc
		element.type = 'text/javascript';
		element.id = strId;
		element.language = 'javascript';

		if (Ext.isIE) {
			element.onreadystatechange = function() {
				var state = this.readyState;
				if (state == "loaded" || state == "interactive" || state == "complete") {
					this.onreadystatechange = null;
					if (typeof succFun == "function") {
						succFun();
					}
				}
			};
		} else {
			element.onload = function() {
				element.onload = null;
				if (typeof succFun == "function") {
					succFun();
				}
			};
		}
		document.getElementsByTagName("head")[0].appendChild(element);
	}else{
		if (typeof succFun == "function") {
			succFun();
		}
	}
};






/**
 * 异步加载一组JS文件的URL缓存
 * @param {} arrayJS 一组要加在的JS标签
 * @param {} succFun 回调函数
 * @param {} isCache 是否缓存
 */
JSCommon.DynamicLoadJs.loadScriptArray = function(arrayJS,succFun,isCache){
	var index=0;
	var fnTmp=function(){
		if (index<arrayJS.length){
			if(false ==isCache){
				JSCommon.DynamicLoadJs.removeloadedJs(arrayJS[index]);//
			}
			JSCommon.DynamicLoadJs.loadScript(arrayJS[index++],fnTmp);
		}else{
			if (typeof succFun == "function") {
				 succFun();
			}			
		}
	};
	 fnTmp();
}



/**
 * 同步加载js
 */

JSCommon.DynamicLoadJs.syncJs={
	//获取XMLHttpRequest对象(提供客户端同http服务器通讯的协议)
	getXmlHttpRequest:function (){
	    if ( window.XMLHttpRequest ) // 除了IE外的其它浏览器
	           return new XMLHttpRequest() ;
	    else if ( window.ActiveXObject ) // IE
	            return new ActiveXObject("MsXml2.XmlHttp") ;
	},
	
	/**
	 * 内容伪导入
	 * @param {} url
	 * @param {} jsText
	 */
	includeJsText :function (url,jsText){
		var strId = JSCommon.DynamicLoadJs.produceJsID(url);
		var scrīptId = document.getElementById(strId);
        if ( scrīptId == null ){   
            var oScript = document.createElement( "script" );
           	oScript.id = strId;
           	oScript.type = 'text/javascript';
			oScript.language = 'javascript';
            oScript.text = jsText;
            if(appframe.Sys.firefox){
            	oScript.src = url;
            }else if(appframe.Sys.chrome){
            	with(window)eval(jsText);
            }
            document.getElementsByTagName("head")[0].appendChild(oScript);
            
        }else{
        	 //scrīptId.text = jsText;
        }
    },
	//同步加载
	addJs:function(url,isCache){
		if(false == isCache){
			JSCommon.DynamicLoadJs.removeloadedJs(url);
		}
		var strId = JSCommon.DynamicLoadJs.produceJsID(url); 
		var scriptId = document.getElementById(strId);
		if(typeof(scriptId) =="undefined"  || scriptId==null){
	        var oXmlHttp = appframe.getXmlHttpRequest() ;
//	        oXmlHttp.onreadystatechange = function(){
////	            if ( oXmlHttp.readyState == 4 ) //
////	            {
////	                if ( oXmlHttp.status == 200 || oXmlHttp.status == 304 ) //
////	                {     
////	                    loader.includeJsSrc(url);
////	                   
////	                }     
////	                else    
////	                {
////	                    alert( 'XML request error: ' + oXmlHttp.statusText + ' (' + oXmlHttp.status + ')' ) ;
////	                }
////	            }
//	        } 
	      /*
	       * 1.true 表示脚本会在 send() 方法之后立即执行后续代码，而不等待来自服务器的响应,并且在open()方法当中有调用到onreadystatechange()这个方法。
	       *   false 表示send()后阻塞,并在执行完onreadystatechange方法后,才继续执行send的后续代码.
	       * 2.同步执行oXmlHttp.send()方法后oXmlHttp.responseText有返回对应的内容,而异步还是为空,只有在oXmlHttp.readyState == 4时才有内容,反正同步的在oXmlHttp.send()后的操作就相当于oXmlHttp.readyState == 4下的操作,它相当于只有了这一种状态.
	       */
	      oXmlHttp.open('GET', url, false); //url为js文件时,ie会自动生成 '<script src="*.js" type="text/javascript"></script>',ff不会 
	      oXmlHttp.send(null);
	      this.includeJsText(url,oXmlHttp.responseText);
		}
    }
}



