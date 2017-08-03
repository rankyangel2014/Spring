var el;
//holder的布局，分别是left属性和top属性的值,要和demo.css的设置一致
var h_x_off = 350;
var h_y_off = 30;
//表示是否处于连线状态
var connectMode = "off";
//表示是否处于resize状态
var resizeMode = "off";

//一个连接的起止节点
var fromObj = null;
var toObj = null;

//当前选中的节点
var selectedObj = null;

//上次选中的节点, 配合当前选中的节点，实现选中节点高亮显示
var secLastObj = null;

//当前选中的线
var selectedLine = null;
//上次选中的线，配合当前选中的线，实现高亮显示
var secLastLine = null;

//当前编辑的节点的属性名。
var currentEditedProp = null;

//保存节点数据
var shapes=[];

//保存连接数据
var connections = [];

//r是Raphael对象，用于创建各种图形
var r;
//以下三个是图形拖拽时用到的方法
var dragger, move, up;

//显示信息的div
var console = document.getElementById("console");

//当前服务的输入输出信息
var parameters;



window.onload = function () {
	//初始化工作流
	initWF();
	
	console = document.getElementById("console");
    dragger = function () {
    	var nt = this.data("NodeType");
    	if(nt == "SubProcess") {
    		this.unmouseover();
    	}
    	
    	if( this.type == "rect" ) {
    		this.ox = this.attr("x");
    		this.oy = this.attr("y");
    		this.width = this.attr("width");
    		this.height = this.attr("height");
    	} else if(this.type == "path") {
    		this.ox = this.cx;
    		this.oy = this.cy;
    	} else {
    		this.ox = this.attr("cx");
            this.oy = this.attr("cy");
    	}
        this.animate({"fill-opacity": .3}, 500);
    };
        move = function (dx, dy) {
        	var nt = this.data("NodeType");
        	if(nt == "SubProcess" && resizeMode == "on") {
        		var att;
        		var newW = this.width + dx < 80 ? 80 : this.width + dx;
        		var newH = this.height + dy < 80 ? 80 : this.height + dy;
        		
            	att = {width: newW, height: newH};
            	this.attr(att);
            	console.innerHTML = this.attr("width") +","+this.attr("height");
                r.safari();
        	} else {
        		var att, textAtt;
        		if( this.type == "rect" ) {
        			att = {x: this.ox + dx, y: this.oy + dy};
        			textAtt = {x: this.ox + this.attr("width")/2 + dx, y: this.oy + this.attr("height")/2 + dy, text: this.data("text").attr("text")};
        			console.innerHTML = att.x + "," + att.y;
        			this.attr(att);
        		} else if(this.type == "path") {
        			this.cx = this.ox + dx;
        			this.cy = this.oy + dy;
        			att = ["M",this.ox + dx,this.oy + dy - 25,"L",this.ox + dx + 25,this.oy + dy,"L",this.ox + dx,this.oy + dy+25,"L",this.ox + dx-25,this.oy + dy,"L",this.ox + dx,this.oy + dy - 25].join(",");
        			textAtt = {x: this.ox + dx, y: this.oy + dy, text: this.data("text").attr("text")};
        			this.attr({path:att});
        		} else {
        			att = {cx: this.ox + dx, cy: this.oy + dy};
        			textAtt = {x: this.ox + dx, y: this.oy + dy, text: this.data("text").attr("text")};
        			console.innerHTML = att.cx + "," + att.cy;
        			this.attr(att);
        		}
        	
                this.data("text").attr(textAtt);
                for (var i = connections.length; i--;) {
                    r.connection(connections[i]);
                }
                r.safari();
        	}
        	
    	
        };
//        move2 = function (dx, dy) {
//        	var att;
//        	att = {width: this.width + dx, height: this.height + dy};
//        	this.attr(att);
//        	console.innerHTML = this.attr("width") +","+this.attr("height");
//            r.safari();
//        };
        
        up = function () {
        	var nt = this.data("NodeType");
        	if(nt == "SubProcess") {
        		this.mouseover(mover);
        	}
            this.animate({"fill-opacity": .2}, 500);
        };
        
        r = Raphael("holder", 1200, 1200);
        
//        shapes = [  r.ellipse(190, 100, 30, 20).data("text",r.text(190,100,"ellipse1")),
//                    r.rect(290, 80, 60, 40, 10).data("text",r.text(320,100,"rect1")),
//                    r.rect(290, 180, 60, 40, 2).data("text",r.text(320,200,"rect2")),
//                    r.ellipse(450, 100, 20, 20).data("text",r.text(450,100,"ellipse2"))
//                ];
//        
//    for (var i = 0, ii = shapes.length; i < ii; i++) {
//        var color = Raphael.getColor();
//        shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
//        shapes[i].drag(move, dragger, up);
//    }
//    connections.push(r.connection(shapes[0], shapes[1], "#fff"));
//    connections.push(r.connection(shapes[1], shapes[2], "#fff"));
//    connections.push(r.connection(shapes[1], shapes[3], "#fff"));
//    
//    
//    var path = r.path("M10,20L30,40L10,60");
//    path.attr({fill: Raphael.getColor(), stroke: Raphael.getColor(), "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
//    path.drag(move, dragger, up);
//    shapes.push( path );
//    
//    var conn = r.connection(shapes[0], path, "#fff");
//  
//    connections.push(conn);
//    
//    
//    
//    var t = r.text(50, 50, "hello");
//    t.attr({fill: Raphael.getColor(), stroke: Raphael.getColor(), "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
//    t.drag(move, dragger, up);
//    shapes.push( t );
//    t.click(function() {
//    	alert(1);
//    });
//    
//    var st = r.set();
//    st.push(
//        r.circle(10, 10, 5),
//        r.circle(30, 10, 5)
//    );
//    st.attr({fill: "red"});
//    
//    st.attr({fill: Raphael.getColor(), stroke: Raphael.getColor(), "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
//    st.drag(move, dragger, up);
//    shapes.push( st );
        
        /*测试api
        var start = newNode('StartEvent');
        var end = newNode('EndEvent');
        var conn = connect(start, end);
        deleteConn(conn);
        alert(1);
        
        deleteNode(start);
        
       newNode('ConvergeGateway',100, 100);
       */
        /*
        var ut = newNode("UserTask",0,0);
        wfattr.TaskName = "taskName";
        wfattr.ActorId = "actorId";
        var xmlStr = ut.exportFunc();
        alert(xmlStr);
        */
        //loadXMLData("http://127.0.0.1:8080/raphael/LoadXMLFile?file=file.bpmn");
};

function exportData() {
	var nodeInfo = "";
	for(var i=0;i<shapes.length;i++) {
		nodeInfo += shapes[i].data("WFattr").Name+", ";
	}
	var connInfo = "";
	for(var i=0;i<connections.length;i++) {
		connInfo = connInfo + connections[i].from.data("WFattr").Name+"->"+connections[i].to.data("WFattr").Name+", ";
	}
	alert("{"+nodeInfo+"},{"+connInfo+"}");
}

function saveOneProp() {
//	alert(currentEditedProp);
	var box = document.getElementById("editBox_box");
	var propValue = box.value;
//	alert(propValue);
	
	var nt = selectedObj.data("NodeType");
	var WFattr = selectedObj.data("WFattr");
	WFattr[currentEditedProp] = propValue;
	if(currentEditedProp == "Name") {
		if(nt != "StartEvent" && nt != "EndEvent" && nt != "ConvergeGateway" && nt != "DivergeGateway" && selectedObj.data("text")) {
			selectedObj.data("text").attr("text", WFattr["Name"]);
		}
	}
	
	hideEditBox();
	document.getElementById(nt+"_"+currentEditedProp).value = propValue;
}

function saveProp() {
	var nt = selectedObj.data("NodeType");
	var WFattr = selectedObj.data("WFattr");
	for(var key in WFattr) {
		WFattr[key] = document.getElementById(nt+"_"+key).value;
	}
	if(nt != "ConvergeGateway" && nt != "DivergeGateway" && selectedObj.data("text")) {
		selectedObj.data("text").attr("text", WFattr["Name"]);
	} else if(nt == "ConvergeGateway" || nt == "DivergeGateway") {
		var type = selectedObj.data("WFattr").Type;
		var sign = "";
		if(type == "AND") {
			sign = "+";
		} else if(type == "XOR") {
			sign = "x";
		} else if (type == "OR") {
			sign = "*";
		} else {
			sign = "*";
		}
		if(nt == "ConvergeGateway") {
			selectedObj.data("text").attr("text", sign+"\nCon");
		} else {
			selectedObj.data("text").attr("text", sign+"\nDiv");
		}
	}
}

function openEditBox(prop) {
	currentEditedProp = prop;
	document.getElementById("editBox").style.display = "block";
	document.getElementById("editBox_box").value = selectedObj.data("WFattr")[prop];
}

function generatePropertyPanel(node) {
	var nt = node.data("NodeType");
	if(document.getElementById(nt)) {
		//已存在，不创建
	} else {
		//创建
		var propPanel = document.getElementById("propPanel");
		
		var this_prop = document.createElement("div");
		this_prop.setAttribute("id", nt);
		this_prop.setAttribute("class", "propertites");
		this_prop.setAttribute("style", "display: none");
		
		var this_table = document.createElement("table");
		this_table.setAttribute("style", "color:#000");
		
		var saveBtn = document.createElement("button");
		saveBtn.setAttribute("onclick", "saveProp()");
		saveBtn.setAttribute("class", "save_prop");
		saveBtn.appendChild(document.createTextNode("保存"));
		
		var WFattr = node.data("WFattr");
		for(var key in WFattr) {
			var tr = document.createElement("tr");
			var td1 = document.createElement("td");
			td1.appendChild(document.createTextNode(key+":"));
			var td2 = document.createElement("td");
			var input = document.createElement("input");
			input.setAttribute("id", nt+"_"+key);
			input.setAttribute("type", "text");
			if(key == "Id" && nt != "Workflow") {
				input.setAttribute("readOnly", "true");
			}
			td2.appendChild(input);
			var td3 = document.createElement("td");
			var button = document.createElement("button");
			button.setAttribute("value", key);
			button.setAttribute("onclick", "openEditBox('"+key+"')");
			button.appendChild(document.createTextNode("..."));
			if(key == "Id" && nt != "Workflow") {
				button.disabled = true;
			}
			td3.appendChild(button);
			
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			
			this_table.appendChild(tr);
		}
		this_prop.appendChild(this_table);
		this_prop.appendChild(saveBtn);
		propPanel.appendChild(this_prop);
	}
}

function hideAll(ele) {
	var children = ele.childNodes;
	for(var i=0;i<children.length;i++) {
		if(children[i].id) {
			children[i].style.display = "none";
		}
	}
}

//隐藏编辑框
function hideEditBox() {
	document.getElementById("editBox").style.display = "none";
}

var click = function(e) {
	//当处于连接时，进入以下代码
	if(connectMode == "on") {
		if(fromObj == null) {
			var flag1 = check_InOut(this, "out");
			if(flag1) {
				fromObj = this;
			} else {
				return;
			}
		} else if (toObj == null) {
			if(fromObj == this) {
				alert("不要选择同一节点");
			} else {
				var flag2 = check_InOut(this, "in");
				if(flag2) {
					toObj = this;
				} else {
					return;
				}
			}
			
			if(fromObj.data("NodeType") == "DivergeGateway") {
				var attr = fromObj.data("WFattr");
				if(attr.sNext == undefined || attr.sNext == null) {
					attr.sNext = toObj;
				} else if(attr.fNext == undefined || attr.fNext == null) {
					attr.fNext = toObj;
				} else {
					alert("判断节点只能有 success 和 fail 两个分支");
					return;
				}
			}
			
			//如果toObj是一个结束节点，则fromObj的goto需要加上“end.”
			var ex = "";
			if(toObj.data("NodeType") == "EndEvent") {
				ex = "end.";
			}
			//设置节点的pre，next
	        toObj.data("WFattr").pre = fromObj;
	        var attr = fromObj.data("WFattr");
	        if(fromObj.data("NodeType") == "DivergeGateway") {
	        	if(attr.sNext == toObj) {
	        		//attr.sNext = toObj;
	        		attr.Success.Goto = ex+toObj.data("WFattr").Id;
	        	} else if(attr.fNext == toObj) {
	        		//attr.fNext = toObj;
	        		attr.Fail.Goto = ex+toObj.data("WFattr").Id;
	        	} else {
	        		alert("分支节点数据错误");
	        		return;
	        	}
	        } else {
	        	attr.next = toObj;
	        	fromObj.data("WFattr").Goto = ex+toObj.data("WFattr").Id;
	        }
	        
			
			var conn = r.connection(fromObj, toObj, "#fff");
			if(conn != null) {
				connections.push(conn);
				fromObj = null;
				toObj = null;
			}
		}
	}
	
	//非连接模式下，设置当前被选择节点为所点击的节点
	setSelectedObj(this);
	//刷新界面显示
//	freshIntf(this);//现在使用extjs的界面显示
	
	//调用父窗口的方法，显示节点信息
//	parent.showInfo(this);
	parent.showNodeInfo(this);
};

//节点的双击事件，删除功能
var nodeDblClick = function() {
	if(connectMode == "on") {
		return;
	}
	deleteNode(this);
};

//节点的双击时间，弹出参数窗口功能
var nodeDblClick2 = function() {
	if(parent != undefined) {
		parent.openSubwin(0);
	}
}

var mover = function(e) {
	var nt = this.data("NodeType");
	 if(nt == "SubProcess") {
			var box = this.getBBox();
			var relX = e.x - h_x_off;
			var relY = e.y - h_y_off;
			if(relX - box.x2 <=3 && relX - box.x2 >= -3 && relY - box.y2 <= 3 && relY - box.y2 >= -3) {
				resizeMode = "on";
			} else {
				resizeMode = "off";
			}
		}
};

function setSelectedObj(node) {
//	console.innerHTML = "selectedObj: "+node.data("WFattr").Name;
	 
	 
	if(selectedObj == node) {
		return;
	}
	
	secLastObj = selectedObj;
	selectedObj = node;
	
	if(node == null) {
		
	} else {
		if(selectedObj.animate) {
			selectedObj.animate({"stroke-opacity": 1}, 300);
		}
		setSelectedLine(null);
	}
	if(secLastObj != null && secLastObj.animate) {
		secLastObj.animate({"stroke-opacity": .2}, 300);
	}
	
}

function setSelectedLine(line) {
	if(selectedLine == line) {
		return;
	}
	
	secLastLine = selectedLine;
	selectedLine = line;
	
	if(line == null) {
		
	} else {
		if(selectedLine.animate) {
			selectedLine.animate({stroke: "#00FFFF"}, 300);
		}
		setSelectedObj(null);
	}
	
	if(secLastLine != null && secLastLine.animate) {
		secLastLine.animate({stroke: "#ffffff"}, 300);
	}
	
	
}

function freshIntf(node) {
	var nt = node.data("NodeType");
	//显示所选节点对应的属性界面
document.getElementById("editBox").style.display = "none";
	
	var prop = document.getElementById("propPanel");
	hideAll(prop);
	
	generatePropertyPanel(node);
	
	
	document.getElementById(nt).style.display = "block";
	
	
	
	var WFattr = node.data("WFattr");
	for(var key in WFattr) {
		var textField = document.getElementById(nt+"_"+key);
		if(textField) {
			textField.value = WFattr[key];
		}
	}
}

var changeMode = function() {
	if(connectMode == "on") {
		connectMode = "off";
		document.getElementById("btn_connect").style.color = "#000";
	} else {
		connectMode = "on";
		document.getElementById("btn_connect").style.color = "#00f";
	}
	fromObj = null;
	toObj = null;
	return connectMode;
};

function deleteConn(conn) {
	if(parent != undefined && parent.editing == false) {
		alert("不可编辑");
		return;
	}
	
	//删除相应的pre，next信息, 前一个节点的Goto、In信息
	if(contains(shapes, conn.to)) {
		conn.to.data("WFattr").pre = null;
	}	
	if(contains(shapes, conn.from)) {
		if(conn.from.data("NodeType") != "DivergeGateway") {
			conn.from.data("WFattr").next = null;
			conn.from.data("WFattr").Goto = null;
			conn.from.data("WFattr").In = [];
		} else {
			if (conn.from.data("WFattr").sNext == conn.to) {
				conn.from.data("WFattr").sNext = null;
				conn.from.data("WFattr").Success.Goto = null;
				conn.from.data("WFattr").Success.In = [];
			} else if (conn.from.data("WFattr").fNext == conn.to) {
				conn.from.data("WFattr").fNext = null;
				conn.from.data("WFattr").Fail.Goto = null;
				conn.from.data("WFattr").Fail.In = [];
			}
		}
	}
	
	//如果连接的from是个判断节点，移除相应的分支属性
	if(conn.from.data("NodeType")=="DivergeGateway") {
		if(conn.from.data("WFattr").sBranch == conn.to) {
			conn.from.data("WFattr").sBranch = null;
		} else if(conn.from.data("WFattr").fBranch == conn.to){
			conn.from.data("WFattr").fBranch = null;
		}
	}
	
	conn.arrow.remove();
	if(conn.text) {
		conn.text.remove();
	}
	for(var i = connections.length; i>=0;i--) {
		if(conn == connections[i]) {
			connections.splice(i, 1);
			break;
		}
	}
	conn.line.remove();
}

function initWF() {
	if(r != undefined) {
		r.clear();
	}
	
	
	workflow = new Object();
	workflow.propertites = {
			NodeType: "Workflow",
			WFattr: {
				Id: "com.sample.bpmn",
				Name: "Sample Process",
				Package: "defaultPackage",
				Swimlanes: "",
				Variables: "",
				Version: ""
			}
	};
	
	workflow.data = function(key) {
		return workflow.propertites[key];
	};
	
	generatePropertyPanel(workflow);
	
	//表示是否处于连线状态
	connectMode = "off";
	//表示是否处于resize状态
	resizeMode = "off";

	//一个连接的起止节点
	fromObj = null;
	toObj = null;

	//当前选中的节点
	selectedObj = null;

	//上次选中的节点, 配合当前选中的节点，实现选中节点高亮显示
	secLastObj = null;

	//当前编辑的节点的属性名。
	currentEditedProp = null;

	//保存节点数据
	shapes=[];

	//保存连接数据
	connections = [];
	
	//当前最大id号，新建节点后递增
	current_max_id = 1;
}

function showWF() {
	if(connectMode == "off") {
		setSelectedObj(workflow);
		freshIntf(workflow);
	}
}

function exportXMLData(sname, mname) {
	clearExportData();
	
	var attr = workflow.data("WFattr");
	
	for(var index in shapes) {
		shapes[index].exportNodes();
		addBpmndi(shapes[index]);
	}
	addConnections();
	
	definitions = "<definitions id=\"Definition\" " +
							"targetNamespace=\"http://www.jboss.org/drools\" " +
							"typeLanguage=\"http://www.java.com/javaTypes\" " +
							"expressionLanguage=\"http://www.mvel.org/2.0\" " +
							"xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" " +
							"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
							"xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" " +
							"xmlns:g=\"http://www.jboss.org/drools/flow/gpd\" " +
							"xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" " +
							"xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" " +
							"xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" " +
							"xmlns:tns=\"http://www.jboss.org/drools\">";
	
	process = "<process processType=\"Private\" isExecutable=\"true\" id=\""+attr.Id+"\" name=\""+attr.Name+"\" tns:packageName=\""+attr.Package+"\" >" +
						nodes +
						conns +
					"</process>";
	
	bpmndi = "<bpmndi:BPMNDiagram>" +
						"<bpmndi:BPMNPlane bpmnElement=\""+attr.Id+"\" >" +
							bpmndi +
						"</bpmndi:BPMNPlane>" +
					"</bpmndi:BPMNDiagram>";
	
	definitions += process + bpmndi + "</definitions>";
	
//	var sname = window.parent.curProStart.parentNode.attributes.serviceName;
//	var mname = window.parent.curProStart.attributes.methodName;
	
	service = "<service name='"+sname+"' method='"+mname+"' regid='"+parent.regid+"'>";
	ends = "<end>" + ends + "</end>";
	nodes += ends;
	service += parameters + nodes + "</service>";
	
//	var finalResult = xmlInfo + definitions;
	var finalResult = service;
//	alert(finalResult);
	
//	//向服务器发送生成的xmlString
//	var request = new XMLHttpRequest();
//	request.open("POST", window.parent.appConfig.baseUrl + "/com.jsjn.panda.extPage.ServiceInfo.do?method=saveProcess&xml="+finalResult+"&sname="+sname+"&mname="+mname, false);
//	request.send(null);
//	alert(request.responseText);
	return finalResult;
}

function clearExportData() {
	xmlInfo = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> ";
	definitions = "";
	process = "";//流程信息
	nodes = "";//节点信息
	conns = "";//连接信息
	bpmndi = "";//图形信息
	
	ends = "";
	service = "";
}

function loadXMLData(uri, sname, mname, srid) {
	initWF();
	
	//node的map, key:节点id，value:对应的节点
	var nmap = {};
	
	//读取xml文档
	var xmlDoc =new XMLDOC();
	
	if (xmlDoc != null) {
		try{
			xmlDoc.async = false;
			xmlDoc.load(uri+"&sname="+sname+"&mname="+mname+"&srid="+srid);
		} catch(e) {
			//chrome会抛出异常
			var xhr = new XMLHttpRequest();
			xhr.open("GET", uri+"&sname="+sname+"&mname="+mname+"&srid="+srid, false);
			xhr.send(null);
			xmlDoc = xhr.responseXML.documentElement;
		}
	}
	
	//节点图形信息
	var BPMNShape = xmlDoc.getElementsByTagName("BPMNShape");
	//连线图形信息
	var BPMNEdge = xmlDoc.getElementsByTagName("BPMNEdge");
	
	//解析process
	var eles = xmlDoc.getElementsByTagName("process");
	for( var i = 0; i < eles.length; i++) {
		var attr = workflow.data("WFattr");
		attr.Id = eles[i].getAttribute("id");
		attr.Name = eles[i].getAttribute("name");
		attr.Package = eles[i].getAttribute("tns:packageName");
	}
	
	//service tag, 包括最外层、无id的service和内部的service组件
//	var services = xmlDoc.getElementsByTagName("service");
		
	//解析start, 只有一个start
	var ele = xmlDoc.getElementsByTagName("start")[0];
	if(ele != null) {
		var x = new Number(ele.getAttribute("x"));
		var y = new Number(ele.getAttribute("y"));
		var sn = parent.newStart(sname, mname, srid, x, y);
		nmap["start"] = sn;
		var goTo = ele.getElementsByTagName("goto")[0];
		sn.data("WFattr").Id = "";
		sn.data("WFattr").Goto = goTo.getAttribute("value");
		var iN = goTo.getElementsByTagName("in");
		for(var i =0;i< iN.length;i++) {
			var index = iN[i].getAttribute("index");
			sn.data("WFattr").In[index] = format(iN[i].outerHTML);
//			sn.data("WFattr").In.push(format(iN[i].outerHTML));
		}
	}
	
	
	//解析end, 只有1个end，可能0个或多个out
	ele = xmlDoc.getElementsByTagName("end")[0];
	if(ele != null) {
		var out = ele.getElementsByTagName("out");
		var pos = ele.getElementsByTagName("pos");
		for(var i=0;i< pos.length; i++) {
			var x = new Number(pos[i].getAttribute("x"));
			var y = new Number(pos[i].getAttribute("y"));
			var en = parent.newEnd(sname, mname, srid, x, y);
			en.data("WFattr").Id = pos[i].getAttribute("outId");
//			en.data("text").attr("text", "id: "+en.data("WFattr").Id);
			en.data("text").attr("text", en.data("WFattr").fh);
			nmap["end."+en.data("WFattr").Id] = en;
			
			for(var j =0; j< out.length;j++) {
				if(out[j].getAttribute("id") == en.data("WFattr").Id) {
					en.data("WFattr").Out = format(out[j].outerHTML);
					en.data("WFattr").params.root[0].express = en.data("WFattr").Out;
					break;
				}
			}
		}
	}
	
	
	//解析scriptTask——service
	var eles = xmlDoc.getElementsByTagName("service");
	for( var i = 0; i < eles.length; i++) {
		var id = eles[i].getAttribute("id");
		if(id == null || id == undefined) {
			//说明是最外层的service, 可以跳过不解析
		} else {
			var x = new Number(eles[i].getAttribute("x"));
			var y = new Number(eles[i].getAttribute("y"));
			var rid = eles[i].getAttribute("regid");
			var st = parent.newCom(eles[i].getAttribute("name"), eles[i].getAttribute("method"), rid, x, y);
			st.data("WFattr").RegId = rid;
			st.data("WFattr").Id = eles[i].getAttribute("id");
			st.data("text").attr("text", "id: "+st.data("WFattr").Id+"\n"+eles[i].getAttribute("method"));
			nmap[st.data("WFattr").Id] = st;
			var pppp = st.data("WFattr").params;
			st.data("WFattr").ServiceName = eles[i].getAttribute("name");
			st.data("WFattr").MethodName = eles[i].getAttribute("method");
			
			var goTo = eles[i].getElementsByTagName("goto")[0];
			st.data("WFattr").Goto = goTo.getAttribute("value");
			var iN = goTo.getElementsByTagName("in");
			for(var j =0;j< iN.length;j++) {
				var index = iN[j].getAttribute("index");
				st.data("WFattr").In[index] = format(iN[j].outerHTML);
//				st.data("WFattr").In.push(format(iN[j].outerHTML));
			}
		}
	}
	
	//解析scriptTask——remote
	var eles = xmlDoc.getElementsByTagName("remote");
	for( var i = 0; i < eles.length; i++) {
		var id = eles[i].getAttribute("id");
		if(id == null || id == undefined) {
			//说明是最外层的service, 可以跳过不解析
		} else {
			var x = new Number(eles[i].getAttribute("x"));
			var y = new Number(eles[i].getAttribute("y"));
			var rid = eles[i].getAttribute("regid");
			var st = parent.newCom(eles[i].getAttribute("application"), eles[i].getAttribute("service"), rid, x, y);
			st.data("WFattr").RegId = rid;
			st.data("WFattr").MethodType = "RemoteBean";
			st.data("WFattr").Id = eles[i].getAttribute("id");
			st.data("text").attr("text", "id: "+st.data("WFattr").Id+"\n"+eles[i].getAttribute("service"));
			nmap[st.data("WFattr").Id] = st;
			var pppp = st.data("WFattr").params;
			st.data("WFattr").ServiceName = eles[i].getAttribute("application");
			st.data("WFattr").MethodName = eles[i].getAttribute("service");
			
			var goTo = eles[i].getElementsByTagName("goto")[0];
			st.data("WFattr").Goto = goTo.getAttribute("value");
			var iN = goTo.getElementsByTagName("in");
			for(var j =0;j< iN.length;j++) {
				var index = iN[j].getAttribute("index");
				st.data("WFattr").In[index] = format(iN[j].outerHTML);
//				st.data("WFattr").In.push(format(iN[j].outerHTML));
			}
		}
	}
	
	/*
	 * 解析DivergeGateway.
	 */
	eles = xmlDoc.getElementsByTagName("choice");
	for(var i = 0; i < eles.length; i++) {
		var x = new Number(eles[i].getAttribute("x"));
		var y = new Number(eles[i].getAttribute("y"));
		var dg = parent.newBranch(x, y);
		dg.data("WFattr").Id = eles[i].getAttribute("id");
		dg.data("text").attr("text", "id: "+dg.data("WFattr").Id);
		nmap[dg.data("WFattr").Id] = dg;
		dg.data("WFattr").Express = eles[i].getAttribute("express");
		var exxp = dg.data("WFattr").Express;
		dg.data("WFattr").params.root = [{dscrpt:"判断表达式", name:"", seq:1, vtype:"", ps:"", express:dg.data("WFattr").Express}];
		var attrss = dg.data("WFattr").params;
		
		var success = eles[i].getElementsByTagName("success")[0];
		var goto1 = success.getElementsByTagName("goto")[0];
		dg.data("WFattr").Success.Goto = goto1.getAttribute("value");
		var in1 = goto1.getElementsByTagName("in");
		for(var j=0;j< in1.length;j++) {
			var index = in1[j].getAttribute("index");
			dg.data("WFattr").Success.In[index] = format(in1[j].outerHTML);
//			dg.data("WFattr").Success.In.push(format(in1[j].outerHTML));
		}
		
		var fail = eles[i].getElementsByTagName("fail")[0];
		var goto2 = fail.getElementsByTagName("goto")[0];
		dg.data("WFattr").Fail.Goto = goto2.getAttribute("value");
		var in2 = goto2.getElementsByTagName("in");
		for(var j =0;j< in2.length;j++) {
			var index = in2[j].getAttribute("index");
			dg.data("WFattr").Fail.In[index] = format(in2[j].outerHTML);
//			dg.data("WFattr").Fail.In.push(format(in2[j].outerHTML));
		}
		
	}
	
	/*
	 * 解析params.
	 */
	ele = xmlDoc.getElementsByTagName("params")[0];
	parameters = ele.outerHTML;
	
	
	//连接
	for(var id in nmap) {
		if(nmap[id].data("NodeType") != "DivergeGateway") {
			if(nmap[id].data("WFattr").Goto != null 
					&& nmap[id].data("WFattr").Goto != "") {
				nmap[id].data("WFattr").next = nmap[nmap[id].data("WFattr").Goto];
				nmap[nmap[id].data("WFattr").Goto].data("WFattr").pre = nmap[id];
				var conn = r.connection(nmap[id], nmap[nmap[id].data("WFattr").Goto], "#fff");
				connections.push(conn);
			}
		} else {
			var scs = nmap[id].data("WFattr").Success;
			if(scs.Goto != null && scs.Goto != "") {
				nmap[id].data("WFattr").sNext = nmap[scs.Goto];
				nmap[scs.Goto].data("WFattr").pre = nmap[id];
				var conn = r.connection(nmap[id], nmap[scs.Goto], "#fff");
				connections.push(conn);
			}
			var fail = nmap[id].data("WFattr").Fail;
			if(fail.Goto != null && fail.Goto != "") {
				nmap[id].data("WFattr").fNext = nmap[fail.Goto];
				nmap[fail.Goto].data("WFattr").pre = nmap[id];
				var conn = r.connection(nmap[id], nmap[fail.Goto], "#fff");
				connections.push(conn);
			}
		}
	}
	//设置后一步的express字段值
	for(var id in nmap) {
		var params = nmap[id].data("WFattr").params;
		if( params != undefined) {
			var root = params.root;
			if(id == "start") {
//				for(var j =0;j<root.length;j++) {
//					root[j].express = nmap[id].data("WFattr").In[j];
//				}
				for(var j in nmap[id].data("WFattr").In) {
					root[j].express = nmap[id].data("WFattr").In[j];
				}
			} else if(nmap[id].data("NodeType") =="DivergeGateway" || 
					nmap[id].data("NodeType") =="EndEvent") { 
				//若自己是判断或结束，则前一步没有<in>
			} else {
				var atr = nmap[id].data("WFattr");
				var pre = atr.pre;
				if(pre.data("NodeType") != "DivergeGateway") {
//					for(var j in root) {
//						root[j].express = pre.data("WFattr").In[j];
//					}
					for(var j in pre.data("WFattr").In) {
						root[j].express = pre.data("WFattr").In[j];
					}
				} else {
					if(pre.data("WFattr").sNext == nmap[id]) {
//						for(var j in root) {
//							root[j].express = pre.data("WFattr").Success.In[j];
//						}
						for(var j in pre.data("WFattr").Success.In) {
							root[j].express = pre.data("WFattr").Success.In[j];
						}
					}
					if(pre.data("WFattr").fNext == nmap[id]) {
//						for(var j in root) {
//							root[j].express = pre.data("WFattr").Fail.In[j];
//						}
						for(var j in pre.data("WFattr").Fail.In) {
							root[j].express = pre.data("WFattr").Fail.In[j];
						}
					}
				}
			}
			
		}
	}
}


function getNextNodes(rNode) {
	var nodes = [];
	for (var i = 0; i<connections.length; i++) {
        var conn = connections[i];
        if(conn.from == rNode) {
        	nodes.push(conn.to);
        }
    }
	return nodes;
}

function contains(a, obj) { //判断一个数组是否包含某个元素
	for ( var i = 0; i < a.length; i++) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}

function format(str) {
	str = str.replace(/>{1}\s*<{1}/g, ">\n<");
	var ss = str.split("\n");
	if(ss.length == 1) {
		return str;
	} else {
		var r = "";
		r += ss[0] + "\n";
		for(var i=1;i<ss.length - 1;i++) {
			r += "\t"+ss[i]+"\n";
		}
		r += ss[ss.length - 1];
		return r;
	}
}