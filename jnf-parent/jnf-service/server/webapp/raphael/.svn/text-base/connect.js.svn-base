Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    
//    var fromObj = obj1;
//    var toObj = obj2;
//    if(fromObj.data("NodeType") == "DivergeGateway") {
//		var attr = fromObj.data("WFattr");
//		if(attr.sBranch == undefined || attr.sBranch == null) {
//			attr.sBranch = toObj;
//		} else if(attr.fBranch == undefined || attr.fBranch == null) {
//			attr.fBranch = toObj;
//		} else {
//			alert("判断节点只能有 success 和 fail 两个分支");
//			return;
//		}
//	}
//	
//	//设置节点的pre，next
//    toObj.data("WFattr").pre = fromObj;
//    var attr = fromObj.data("WFattr");
//    if(fromObj.data("NodeType") == "DivergeGateway") {
//    	if(attr.sBranch == toObj) {
//    		attr.sNext = toObj;
//    	} else if(attr.fBranch == toObj) {
//    		attr.fNext = toObj;
//    	} else {
//    		alert("分支节点数据错误");
//    		return;
//    	}
//    } else {
//    	attr.next = toObj;
//    }
//    fromObj.data("WFattr").Goto = toObj.data("WFattr").Id;
    
    
    
    
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
   
//    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    //起始节点的中心点
    var n1 = new Object();
    n1.x = parseInt(bb1.x + bb1.width/2);
    n1.y = parseInt(bb1.y+bb1.height/2);
    //终止节点的中心点
    var n2 = new Object();
    n2.x = parseInt(bb2.x + bb2.width/2);
    n2.y = parseInt(bb2.y+bb2.height/2);
    
    //以下4个节点分别是起始节点矩形边框的4个顶点
    var node11 = new Object();
    node11.x = parseInt(bb1.x);
    node11.y = parseInt(bb1.y);
    var node12 = new Object();
    node12.x = parseInt(bb1.x+bb1.width);
    node12.y = parseInt(bb1.y);
    var node13 = new Object();
    node13.x = parseInt(bb1.x);
    node13.y = parseInt(bb1.y+bb1.height);
    var node14 = new Object();
    node14.x = parseInt(bb1.x+bb1.width);
    node14.y = parseInt(bb1.y+bb1.height);
  //以下4个节点分别是终止节点矩形边框的4个顶点
    var node21 = new Object();
    node21.x = parseInt(bb2.x);
    node21.y = parseInt(bb2.y);
    var node22 = new Object();
    node22.x = parseInt(bb2.x+bb2.width);
    node22.y = parseInt(bb2.y);
    var node23 = new Object();
    node23.x = parseInt(bb2.x);
    node23.y = parseInt(bb2.y+bb2.height);
    var node24 = new Object();
    node24.x = parseInt(bb2.x+bb2.width);
    node24.y = parseInt(bb2.y+bb2.height);
    
    //求出交点，作为最终线段的起止点
    var startNode;
    if(startNode = segmentsIntr(n1, n2, node11, node12)) {
    	
    } else if(startNode = segmentsIntr(n1, n2, node11, node13)) {
    	
    } else if(startNode = segmentsIntr(n1, n2, node12, node14)) {
    	
    } else if(startNode = segmentsIntr(n1, n2, node13, node14)) {
    	
    } else {
    	startNode = n1;
    }
    var endNode;
    if(endNode = segmentsIntr(n1, n2, node21, node22)) {
    	
    } else if(endNode = segmentsIntr(n1, n2, node21, node23)) {
    	
    } else if(endNode = segmentsIntr(n1, n2, node22, node24)) {
    	
    } else if(endNode = segmentsIntr(n1, n2, node23, node24)) {
    	
    } else {
    	endNode = n2;
    }
    
    var path = ["M", parseInt(startNode.x), parseInt(startNode.y), "L", parseInt(endNode.x), parseInt(endNode.y)].join(",");
    var arrowInfo = this.drawArrow(parseInt(startNode.x),parseInt(startNode.y),parseInt(endNode.x),parseInt(endNode.y));
//    var arrowPath = ["M"+(parseInt(x4) - 10)+","+(parseInt(y4) - 10)+"L"+parseInt(x4)+","+parseInt(y4)+"L"+(parseInt(x4) - 10)+","+(parseInt(y4) + 10)].join(",");
    var arrowPath = arrowInfo.path;
    var rotateAngle = arrowInfo.rotateAngle;
    
    var txt = "";
    var attr = obj1.data("WFattr");
    if(attr.sNext && attr.sNext == obj2) {
    	txt = "True";
    } else if(attr.fNext && attr.fNext == obj2) {
    	txt = "False";
    }
    
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
        line.arrow.attr({path: arrowPath});
        line.arrow.remove();
        if(line.text) {
        	line.text.remove();
        }
        line.arrow = this.path(arrowPath).attr({fill:"#000"}).rotate(rotateAngle, parseInt(endNode.x), parseInt(endNode.y));//rotate(rotateAngle, parseInt(x4), parseInt(y4));
        
        if(txt != "") {
        	line.text = this.text( (parseInt(startNode.x)+parseInt(endNode.x))/2, (parseInt(startNode.y)+parseInt(endNode.y))/2, txt);
        	if(txt == "True") {
        		line.text.attr({"fill": "#0f0"});
        	} else {
        		line.text.attr({"fill": "#f00"});
        	}
        }
       
    } else {
        var color = typeof line == "string" ? line : "#000";
        var l =  this.path(path);
        //增加text
        var text;
        if(txt != "") {
        	text = this.text( (parseInt(startNode.x)+parseInt(endNode.x))/2, (parseInt(startNode.y)+parseInt(endNode.y))/2, txt);
        	if(txt == "True") {
        		text.attr({"fill": "#0f0"});
        	} else {
        		text.attr({"fill": "#f00"});
        	}
        }
    	
        l.attr({stroke: color, fill: "none"});
        l.attr("stroke-width","3");
        l.dblclick(function() {
        	deleteConn(this.data("conn"));
        	/*
        	this.data("conn").arrow.remove();
        	for(var i = connections.length; i--;) {
        		if(this.data("conn") == connections[i]) {
        			connections.splice(i, 1);
        		}
        	}
        	this.remove();
        	//alert(connections.length);
        	*/
        });
        var arrow = this.path(arrowPath).attr({fill:"#000"}).rotate(rotateAngle, parseInt(endNode.x), parseInt(endNode.y));//this.path(arrowPath);
        
        var conn = {
                bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
                text: text,
                line: l,
                from: obj1,
                to: obj2,
                arrow: arrow
            };
        //单击线，显示下一个节点所需参数信息
        l.click(function() {
        	setSelectedLine(l);
        	parent.showNodeInfo(conn.to, conn);
        });
        l.data("conn", conn);
        return conn;
    }
};

Raphael.fn.drawArrow = function (x1, y1, x2, y2) {
	var rotateAngle;
	if(x1 == x2) {
		if(y2>y1) {
			rotateAngle = 90;
		}
		else {
			rotateAngle = 270;
		}
	}
	else {
		var xielv = (y2-y1)/(x2-x1);
		var angle = Math.atan(xielv)/Math.PI*180;

		if(parseInt(x2) > parseInt(x1)) {
			rotateAngle = parseInt(angle);
		}
		else {
			rotateAngle = parseInt(180) + parseInt(angle);
		}
	}
	var path = ["M"+(parseInt(x2) - 10)+","+(parseInt(y2) - 5)+"L"+parseInt(x2)+","+parseInt(y2)+"L"+(parseInt(x2) - 10)+","+(parseInt(y2) + 5)+"Z"].join(",");
	return {path:path, rotateAngle:rotateAngle};
};
