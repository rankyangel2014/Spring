/**
 * generated by JNGU-2012-ExtPlugins. please write here
 * com.jsjn.jnf.fee.FeeStatistic's method: Javascript class static method be
 * used as ExtJs's event method handler,like
 * 'com.jsjn.jnf.fee.FeeStatistic.method(); this is Class static method'
 * Javasctipt object method be used as get or set object's properties,like
 * 'com.jsjn.jnf.fee.FeeStatistic.prototype.method(); this is object's method'
 * com.jsjn.jnf.fee.FeeStatistic.PANEL is com.jsjn.jnf.fee.FeeStatistic's
 * Singleton instance object . you can get com.jsjn.jnf.fee.FeeStatistic.PANEL's
 * reference by appfram.getInstance('com.jsjn.jnf.fee.FeeStatistic').
 */

var FeeStatisticInsttuId = '', FeeStatisticMid = '';
appframe.afterInstance("com.jsjn.jnf.fee.FeeStatistic", function(panel) {

    if (panel) {
        // 渲染收费项目下拉框
        Ext.apply(Ext.getCmp('channel.FeeStatistic'), {
            store : withholdChannelStore.getStore()
        });

        // 渲染下拉框
        Ext.apply(Ext.getCmp('businessType.FeeStatistic'), {
            store : businessTypeStore.getStore()
        });
    }

});

// 查询
com.jsjn.jnf.fee.FeeStatistic.btnQuery = function() {

    // 收费项目
    var businessType = Ext.getCmp('businessType.FeeStatistic').getValue();
    var channel = Ext.getCmp('channel.FeeStatistic').getValue();
    // 开始时间
    var startTime = Ext.getCmp('startTime.FeeStatistic').getRawValue();
    // 结束时间
    var endTime = Ext.getCmp('endTime.FeeStatistic').getRawValue();

    if (valueIsEmpty(startTime) || valueIsEmpty(endTime)) {
        Ext.MessageBox.alert('提示', '开始时间或结束时间不能为空，请重新选择！');
        return false;
    }

    if (!valueIsEmpty(startTime) && !valueIsEmpty(endTime)
            && startTime >= endTime) {
        Ext.MessageBox.alert('提示', '开始时间不能大于结束时间，请重新选择！');
        return false;
    }
    var store = Ext.getCmp("grid.FeeStatistic").getStore();// store
    store.baseParams.mid = FeeStatisticMid;// 商户号
    store.baseParams.insttuId = FeeStatisticInsttuId;// 机构号
    store.baseParams.startTime = startTime;
    store.baseParams.endTime = endTime;
    store.baseParams.businessType = businessType;
    store.baseParams.channel = channel;
    store.load();
};
// 重置
com.jsjn.jnf.fee.FeeStatistic.btnReset = function() {
    // 商户名称
    Ext.getCmp('mid.FeeStatistic').reset();
    // 机构名称
    Ext.getCmp('insttuId.FeeStatistic').reset();
    // 收费项目
    Ext.getCmp('businessType.FeeStatistic').reset();
    Ext.getCmp('channel.FeeStatistic').reset();
    // 开始时间
    Ext.getCmp('startTime.FeeStatistic').reset();
    // 结束时间
    Ext.getCmp('endTime.FeeStatistic').reset();
    // 商户号
    FeeStatisticMid = '';
    // 机构号
    FeeStatisticInsttuId = '';
};
// 导出Excel
com.jsjn.jnf.fee.FeeStatistic.exportExcel = function() {
    // 商户名称
    var mid = Ext.getCmp('mid.FeeStatistic').getValue();
    // 机构名称
    var insttuId = Ext.getCmp('insttuId.FeeStatistic').getValue();
    // 收费项目
    var businessType = Ext.getCmp('businessType.FeeStatistic').getValue();
    var channel = Ext.getCmp('channel.FeeStatistic').getValue();
    // 开始时间
    var startTime = Ext.getCmp('startTime.FeeStatistic').getRawValue();
    // 结束时间
    var endTime = Ext.getCmp('endTime.FeeStatistic').getRawValue();

    if (!Ext.isEmpty(startTime) && !Ext.isEmpty(endTime)
            && (startTime > endTime)) {
        Ext.Msg.alert('系统提示', '调用时间（起）不能大于调用时间（止）');
        return false;
    }
    var title = "计费汇总";
    var url = appConfig.baseUrl
            + '/jnf/FeeComInfoAction.do?method=expertFeeStatistic&mid=' + mid
            + '&insttuId=' + insttuId + '&startTime=' + startTime + '&endTime='
            + endTime + '&businessType=' + businessType + '&channel=' + channel
            + '&fileName=' + title;
    window.open(url);
};

com.jsjn.jnf.fee.FeeStatistic.gridRender = function(value, cellmeta, record,
        rowIndex, columnIndex, store) {
    var dataIndex = Ext.getCmp("grid.FeeStatistic").getColumnModel()
            .getDataIndex(columnIndex);
    if (dataIndex == 'xh') {
        return rowIndex + 1;
    } else if (dataIndex == 'startTime' || dataIndex == 'endTime') {
        return value.format('Y-m-d H:i:s');
    } else if (dataIndex == 'price' || dataIndex == 'totalMoney') {
        return Ext.util.Format.numberRenderer('0,0.00')(value);
    } else if (dataIndex == 'operator') {
        return "<a href=\"#\" onclick=\"com.jsjn.jnf.fee.FeeStatistic.showTransactionFlow();\" style=\"vertical-align:bottom; text-decoration:none\">【交易流水】</a>";
    } else {
        return value;
    }
};
/**
 * 查看交易明细
 */
com.jsjn.jnf.fee.FeeStatistic.showTransactionFlow = function() {
    var grid = Ext.getCmp('grid.FeeStatistic');
    var record = grid.getSelectionModel().getSelected();
    var insttuName = record.get('insttuName');
    var businessType = record.get('businessType');
    var channel = record.get('channel');
    var businessTypeId = storeFindByValue(businessTypeStore, businessType);
    var channelId = storeFindByValue(withholdChannelStore, channel);
    var startTime = record.get('startTime').format('Y-m-d H:i:s');
    var startTimeStr = record.get('startTime').format('Y-m-d');
    var endTime = record.get('endTime').format('Y-m-d H:i:s');
    var endTimeStr = record.get('endTime').format('Y-m-d');
    var orgNo = record.get('insttuId');
    var win, winStr, gridId, orgId, startTimeId, endTimeId, fileNameId;
    if (businessTypeId == '11') {// 业务类型为实名认证
        winStr = 'com.jsjn.jnf.fee.FeeRealNameAuthDetail';
        gridId = "grid.FeeRealNameAuthDetail";
        orgId = "orgNo.FeeRealNameAuthDetail";
        startTimeId = "startTime.FeeRealNameAuthDetail";
        endTimeId = "endTime.FeeRealNameAuthDetail";
        fileNameId = "fileName.FeeRealNameAuthDetail";
    } else {// 业务类型为代扣
        winStr = 'com.jsjn.jnf.fee.FeeWithholdDetail';
        gridId = "grid.FeeWithholdDetail";
        orgId = "orgNo.FeeWithholdDetail";
        startTimeId = "startTime.FeeWithholdDetail";
        endTimeId = "endTime.FeeWithholdDetail";
        fileNameId = "fileName.FeeWithholdDetail";
    }

    win = appframe.getInstance(winStr);
    if (win) {
        win.show(null, function() {
            var title = insttuName + "-" + businessType + "-" + startTimeStr + "_"
                    + endTimeStr + "-" + "交易流水";
            win.setTitle("<div align='center'>" + title + "</div>");
            Ext.getCmp(orgId).setValue(orgNo);
            Ext.getCmp(startTimeId).setValue(startTime);
            Ext.getCmp(endTimeId).setValue(endTime);
            Ext.getCmp(fileNameId).setValue(title);
            var store = Ext.getCmp(gridId).getStore();
            store.baseParams.orgNo = orgNo;
            store.baseParams.channel = channelId;
            store.baseParams.businessType = businessTypeId ;
            store.baseParams.startTime = startTime;
            store.baseParams.endTime = endTime;
            store.load();
        });
    }
};

/**
 * 选择机构
 */
com.jsjn.jnf.fee.FeeStatistic.InsttuSelectRow = function(combo, newValue,
        oldValue) {
    FeeStatisticInsttuId = newValue;
};

/**
 * 选择商户
 */
com.jsjn.jnf.fee.FeeStatistic.BusinessSelectRow = function(combo, newValue,
        oldValue) {
    FeeStatisticMid = newValue;
    var gridStore = Ext.getCmp('insttuId.FeeStatistic').Gridstore;
    gridStore.baseParams.mId = newValue;
    gridStore.load();
};