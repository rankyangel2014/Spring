//当前最大id号，递增
var current_max_id = new Number(1);

//通用图形属性
var circle_r = new Number(20);
var rect_width = new Number(100);
var rect_height = new Number(48);
var gw_width = new Number(50);
//var stroke = "#000";
var stroke_width = 2;
var stroke_opacity = .2;
var cursor = "move";
var fill_opacity = .1;
var innerTextFill = "#fff";

//用于导出xml用的变量，存放转换出的xmlString值
var xmlInfo = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> ";
var definitions = "";
var process = "";//流程信息
var nodes = "";//节点信息
var conns = "";//连接信息
var bpmndi = "";//图形信息
var ends = "";//end标签信息，end可能包含多个out标签
var service = "";

//工作流，代表整个流程，包含流程级属性
var workflow;



//定义个类型节点的“出入”限制，键值与NodeType要一致。
var node_in_out = {
		StartEvent: "0_1",
		EndEvent: "1_0",
		ScriptTask: "n_1",//n_1适应自己的规则
		UserTask: "1_1",
		DivergeGateway: "1_n",
		ConvergeGateway: "n_1",
		SubProcess: "1_1"
};

var startEvent = function(x, y) {
	var c = r.circle(x+circle_r, y+circle_r, circle_r).attr({fill:"#090"});
	c.attr({stroke: "#0f0"});
    c.data("text",r.text(x+circle_r,y+circle_r,""));
    //以下是工作流属性
    c.data("NodeType","StartEvent");
    c.data("WFattr",{Id:"1", MetaData:"", Name:"StartProcess", Goto:"", In:[]});
    
    //以下是导出方法
    c.exportNodes = function() {
    	var box = this.getBBox();
    	var x = parseInt(box.x);
    	var y = parseInt(box.y);
    	var str = "<start x='"+x+"' y='"+y+"'>";
    	str += "<goto value=\""+c.data("WFattr").Goto+"\">";
    	var input = c.data("WFattr").In;
    	for(var i in input) {
    		str += input[i];
    	}
    	/*
    	for(var i in c.data("WFattr").In) {
    		if(i.value != undefined) {
    			//{index: 1, value: "xxx"} 简单对象
    			str += "<in index=\""+i.index+"\" value=\""+i.value+"\"/>";
    		} else {
    			//{index:1, values:[{propName: "xxx", value: "xxx"}]} javabean
    			str += "<in index=\""+i.index+"\">";
    			//loop
    			for(var v in i.values) {
    				str += "<property name=\""+v.propName+"\" value=\""+v.value+"\"/>";
    			}
    			str += "</in>";
    		}
    	}
    	*/
    	str += "</goto>";
    	str += "</start>";
    	nodes += str;
    	return str;
    };
    
    return c;
};

var endEvent = function(x, y) {
	var innerText = r.text(x + circle_r, y + circle_r, "");
	innerText.attr({"fill": innerTextFill, });
	var c = r.circle(x+circle_r, y+circle_r, circle_r).attr({fill:"#900",});
	c.attr({stroke: "#f00"});
    c.data("text",innerText);
    
    c.data("NodeType","EndEvent");
    c.data("WFattr",{Id:"null", MetaData:"", Name:"End", Terminate:"true", Out:""});
    
  //以下是导出方法
    c.exportNodes = function() {
    	var box = this.getBBox();
    	var x = parseInt(box.x);
    	var y = parseInt(box.y);
    	var str = "";
    	var out = c.data("WFattr").Out;
    	for(var i in out) {
    		str += out[i];
    	}
    	str += "<pos outId='"+this.data("WFattr").Id+"' x='"+x+"' y='"+y+"'/>"
    	/*
    	if(c.data("WFattr").Id == "null") {
    		//返回值为void
    	} else {
    		//返回值不为void
    		if(out.value != undefined) {
    			//<out id="1" value="xxx"/>
    			str += "<out id=\""+c.data("WFattr").Id+"\" value=\""+out.value+"\"/>";
    		} else {
    			//<out id="1" ><property name="xx" value="xx"/></out>
    			str += "<out id=\""+c.data("WFattr").Id+"\">";
    			for(var v in out.values) {
    				str += "<property name=\""+v.propName+"\" value=\""+v.value+"\"/>";
    			}
    			str += "</out>";
    		}
    	}
    	*/
    	ends += str;
//    	nodes += str;
    	return str;
    };
    
    return c;
};

var scriptTask = function(x, y) {
	var innerText = r.text(x + rect_width/2, y + rect_height/2, "Script");
	innerText.attr({"fill": innerTextFill,});
	var st = r.rect(x, y, rect_width, rect_height, 2);
	
	st.data("text", innerText);
	st.attr({
		fill : "#bfac00",
		stroke : "#bfac00"
	});

	st.data("NodeType", "ScriptTask");
	st.data("WFattr", {
		RegId : "",
		Id : "",
		Goto : "",
		Name : st.data("text").attr("text"),
		ServiceName :"",
		MethodName : "",
		In : []
	});
	
	//以下是导出方法
    st.exportNodes = function() {
    	var attr = st.data("WFattr");
    	var tag = st.data("WFattr").MethodType == "RemoteBean" ? "remote" : "service";
    	var name = tag == "remote" ? "application" : "name";
    	var method = tag == "remote" ? "service" : "method";
    	var regid = "regid=\""+st.data("WFattr").RegId+"\"";
    	var box = this.getBBox();
    	var x = parseInt(box.x);
    	var y = parseInt(box.y);
    	var str = "<"+tag+" id=\""+st.data("WFattr").Id+"\" "+name+"=\""+st.data("WFattr").ServiceName+"\" "+method+"=\""+st.data("WFattr").MethodName+"\" "+regid+" x='"+x+"' y='"+y+"'>";
    	str += "<goto value=\""+st.data("WFattr").Goto+"\">";
    	var input = st.data("WFattr").In;
    	for(var i in input) {
    		str += input[i];
    	}
    	/*
    	for(var i in st.data("WFattr").In) {
    		if(i.value != undefined) {
    			//{index: 1, value: "xxx"} 简单对象
    			str += "<in index=\""+i.index+"\" value=\""+i.value+"\"/>";
    		} else {
    			//{index:1, values:[{propName: "xxx", value: "xxx"}]} javabean
    			str += "<in index=\""+i.index+"\">";
    			//loop
    			for(var v in i.values) {
    				str += "<property name=\""+v.propName+"\" value=\""+v.value+"\"/>";
    			}
    			str += "</in>";
    		}
    	}
    	*/
    	str += "</goto>";
    	str += "</"+tag+">";
    	nodes += str;
    	return str;
    };
	
	return st;
};

var userTask = function(x, y) {
	var innerText = r.text(x + rect_width/2, y + rect_height/2, "User Task");
	innerText.attr({"fill": innerTextFill,});
	var ut = r.rect(x, y, rect_width, rect_height, 2);
	
	ut.data("text", innerText);
	ut.attr({
		fill : "#bfac00",
		stroke : "#bfac00"
	});

	ut.data("NodeType", "UserTask");
	ut.data("WFattr", {
		Id : "",
		Goto : "",
		Name : ut.data("text").attr("text"),
		In : []
	});
	
	
	//以下是导出方法
    ut.exportNodes = function() {
    	var attr = this.data("WFattr");
    	var str = "<userTask id=\"_"+attr.Id+"\" name=\""+attr.Name+"\" >";
    	
    	var ioSpecification = "";
    	var dataInput = "";
    	var inputSet = "";
    	var dataInputRefs = "";
    	var outputSet = "";
    	var dataInputAssociation = "";
    	var potentialOwner = "";
    	
    	var addDataInput = function(propName) {
    		dataInput += "<dataInput id=\"_"+attr.Id+"_"+propName+"Input\" name=\""+propName+"\" />";
    	};
    	var addDataInputRefs = function(propName) {
    		dataInputRefs += "<dataInputRefs>_"+attr.Id+"_"+propName+"Input</dataInputRefs>";
    	};
    	var addDataInputAssociation = function(propName) {
    		dataInputAssociation += "<dataInputAssociation>" +
    													"<targetRef>_"+attr.Id+"_"+propName+"Input</targetRef>" +
    													"<assignment>" +
    														"<from xsi:type=\"tFormalExpression\">"+attr[propName]+"</from>" +
    														"<to xsi:type=\"tFormalExpression\">_"+attr.Id+"_"+propName+"Input</to>" +
    													"</assignment>" +
    												"</dataInputAssociation>";
    	};
    	var addInput = function(propName) {
    		addDataInput(propName);
    		addDataInputRefs(propName);
    		addDataInputAssociation(propName);
    	};
    	
    	if(trim(attr.Comment) != "") {
    		addInput("Comment");
    	}
    	if(trim(attr.Skippable) != "") {
    		addInput("Skippable");
    	}
    	if(trim(attr.Content) != "") {
    		addInput("Content");
    	}
    	if(trim(attr.TaskName) != "") {
    		addInput("TaskName");
    	}
    	if(trim(attr.GroupId) != "") {
    		addInput("GroupId");
    	}
    	if(trim(attr.Priority) != "") {
    		addInput("Priority");
    	}
    	inputSet = "<inputSet>"+dataInputRefs+"</inputSet>";
    	outputSet = "<outputSet></outputSet>";
    	ioSpecification = "<ioSpecification>"+dataInput+inputSet+outputSet+"</ioSpecification>";
    	
    	if(trim(attr.ActorId) != "") {
    		potentialOwner += "<potentialOwner>" +
    				"<resourceAssignmentExpression>" +
    				"<formalExpression>" +
    				attr.ActorId +
    				"</formalExpression>" +
    				"</resourceAssignmentExpression>" +
    				"</potentialOwner>";
    	}
    	
    	str += ioSpecification + dataInputAssociation + potentialOwner + "</userTask>";
    	nodes += str;
    	return str;
    };	
	
	return ut;
};

var divergeGateway = function(x, y) {
	var innerText = r.text(x + gw_width/2, y + gw_width/2, "*\nDiv");
	innerText.attr({"fill": innerTextFill,});
	var st = r.path("M"+(x-0+gw_width/2)+","+y+"L"+(x-0+gw_width)+","+(y-0+gw_width/2)+"L"+(x-0+gw_width/2)+","+(y-0+gw_width)+"L"+x+","+(y-0+gw_width/2)+"L"+(x-0+gw_width/2)+","+y);
	st.cx = x + gw_width/2;
	st.cy = y + gw_width/2;
	
	st.data("text", innerText);
	st.attr({
		fill : "#bfac00",
		stroke : "#bfac00"
	});

	st.data("NodeType", "DivergeGateway");
	st.data("WFattr", {
		Id : "",
		Express : "",
		Name : "Gateway",
		Type : "",
		Success : { Goto :"", In:[]},
		Fail : { Goto:"", In:[]}
	});
	
	//以下是导出方法
	st.exportNodes = function() {
		var box = this.getBBox();
		var x = parseInt(box.x);
    	var y = parseInt(box.y);
		var attr = st.data("WFattr");
		var str = "<choice id=\""+attr.Id+"\" express=\""+attr.Express+"\" x='"+x+"' y='"+y+"'>";
		str += "<success>";
		str += "<goto value=\""+attr.Success.Goto+"\">";
		
		var input1 = st.data("WFattr").Success.In;
    	for(var i in input1) {
    		str += input1[i];
    	}
		/*
		for(var i in attr.Success.In) {
    		if(i.value != undefined) {
    			//{index: 1, value: "xxx"} 简单对象
    			str += "<in index=\""+i.index+"\" value=\""+i.value+"\"/>";
    		} else {
    			//{index:1, values:[{propName: "xxx", value: "xxx"}]} javabean
    			str += "<in index=\""+i.index+"\">";
    			//loop
    			for(var v in i.values) {
    				str += "<property name=\""+v.propName+"\" value=\""+v.value+"\"/>";
    			}
    			str += "</in>";
    		}
    	}
    	*/
		str += "</goto></success>";
		str += "<fail>";
		str += "<goto value=\""+attr.Fail.Goto+"\">";
		var input2 = st.data("WFattr").Fail.In;
    	for(var i in input2) {
    		str += input2[i];
    	}
		/*
		for(var i in attr.Fail.In) {
    		if(i.value != undefined) {
    			//{index: 1, value: "xxx"} 简单对象
    			str += "<in index=\""+i.index+"\" value=\""+i.value+"\"/>";
    		} else {
    			//{index:1, values:[{propName: "xxx", value: "xxx"}]} javabean
    			str += "<in index=\""+i.index+"\">";
    			//loop
    			for(var v in i.values) {
    				str += "<property name=\""+v.propName+"\" value=\""+v.value+"\"/>";
    			}
    			str += "</in>";
    		}
    	}
    	*/
		str += "</goto></fail>";
		str += "</choice>";
		nodes += str;
		return str;
	};
	
	return st;
};

var convergeGateway = function(x, y) {
	var innerText = r.text(x + gw_width/2, y + gw_width/2, "*\nCon");
	innerText.attr({"fill": innerTextFill,});
	var st = r.path("M"+(x-0+gw_width/2)+","+y+"L"+(x-0+gw_width)+","+(y-0+gw_width/2)+"L"+(x-0+gw_width/2)+","+(y-0+gw_width)+"L"+x+","+(y-0+gw_width/2)+"L"+(x-0+gw_width/2)+","+y);
	st.cx = x + gw_width/2;
	st.cy = y + gw_width/2;
	
	st.data("text", innerText);
	st.attr({
		fill : "#bfac00",
		stroke : "#bfac00"
	});

	st.data("NodeType", "ConvergeGateway");
	st.data("WFattr", {
		Id : "",
		MetaData : "",
		Name : "Gateway",
		Type : "",
	});
	
	//以下是导出方法
	st.exportNodes = function() {
		var attr = this.data("WFattr");
		var type = "";
		if(trim(attr.Type) == "AND") {
			type = "parallelGateway";
		} else if (trim(attr.Type) == "XOR") {
			type = "exclusiveGateway";
		} else {
			type = "complexGateway";
		}
		var str = "<"+type+" id=\"_"+attr.Id+"\" name=\""+attr.Name+"\" gatewayDirection=\"Converging\" />";
		nodes += str;
		return str;
	};
	
	return st;
};

var subProcess = function() {
	var innerText = r.text(100, 225, "");
	innerText.attr({"fill": innerTextFill,});
	var st = r.rect(100,200,200,200,2);
	st.data("text", innerText);
	st.attr({
		stroke : "#aaa"
	});

	st.data("NodeType", "SubProcess");
	st.data("WFattr", {
	});
	st.mouseover(mover);
	return st;
};

//createNodeFunc存放每个类型节点的创建方法，在newNode方法中统一调用
var createNodeFunc = {
		StartEvent: startEvent,
		EndEvent: endEvent,
		ScriptTask: scriptTask,
		UserTask: userTask,
		DivergeGateway: divergeGateway,
		ConvergeGateway: convergeGateway,
		SubProcess: subProcess,
};

//node_type为创建的节点的类型，与createNodeFunc中的键值一致。
var newNode = function(node_type, x, y) {
	var node = createNodeFunc[node_type](x, y);
	node.data("WFattr").Id = current_max_id++;
	
	node.attr({"stroke-opacity": stroke_opacity, "stroke-width": stroke_width, cursor: cursor, "fill-opacity": fill_opacity});
	node.drag(move, dragger, up);
	node.click(click);//单击事件是显示属性窗口，现已用extjs 
	node.dblclick(nodeDblClick2);
	shapes.push(node);
	return node;
};

function deleteNode(node) {
	if(parent != undefined && parent.editing == false) {
		alert("不可编辑");
		return;
	}
	
	if(connectMode == "on") {
		return;
	}
	
	if(!node) {
		alert("未选择节点。");
		return;
	}
	
	for(var i=0;i<shapes.length;i++) {
		if(shapes[i] == node) {
			shapes.splice(i, 1);
			break;
		}
	}
	//删线, 先循环遍历一次connections，找出要删的线
	var connToDel = [];
	for(var i=0;i<connections.length;i++) {
		if(connections[i].from == node || connections[i].to == node) {
			connToDel.push(connections[i]);
			/*
			//如果连接的from是个判断节点，移除相应的分支属性
			if(connections[i].to == node && connections[i].from.data("NodeType")=="DivergeGateway") {
				if(connections[i].from.data("WFattr").sBranch == node) {
					connections[i].from.data("WFattr").sBranch = null;
				} else {
					connections[i].from.data("WFattr").fBranch = null;
				}
			}
			connections[i].line.remove();
			connections[i].arrow.remove();
			connections.splice(i, 1);
			i--;
			*/
		}
	}
	//再一起删除
	for(var i=0;i<connToDel.length;i++) {
		deleteConn(connToDel[i]);
	}
	
	node.data("text").remove();
	node.remove();
	
	var prop = document.getElementById("propPanel");
	hideAll(prop);
	document.getElementById("editBox").style.display = "none";
	selectedObj = null;
}

function connect(from, to) {
	if(from == to) {
		alert("不要选择同一节点");
		return;
	}
	
	//检查“出节点”
	var flag1 = check_InOut(from, "out");
	//检查“入节点”
	var flag2 = check_InOut(to, "in");
	
	if(flag1 && flag2) {
		//连接
		var conn = r.connection(from, to, "#fff");
		connections.push(conn);
		return conn;
	}
}

function check_InOut(node, inout) {
	var in_out = node_in_out[node.data("NodeType")];
	
	if(inout == "out") {
		if(in_out.charAt(2) == "n") {
			return true;
		} else if (in_out.charAt(2) == "1") {
			//检查是否已经连过线
			var flag = "";
			for(var i=0;i<connections.length;i++) {
				if(connections[i].from == node) {
					flag = "1";//已经做过起点
					break;
				} 
			}
			if(flag == "1") {
				alert("该类型节点只能有一个out。");
				return false;
			} else {
				return true;
			}
		} else {
			alert("该类型节点无法作为起始点。");
			return false;
		}
	}
	
	if(inout == "in") {
		if(in_out.charAt(0) == "n") {
			return true;
		} else if (in_out.charAt(0) == "1") {
			//检查是否已经连过线
			var flag = "";
			for(var i=0;i<connections.length;i++) {
				if(connections[i].to == node) {
					flag = "1";//已经做过起点
					break;
				} 
			}
			if(flag == "1") {
				alert("该类型节点只能有一个in。");
				return false;
			} else {
				return true;
			}
		} else {
			alert("该类型节点无法作为起终点。");
			return false;
		}
	}
	
	return false;
}

function addBpmndi(ele) {
	if(ele.line) {
		//有line属性，说明是连接
		var fAttr = ele.from.data("WFattr");
		var tAttr = ele.to.data("WFattr");
		var fbox = ele.from.getBBox();
		var tbox = ele.to.getBBox();
		var x1 = parseInt(fbox.x) + parseInt(fbox.width/2);
		var y1 = parseInt(fbox.y) + parseInt(fbox.height/2);
		var x2 = parseInt(tbox.x) + parseInt(tbox.width/2);
		var y2 = parseInt(tbox.y) + parseInt(tbox.height/2);
		
		var str = "<bpmndi:BPMNEdge bpmnElement=\"_"+fAttr.Id+"-_"+tAttr.Id+"\" >" +
							"<di:waypoint x=\""+x1+"\" y=\""+y1+"\" />" +
							"<di:waypoint x=\""+x2+"\" y=\""+y2+"\" />" +
					  "</bpmndi:BPMNEdge>";
		bpmndi += str;
		return str;
	} else {
		var attr = ele.data("WFattr");
		var box = ele.getBBox();
		var str = "<bpmndi:BPMNShape bpmnElement=\"_"+attr.Id+"\" >" +
							"<dc:Bounds x=\""+parseInt(box.x)+"\" y=\""+parseInt(box.y)+"\" width=\""+parseInt(box.width)+"\" height=\""+parseInt(box.height)+"\" />" +
					  "</bpmndi:BPMNShape>";
		bpmndi += str;
		return str;
	}
}

function addConnections() {
	for(var index in connections) {
		var conn = connections[index];
		var fAttr = conn.from.data("WFattr");
		var tAttr = conn.to.data("WFattr");
		
		conns += "<sequenceFlow id=\"_"+fAttr.Id+"-_"+tAttr.Id+"\" sourceRef=\"_"+fAttr.Id+"\" targetRef=\"_"+tAttr.Id+"\" />";
		addBpmndi(conn);
	}
}