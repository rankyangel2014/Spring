/*Ext.form.TextField.prototype.size=20;
Ext.form.TextField.prototype.initValue = function(){
    if(!isNaN(this.maxLength)&&(this.maxLength*1)>0
        &&(this.maxLength!=Number.MAX_VALUE)){
        this.el.dom.maxLength=this.maxLength*1;
    }
}*/

/**
 * 解决ExtJs在format为Ym时选中2月份时自动变为3月的缺陷
 */
Ext.override(Ext.form.DateField, {
	safeParse : function(value, format) {
		if (/[gGhH]/.test(format.replace(/(\\.)/g, ''))) {
			return Date.parseDate(value, format);
		} else if (format.indexOf('d') == -1) {
			var parsedDate = Date.parseDate(value + '-01 '
							+ this.initTime, format + '-d '
							+ this.initTimeFormat);
			if (parsedDate) {
				return parsedDate.clearTime();
			}
		} else {
			var parsedDate = Date.parseDate(
					value + ' ' + this.initTime, format + ' '
							+ this.initTimeFormat);
			if (parsedDate) {
				return parsedDate.clearTime();
			}
		}
	}
});
Ext.override(Ext.grid.RowSelectionModel, {
	onEditorKey : function(field, e) {
		var k = e.getKey(), newCell, g = this.grid, last = g.lastEdit, ed = g.activeEditor, shift = e.shiftKey, ae, last, r, c;

		if (k == e.TAB) {
			e.stopEvent();
			ed.completeEdit();
			if (shift) {
				newCell = g.walkCells(ed.row, ed.col - 1, -1, this.acceptsNav,this);
			} else {
				newCell = g.walkCells(ed.row, ed.col + 1, 1, this.acceptsNav,this);
			}
		} else if (k == e.ENTER) {
			if (this.moveEditorOnEnter !== false) {
				if (shift) {
					newCell = g.walkCells(last.row, last.col - 1, -1,this.acceptsNav, this);
				} else {
					newCell = g.walkCells(last.row, last.col + 1, 1,this.acceptsNav, this);
				}
			}
		}
		if (newCell) {
			r = newCell[0];
			c = newCell[1];

			this.onEditorSelect(r, last.row);

			if (g.isEditor && g.editing) { // *** handle tabbing while
				// editorgrid is in edit mode
				ae = g.activeEditor;
				if (ae && ae.field.triggerBlur) {
					// *** if activeEditor is a TriggerField, explicitly call
					// its triggerBlur() method
					ae.field.triggerBlur();
				}
			}
			g.startEditing(r, c);
		}
	}
});

//重写grid表格排序，解决中文排序、特殊字段排序问题
Ext.data.Store.prototype.applySort = function() {
    if (this.sortInfo && !this.remoteSort) {
        var s = this.sortInfo, f = s.field;
        var st = this.fields.get(f).sortType;
        var fn = function(r1, r2) {
            var v1 = st(r1.data[f]), v2 = st(r2.data[f]);
            if (typeof(v1) == "string") {
            	//特殊字段排序
            	if(f=='loanNo') { //借据号按数字型排序
            		var num1 = parseInt(v1);
            		var num2 = parseInt(v2);
            		return num1 > num2 ? 1 : (num1 < num2 ? -1 : 0);
            	};
            	
                return v1.localeCompare(v2);
            }
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        };
        this.data.sort(s.direction, fn);
        if(this.snapshot && this.snapshot != this.data) {
            this.snapshot.sort(s.direction, fn);
        }
    }
};

Ext.form.DateField.prototype.onTriggerClick = function() {
	if (this.disabled) {
		return;
	}
	if (this.menu == null) {
		this.menu = new Ext.menu.DateMenu({
					hideOnClick : false,
					focusOnSelect : false
				});
	}
	this.onFocus();
	Ext.apply(this.menu.picker, {
				minDate : this.minValue,
				maxDate : this.maxValue,
				disabledDatesRE : this.disabledDatesRE,
				disabledDatesText : this.disabledDatesText,
				disabledDays : this.disabledDays,
				disabledDaysText : this.disabledDaysText,
				format : this.format,
				showToday : this.showToday,
				startDay : this.startDay,
				minText : String.format(this.minText, this
								.formatDate(this.minValue)),
				maxText : String.format(this.maxText, this
								.formatDate(this.maxValue))
			});
	this.menu.picker.setValue(this.getValue() || new Date());
	this.menu.show(this.el, "tl-bl?");
	this.menuEvents('on');
	if (this.format.indexOf('d') == -1) {
		this.menu.picker.monthPicker.slideIn = function() {
			this.show();
		};
		this.menu.picker.hideMonthPicker = function() {
			this.monthPicker.hide();
			var v = this.activeDate;
			if (v) {
				this.setValue(new Date(v));
				this.fireEvent('select', this, this.value);
			}
		};
		this.menu.picker.showMonthPicker();
	}

};

//重写RadioGroup取值方法 
Ext.override(Ext.form.RadioGroup, {   
    getValue: function(){   
        var v;   
        if (this.rendered) {   
            this.items.each(function(item){   
                if (!item.getValue())    
                    return true;   
                v = item.getRawValue();   
                return false;   
            });   
        }   
        else {   
            for (var k in this.items) {   
                if (this.items[k].checked) {   
                    v = this.items[k].inputValue;   
                    break;   
                }   
            }   
        }   
        return v;   
    },   
    setValue: function(v){   
        if (this.rendered)    
            this.items.each(function(item){   
                item.setValue(item.getRawValue() == v);   
            });   
        else {   
            for (var k in this.items) {   
                this.items[k].checked = this.items[k].inputValue == v;   
            }   
        }   
    }   
});  



/**
 * 根据选中grid的行数去进行判断相应的按钮是否灰质 gridId:grid的id ids:要操作的按钮id数组 flag:
 * true在多选Grid的时候时候判断按钮的状态 false在单选Grid的时候时候判断按钮的状态
 */
function buttonIsShow(gridId, ids, flag) {
	var grid = Ext.getCmp(gridId);
	var records = grid.selModel.selections.items;
	var selectCount = records.length;
	if (flag) {
		if (selectCount > 1) {
			for (var i = 0; i < ids.length; i++) {
				Ext.getCmp(ids[i]).setDisabled(true);
			}
		} else if (selectCount == 0) {
			for (var i = 0; i < ids.length; i++) {
				Ext.getCmp(ids[i]).setDisabled(true);
			}
		} else {
			for (var i = 0; i < ids.length; i++) {
				Ext.getCmp(ids[i]).setDisabled(false);
			}
		}
	} else {
		if (selectCount == 0) {
			for (var i = 0; i < ids.length; i++) {
				Ext.getCmp(ids[i]).setDisabled(true);
			}
		} else {
			for (var i = 0; i < ids.length; i++) {
				Ext.getCmp(ids[i]).setDisabled(false);
			}
		}
	}
};
/**
 * 
 * @param comboIds combo id
 */
function reSetComboValue(comboIds) {
	for ( var i = 0; i < comboIds.length; i++) {
		var combo = Ext.getCmp(comboIds[i]);
		addComboLoadEvt(combo);
	}
}
function addComboLoadEvt(combo) {
	combo.getStore().on('load', function(store,records,options) {
		combo.setValue(combo.getValue());
	});
}

//设置下拉框的默认值
function setCboDefVal(comboBoxId,formId,field,fieldVal){
	var comboBoxStore = Ext.getCmp(comboBoxId).getStore();
	if(comboBoxStore){
		comboBoxStore.on("load", function(store) {
			Ext.getCmp(formId).getForm().setValues({
				field : fieldVal
			});
		});
		comboBoxStore.load();
	}
};

/**
 * 页面初始化时，灰化所有buttons
 * @param btns
 */
function disableButtons(btns) {
	if (btns == undefined || btns == null) {
		return;
	}
	for ( var i = 0; i < btns.length; i++) {
		Ext.getCmp(btns[i]).setDisabled(true);
	}
}

/**
 * 判断是否选中grid行数据 gridId:grid的id msg:提示的内容
 */
function gridIsSelect(gridId, msg) {
	var grid = Ext.getCmp(gridId);
	var records = grid.selModel.selections.items;
	var selectCount = records.length;
	if (selectCount <= 0) {
		Ext.MessageBox.alert('系统提示', msg);
		return false;
	} else {
		return true;
	}
};

/**
 * 判断表格中的记录是否被选中
 * 
 * @param {}
 *            gridId
 * @param {}
 *            title
 * @param {}
 *            msg
 * @return {Boolean}
 */
function gridItemIsSelected(gridId, title, msg) {
	var grid = Ext.getCmp(gridId);
	if (grid) {
		var selections = grid.getSelectionModel().getSelections();
		if (selections.length > 0) {
			return true;
		} else {
			Ext.MessageBox.show({
						title : null == title || "" == title ? "提示信息" : title,
						msg : null == msg || "" == msg ? "请选择一条记录进行操作!" : msg,
						buttons : Ext.MessageBox.OK,
						icon : 'ext-mb-error'
					});
			return false;
		}
	}
};
/**
 * 验证表单中的必填项是否输入完整
 * 
 * @param {}
 *            id
 */
function checkForm(id, message) {
	var form = Ext.getCmp(id);
	if (form) {
		if (!form.getForm().isValid()) {
			Ext.MessageBox.show({
						title : '提示信息',
						msg : null == message || "" == message
								? "请输入完整的必填项！"
								: '请输入正确的' + message + '信息！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.ERROR
					});
			return false;
		} else {
			return true;
		}
	}
};


/**
 * 设置面板下所有控件disabled属性
 * 
 * @param {}
 *            pnlItem : 控件面板 isDisabled : 子控件是否灰化 flag :
 *            控件排除灰化控件ID标志，如控件ID为xxxx.DTL后缀包含.DTL的则不设置控件灰化。 isGridVaild :
 *            是否对表格设置disabled属性，默认true
 */
function setPanelDisabled(pnlItem, isDisabled, flag, isGridVaild) {
	if (flag == '' || flag == null || flag == undefined || flag == 'undefined' || flag == 'null')
		flag = ".DTL";
	if (isGridVaild == '' || isGridVaild == null || isGridVaild == undefined || isGridVaild == 'undefined' || isGridVaild == 'null' || isGridVaild==true){
		isGridVaild = true;
	}else{
		isGridVaild = false;
	}
	
	var re = eval('/' + flag + '$/');
	if (pnlItem) {
		var items = pnlItem.items;
		if (items == 'undefined' || items == undefined)
			return;
		// console.info(items);
		for (var i = 0; i < items.getCount(); i++) {
			var compXTypes = items.get(i).getXTypes();
			// console.info(compXTypes);
			if (compXTypes.indexOf('panel') > 0
					&& compXTypes.indexOf('grid') < 0) { // panel型控件继续遍历子控件
				setPanelDisabled(items.get(i), isDisabled, flag, isGridVaild);
			} else if ((compXTypes.indexOf('field') > 0 && compXTypes
					.indexOf('hidden') < 0)
					|| compXTypes.indexOf('grid') > 0) {
				// 排除是非设置灰化的组件
				// console.info(items.get(i).getId());
				if (!re.test(items.get(i).getId())) {
					if (compXTypes.indexOf('grid') > 0 && !isGridVaild)
						continue;
					items.get(i).setDisabled(isDisabled);
				}
			}
		}
	}
};
/**
 * 控制表单下面所有的控件全部变成不可用(按钮除外)
 * 
 * @param {}
 *            formId : 表单Id
 */
function compIsDisabled(formId) {
	var formItem = Ext.getCmp(formId);
	if (formItem) {
		var items = formItem.items;
		for (var i = 0; i < items.getCount(); i++) {
			var compXType = items.get(i).getXType();
			if ('button' != compXType) {
				if ('panel' == compXType || 'form' == compXType
						|| 'fieldset' == compXType) {
					getChildrenItems(items.get(i));
				} else {
					if (compXType != 'editorgrid' || compXType != 'grid') {
						items.get(i).setDisabled(true);
					}
					// items.get(i).setReadOnly(true);
				}
			}
		}
	}
};

/**
 * 遍历控件下面所有的子元素,设为不可用
 */
function getChildrenItems(obj) {
	if (obj) {
		var items2 = obj.items;
		for (var k = 0; k < items2.getCount(); k++) {
			var compXType = items2.get(k).getXType();
			if (compXType != 'button') {
				if ('panel' == compXType || 'form' == compXType
						|| 'fieldset' == compXType) {
					getChildrenItems(items2.get(k));
				} else {
					if (compXType != 'editorgrid' || compXType != 'grid') {
						items2.get(k).setDisabled(true);
					}
				}
			}
		}
	}
};

/** *********************** */

/**
 * 控制表单中的控件全部变成可用(按钮除外)
 * 
 * @param {}
 *            formId : 表单id
 */
function compDisabled(formId) {
	var formItem = Ext.getCmp(formId);
	if (formItem) {
		var items = formItem.items;
		for (var i = 0; i < items.getCount(); i++) {
			var compXType = items.get(i).getXType();
			if ('button' != compXType) {
				if ('panel' == compXType || 'form' == compXType
						|| 'fieldset' == compXType) {
					getChildrenItems2(items.get(i));
				} else {
					items.get(i).setDisabled(false);
					// items.get(i).setReadOnly(false);
				}
			}
		}
	}
};

/**
 * 遍历控件下面的所有子元素,设为可用
 */
function getChildrenItems2(obj) {
	if (obj) {
		var items2 = obj.items;
		for (var k = 0; k < items2.getCount(); k++) {
			var compXType = items2.get(k).getXType();
			if (compXType != 'button') {
				if ('panel' == compXType || 'form' == compXType
						|| 'fieldset' == compXType) {
					getChildrenItems2(items2.get(k));
				} else {
					items2.get(k).setDisabled(false);
				}
			}
		}
	}
};

/**
 * 重置表单
 * 
 * @param {}
 *            formId
 */
function resetForm(formId) {
	var form = Ext.getCmp(formId);
	if (form) {
		form.getForm().reset();
	}
};

function getSchedRecord(curPerdNo, store) {
	var result = null;
	var rowCount = store.getCount();
	for ( var i = 0; i < rowCount; i++) {
		var record = store.getAt(i);
		var tempPerdNo = record.get('perdNo');
		if (tempPerdNo == curPerdNo) {
			result = record;
			break;
		}
	}
	return result;
};

/**
 * 获取选中的表格中的数据对象record
 * 
 * @param {}
 *            gridId
 * @param {}
 *            index
 * @return {}
 */
function getRecord(gridId, index) {
	var grid = Ext.getCmp(gridId);
	if (grid) {
		var record = grid.getStore().getAt(index);
		if (record) {
			return record;
		}
		return null;
	}
};
/**
 * 根据选择表格数据行的单条记录，返回record记录集合
 * 
 * @param {}
 *            gridId : 表格的id
 * @param {}
 *            index : 选择的数据行的索引
 * @return {}
 */
function getGridRecord(gridId, index) {
	if (null != gridId && null != index) {
		var grid = Ext.getCmp(gridId);
		if (grid) {
			var record = grid.getStore().getAt(index);
			if (record) {
				return record;
			}
			return null;
		}
	}
	return null;
}

/**
 * 判断表单中的必输项是否输入完整
 * 
 * @param {}
 *            ids : 必输项的id集合
 * @return {Boolean}
 */
function isNullOrEmpty(ids) {
	if (null != ids) {
		for (var i = 0; i < ids.length; i++) {
			var obj = Ext.getCmp(ids[i]);
			if (null == obj.getValue() || "" == obj.getValue()) {
				Ext.MessageBox.show({
							title : '提示信息',
							msg : '请输入完整的必填项！ ',
							buttons : Ext.MessageBox.OK,
							icon : Ext.MessageBox.WARNING
						});
				return false;
			}
			return true;
		}
	}
}

/**
 * 根据指定key值查找下拉参数列表store的显示text
 * 
 * @param store
 *            待查询store
 * @param value
 *            查询条件
 * @returns
 */
function storeFind(store, value) {
	store.getStore();
	var index = store.data.find("paramKey", value);
	// 通过索引取得记录ds中的记录集
	var record = store.data.getAt(index);
	// 返回记录集中value字段的值
	if (record) {
		value = record.data.paramValue;
	}
	return value;
}

// 删除表格中选中的记录
function deleteRecord(id) {
	var grid = Ext.getCmp(id);
	var num = 0;
	if (grid) {
		var s = grid.getSelectionModel().getSelections();
		for (var i = 0, r; r = s[i]; i++) {
			grid.getStore().remove(r);
			num++;
		}
		return num;
	}
};

// 获取表格中xuanzhong 转换成json字符串
function convertSelectRecordToJson(id) {
	var grid = Ext.getCmp(id);
	if (grid) {
		var rec = grid.getSelectionModel().getSelections();
		var len = rec.length;
		var json = "[";
		for (var i = 0; i < len; i++) {
			json += Ext.encode(rec[i].data);
			if (i < len - 1) {
				json += ",";
			}
		}
		json += "]";
		return json;
	}

}

/**
 * @param gridId : 控制表格的id
 * @param oBtns : 单选按钮数组
 * @param Mbtns : 单选/多选按钮数组
 */
function controlBtn(gridId, oBtns, Mbtns) {
	var grid = Ext.getCmp(gridId);
	if (grid) {
		if (!grid.getSelectionModel().getSelected()) {
			if(undefined!=oBtns && oBtns.length>0){
				for (var i = 0; i < oBtns.length; i++) {
					Ext.getCmp(oBtns[i]).setDisabled(true);
				}
			}
			
			if(undefined!=Mbtns && Mbtns.length>0){
				for (var j = 0; j < Mbtns.length; j++) {
					Ext.getCmp(Mbtns[j]).setDisabled(true);
				}
			}
			
		}
		//为查询表格增加选中事件
		grid.getSelectionModel().on('selectionchange', function(sm) {
			var selectCount = sm.getCount();
			if(undefined!=oBtns && oBtns.length>0){
				for (var m = 0; m < oBtns.length; m++) {
					Ext.getCmp(oBtns[m]).setDisabled(selectCount != 1);
				}
			}
			
			if(undefined!=Mbtns && Mbtns.length>0){
				for (var n = 0; n < Mbtns.length; n++) {
					Ext.getCmp(Mbtns[n]).setDisabled(selectCount < 1);
				}
			}
		});
	}
};

/**
 * 获取表格中的store转换成json字符串
 * 
 * @param {}
 *            gridId : grid的id
 * @return {}
 */
function getJsonByStore(gridId) {
	var grid = Ext.getCmp(gridId);
	if (grid) {
		var store = grid.getStore();
		var json = "[";
		for (var i = 0; i < store.getCount(); i++) {
			json += Ext.encode(store.getAt(i).data);
			if (i < store.getCount() - 1) {
				json += ",";
			}
		}
		json += "]";
		return json;
	}
};

/**
 * 获取表格中的选中记录转换成json字符串
 * 
 * @param {}
 *            gridId : grid的id
 * @return {}
 */
function getJsonByStoreOfSelected(gridId) {
	var grid = Ext.getCmp(gridId);
	if (grid) {
		var records=grid.getSelectionModel().getSelections();
		var json = "[";
		for (var i = 0; i < records.length; i++) {
			json += Ext.encode(records[i].data);
			if (i < records.length - 1) {
				json += ",";
			}
		}
		json += "]";
		return json;
	}
};

/**
 * 控制按钮的显示和隐藏
 * 
 * @param {}
 *            btnIds : 按钮数组
 * @param {}
 *            hide : 显示和隐藏
 */
function isHiddenBtn(btnIds, hide) {
	if (null != btnIds && btnIds.length > 0) {
		if (!hide) {
			for (var i = 0; i < btnIds.length; i++) {
				var hideBtn = Ext.getCmp(btnIds[i]);
				if (hideBtn) {
					hideBtn.setVisible(false);
				}
			}
		}
		if (hide) {
			for (var j = 0; j < btnIds.length; j++) {
				var showBtn = Ext.getCmp(btnIds[j]);
				if (showBtn) {
					showBtn.setVisible(true);
				}
			}
		}
	}
};

/**
 * 激活下拉框
 * 
 * @param {}
 *            cboId
 */
// function activateCbo(cboId) {
// var cbo = Ext.getCmp(cboId);
// if (cbo) {
// cbo.on('load', function() {
// cbo.setValue(cbo.getValue());
// });
// }
// };
function activateCbo(cboId) {
	var cbo = Ext.getCmp(cboId);
	if (cbo) {
		cbo.getStore().on('load', function() {
					cbo.setValue(cbo.getValue());
				});
		cbo.getStore().load();
	}
};

/**
 * 控制按钮显示和隐藏
 * 
 * @param {}
 *            ids
 * @param {}
 *            flag
 */
function visBtn(ids, flag) {
	if (ids.length > 0) {
		for (var i = 0; i < ids.length; i++) {
			Ext.getCmp(ids[i]).setVisible(flag);
		};
	}
};

//grid列表合计字段描述
function gridSumFieldDesc(v,a,b,c) {
	v="合计";
	return v;
};
//grid列表合计字段统计汇总（对金额汇总）
function gridSumFieldData(v,a,b,c) {
	if(undefined!=v&&""!=v&&!isNaN(v)){
		v = roundNum(v,2);
		if(v<0) {
    		v= '<font color="red">'+formatMoney(v)+'</font>';
    	} else {
        	v=formatMoney(v);
    	}
	} else {
		v=0;
	}
	return v;
}
//grid列表合计字段统计汇总（对int值汇总）
function gridSumFieldDataInt(v,a,b,c) {
	if(undefined!=v&&""!=v&&!isNaN(v)){
		v = roundNum(v,0);
		if(v<0) {
    		v= '<font color="red">'+v+'</font>';
    	}
	} else {
		v=0;
	}
	return v;
}
//grid列表字段值为零的返回空
function gridRetEmpty(value, cellmeta, record,rowIndex, columnIndex, store) {
	if(value==0 || isNaN(value))
		value="";
	return value;
};
// 获取表格渲染的store
function getRendererStore(itemId) {
	var storeObj = new Ext.data.Store({
				autoLoad : true,
				reader : new Ext.data.JsonReader({
							id : "id"
						}, [{
									mapping : "paramKey",
									type : "string",
									name : "paramKey"
								}, {
									mapping : "paramValue",
									type : "string",
									name : "paramValue"
								}]),
				url : appConfig.baseUrl + '/param.do?method=dropDown&paraNo='
						+ itemId
			});
	return storeObj;
};
/**
 * 客户详情窗口
 * @param gridId 操作表格的ID
 * @param custType 客户类型
 * @param custNo 客户号
 */
function showCustDetailWin(gridId,custType,custNo){
	if(gridId==undefined||gridId==''||gridId==null) {
		if(custType==0){//个人
			var winCustCenterInfoPage_Person = appframe.getInstance('com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage_Person');
			com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage_Person.showCustInfo('detail',custNo);
			winCustCenterInfoPage_Person.show('',function(){
				com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage_Person.loadData(custNo);
			});
		}else{//企业
			var winCustCenterInfoPage = appframe.getInstance('com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage');
			com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage.showCustInfo('detail',custNo);
			winCustCenterInfoPage.show('',function(){
				com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage.loadData(custNo);
			});
		}
	} else {
		var result = gridIsSelect(gridId,'请选择一条记录！');
		if(result){
			//获取选择行
			var rec=Ext.getCmp(gridId).getSelectionModel().getSelected();
			if(rec.data.custType==0){//个人
				var winCustCenterInfoPage_Person = appframe.getInstance('com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage_Person');
				com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage_Person.showCustInfo('detail',rec.data.custNo);
				winCustCenterInfoPage_Person.show('',function(){
					com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage_Person.loadData(rec.data.custNo);
				});
			}else{//企业
				var winCustCenterInfoPage = appframe.getInstance('com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage');
				com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage.showCustInfo('detail',rec.data.custNo);
				winCustCenterInfoPage.show('',function(){
					com.jsjn.slarms3.customer.custinfo.custcenter.CustCenterInfoPage.loadData(rec.data.custNo);
				});
			}
		}
	}
};
/**
 * 贷款详情窗口
 * @param gridId 操作表格的ID
 */
function showLoanDetailWin(gridId,flag){
	var isSelect = gridItemIsSelected(gridId,'提示','请选择一条记录！');
	if(isSelect){
		var rec = Ext.getCmp(gridId).getSelectionModel().getSelected();;
		var loanNo = rec.data.loanNo;
		var custNo = rec.data.custNo;
		var orgNo = rec.data.orgNo;
		var exapAmt =  rec.data.exapAmt;
		/*modify by wangm 20130904 bugId3100 begin*/
		var contNoExt  =  rec.data.contNoExt;
//		var loanNoExt =  rec.data.loanNoExt;
		if(contNoExt == undefined){
			contNoExt = rec.data.loanNoExt;
		}
		/*modify by wangm 20130904 bugId3100 end*/
		var win=appframe.getInstance("com.jsjn.slarms.loan.ma.page.dataInput.LoanInfoWin");
		win.setTitle('贷款详情');
		win.show();
		/*modify by wangm 20130806 增加contNoExt begin*/
		com.jsjn.slarms.loan.ma.page.dataInput.LoanInfoWin.init(loanNo,custNo,exapAmt,contNoExt);
		/*modify by wangm 20130806 增加contNoExt end*/
	}
};
/**
 * 初始化状态树
 * @param className 操作js类的全路径类名
 * @param comboxTreeId 下拉框状态树ID
 * @param applInfoGridId 申请信息表格ID
 * @param defaultValue 状态树默认文本值
 * @param defalultKey 状态树默认真实值
 * @param statusesField 操作js类的状态集字段
 */
function initComboxStatusTree(className,comboxTreeId,applInfoGridId,defaultValue,defalultKey,statusesField){
	var statusTree = Ext.getCmp(comboxTreeId);
    //给tree添加dblclick监听事件
    statusTree.tree.addListener('dblclick',function(node,e){
    	setComboxStatusTree(className,statusTree,applInfoGridId,statusesField);
	});
    //在comboxTree容器中添加按钮
    var queryBtn = new Ext.Button({
 	   text:'确定',
 	   handler:function(){
 	    	setComboxStatusTree(className,statusTree,applInfoGridId,statusesField);
 	   }
    });
    statusTree.tree.addButton(queryBtn);
    
    //状态树store增加load事件
    statusTree.tree.getLoader().addListener('load',function(obj,node,response){
    	if(defalultKey==undefined||defalultKey=='')
    		return;
    	//状态树默认值设置
    	var statusTree=Ext.getCmp(comboxTreeId);
		var tmp='';
		statusTree.tree.getRootNode().eachChild(function(node){
			tmp=node.attributes.value;
			tmp="'"+tmp+"'";
			//默认值显示保存未提交、等待审批、申请被拒绝的记录
			node.getUI().toggleCheck(false);//取消选中
			var vals=defalultKey.split(',');
			for(var i=0;i<vals.length;i++) {
				if(tmp==vals[i]) {
					node.getUI().toggleCheck(true);//选中默认节点
					break;
				}
			}
		});
    });
    
    //状态树默认值设置
    if(defaultValue!=undefined&&defaultValue!='')
    	statusTree.setValue(defaultValue);
    if(defalultKey!=undefined&&defalultKey!='') {
    	eval(className +"."+statusesField+" = defalultKey");
    	
    	
    }
    else
    	eval(className +"."+statusesField+" = ''");
};
/**
 * 重置状态树
 * @param className 操作js类的全路径类名
 * @param comboxTreeId 下拉框状态树ID
 * @param defaultValue 状态树默认文本值
 * @param defalultKey 状态树默认真实值
 * @param statusesField 操作js类的状态集字段
 */
function resetComboxStatusTree(className,comboxTreeId,defaultValue,defalultKey,statusesField){
	//状态树默认值设置
	var statusTree=Ext.getCmp(comboxTreeId);
    if(defaultValue!=undefined&&defaultValue!='')
    	statusTree.setValue(defaultValue);
    else
    	statusTree.setValue('');
    if(defalultKey!=undefined&&defalultKey!='')
    	eval(className +"."+statusesField+" = defalultKey");
    else
    	eval(className +"."+statusesField+" = ''");
    
    var tmp='';
    var rootNode=statusTree.tree.getRootNode();
    var childNodes=rootNode.childNodes;
    for(var m=0;m<childNodes.length;m++) {
    	var node=childNodes[m];
		node.getUI().toggleCheck(false);//取消选中
    	if(defalultKey==undefined||defalultKey=='')
    		continue;
    	tmp=node.attributes.value;
    	tmp="'"+tmp+"'";
		//默认值显示保存未提交、等待审批、申请被拒绝的记录
		var vals=defalultKey.split(',');
		for(var i=0;i<vals.length;i++) {
			if(tmp==vals[i]) {
				node.getUI().toggleCheck(true);//选中默认节点
				break;
			}
		}
    }
}
/**
 * 选择设置状态树
 * @param className 操作js类的全路径类名
 * @param comboxStatusTree 下拉框状态树对象
 * @param applInfoGridId 申请信息表格ID
 * @param statusesField 操作js类的状态集字段
 */
function setComboxStatusTree(className,comboxStatusTree,applInfoGridId,statusesField){
	//获取选中节点状态信息
	var dataTxt = new Array();
	var dataVal = new Array();
	dataTxt.splice(0, 100);
	dataVal.splice(0, 100);
	var ckVal = comboxStatusTree.tree.getChecked();
	for(var i=0;i<ckVal.length;i++){
		var node = ckVal[i];
		dataTxt.push(node.attributes.text);
		dataVal.push("'"+node.attributes.value+"'");
	}
	comboxStatusTree.setValue(dataTxt.join(','));
	comboxStatusTree.collapse();
	//状态集字段赋值
	eval(className +"."+statusesField+" = dataVal.join(',')");
	//判断是否要刷新申请表格
	if(applInfoGridId!=undefined&&applInfoGridId!=''&&applInfoGridId!=null&&applInfoGridId!='null'){
		//重新加载列表
		Ext.getCmp(applInfoGridId).getStore().load();
	}
};

/**
 * 根据grid是否为单选模式判断表头多选框是否隐藏
 * 
 * @param {}
 *            gridId 查询列表ID
 */
function gridSelectionModelVisible(gridId) {
	var grid = Ext.getCmp(gridId);
	var store = grid.getStore();
	var func = function() {
		var singleSelect = grid.getSelectionModel().singleSelect;
		if (singleSelect) {
			grid.getEl().select('div.x-grid3-hd-checker').hide();
		}
	};
	grid.on('render', func);
	store.on('load', func);
}

/**
 * 表格grid的store数据对象添加exception事件
 * @param gridId 操作表格的ID
 * className JS路径名
 */
function girdStoreAddExceptionEvent(gridId,className) {
	var store = Ext.getCmp(gridId).getStore();
	//表格grid的给store增加beforeload事件
	if(className!=undefined&&className!='') {
		store.addListener('beforeload', function() {
			//调用对应的参数赋值函数，此函数须在对应的调用文件中存在
			eval(className + '.addParams()');
		});
	}
	store.addListener('exception', function(dataProxy, type, ation, response,
			arg) {
		if (type == 'remote') {
			Ext.MessageBox.alert('系统提示', '加载数据失败,服务器没有返回！');
			return;
		} else if (type == 'response') {
			var json = response.reader.jsonData;
			if (json == null || json == undefined) {
				Ext.MessageBox.alert('系统提示', '加载数据失败,请尝试重新登录！');
				return;
			}
			var success = json.success;
			if (success == false || success == 'false') {
				var errMsg=json.errMsg;
				if(errMsg==undefined||errMsg==''||errMsg==null) {
					Ext.MessageBox.alert('系统提示', '后台业务处理异常！');
				} else {
					Ext.MessageBox.alert('系统提示', '后台报错,错误信息【'+errMsg+'】！');
				}
			}
		}
	});
};
/**
 * form数据加载
 * @param className 操作js类的全路径类名
 * @param formId 操作form的ID
 * @param reqUrl form请求的url
 * @param params form请求的参数集
 * @param successCallBack form加载成功的回调函数
 * @param failureCallBack form加载失败的回调函数
 */
function loadForm(className,formId,reqUrl,params,successCallBack,failureCallBack) {
	Ext.Msg.wait('正在载入数据...');
	Ext.getCmp(formId).getForm().load({
//		waitMsg : '正在载入数据...',
		params : params,
		url : appConfig.baseUrl + '/'+ reqUrl,
		success : function(form, action) {
			Ext.Msg.hide();
			//处理回调函数逻辑
			if (successCallBack != undefined && typeof (successCallBack == 'function')) {
				successCallBack(form, action);
			}
			eval(className+".orgFrmVals=Ext.getCmp('"+formId+"').getForm().getValues(true)");
		},
		failure : function(form, action) {
			var errMsg = Ext.decode(action.response.responseText).errMsg;
			Ext.Msg.alert('提示', '加载数据失败，错误信息【' + errMsg + '】！', function(){
				//处理回调函数逻辑
				if (failureCallBack != undefined && typeof (failureCallBack == 'function')) {
					failureCallBack(form, action);
				}
			});
		}
	});
};

/**
 * 表单加载record中记录
 * @param className : 类名完整路径
 * @param formId : 表单id
 * @param record : 要加载的record对象
 */
function loadRecord(className,formId,record) {
	Ext.Msg.wait('正在载入数据...');
	Ext.getCmp(formId).getForm().reset();//清空表单中的数据
	Ext.getCmp(formId).form.loadRecord(record);//表单加载record中的数据
	eval(className+".orgFrmVals=Ext.getCmp('"+formId+"').getForm().getValues(true)");
	eval(className+".closeFlag=false");
};

/**
 * ajax加载数据
 * @param reqUrl ajax请求的url
 * @param params ajax请求的参数集
 * @param successCallBack ajax加载成功的回调函数
 * @param failureCallBack ajax加载失败的回调函数
 * @param privateMsg私有化的提示信息
 * @param callback总回调函数不区分成功失败
 */
function ajaxLoad(reqUrl,params,successCallBack,failureCallBack,privateMsg,callback) {
	Ext.Msg.wait('正在处理数据...');
	var requestConfig = {
		url : appConfig.baseUrl + '/' + reqUrl,
		method : 'POST',
		params : params,
		callback : function(options, success, response) {
			Ext.Msg.hide();
			if(callback==undefined||callback==''||callback==null){
				var respData = Ext.decode(response.responseText);
				var flag = respData.success;
				if (flag) {
					//处理回调函数逻辑
					if (successCallBack != undefined && typeof (successCallBack == 'function')) {
						successCallBack(response);
					}
				} else {
					var errorMsg= '后台出错';
					if(respData.data != undefined){
						errorMsg = respData.data._rspMsg;
					}else if(respData.errMsg != undefined){
						errorMsg = respData.errMsg;
					}
					if(privateMsg != undefined && privateMsg != null && ""!=privateMsg){
						errorMsg = privateMsg;
					}
					Ext.Msg.alert('系统提示', '系统出错，错误原因【' + errorMsg + '】', function(){
						//处理回调函数逻辑
						if (failureCallBack != undefined && typeof (failureCallBack == 'function')) {
							failureCallBack(response);
						}
					});
				}
			} else {
				callback(response);
			}
		}
	};
	Ext.Ajax.request(requestConfig);
};
/**
 * from数据提交保存
 * @param className JS className
 * @param formId 操作form的ID
 * @param reqUrl form请求的url
 * @param params form请求的参数集
 * @param successCallBack form提交成功的回调函数
 * @param failureCallBack form提交失败的回调函数
 */
function submitSaveForm(className,formId,reqUrl,params,successCallBack,failureCallBack,Msg) {
	//进行验证
	var result = Ext.getCmp(formId).getForm().isValid();
	/*modify by wangm 20131009 BUGID3369 begin*/
	var message = !valueIsEmpty(Msg) ? Msg : '保存成功！';
	/*modify by wangm 20131009 BUGID3369 end*/
	if(result){
		Ext.getCmp(formId).getForm().doAction('submit', {
			url : appConfig.baseUrl + '/' + reqUrl,
			waitMsg : '正在处理数据...',
			waitTitle : '提示',
			method : 'POST',
			params : params,
			success : function(form, action) {
				Ext.MessageBox.alert('系统提示', message, function(){
				eval(className+".orgFrmVals=Ext.getCmp('"+formId+"').getForm().getValues(true)");
					//处理回调函数逻辑
					if (successCallBack != undefined && typeof (successCallBack == 'function')) {
						successCallBack(form, action);
					}
				});
			},
			failure : function(form, action) {
				var errMsg = Ext.decode(action.response.responseText).errMsg;
				Ext.Msg.alert('系统提示', '保存失败，错误信息【' + errMsg + '】！', function(){
					//处理回调函数逻辑
					if (failureCallBack != undefined && typeof (failureCallBack == 'function')) {
						failureCallBack(form, action);
					}
				});
			}
		});
	}else{
		Ext.Msg.alert('系统提示','必填项没有输入或者输入值非法，请检查！');
	}
};

function submitSaveFormDefault(className,formId,reqUrl,params,successCallBack,failureCallBack) {
	//进行验证
	var result = Ext.getCmp(formId).getForm().isValid();
	if(result){
		Ext.getCmp(formId).getForm().doAction('submit', {
			url : appConfig.baseUrl + '/' + reqUrl,
			waitMsg : '正在处理数据...',
			waitTitle : '提示',
			method : 'POST',
			params : params,
			success : function(form, action) {
				eval(className+".orgFrmVals=Ext.getCmp('"+formId+"').getForm().getValues(true)");
				//处理回调函数逻辑
				if (successCallBack != undefined && typeof (successCallBack == 'function')) {
					successCallBack(form, action);
				}
			},
			failure : function(form, action) {
				//处理回调函数逻辑
				if (failureCallBack != undefined && typeof (failureCallBack == 'function')) {
					failureCallBack(form, action);
				}
			}
		});
	}else{
		Ext.Msg.alert('系统提示','必填项没有输入或者输入值非法，请检查！');
	}
};

/**
 * 删除作废表格申请信息记录
 * @param gridId 操作表格的ID
 * @param reqUrl 作废请求的url
 * @param paramNameArr 作废请求的参数名称数组
 * @param className 操作js类的全路径类名
 * @param successCallBack 作废成功的回调函数
 * @param failureCallBack 作废失败的回调函数
 */
function deleteGridRecord(gridId,reqUrl,paramNameArr,className,successCallBack,failureCallBack) {
	var result = gridIsSelect(gridId,'没有选择项！');
	if(result){
		Ext.MessageBox.confirm('系统提示','确定是否作废？',function(result){
			if(result=='yes'){
				var rec=Ext.getCmp(gridId).getSelectionModel().getSelections();
				var paramsArr = new Array();
				paramsArr.splice(0, 100);
				var len=rec.length;
				var tmp;
				//遍历选中记录
				for(var i=0;i<len;i++)
				{
					//拼接每条记录的主键参数
					var tmpArr = new Array();
					tmpArr.splice(0, 100);
					for(var j=0;j<paramNameArr.length;j++) {
						tmp=paramNameArr[j];
						tmp=rec[i].get(tmp);
						if(tmp==null||tmp==undefined){
							tmp=eval(className + '.' + paramNameArr[j]);
						}
						tmpArr.push(tmp);
					}
					tmp=tmpArr.join(',');
					paramsArr.push(tmp);
				}
				tmp=paramsArr.join('|');
				var params={
	        			delArrObj:tmp //待删除记录主键参数集
	        		};
				//提交作废请求
				ajaxLoad(reqUrl,params,function(response){
					Ext.MessageBox.alert('系统提示','作废成功，共作废【'+len+'】笔记录！',function(){
						//重新加载grid列表
						Ext.getCmp(gridId).getStore().reload();
						//处理回调函数逻辑
						if (successCallBack != undefined && typeof (successCallBack == 'function')) {
							successCallBack(response);
						}
					});
				},failureCallBack);
			}
		});
	}
};
/**
 * 删除作废表格申请信息记录（没有删除确认提示）
 * @param gridId 操作表格的ID
 * @param reqUrl 作废请求的url
 * @param paramNameArr 作废请求的参数名称数组
 * @param className 操作js类的全路径类名
 * @param successCallBack 作废成功的回调函数
 * @param failureCallBack 作废失败的回调函数
 */
function deleteGridRecordNoTip(gridId,reqUrl,paramNameArr,params,className,successCallBack,failureCallBack) {
	var result = gridIsSelect(gridId,'没有选择项！');
	if(result){
		var rec=Ext.getCmp(gridId).getSelectionModel().getSelections();
		var paramsArr = new Array();
		paramsArr.splice(0, 100);
		var len=rec.length;
		var tmp;
		//遍历选中记录
		for(var i=0;i<len;i++)
		{
			//拼接每条记录的主键参数
			var tmpArr = new Array();
			tmpArr.splice(0, 100);
			for(var j=0;j<paramNameArr.length;j++) {
				tmp=paramNameArr[j];
				tmp=rec[i].get(tmp);
				if(tmp==null||tmp==undefined){
					tmp=eval(className + '.' + paramNameArr[j]);
				}
				tmpArr.push(tmp);
			}
			tmp=tmpArr.join(',');
			paramsArr.push(tmp);
		}
		tmp=paramsArr.join('|');
		var params={
				params:params,
    			delArrObj:tmp //待删除记录主键参数集
    		};
		//提交作废请求
		ajaxLoad(reqUrl,params,function(response){
			Ext.MessageBox.alert('系统提示','作废成功，共作废【'+len+'】笔记录！',function(){
				//重新加载grid列表
				Ext.getCmp(gridId).getStore().reload();
				//处理回调函数逻辑
				if (successCallBack != undefined && typeof (successCallBack == 'function')) {
					successCallBack(response);
				}
			});
		},failureCallBack);
	}
};
/**
 * 重新发送审批短信
 * @param gridId 操作表格的ID
 * @param flowType 业务流程标志
 * @param paramNameArr 业务使用的参数名称数组
 * @param className 操作js类的全路径类名
 */
function retrySendWfMsg(gridId,flowType,paramNameArr,className){
	var result = gridIsSelect(gridId,'请选择一条记录！');
	if(result){
		Ext.MessageBox.confirm('系统提示','确定是否短信重发？',function(result){
			if(result=='yes'){
				//拼接业务使用参数集
				var rec=Ext.getCmp(gridId).getSelectionModel().getSelected();
				var paramsArr = new Array();
				paramsArr.splice(0, 100);
				for(var i=0;i<paramNameArr.length;i++){
					var temp = rec.get(paramNameArr[i]);
					if(temp == null){
						temp = eval(className + '.' + paramNameArr[i]);
					}
					paramsArr.push(temp);
				}
				var params=paramsArr.join('|');
				//提交短信重发请求
				Ext.Ajax.request({
					params : {
						params : params, //业务使用的参数集
						flowType : flowType //业务流程标志
					},
					url : appConfig.baseUrl + '/common.do?method=sendApprMsgRetry',
					waitMsg : '正在处理数据...',
				 	waitTitle: '提示',
					callback : function(options, success, response){
						var obj = Ext.decode(response.responseText);
						if(obj==null||obj==undefined) {
							Ext.Msg.alert('系统提示', '短信发送失败！');
						} else if(obj.success) {
							Ext.MessageBox.alert('系统提示','短信发送成功！');
						} else {
							Ext.Msg.alert('系统提示', '短信发送失败，错误信息【'+obj.errMsg+'】！');
						}
					}
				});
			}
		});
	}
	
};
/**
 * 提交申请到审批流程
 * @param flowType 业务流程标志
 * @param params 业务使用的参数集
 * @param custType 客户类型
 * @param custNo 客户号
 * @param examAmt 审批金额
 */
function submitApplToWf(flowType,params,custType,custNo,examAmt){
	Ext.MessageBox.confirm('系统提示','请确认是否提交？',function(result){
		if(result=='yes'){
			var win=appframe.getInstance("com.jsjn.slarms.workflow.WorkflowSubmitWin");
			com.jsjn.slarms.workflow.WorkflowSubmitWin.startFlag='1'; //流程开始标记
			com.jsjn.slarms.workflow.WorkflowSubmitWin.flowType=flowType; //业务流程标志
			com.jsjn.slarms.workflow.WorkflowSubmitWin.custNo=custNo; //客户号
			com.jsjn.slarms.workflow.WorkflowSubmitWin.custType=custType; //客户类型
			com.jsjn.slarms.workflow.WorkflowSubmitWin.examAmt=examAmt; //审批金额
			com.jsjn.slarms.workflow.WorkflowSubmitWin.params=params; //业务使用的参数集
			win.show();
		}
	});
};
/**
 * 获取去尾零规则
 * @param paramName 接收去尾零规则值的参数名称
 */
function getDecProcOptByAjax(paramName) {
	//发送ajax请求，获取去尾零规则
	Ext.Ajax.request({
		params : {
			parCde : 'DEC_PROC_OPT'  //参数代码
		},
		url : appConfig.baseUrl + '/param.do?method=getOrgParam',
		waitMsg : '正在载入数据...',
	 	waitTitle: '提示',
		callback : function(options, success, response){
			var flag = Ext.decode(response.responseText).success;
			if(flag){
				eval(paramName + '=\'' + Ext.decode(response.responseText).data.parValue + '\'');
			} else {
				Ext.Msg.alert('提示', '获取机构去尾零规则失败！');
			}
		}
	});
};
/**
 * 获取展期规则
 * @param className 操作js类的全路径类名
 */
function getLoanExtnSetByAjax(className) {
	//发送ajax请求，获取展期规则
	Ext.Ajax.request({
		params : {
		},
		url : appConfig.baseUrl + '/OrgParamAction.do?method=getLoanExtRule',
		waitMsg : '正在载入数据...',
	 	waitTitle: '提示',
		callback : function(options, success, response){
			var flag = Ext.decode(response.responseText).success;
			if(flag){
				var data=Ext.decode(response.responseText).data;
				//最大展期天数
				eval(className + '.maxExtnDays=\'' + data.maxExtnDays + '\'');
				//最大展期提前天数
				eval(className + '.maxExtnAheadDays=\'' + data.maxExtnAheadDays + '\'');
				//最大展期次数
				eval(className + '.maxExtenTimes=\'' + data.maxExtenTimes + '\'');
			} else {
				Ext.Msg.alert('提示', '获取展期规则失败！');
			}
		}
	});
};
/**
 * 获取系统交易日期
 * @param paramName 接收系统交易日期值的参数名称
 */
function getJyrqByAjax(paramName) {
	//发送ajax请求，获取系统交易日期
	Ext.Ajax.request({
		params : {
		},
		url : appConfig.baseUrl + '/param.do?method=getJyrq',
		waitMsg : '正在载入数据...',
	 	waitTitle: '系统提示',
		callback : function(options, success, response){
			var obj = Ext.decode(response.responseText);
			if(obj!=null&&obj!=undefined){
				eval(paramName + '=\'' + obj.jyrq + '\'');
			} else {
				Ext.Msg.alert('提示', '获取系统账务日期失败！');
			}
		}
	});
};

/**
 * 获取登录用户的信息
 * @param loginInfo
 * @returns
 * 交易日期：jyrq
 * 机构码：insttuId
 * 用户编号：userId
 * 机构名称：insttuCnm
 * 客户名称：userName
 * 岗位编号：stationId 
 * 例：var loginObj = respData;
 * var custName = loginObj.custName;//客户名称
 */
function getLoginUserInfoByAjax(sucFun) {
	//发送ajax请求，获取登录用户信息
	Ext.Ajax.request({
		method:'POST',
		params : {
			method : 'getUserInfo'
		},
		url : appConfig.baseUrl + '/param.do',
		waitMsg : '正在载入数据...',
	 	waitTitle: '系统提示',
		callback : function(options, success, response){
			var respData = Ext.decode(response.responseText);
			if(respData!=undefined&&respData!=null){
				sucFun(respData);
			} else {
				Ext.Msg.alert('系统提示', '获取登录用户信息失败！');
			}
		}
	});
};

/**
 * 获取公共平台URL
 * @param callBack 回调函数
 */
var pubsysUrl;
var ssoTicket;
function getPubsysUrlByAjax(callBack) {
	if(pubsysUrl!=undefined&&pubsysUrl!='') {
		if (callBack != undefined && typeof (callBack == 'function')) {
			callBack(pubsysUrl,ssoTicket);
		}
	} else {
		//发送ajax请求，获取公共平台URL
		Ext.Ajax.request({
			params : {
			},
			url : appConfig.baseUrl + '/param.do?method=getPubsysUrl',
			waitMsg : '正在载入数据...',
		 	waitTitle: '提示',
			callback : function(options, success, response){
				var obj = Ext.decode(response.responseText);
				if(obj!=null&&obj!=undefined){
					pubsysUrl=obj.pubsysUrl;
					ssoTicket=obj.ssoTicket;
					if (callBack != undefined && typeof (callBack == 'function')) {
						callBack(pubsysUrl,ssoTicket);
					}
				} else {
					Ext.Msg.alert('提示', '公共平台URL失败！');
				}
			}
		});
	}
};
/**
 * 获取客户保证金账号信息
 * @param paramName 接收客户保证金账号值的参数名称
 */
function getCustBarAcctByAjax(custNo,acctTyp,paramName) {
	//发送ajax请求，获取客户保证金账号信息
	Ext.Ajax.request({
		params : {
			custNo : custNo, //客户号
			acctTyp : acctTyp  //保证金账号类别 1:利息保证金 2:担保合同保证金
		},
		url : appConfig.baseUrl + '/param.do?method=getCustGuarAcct',
		waitMsg : '正在载入数据...',
	 	waitTitle: '提示',
		callback : function(options, success, response){
			var success = Ext.decode(response.responseText).success;
			var flag = Ext.decode(response.responseText).flag;
			if(success){
				if(flag=='0'){
					//客户利息保证金余额
					eval(paramName + '=0');
				} else {
					//客户利息保证金余额
					eval(paramName + '=\'' + Ext.decode(response.responseText).data.bal + '\'');
				}
			} else {
				Ext.Msg.alert('提示', '获取客户保证金账号信息失败！');
			}
		}
	});
};
/**
 * 刷新判断页面是否修改过的标志字符串
 * @param className
 * @param formId
 */
function refreshOrgFrmVals(className,formId){
	eval(className+".orgFrmVals=Ext.getCmp('"+formId+"').getForm().getValues(true)");
};
/**
 * 判断form是否有过修改
 * @param className 操作js类的全路径类名
 * @param formId 操作form的ID
 */
function isFormChanged(className,formId)
 {
	var isChanged = false;
	var orgFrmVals = eval(className + '.orgFrmVals');
	var newFrmVals = Ext.getCmp(formId).getForm().getValues(true);
	if (orgFrmVals != newFrmVals) 
		isChanged = true;
	return isChanged;
};
/**
 * 关闭窗口
 * @param event 关闭事件
 * @param button 关闭按钮对象
 */
function closeWin(event, button){
	this.WINDOW.hide();
};
/**
 * 关闭窗口事件处理
 * @param className 操作页面对应js类的全路径类名
 * @param formId 操作页面form对应的ID
 * @param checkSubmit 是否需要检查修改未保存直接提交
 * @param examStsFiledName 申请流程状态字段全路径名称
 * @param checkSts 流程状态数值
 * @param endCallBack 处理结束后的回调函数
 * @returns {Boolean} 
 */
function winCloseEventHandle(className, formId, checkSubmit,
		examStsPathName, checkSts, endCallBack) {
	var closeFlag=eval(className+".closeFlag");//窗口关闭标志
	if(closeFlag == undefined || closeFlag == null ){
		eval(className+".closeFlag = false");
	}
	if (closeFlag) {
		eval(className + '.closeFlag = false');
		return true;
	}
	var isChanged = true;
	if(formId==undefined || formId=='') {
		isChanged = eval(className+".isFormChanged()");
	} else {
		isChanged = isFormChanged(className, formId);// 页面类容是否改变
	}
	if (isChanged) {// 页面类容改变
		Ext.MessageBox.confirm('系统提示', '页面信息未保存，请确认是否关闭？', function(result) {
			if (result == 'yes') {
				winClosePrivateFunc(className, endCallBack);
			}
		});
	} else {// 页面类容未改变
		if (checkSubmit) {// 需要在关闭之前提示保存未提交
			if (checkSts == undefined || checkSts == null || checkSts == '') {
				checkSts = '0';
			}
			var examSts = eval(examStsPathName);// 申请流程状态
			if (examSts == checkSts) {//判断状态是否为未提交的状态
				Ext.MessageBox.confirm('系统提示', '页面信息未提交，请确认是否关闭？', function(
						result) {
					if (result == 'yes') {
						winClosePrivateFunc(className, endCallBack);
					}
				});
			} else {
				winClosePrivateFunc(className, endCallBack);
			}
		} else {//不需要在关闭或返回之前提示保存未提交
			winClosePrivateFunc(className, endCallBack);
		}
	}

	return false;
};
function winClosePrivateFunc(className,endCallBack){
	eval(className+".closeFlag=true");
	eval(className+".WINDOW.hide()");
	if (endCallBack != undefined
			&& typeof (endCallBack == 'function')) {
		endCallBack();
	}
};
/**
 * 添加隐藏窗口事件
 * @param winId 页面窗口ID
 * @param className 操作页面对应js类的全路径类名
 * @param formId 操作页面form对应的ID
 * @param checkSubmit 是否需要检查修改未保存直接提交
 * @param examStsFiledName 申请流程状态字段全路径名称
 * @param checkSts 流程状态数值
 * @param endCallBack 处理结束后的回调函数
 * @returns {Boolean} 
 */
function winAddBeforehideEvent(winId, className, formId, checkSubmit,
		examStsPathName, checkSts, endCallBack) {
	// 窗口增加beforehide事件
	Ext.getCmp(winId).addListener(
			'beforehide',
			function() {
				return winCloseEventHandle(className, formId, checkSubmit,
						examStsPathName, checkSts, endCallBack);
			});
}
/**
 * 添加tab面板切换事件
 * @param tabId tab panel ID
 * @param isFormChangedFunc 判断页面是否改变的方法名称
 * @returns {Boolean} 
 */
function pnlAddBeforeTabChangeEvent(tabId, isFormChangedFunc) {
	//面板切换前增加beforetabchange事件
    Ext.getCmp(tabId).addListener('beforetabchange',function(tabpanel, newTab, currentTab){  
 	   return beforeTabChange(tabpanel, newTab, currentTab, isFormChangedFunc);
    }); 
}
//面板切换前处理事件
function beforeTabChange(tabpanel, newTab, currentTab, isFormChangedFunc){
	if(currentTab==undefined||newTab==currentTab)
		return true;
	//判断页面是否修改过
	if(eval(isFormChangedFunc+"()"))
	{
		//Ext.MessageBox.alert('提示','请先保存申请信息！');
//		alert('请先保存申请信息！');
		alert('请先保存当前页面信息！');
		return false;
	}
	return true;
}

/**
 * 申请记录grid表格rowclick事件处理
 * @param grid 申请记录grid表格对象
 * @param examStsFieldName 申请状态字段名
 * @param btnDetailId 申请记录详情按钮
 * @param btnModId 申请记录修改按钮
 * @param btnDelId 申请记录删除按钮
 * @param btnSendMsgId 申请记录短信重发按钮
 */
function applyGridRowClickEventHandle(grid,examStsFieldName,btnDetailId,btnModId,btnDelId,btnSendMsgId){
	//根据业务需要灰化按钮
	Ext.getCmp(btnDetailId).setDisabled(true);
	Ext.getCmp(btnModId).setDisabled(true);
	Ext.getCmp(btnDelId).setDisabled(true);
	Ext.getCmp(btnSendMsgId).setDisabled(true);
	var size=grid.getSelectionModel().getCount();
	if(size==1) { //列表单选
		var rec=grid.getSelectionModel().getSelected();
		var examSts=eval('rec.data.'+examStsFieldName);
		if(examSts=="0") { //未提交
			Ext.getCmp(btnModId).setDisabled(false);
			Ext.getCmp(btnDelId).setDisabled(false);
		} else if(examSts=="2") { //等待审批
			Ext.getCmp(btnSendMsgId).setDisabled(false);
		}
		Ext.getCmp(btnDetailId).setDisabled(false);
	} else if(size>1){ //列表多选
		Ext.getCmp(btnDelId).setDisabled(false);
		//如果集合中有非保存未提交的记录则灰化作废按钮
		var rec=grid.getSelectionModel().getSelections();
		for(var i=0;i<rec.length;i++)
		{
			var examSts=rec[i].data[examStsFieldName];
			if(examSts!="0") {  //非未提交状态
				Ext.getCmp(btnDelId).setDisabled(true);
			}
		}
	}
};

/**
 * 申请状态包含已生效的申请记录grid表格rowclick事件处理
 * @param grid 申请记录grid表格对象
 * @param examStsFieldName 申请状态字段名
 * @param btnDetailId 申请记录详情按钮
 * @param btnModId 申请记录修改按钮
 * @param btnDelId 申请记录删除按钮
 * @param btnSendMsgId 申请记录短信重发按钮
 */
function applyGridYsxRowClickEventHandle(grid,examStsFieldName,btnDetailId,btnModId,btnDelId,btnSendMsgId){
	//根据业务需要灰化按钮
	Ext.getCmp(btnDetailId).setDisabled(true);
	Ext.getCmp(btnModId).setDisabled(true);
	Ext.getCmp(btnDelId).setDisabled(true);
	Ext.getCmp(btnSendMsgId).setDisabled(true);
	var size=grid.getSelectionModel().getCount();
	if(size==1) { //列表单选
		var rec=grid.getSelectionModel().getSelected();
		var examSts=eval('rec.data.'+examStsFieldName);
		if(examSts=="0") { //未提交
			Ext.getCmp(btnModId).setDisabled(false);
			Ext.getCmp(btnDelId).setDisabled(false);
		} else if(examSts=="2") { //等待审批
			Ext.getCmp(btnSendMsgId).setDisabled(false);
		} else if(examSts=="4") { //审批通过（可以作废）
			Ext.getCmp(btnDelId).setDisabled(false);
		}
		if(rec.data.adjTyp=='2'||rec.data.adjTyp=='3') //手工利率调整可以看详情，基准利率调整、展期调整不允许看详情
			Ext.getCmp(btnDetailId).setDisabled(true);
		else 
			Ext.getCmp(btnDetailId).setDisabled(false);
	} else if(size>1){ //列表多选
		Ext.getCmp(btnDelId).setDisabled(false);
		//如果集合中有非保存未提交的记录则灰化作废按钮
		var rec=grid.getSelectionModel().getSelections();
		for(var i=0;i<rec.length;i++)
		{
			var examSts=rec[i].data[examStsFieldName];
			if(examSts!="0"&&examSts!="4") {  //非未提交状态（审批通过也可以作废）
				Ext.getCmp(btnDelId).setDisabled(true);
			}
		}
	}
};

/**
 * 控制按钮是否可用
 * @param {} ids:按钮操作集合
 * @flag {} 按钮是否可用  true:不可用   false:可用
 */
function disBtn(ids, flag) {
	if (ids.length > 0) {
		for (var i = 0; i < ids.length; i++) {
			Ext.getCmp(ids[i]).setDisabled(flag);
		};
	}
};

/**
 * 根据表格中选中数据控制按钮的可用状态
 * @param grid : 表格对象
 * @param flagFieldName : 比较的字段名称
 * @param flagFieldVal : 比较的字段值
 * @param ignoreBtnsArr : 不根据选择数据判断按钮是否可用的按钮id数组，仅判断是否选择数据即可
 * @param signleBtnsArr : 单选按钮的数组
 * @param moreBtnsArr : 单选/对选按钮的数组集合(按钮既支持单选，又支持多选)
 */
function gridRowClickEventHandle(grid,flagFieldName,flagFieldVal,ignoreBtnsArr,signleBtnsArr,moreBtnsArr){
	//设置所有的按钮不可用
	disBtn(ignoreBtnsArr,true);
	disBtn(signleBtnsArr,true);
	disBtn(moreBtnsArr,true);
	
	//判断表格中选择的记录的个数
	var size=grid.getSelectionModel().getCount();
	if(size==1) { //列表单选
		var rec=grid.getSelectionModel().getSelected();
		var flagFleld=eval('rec.data.'+flagFieldName);
		var flag = flagFieldVal==flagFleld?false:true;
		//根据按钮的状态标识,控制按钮的状态
		disBtn(signleBtnsArr,flag);
		//将与选中的记录与按钮的控制无关的按钮变为可用(仅验证按钮选中即可)
		disBtn(ignoreBtnsArr,false);
	} else if(size>1){ //列表多选
		disBtn(moreBtnsArr,false);
		//如果选中的记录中有作废的记录，则将按钮灰化
		var rec=grid.getSelectionModel().getSelections();
		for(var i=0;i<rec.length;i++)
		{
			var flagVal=rec[i].data[flagFieldName];
			if(flagVal!=flagFieldVal) {
				disBtn(moreBtnsArr,true);
			}
		}
	}
};
/**
 * 上传文件
 * @param className 操作页面对应js类的全路径类名
 * @param callBack 回调函数
 */
function uploadFile(className, callBack,url) {
	if(typeof(eval(className+'.uploadFileWin')=='undefined')) 
	{
		var uploadFileWin = new com.jsjn.ext.extend.UploadWindow(
		{
			afterUpload:function(data){
				var flag=data.success;
				if(flag==true||flag=='true')
				{
					if (callBack != undefined && typeof (callBack == 'function')) {
						callBack(data);
					}
				} else {
					var msg=data.msg;
					Ext.Msg.alert('提示', '上传文件失败，错误信息【'+msg+'】！');
				}
				
			},
			maxFiles:1,
			fileFolder:"fileType/",
			fileSize : 1024*5,
			closeAction:'hide',
			url:url,
			plain : true,
			modal : true
		});
		eval(className+'.uploadFileWin=uploadFileWin');
	}
	eval(className+'.uploadFileWin.reset()');
	eval(className+'.uploadFileWin.show()');
}
/**
 * 确认上传文件
 * @param filePath 上传文件的路径
 */
function confirmFile(filePath,callBack) {
	var files=[];
	files.push(filePath);
	Ext.Ajax.request({
		url : appConfig.baseUrl + '/com.jsjn.platform.file.FileUploader.do?method=confirmFiles',
		waitMsg : '正在处理数据...',
      	waitTitle: '提示',
      	method:'POST',
      	params:{
      		files:Ext.encode(files)
      	},
      	callback : function(options, success, response){
			var flag = Ext.decode(response.responseText).success;
			if(flag==false||flag=='false')
			{
				Ext.MessageBox.alert('系统提示', '确认上传文件失败！');
			} else {
				if (callBack != undefined && typeof (callBack == 'function')) {
					callBack(response);
				}
			}
		}
	});
}
/**
 * 文件下载
 * @param gridId:表格id
 */
function fileDownLoad(gridId){
	var result = gridIsSelect(gridId,'没有选择项！');
	if(result){
		//获取选中行Record记录
    	var rec=Ext.getCmp(gridId).getSelectionModel().getSelected();
    	if(undefined==rec.data.filePath || ""==rec.data.filePath || undefined==rec.data.fileVName || ""==rec.data.fileVName){
    		alert("请先上传文件再进行下载！");
    		return;
    	}
		var filePath=encodeURI(rec.data.filePath+rec.data.fileVName);
		var url=appConfig.baseUrl + '/com.jsjn.platform.file.FileUploader.do?method=downloadFile&filePath='+filePath;
//		window.open(url);
		window.location.href=url;
	}
};
/**
 * 还款计划表排序后设置红色修改标记
 * @param grid
 */
function paySchedColorSettingForSort(grid){
	var rowCount = grid.getStore().getCount();
	for ( var i = 0; i < rowCount; i++) {
		var record = grid.getStore().getAt(i);
		var instmFix = record.get('instmFix');
		var prcpFix = record.get('prcpFix');
		var dueDtFix = record.get('dueDtFix');
		if (dueDtFix == 'Y') {
			grid.getView().getCell(i, 0).style.backgroundColor = 'red';
		}
		if (instmFix == 'Y') {
			grid.getView().getCell(i, 3).style.backgroundColor = 'red';
		}
		if (prcpFix == 'Y') {
			grid.getView().getCell(i, 4).style.backgroundColor = 'red';
		}
	}
};
/**
 * 指定刷新某期还款计划表修改红色地色标准
 * @param record
 * @param gridId
 */
function reSetBackGroundColor(record,gridId){
	var store = Ext.getCmp(gridId).getStore();
	var instmFix = record.get('instmFix');
	var prcpFix = record.get('prcpFix');
	var dueDtFix = record.get('dueDtFix');
	var perdNo = record.get('perdNo');
	var rowCount = store.getCount();
	for ( var i = 0; i < rowCount; i++) {
		var tempRec = store.getAt(i);
		var tempPerdNo = tempRec.get('perdNo');
		if (perdNo != tempPerdNo) {
			continue;
		}
		if (dueDtFix == 'Y') {
			Ext.getCmp(gridId).getView().getCell(i, 0).style.backgroundColor = 'red';
		}
		if (instmFix == 'Y') {
			Ext.getCmp(gridId).getView().getCell(i, 3).style.backgroundColor = 'red';
		}
		if (prcpFix == 'Y') {
			Ext.getCmp(gridId).getView().getCell(i, 4).style.backgroundColor = 'red';
		}
	}
}

/**
 * 检查还款款计划表是否被锁上
 * @param loanNo 贷款合同号（系统）
 * @param callBack 回调函数
 * @param callBack yewuleixing
 */
function checkSchedLock(loanNo, callBack,type) {
	//到后台校验，判断还款计划表是否被锁
	Ext.Ajax.request({
		url : appConfig.baseUrl + '/param.do?method=getRegLoanAcctDTOInfo',
		params : {
			loanNo:loanNo//贷款合同号
		},
		waitMsg : '正在载入数据...',
	  	waitTitle: '提示',
		callback : function(options, success, response){
			var flag = Ext.decode(response.responseText).success;
			if(flag) {
				var data=Ext.decode(response.responseText).data;
				//贷款手工合同号
				var contNoExt = data.contNoExt;
				//锁定标识
				var isLocked = data.isLocked;
				//锁描述
				var lockTypeDesc = data.lockTypeDesc;
				//锁定日期
				var schedAdjLockTxDt = data.schedAdjLockTxDt;
				//bug3383 modify by kongyj at 2013-10-21 begin
				if('Y'==isLocked) {
					//bug3383 modify by kongyj at 2013-10-09 begin
					Ext.Msg.alert('提示信息', '贷款合同号为【'+contNoExt+'】的贷款在【'+schedAdjLockTxDt+'】执行【'+lockTypeDesc+'】操作时被锁定,请等待该交易审批完成后再操作！');
					//bug3383 modify by kongyj at 2013-10-09 end
				} else if(type == 'stopRate' &&  'Y' ==data.stopIntAccFlg) {
					Ext.Msg.alert('提示信息', '贷款合同号为【'+contNoExt+'】的贷款已经停息');
				}  else if(type == 'loanDestory' &&  '4' ==data.status ) {
					Ext.Msg.alert('提示信息', '贷款合同号为【'+contNoExt+'】的贷款已经核销');
				} else if(type == 'adjustRepaySehced' &&  'Y' ==data.stopIntAccFlg) {
					Ext.Msg.alert('提示信息', '贷款合同号为【'+contNoExt+'】的贷款已经停息，不允许进行还款计划调整');
				//bug3383 modify by kongyj at 2013-10-21 end
				} else {//新增申请
					if (callBack != undefined && typeof (callBack == 'function')) {
						callBack(response);
					}
				}
			} else {
				var errMsg=Ext.decode(response.responseText).errMsg;
				Ext.MessageBox.alert('提示','错误信息【'+errMsg+'】！');
			}
		}
	});
};

/**
 * 日期范围校验
 * @param startDtId 开始时间ID
 * @param endDtId 结束时间ID
 * @param startDtName 开始时间中文名称
 * @param endDtName 结束时间中文名称
 */
function dateConditionValidator(startDtId, endDtId, startDtName, endDtName) {
	if (startDtName == undefined || startDtName == null || startDtName == '') {
		startDtName = '开始时间';
	}
	if (endDtName == undefined || endDtName == null || endDtName == '') {
		endDtName = '结束时间';
	}
	// 开始时间添加事件
	Ext.getCmp(startDtId).addListener('select', function(comp, date) {
		var loanCheckDateEnd = Ext.getCmp(endDtId).getRawValue();
		var loanCheckDateStart = Ext.getCmp(startDtId).getRawValue();
		if ("" != loanCheckDateEnd) {
			if ("" != loanCheckDateStart) {
				if (loanCheckDateStart > loanCheckDateEnd) {
					Ext.getCmp(startDtId).setValue(comp.startValue);
					Ext.getCmp(startDtId).focus(true,true);
					Ext.MessageBox.show({
						title : '提示信息',
						msg : startDtName + '不能大于' + endDtName + '，请重新选择！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
					return;
				}
			}
		}
	});
	// 结束时间添加事件
	Ext.getCmp(endDtId).addListener('select', function(comp, date) {
		var loanCheckDateEnd = Ext.getCmp(endDtId).getRawValue();
		var loanCheckDateStart = Ext.getCmp(startDtId).getRawValue();
		if ("" != loanCheckDateStart) {
			if ("" != loanCheckDateEnd) {
				if (loanCheckDateEnd < loanCheckDateStart) {
					Ext.getCmp(endDtId).setValue(comp.startValue);
					Ext.getCmp(endDtId).focus(true,true);
					Ext.MessageBox.show({
						title : '提示信息',
						msg : endDtName + '不能小于' + startDtName + '，请重新选择！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
					return;
				}
			}
		}
	});
};

function amtConditionValidator(startAmtId, endAmtId, startAmtName, endAmtName) {
	if (startAmtName == undefined || startAmtName == null || startAmtName == '') {
		startAmtName = '开始值';
	}
	if (endAmtName == undefined || endAmtName == null || endAmtName == '') {
		endAmtName = '结束值';
	}
	// 开始值添加事件
//	Ext.getCmp(startAmtId).addListener('select', function(comp, date) {
		var endAmt = parseFloat(Ext.getCmp(endAmtId).getValue());
		var startAmt = parseFloat(Ext.getCmp(startAmtId).getValue());
		if (0 != endAmt) {
			if (0 != startAmt) {
				if (startAmt > endAmt) {
//					Ext.getCmp(startAmtId).setValue("");
					Ext.getCmp(startAmtId).focus(true,true);
					Ext.MessageBox.show({
						title : '提示信息',
						msg : startAmtName + '不能大于' + endAmtName + '，请重新填写！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
					return;
				}
			}
		}
//	});
		
	//结束值添加事件
//	Ext.getCmp(endDtId).addListener('select', function(comp, date) {
		if (0 != startAmt) {
			if (0 != endAmt) {
				if (endAmt < startAmt) {
//					Ext.getCmp(endAmtId).setValue("");
					Ext.getCmp(endAmtId).focus(true,true);
					Ext.MessageBox.show({
						title : '提示信息',
						msg : endAmtName + '不能小于' + startAmtName + '，请重新填写！',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING
					});
					return;
				}
			}
		}
//	});
};

/**
 * 初始化下拉树控件
 * @param comboxTreeId 控件树ID
 * @param defalultKey 默认值
 */
function initComboxTree(className,comboxTreeId,defalultKey,classField){
	var tree = Ext.getCmp(comboxTreeId);
    //给tree添加dblclick监听事件
	tree.tree.addListener('dblclick',function(node,e){
		setComboxTree(className,tree,classField);
	});
    //在comboxTree容器中添加按钮
    var queryBtn = new Ext.Button({
 	   text:'确定',
 	   handler:function(){
 		  setComboxTree(className,tree,classField);
 	   }
    });
    tree.tree.addButton(queryBtn);
    
    //下拉树store增加load事件
	var dataTxt = new Array();
	dataTxt.splice(0, 100);
	tree.tree.getLoader().addListener('load',function(obj,node,response){
    	if(defalultKey==undefined||defalultKey==''){
    		defalultKey=eval(className +"."+classField);
    	}
    	if(defalultKey==undefined||defalultKey=='')
    		return;
    	//下拉默认值设置
    	var tree=Ext.getCmp(comboxTreeId);
		var tmp='';
		tree.tree.getRootNode().eachChild(function(node){
			tmp=node.attributes.value;
			tmp="'"+tmp+"'";
			//无默认显示值
			node.getUI().toggleCheck(false);//取消选中
			var vals=defalultKey.split(',');
			for(var i=0;i<vals.length;i++) {
				if(tmp==vals[i]) {
					dataTxt.push(node.attributes.text);
					node.getUI().toggleCheck(true);//选中默认节点
					break;
				}
			}
		});
	    //下拉树默认值设置
		tree.setValue(dataTxt.join(','));
    });
	tree.tree.getLoader().load(tree.tree.getRootNode(),function(){
		//resetComboxTree(className,comboxTreeId,defalultKey,classField);
	});
    //下拉树默认值设置
	tree.setValue(dataTxt.join(','));
	
	if(defalultKey!=undefined&&defalultKey!='') {
    	eval(className +"."+classField+" = defalultKey");
    }
    else
    	eval(className +"."+classField+" = ''");
};
/**
 * 选中监听方法
 * @param comboxTree
 */
function setComboxTree(className,comboxTree,classField){
	//获取选中节点状态信息
	var dataTxt = new Array();
	var dataVal = new Array();
	dataTxt.splice(0, 100);
	dataVal.splice(0, 100);
	var ckVal = comboxTree.tree.getChecked();
	for(var i=0;i<ckVal.length;i++){
		var node = ckVal[i];
		dataTxt.push(node.attributes.text);
		dataVal.push("'"+node.attributes.value+"'");
	}
	comboxTree.setValue(dataTxt.join(','));
	comboxTree.collapse();
	eval(className +"."+classField+" = dataVal.join(',')");
};
/**
 * 重置下拉树控件
 * @param comboxTreeId 控件树ID
 * @param defaultValue 默认值
 */
function resetComboxTree(className,comboxTreeId,defalultKey,classField){
	var tree=Ext.getCmp(comboxTreeId);
    var tmp='';
    var rootNode=tree.tree.getRootNode();
    var childNodes=rootNode.childNodes;
	var dataTxt = new Array();
	dataTxt.splice(0, 100);
    for(var m=0;m<childNodes.length;m++) {
    	var node=childNodes[m];
		node.getUI().toggleCheck(false);//取消选中
		if(defalultKey==undefined||defalultKey=='')
    		continue;
    	tmp=node.attributes.value;
    	tmp="'"+tmp+"'";
		//默认值显示记录
		var vals=defalultKey.split(',');
		for(var i=0;i<vals.length;i++) {
			if(tmp==vals[i]) {
				dataTxt.push(node.attributes.text);
				node.getUI().toggleCheck(true);//选中默认节点
				break;
			}
		}
    }
    //下拉树默认值设置
	tree.setValue(dataTxt.join(','));
	if(defalultKey!=undefined&&defalultKey!='') {
    	eval(className +"."+classField+" = defalultKey");
    }
    else
    	eval(className +"."+classField+" = ''");
}
/**
 * 格式化金额数值
 * @param val 格式前金额
 * @return 格式后金额
 */
function formatMoney(val) 
{
	if(val==undefined||isNaN(val))
		val=0.00;
	return Ext.util.Format.number(val,'0,000.00');
}

/**
 * 格式化日期，去除中间的横线
 * @param val
 * @returns {String}
 */
function formatDate(val) 
{
	var relVal="";
	if(undefined!=val&&""!=val){
		/*if(val.indexOf("-")>0&&val.lastIndexOf("-")>0){
			relVal = val.substr(0,4)+val.substr(5,2)+val.substr(8);
		}*/
		if(val.indexOf("-")>0&&val.lastIndexOf("-")>0){
			var arr = new Array();
			arr = val.split("-");
			relVal=arr[0]+arr[1]+arr[2];
		}
	}
	return relVal;
}

//js日期格式转换
//pattern : 转换后的格式
//YYYY-MM-DD、YYYYMMDD
//date : 要转换的日期对象
function formatDateToPattern(pattern, date) {
	function formatNumber(data, format) {// 3
		format = format.length;
		data = data || 0;
		// return format == 1 ? data :
		// String(Math.pow(10,format)+data).substr(-format);//该死的IE6！！！
		return format == 1 ? data
				: (data = String(Math.pow(10, format) + data))
						.substr(data.length - format);
	}
	return pattern.replace(/([YMDhsm])\1*/g, function(format) {
		switch (format.charAt()) {
		case 'Y':
			return formatNumber(date.getFullYear(), format);
		case 'M':
			return formatNumber(date.getMonth() + 1, format);
		case 'D':
			return formatNumber(date.getDate(), format);
		case 'w':
			return date.getDay() + 1;
		case 'h':
			return formatNumber(date.getHours(), format);
		case 'm':
			return formatNumber(date.getMinutes(), format);
		case 's':
			return formatNumber(date.getSeconds(), format);
		}
	});
};

/**
 * 格式化利率数值
 * @param val 格式前利率
 * @return 格式后利率
 */
function formatIntRate(val) 
{
	if(val==undefined||isNaN(val))
		val=0;
	return Ext.util.Format.number(val,'0.00000');
}
/**
 * 格式化利率数值(利率为零则返回空)
 * @param val 格式前利率
 * @return 格式后利率
 */
function formatIntRateR(val) 
{
	if(val==undefined||isNaN(val)||val==0)
		return '';
	return Ext.util.Format.number(val,'0.0000');
}

/**
 * 返回公共平台系统首页
 */
function toHomePage(){
	//获取公共平台URL
	getPubsysUrlByAjax(function(pubsysUrl,ssoTicket){
		//拼接提交选择审批者页面路径
		var pageUrl=pubsysUrl+'/system/waitHandle_showview.jsp?SSOTICKET='+ssoTicket;
//		var pageUrl=pubsysUrl+'/system/waitHandle_showview.jsp';
		//跳转页面
		window.location.href=pageUrl;
	});
};

/**
 * @param paperTypeId 证件类型控件id
 * @param paperNoId 证件号码控件id
 */
function checkPaperTypeAndPaperNo(paperTypeId,paperNoId){
	var paperType = Ext.getCmp(paperTypeId).getValue();//证件类型
	var paperNo = Ext.getCmp(paperNoId).getValue();//证件号码
	if(undefined!=paperType&&""!=paperType){
		if(undefined==paperNo || ""==paperNo){
			Ext.MessageBox.show({
				title : '提示信息',
				msg : '请输入证件号码查询条件！ ',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
			return false;
		}
	}
	if(undefined!=paperNo&&""!=paperNo){
		if(undefined==paperType || ""==paperType){
			Ext.MessageBox.show({
				title : '提示信息',
				msg : '请选择证件类型查询条件！ ',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
			return false;
		}
	}
	return true;
}; 

/**
 * 个人：ITEM5500，ITEM5024
 * 企业：ITEM5025
 * @param custTypeId 客户类型控件id
 * @param paperTypeId 证件类型控件id
 * @param paperNoId 证件号码控件id
 * @param personPaperTypeParaNo 个人客户证件类型下拉框参数
 * 为查询条件中的证件类型增加查询条件参数
 */
function paperTypeAddParams(custTypeId,paperTypeId,paperNoId,personPaperTypeParaNo){
	var paperTypeStore = Ext.getCmp(paperTypeId).getStore();
	var custType = Ext.getCmp(custTypeId);
	var custTypeVal='';//客户类型
	//证件类型获得鼠标焦点事件
	Ext.getCmp(paperTypeId).addListener('focus',function(form){
		custTypeVal = custType.getValue();
		if(custTypeVal==""||custTypeVal==null||custTypeVal=='null'||custTypeVal=="undefined"){
			Ext.MessageBox.show({
				title : '提示信息',
				msg : '请先选择客户类型！ ',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
			Ext.getCmp(paperTypeId).setValue("");
			custType.focus(true,true);
			return;
		}
	});
	
	//证件号码获得鼠标焦点事件
	Ext.getCmp(paperNoId).addListener('focus',function(form){
		var paperTypeVal = Ext.getCmp(paperTypeId).getValue();
		if(paperTypeVal==""||paperTypeVal==null||paperTypeVal=='null'||paperTypeVal=="undefined"){
			Ext.MessageBox.show({
				title : '提示信息',
				msg : '请先选择证件类型！ ',
				buttons : Ext.MessageBox.OK,
				icon : Ext.MessageBox.WARNING
			});
			Ext.getCmp(paperNoId).setValue("");
			Ext.getCmp(paperTypeId).focus(true,true);
			return;
		}
	});
	
	paperTypeStore.addListener('beforeload',function(){
		custTypeVal = custType.getValue();
		//清空store
		paperTypeStore.removeAll();
		var paraNo='';//
		if(undefined!=personPaperTypeParaNo&&""!=personPaperTypeParaNo){
			paraNo=personPaperTypeParaNo;//个人客户证件类型
		}else{
			paraNo='ITEM5024';//个人客户证件类型
		}
		
		if(custTypeVal=='1')
		{ //企业客户证件类型
			paraNo='ITEM5025';
		}
		paperTypeStore.baseParams.paraNo=paraNo;
	});
	
	//为客户类型下拉框增加select事件
	custType.addListener('select',function(combo, record, index){
		if(undefined!=paperTypeStore&&paperTypeStore.getCount()>0){
			paperTypeStore.removeAll();
		}
		Ext.getCmp(paperTypeId).clearValue();//清空下拉框选中的值
		Ext.getCmp(paperNoId).setValue("");//清空证件号码
		paperTypeStore.load();
	});
};

/**
 * 客户经理下拉框加载数据前处理事件
 * @param custManagerComboBoxTableId
 * @param stationId
 */
function addCustManagerParams(custManagerComboBoxTableId,stationId){
	Ext.getCmp(custManagerComboBoxTableId).grid.getStore().addListener('beforeload',function(){
//		eval(className + '.addParamsOper()');
		//清空store
		Ext.getCmp(custManagerComboBoxTableId).grid.getStore().removeAll();//清空表格中的查询数据
		if(undefined!=stationId&&""!=stationId){
			Ext.getCmp(custManagerComboBoxTableId).grid.getStore().baseParams.stationId=stationId;//岗位id
		}else{
			Ext.getCmp(custManagerComboBoxTableId).grid.getStore().baseParams.stationId="400";//客户经理岗
		}
    });
};

/**
 * 金额范围校验
 * @param startAmtId
 * @param endAmtId
 * @param startAmtName
 * @param endAmtName
 */
function AmtConditionValidator(startAmtId, endAmtId, startAmtName, endAmtName){
	if (startAmtName == undefined || startAmtName == null || startAmtName == '') {
		startDtName = '贷款金额起';
	}
	if (endAmtName == undefined || endAmtName == null || endAmtName == '') {
		endDtName = '贷款金额止';
	}
	// 贷款金额起添加事件
	Ext.getCmp(startAmtId).addListener('change', function(form, newValue, oldValue) {
		var endAmt = Ext.getCmp(endAmtId).getValue();
		if ("" != endAmt) {
			if(newValue > endAmt){
				Ext.MessageBox.show({
					title : '系统提示',
					msg : startAmtName + '不能大于' + endAmtName+'!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
			}
		}
	});
	
	// 贷款金额止添加事件
	Ext.getCmp(endAmtId).addListener('change', function(form, newValue, oldValue) {
		var startAmt = Ext.getCmp(startAmtId).getValue();
		if ("" != startAmt) {
			if(newValue < startAmt){
				Ext.MessageBox.show({
					title : '系统提示',
					msg : endAmtName + '不能小于' + startAmtName+'!',
					buttons : Ext.MessageBox.OK,
					icon : Ext.MessageBox.WARNING
				});
			}
		}
	});
}
/**
 * 根据登陆岗位判断是否需要灰化客户经理查询条件
 * @returns {Boolean}
 */
function isDisabledCustManagerByStation(){
	var stationId=appConfig.Session.loginUserInfo.stationId;
	var flag = false;
	var array = stationId.split(',');
	for(var i = 0 ; i < array.length ; i++){
		if('400' == array[i]){
			flag = true;
			break;
		}
	}
	return flag;
}
/**
 * 判断当前登陆机构是否是金农机构
 * @returns {Boolean}
 */
function isJNOrgInCurLogin(){
	var flag = false;
	//获取机构信息
	var orgNo=appConfig.Session.loginUserInfo.id.insttuId;
	if(orgNo=='990000000'||orgNo=='990000001'||orgNo=='320000001'||orgNo=='320000002'){
		flag=true;
	}
	return flag;
}
/**
 * 防止移动GRID的列时出现渲染错误
 * @param girdId
 * @param columnIndex
 * @returns 渲染值
 */
function gridRenderer(girdId,columnIndex,value){
	var columnModel = Ext.getCmp(girdId).getColumnModel();
	var dataIndex = columnModel.getDataIndex(columnIndex);
	if(dataIndex=='custType') {//客户类型
    	value=storeFind(custTypeStore,value);
    }else if(dataIndex=='contTyp') { // 授信类型
    	value=storeFind(crdtTypeStore,value);
    }else if(dataIndex=='paperType') { // 证件类型
    	value=storeFind(idTypeStore,value);
    }else if(dataIndex=='status') {// 授信状态
    	value=storeFind(isValidStore,value);
    }else if(dataIndex=='grntFlag') {// 是否担保
    	value=storeFind(yesOrNoStore,value);
    }else if(dataIndex=='loanFlag') {// 是否做过贷款业务
    	value=storeFind(yesOrNoStore,value);
    }else if(dataIndex=='loiFlag') {// 是否保函
    	value=storeFind(yesOrNoStore,value);
    }else if(dataIndex=='custClass') {// 客户类别
    	value=storeFind(custClassStore,value);
    }else if(dataIndex=='fivappSta') {// 五级分类状态
    	value=storeFind(fivStsStore,value);
    }else if(dataIndex=='beforeMoveSta') {// 五级分类状态
    	value=storeFind(fivStsStore,value);
    }else if(dataIndex=='afterMoveSta') {// 调整前五级分类状态
    	value=storeFind(fivStsStore,value);
    }else if(dataIndex=='moveType') {// 五级分类明细调整类型
    	value=storeFind(isAutoStore,value);
    }
	
    return value;
}
/**
 * 获取机构状态，流程状态信息进行操作校验
 * @param params 参数
 * @param isBusFlag 是否业务操作标志
 * @param callback 回调函数
 */
function checkEntFlowOpt(params,isBusFlag,callback){
	//获取机构状态，流程状态信息进行操作校验
	var reqUrl='/EntFlowAction.do?method=checkFlowOpt';
	ajaxLoad(reqUrl,params,function(response){
		var data = Ext.decode(response.responseText);
		//处理回调函数逻辑
		if (isBusFlag) { //如果是业务操作，则直接使用下面逻辑校验
			if(data.orgStatus!="1"){
				Ext.MessageBox.alert('提示','当前机构状态不为关闭状态，不能进行数据移植业务数据录入或删除操作！');
			} else {
				if(data.flowStatus!="1"&&data.flowStatus!="2") {
					Ext.MessageBox.alert('提示','当前数据移植流程状态不是移植录入或对账平衡状态，不能进行业务数据录入或删除操作！');
				} else { //通过则执行回调函数
					if(data.transScale=="1") {
						Ext.MessageBox.alert('提示','当前数据移植范围为仅会计移植，不能进行信贷业务数据录入或删除操作！');
					} else {
						if (callback != undefined && typeof (callback == 'function')) {
							callback(data);
						}
					}
				}
			}
		} else {
			if (callback != undefined && typeof (callback == 'function')) {
				callback(data);
			}
		}
	});
	
}

/**
 * 同步请求加载数据
 * @param reqUrl ajax请求的url
 * @param params ajax请求的参数集
 * @param successCallBack ajax加载成功的回调函数
 * @param failureCallBack ajax加载失败的回调函数
 * @param privateMsg私有化的提示信息
 * @param callback总回调函数不区分成功失败
 */
function SyncRequestLoad(reqUrl,params,successCallBack,failureCallBack,privateMsg,callback) {
	Ext.Msg.wait('正在处理数据...');
	var oXmlHttp = appframe.getXmlHttpRequest() ;
	reqUrl=appConfig.baseUrl + '/' + reqUrl;
	oXmlHttp.open('POST', reqUrl, false); 
	oXmlHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");
	oXmlHttp.send(params);
	Ext.Msg.hide();
	var response=oXmlHttp;
	var respData = Ext.decode(response.responseText);
	var flag = respData.success;
	if(callback==undefined||callback==''||callback==null){
		if (flag) {
			//处理回调函数逻辑
			if (successCallBack != undefined && typeof (successCallBack == 'function')) {
				successCallBack(response);
			}
		} else {
			var errorMsg= '后台出错';
			if(respData.data != undefined){
				errorMsg = respData.data._rspMsg;
			}else if(respData.errMsg != undefined){
				errorMsg = respData.errMsg;
			}
			if(privateMsg != undefined && privateMsg != null && ""!=privateMsg){
				errorMsg = privateMsg;
			}
			Ext.Msg.alert('系统提示', '系统出错，错误原因【' + errorMsg + '】', function(){
				//处理回调函数逻辑
				if (failureCallBack != undefined && typeof (failureCallBack == 'function')) {
					failureCallBack(response);
				}
			});
		}
	} else {
		callback(response);
	}
	return flag;
};

function openPostWindow(url,dataname, data, name) {
	var tempForm = document.createElement("form");
	tempForm.id = "tempForm1";
	tempForm.method = "post";
	tempForm.action = url;
	tempForm.target = name;

	var hideInput = document.createElement("input");
	hideInput.type = "hidden";
	hideInput.name = dataname;
	hideInput.value = data;
	tempForm.appendChild(hideInput);
	if (Ext.isIE) {
		tempForm.attachEvent("onsubmit", function() {
					openWindow(name);
				});
		document.body.appendChild(tempForm);
		tempForm.fireEvent("onsubmit");
	} else {
		tempForm.addEventListener("onsubmit", function() {
					openWindow(name);
				});
		document.body.appendChild(tempForm);
	}
	tempForm.submit();
	document.body.removeChild(tempForm);

}

function openWindow(name) {
	window
			.open(
					'about:blank',
					name,
					'top=0, left=0, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes,location=no, status=yes');
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