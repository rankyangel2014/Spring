/**
 * 嵌套的表格
 */
//Ext.onReady(function(){
//	var testData=[
//	   ["lug","男",26,[["数学",100],["语文",150],["英语",135]]]
//	   ,["lisi","男",25,[["数学",100],["语文",150],["英语",135]]]
//	   ,["zhang","男",27,[["数学",120],["语文",158],["英语",135]]]   
//	];
//	//
//	storeTest= new Ext.data.SimpleStore({
//	    fields: ["name","sex","age","grade"]
//	    ,data: testData
//	});
//	
//	var expander = new Ext.grid.RowExpander({
//	        tpl : new Ext.XTemplate(
//	        "以往记录:",
//	        '<div class="detailData">',
//	          '',
//	        '</div>'
//	        )
//	        });
//	expander.on("expand",function(expander,r,body,rowIndex){
//	  // console.info("ffffff");
//	  //查找 grid 
//	  window.testEle=body;
//	  //alert(body.id);
//	  if (Ext.DomQuery.select("div.x-panel-bwrap",body).length==0){
//	     //alert("a");
//	     var data=r.json[3];
//	     var store=new Ext.data.SimpleStore({
//	           fields: ["class","degrade"]
//	           ,data:data
//	         });
//	     var cm = new Ext.grid.ColumnModel([
//	     {header: "科目",dataIndex: 'class',width: 130,hideable:false,sortable:false,resizable:true}
//	     ,{header: "成绩",dataIndex: 'degrade',width: 130,hideable:false,sortable:false,resizable:true}
//	      ]);
//	      Ext.DomQuery.select("div.detailData")[0];
//	  var grid = new Ext.grid.GridPanel({
//		    store:store,
//		    cm:cm,
//		    renderTo:Ext.DomQuery.select("div.detailData",body)[0],
//		    autoWidth:true,
//		    autoHeight:true
//	    });
//	  }
//	});
//	var sm=new Ext.grid.CheckboxSelectionModel({singleSelect:true,header:" "});
//	var cm = new Ext.grid.ColumnModel([
//	    expander
//	    ,sm
//	    ,{header: "姓名",dataIndex: 'name',width: 50,hideable:false,sortable:false}
//	    ,{header: "性别",dataIndex: 'sex',width: 130,hideable:false,sortable:false,resizable:true}
//	    ,{header: "年龄",dataIndex: 'age',width: 130,hideable:false,sortable:false,resizable:true}
//	    ]);
//	 var grid = new Ext.grid.GridPanel({
//	    id:'testgrid',
//	    store:storeTest,
//	    cm:cm,
//	    sm:sm,
//	    renderTo:"grid1",
//	    width:780,
//	    autoHeight:false,
//	    height:300,
//	    listeners:{},
//	    plugins:[expander]
//	  });
//});


/**
 * 封装了的嵌套的表格.
 */
Ext.onReady(function(){
		this.store324884295 = new Ext.data.Store({
			data : {
				total : 2,
				root : [{
					age : 508,
					name : "CygkF"
				}, {
					age : 974,
					name : "AbFn2"
				}]
			},
			reader : new Ext.data.JsonReader({
				totalProperty : "total",
				root : "root",
				id : "age"
			}, [{
				mapping : "name",
				name : "name"
			}, {
				mapping : "age",
				type : "int",
				name : "age"
			}])
		});
		this.sunStore = new Ext.data.Store({
			data : {
				total : 2,
				root : [{
					age : 18,
					name : "CygF"
				}, {
					age : 74,
					name : "AbF2"
				}]
			},
			reader : new Ext.data.JsonReader({
				totalProperty : "total",
				root : "root",
				id : "age"
			}, [{
				mapping : "name",
				name : "name"
			}, {
				mapping : "age",
				type : "int",
				name : "age"
			}])
		});
		
		this.gridPanel1222160384 = new com.jsjn.ext.extend.NestedGridPanel({
			store : this.store324884295,
			height : 200,
			sunStore:this.sunStore,
			sunTitle:"子表信息",
			selModel : new Ext.grid.RowSelectionModel({
				singleSelect : true
			}),
			//sunIsPage:true,
			renderTo:"grid1",
			columns : [{
				hidden : false,
				header : "name",
				dataIndex : "name",
				sortable : true
			}, {
				hidden : false,
				header : "age",
				dataIndex : "age",
				sortable : true
			}],
			sunColumns:[{
				hidden : false,
				header : "age",
				dataIndex : "age",
				sortable : true
			}],
			viewConfig : {}
		});
});