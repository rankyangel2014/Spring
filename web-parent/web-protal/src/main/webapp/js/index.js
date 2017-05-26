$(document).ready(function() {

	// 保留两位小数
	var fixed2 = function(val) {
		return val.toFixed(2);
	}

	// 加百分号
	var fixed2percentage = function(val) {
		return fixed2(val) + '%';
	}
	// 高亮
	var highliht = function(val) {
		if (val > 0) {
			return '<span style="color: #b00">' + fixed2(val) + '</span>';
		} else if (val < 0) {
			return '<span style="color: #0b0">' + fixed2(val) + '</span>';
		}
		return fixed2(val);
	};

	// 列
	var colss = [ {
		title : '用户ID',
		name : 'id',
		width : 60,
		align : 'center',
		sortable : true
	}, {
		title : '用户名称',
		name : 'value',
		width : 60,
		align : 'center',
		sortable : true
	} ];
	// 分页
	$('#table11-1').mmGrid({
		width:'auto',
		height:'auto',
		indexCol : true,
		checkCol : true,
		multiSelect:true,
		fullWidthRows : true,
		indexColWidth : 35,
		cols : colss,
		url : 'getAllUser',
		method : 'post',
		root : 'root',
		autoLoad : true,
		remoteSort : true,
		sortName : 'id',
		sortStatus : 'asc',
		plugins : [ $('#paginator11-1').mmPaginator() ]
	});
});
