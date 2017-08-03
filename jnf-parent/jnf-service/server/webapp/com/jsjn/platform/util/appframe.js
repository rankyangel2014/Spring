/**
 * appframe.main是在客户初定义的方法。
 */
appframe={};


appframe.Sys = {};

appframe.getSystype=function(){
		ua = navigator.userAgent.toLowerCase();
		if (window.ActiveXObject){
			appframe.Sys.ie = ua.match(/msie ([\d.]+)/)[1];
			return  appframe.Sys.ie;
		}
		else if (ua.indexOf("firefox")>0){
            appframe.Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
            return  appframe.Sys .firefox;
		}
        else if (ua.indexOf("chrome")>0){
            appframe.Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
            return  appframe.Sys .chrome;
        }
        else if (window.opera){
            appframe.Sys.opera = ua.match(/opera.([\d.]+)/)[1];
            return  appframe.Sys.opera;
        }
        else if (window.openDatabase){
            appframe.Sys.safari = ua.match(/version\/([\d.]+)/)[1];
            return  appframe.Sys.safari;
        }
}
appframe.getSystype();

/**
 * js文件异步加载
 * @param {} arrayStr
 * @param {} callback
 * @param {} isCache
 */
appframe.loadScripts=function (arrayStr,callback,isCache){
	if(typeof(arrayStr) !="undefined" && arrayStr !=null ){
		var jsurlarr=arrayStr.split(";");
		for(var i=0;i<jsurlarr.length;i++){
			jsurlarr[i]=appConfig.baseUrl+jsurlarr[i];
		}
		JSCommon.DynamicLoadJs.loadScriptArray(jsurlarr,callback,isCache);
	}
	
}

/**
 *判断一组js文件是否存在
 * @param {} arrayStr
 */
appframe.isLoadJsArrays = function(arrayStr){
	var unloadjs=[];
	if(typeof(arrayStr) !="undefined" && arrayStr !=null ){
			var jsurlarr=arrayStr.split(";");
			for(var i=0;i<jsurlarr.length;i++){
				jsurlarr[i]=appConfig.baseUrl+jsurlarr[i];
				var strId = JSCommon.DynamicLoadJs.produceJsID(jsurlarr[i]);
				var scriptId = document.getElementById(strId);
				if(scriptId == null){
					 unloadjs.push(jsurlarr[i]);
				}
			}
	}
	return unloadjs;
	
}


/**
 * 动态加载css
 * @param {} href
 * @param {} id
 */
appframe.loadCss = function(href,id){
    var cssTag = document.getElementById(id);
    var head = document.getElementsByTagName('head').item(0);
    if(cssTag) head.removeChild(cssTag);
    css = document.createElement('link');
    css.href = appConfig.baseUrl+href;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    css.id = id;
    head.appendChild(css);
}


/**
 * 对象克隆
 * @param {Object/Array} o Object or array to clone
 * @return {Object/Array} Deep clone of an object or an array
 * @author Ing. Jozef 
 */
appframe.clone = function(o) {
    if(!o || 'object' !== typeof o) {
        return o;
    }
    if('function' === typeof o.clone) {
        return o.clone();
    }
    var c = '[object Array]' === Object.prototype.toString.call(o) ? [] : {};
    var p, v;
    for(p in o) {
        if(o.hasOwnProperty(p)) {
            v = o[p];
            if(v && 'object' === typeof v) {
                c[p] = appframe.clone(v);
            }
            else {
                c[p] = v;
            }
        }
    }
    return c;
};

/**
 * 老方法,不建议使用
 * @param {} className 默认由classname
 * @param {} isShow
 */
appframe.main = function(className,isCache){
		Ext.MessageBox.wait("正在加载数据>>>>","提示");
		if(typeof(className)=="undefined" || className==null || className ==""){//兼容之前的代码
			var className = appframe.ClassName;
		}
		var importJS = appframe.importJses[className];
		if(typeof(importJS)=='undefined'){//兼容之前的代码
				if(typeof(appframe.importJses)=="string")
					var importJS = appframe.importJses;
		}
		if(typeof(importJS) != "undefined" && importJS!=""){
			var succfun=function(){
				eval(className+".main()");
				Ext.MessageBox.hide();
			};
			appframe.loadScripts(importJS,succfun,isCache);
		}else{
			eval(className+".main()");
			Ext.MessageBox.hide();
		}
};

/**
 * 获得实例并显示,采用异步加载js,加快显示.
 * @param {} className
 */
appframe.instanceShow = function(className,isCache,param){
	if(false==isCache)
		appframe.isCache=isCache;
	Ext.MessageBox.wait("正在加载数据>>>>","提示");
	if(typeof(eval(className).main) == "function"){//兼容旧模式
		appframe.main(className,isCache);
		Ext.MessageBox.hide();
	}else{
		var importJS = appframe.importJses[className];
		var callback  = function(){
				var composite = appframe.getInstance(className,isCache,param);
				if(composite.xtype =="window"){//window
					composite.show();
				}else{//panel
					var viewport = new Ext.Viewport({
			       	  layout : 'fit',
			          border : false,
			       	  items : [composite]
			        });
				}
				Ext.MessageBox.hide();
		}
		if(typeof(importJS) != "undefined" && importJS!=""){
			appframe.loadScripts(importJS,callback,isCache);
		}else{
			callback();
		}
	}
}


/**
 *  实例化后的注册事件。 
 */
appframe.afterInstance=function(className,func){
	appframe.instanceEventList[className]=func;
}

/**
 * 
 * @param {} className
 * @param {} callback
 * @param {} isCache
 */
appframe.loadClass=function(classNames,callback,argument){
	Ext.MessageBox.wait("正在加载数据>>>>","提示");
	var importJS = appframe.importJses[className];
	if(typeof(importJS) == "undefined"){
		importJS="";
	}
	var classJs = className.replace(".","/");
	var  importJS1 =appConfig.baseUrl+"/"+classJs+".js";
	var importJS2 =  appConfig.baseUrl+"/"+classJs+"Func.js";
	importJS+=(importJS1+";");
	importJS+=importJS2;
	var func = function(){
			callback(argument);
			Ext.MessageBox.hide();
	}
	appframe.loadScripts(importJS,func,isCache);
}


 /**
  * 异步非阻塞，如果js文件未倒入
  * @param {} className
  * @param {} isCache
  * @param {} callback
  */
appframe.instance = function(className,callback,isCache,param){
	Ext.MessageBox.wait("正在加载数据>>>>","提示");
	var importJS = appframe.importJses[className];
	var func = function(){
		var f = appframe.instanceEventList[className];
		var clazz = eval("("+className+")");
		if(typeof(clazz)=="undefined"){
			//if(typeof(console)!="undefined")
			Ext.Msg.alert("JS类["+className+"]的相关js未加载!");
		}else{
			if(clazz.superclass.baseCls=="x-panel"){
				if(typeof(clazz.PANEL)=='undefined' || clazz.PANEL ==null ){
					clazz.PANEL =new clazz();
					if(typeof(param) != "undefined"){
						clazz.PANEL.param=param;
					}
					if(typeof(f) =="function"){
						f(clazz.PANEL);
					}
				}
				var composite = clazz.PANEL;
				Ext.MessageBox.hide();
			}else{
				if(typeof(clazz.WINDOW)=='undefined' || clazz.WINDOW ==null ){
					clazz.WINDOW =new clazz();
					if(typeof(param) != "undefined"){
						clazz.WINDOW.param=param;
					}
					if(typeof(f) =="function"){
						f(clazz.WINDOW);
					}
				}
				var composite = clazz.WINDOW;
			}
			callback(composite);
			Ext.MessageBox.hide();
		}	
	}
	if(typeof(importJS) != "undefined" && importJS!=""){
			appframe.loadScripts(importJS,func,isCache);
		}else{
			func();
	}
}

/**
 * 同步阻塞获得实例,如果js文件未导入.
 * 注意使用前请将该类对应的js文件引入大要实例化的所在类.
 * 比如:a.js 要实例华B,那么在a.js中要引入b.js
 * @param String className 需要构造的类名称.
 * @return Object
 */
appframe.getInstance = function(className,isCache,param){
	Ext.MessageBox.wait("正在加载数据>>>>","提示");
	var importJS = appframe.importJses[className];
	var unloadjs = appframe.isLoadJsArrays(importJS);
	for(var i = 0;i<unloadjs.length ;i++){
		JSCommon.DynamicLoadJs.syncJs.addJs(unloadjs[i],isCache);//同步加载JS
		if(typeof(console)!="undefined")
			console.info("警告", unloadjs[i]+"没有异步加载！");
	}
	if(unloadjs.length>0)
		JSCommon.DynamicLoadJs.syncJs.addJs(appConfig.baseUrl+"/com/jsjn/platform/util/blank.js",false);//同步加载JS
		var f = appframe.instanceEventList[className];
		var clazz = eval("("+className+")");
		if(typeof(clazz)=="undefined"){
			//if(typeof(console)!="undefined")
			Ext.Msg.alert("JS类["+className+"]的相关js未加载!");
		}else{
			if(clazz.superclass.baseCls=="x-panel"){
				if(typeof(clazz.PANEL)=='undefined' || clazz.PANEL ==null ){
					clazz.PANEL =new clazz();
					if(typeof(param) != "undefined"){
						clazz.PANEL.param=param;
					}
					if(typeof(f) =="function"){
						f(clazz.PANEL);
					}
				}
				var composite = clazz.PANEL;
			}else{
				if(typeof(clazz.WINDOW)=='undefined' || clazz.WINDOW ==null ){
					clazz.WINDOW =new clazz();
					if(typeof(param) != "undefined"){
						clazz.WINDOW.param=param;
					}
					if(typeof(f) =="function"){
						f(clazz.WINDOW);
					}
				}
				var composite = clazz.WINDOW;
			}
			Ext.MessageBox.hide();
			return composite;
		}
}
/**
 * 当前模块的类名
 */
appframe.ClassName=null;

/**
 * 需要导入的js文件以分号（；）隔开
 * @type String
 */
appframe.importJses={};

appframe.isCache=true;

/**
 * 
 */
appframe.instanceEventList={};

/**
 * iframe插件
 */
appframe.IFrameComponent = Ext.extend(Ext.BoxComponent, {
    onRender : function(ct, position){
    	var iframeid='iframe-'+ this.id;
    	if (this.wiframeid){
    		iframeid=this.wiframeid;
    	}
        this.el = ct.createChild({tag: 'iframe', id:iframeid, name:iframeid, frameBorder: 0,allowtransparency:true, src: this.url});
    },
   onDestroy : function(){ 
       this.el.dom.src="about:blank";
       Ext.ux.IFrameComponent.superclass.onDestroy.call(this); 
	},	
	refreshIframe:function(nurl){
		this.el.dom.src="about:blank";
		this.url=nurl;
		this.el.dom.src=this.url;
	}
});


appframe.getXmlHttpRequest=function (){
    if ( window.XMLHttpRequest ) // 除了IE外的其它浏览器
           return new XMLHttpRequest() ;
    else if ( window.ActiveXObject ) // IE
            return new ActiveXObject("MsXml2.XmlHttp") ;
}

appframe.syncHttpRequest=function(url,params){
	var oXmlHttp = appframe.getXmlHttpRequest() ;
	oXmlHttp.open('GET', url, false); 
	oXmlHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");
	oXmlHttp.send(params);
	return oXmlHttp.responseText;
};


/**
 * 
 */
/*
 * errdata 格式:
{
	inftype:1  //信息类型： 1警告 2错误
	showdetial:"",//显示提示对话框时默认是否显示详细信息
	clientCode:"",//错误代码
	message:"",//错误信息
	detailmessage:"",//详细错认信息
	callback:, //本提示对话框关闭后的回调函数
}
*/

appframe.errordlg={};
appframe.errordlg.show=function(errdata){
	appframe.errordlg.errdt=errdata;
	if (appframe.errordlg.win==null){
		appframe.errordlg.getErrSampleStr=function(){
			var errdata=appframe.errordlg.errdt;
			var errinf="";
			if (errdata.clientCode!=null && errdata.clientCode.length>0){
				errinf="代码："+errdata.clientCode+"\n";
			}
			if (errdata.message!=null && errdata.message.length>0){
				errinf+="信息："+errdata.message;
			}
			if (errinf.length<=0 && errdata.stackTrace!=null && errdata.stackTrace.length>0){
				errinf+="信息："+errdata.stackTrace;
			}
			if (errinf.length<=0 && errdata.detailmessage!=null && errdata.detailmessage.length>0){
				errinf+="信息："+errdata.detailmessage;
			}
			return errinf;
		}
		appframe.errordlg.getErrDetailstr=function(){
			var res="";
			if (appframe.errordlg.errdt.detailmessage!=null 
				&& appframe.errordlg.errdt.detailmessage.length>0){
				res=appframe.errordlg.errdt.detailmessage;
			}
			if (appframe.errordlg.errdt.stackTrace!=null 
				&& appframe.errordlg.errdt.stackTrace.length>0){
				res=appframe.errordlg.errdt.stackTrace;
			}
			return res;
		}
		
		appframe.errordlg.edits=[
			new Ext.form.TextArea({
				value:'',
				readOnly:true
			}),
			new Ext.form.TextArea({
				value:'',
				readOnly:true
			})			
		];
		appframe.errordlg.icoPanelErr=function(){
			return new Ext.Panel({
					border:false,
					layout:'fit',
					html:"<img src='"+appConfig.baseUrl+"/com/jsjn/platform/util/stop.png' width='50' height='50' />"
				}); 
		};
		
		appframe.errordlg.icoPanelWarn=function(){
			return new Ext.Panel({
				border:false,
				layout:'fit',
				html:"<img src='"+appConfig.baseUrl+"/com/jsjn/platform/util/icon-info.png' width='50' height='50' />"
			});
		};		
		appframe.errordlg.win = new Ext.Window({
			layout:'border',
			title:'提示',
			width:500,
			height:135,
			closable:true,
			closeAction:'hide',
			maximizable:true,
			modal:true,
			border:false,
			items:[{
						layout:'border',
						autoScroll:true,
						region:'north',
						height:50,
						items:[{
								region:'center',
								border:false,
								layout:'fit',
								items:[appframe.errordlg.edits[0]]
							},{
								layout:'fit',
								region:'west',
								width:70,
								border:false,
								bodyStyle:'padding:10px',
								items:[appframe.errordlg.icoPanelErr()]
							}
						],
						border:false
					},{
						layout:'fit',
						autoScroll:true,
						region:'center',
						collapsible: true,
				   	  	collapsed:true,
						listeners:{
							beforeexpand:function(p,animate){
								appframe.errordlg.win.setHeight(260);
							},
							beforecollapse:function(p,animate){
								appframe.errordlg.win.setHeight(100);
							}
						},
						title:"详细信息",
						items:[
							appframe.errordlg.edits[1]
						],
						border:false
					}],
				listeners:{
					beforehide:function(){
						if (appframe.errordlg.errdt.callback!=null) appframe.errordlg.errdt.callback();
					}
				}					
		});
		appframe.errordlg.win.render(document.body);
	}
	
	var icoPaneP=appframe.errordlg.win.items.get(0).items.get(1);
	icoPaneP.remove(0,true);
	if (appframe.errordlg.errdt.inftype!=null && appframe.errordlg.errdt.inftype==1){
		icoPaneP.add(appframe.errordlg.icoPanelWarn());
	}else{
		icoPaneP.add(appframe.errordlg.icoPanelErr());
	}
	if (appframe.errordlg.errdt.showdetial!=null && appframe.errordlg.errdt.showdetial){
		appframe.errordlg.win.items.get(1).expand(false);
	}else{
		appframe.errordlg.win.restore();
		appframe.errordlg.win.items.get(1).collapse(false);
	}
	icoPaneP.doLayout(false);
	appframe.errordlg.edits[0].setValue(appframe.errordlg.getErrSampleStr());
	appframe.errordlg.edits[1].setValue(appframe.errordlg.getErrDetailstr());
	appframe.errordlg.win.show(this);
}


/**
 * 
 */
Ext.Ajax.on("requestexception", function(conn, response, option) {
		try {
			Ext.MessageBox.hide();
		}catch(ex) {}
		var message = "系统异常,请尝试重新登录或联系管理员!";
		if(response.status.indexOf("1")==0){
			message = "网络不稳定,请尝试重新操作!";
		}else if(response.status.indexOf("4")==0){
			message = "浏览器通讯异常,请尝试重新操作!";
		}else if(response.status.indexOf("5")==0){
			message = "远程服务器异常,请重新登录或联系管理员!";
		}
		var err={
			inftype:2,
			clientCode:response.status,
			message:"(HTTP STATE:"+response.status+"<"+response.statusText+">)-"+message,
			detailmessage:"相关访问链结为:"+option.url+"\n"+response.responseText
		};
		appframe.errordlg.show(err);
});
