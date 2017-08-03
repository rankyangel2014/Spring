/*******************************************************************************
 * Filter row class. edit by JNGF
 ******************************************************************************/
Ext.namespace('Ext.ux.grid');
appframe.loadCss("/ExtJs3.4/extend/ComboxTable.css", "comboxTableCss");
Ext.ux.grid.FilterRow = function(config) {
    Ext.apply(this, config);
    Ext.ux.grid.FilterRow.superclass.constructor.call(this);
};

Ext
        .extend(
                Ext.ux.grid.FilterRow,
                Ext.util.Observable,
                {
                    init : function(grid) {
                        this.grid = grid;
                        grid.filterRow = this;
                        this.grid.addClass('filter-row');
                        var view = grid.getView();
                        var headerTpl = new Ext.Template(
                                '<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
                                '<thead><tr class="x-grid3-hd-row  ">{cells}</tr></thead>',
                                "</table>");
                        Ext.applyIf(view, {
                            templates : {}
                        });
                        view.templates.header = headerTpl;
                        view.templates.hcell = new Ext.Template(
                                '<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
                                '<div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
                                this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>'
                                        : '', '{value}',
                                '<div class="x-small-editor filterInput" id="'
                                        + grid.id + '-filter-{id}"></div>',
                                '<img class="x-grid3-sort-icon" src="',
                                Ext.BLANK_IMAGE_URL, '" />', '</div>', '</td>');

                        grid.on('resize', this.syncFields, this);
                        grid.on('columnresize', this.syncFields, this);
                        grid.on('render', this.renderFields, this);
                        var FilterRow = this;
                        view.updateHeaders = function() {
                            this.innerHd.firstChild.innerHTML = this
                                    .renderHeaders();
                            this.innerHd.firstChild.style.width = this
                                    .getOffsetWidth();
                            this.innerHd.firstChild.firstChild.style.width = this
                                    .getTotalWidth();
                            FilterRow.renderFields();
                        };
                        Ext.apply(grid, {
                            enableColumnHide_ : false,
                            enableColumnMove : true
                        });
                    },
                    filterquery : function() {
                        var data = this.getData();
                        var grid = this.grid;
                        var insttuIdVal = data['insttuId'];
                        var insttuNmVal = data['insttuNm'];
                        grid.store.filterBy(function(record) {
                            var insttuId = record.get("insttuId");
                            var insttuNm = record.get("insttuNm");
                            return (insttuNm.indexOf(insttuNmVal) != -1)
                                    && (insttuId.indexOf(insttuIdVal) != -1);
                        });
                    },
                    renderFields : function() {
                        var grid = this.grid;
                        var filterRow = this;
                        grid.filter = {};
                        var cm = grid.getColumnModel();
                        var cols = cm.config;
                        var gridId = grid.id;
                        Ext.each(cols, function(col) {
                            if (!col.hidden) {
                                var filterDivId = gridId + "-filter-" + col.id;
                                if (typeof (col.filterInput) == "undefined") {
                                    col.filterInput = new Ext.form.TextField({
                                        enableKeyEvents : true
                                    });
                                }
                                var editor = col.filterInput;
                                if (Ext.isIE) {
                                    col.filterInput = editor = editor
                                            .cloneConfig({
                                                value : editor.getValue(),
                                                id : editor.getId()
                                            });
                                }
                                editor.on("keyup", function(editor, e) {
                                    var keys = e.getKey();
                                    if ((keys >= 48 && keys <= 57)
                                            || (keys >= 96 && keys <= 105)
                                            || keys == 8 || keys == 46
                                            || keys == Ext.EventObject.ENTER
                                            || keys == Ext.EventObject.SPACE) {
                                        filterRow.curEditFieldId = editor
                                                .getId();
                                        filterRow.filterquery();
                                        editor.focus();
                                    }
                                    return false;
                                });
                                // editor.on("specialkey", function(editor, e) {
                                // var keys = e.getKey();
                                // if (keys == Ext.EventObject.ENTER || keys ==
                                // 8 || keys == 46) {
                                // filterRow.curEditFieldId = editor
                                // .getId();
                                // filterRow.filterquery();
                                // }
                                // return false;
                                // });
                                grid.filter[filterDivId] = new Ext.Panel({
                                    border : false,
                                    layout : 'fit',
                                    items : editor,
                                    renderTo : filterDivId
                                });
                            }
                        }, this);

                    },

                    setFilterEditor : function(columNumber, editor) {
                        var grid = this.grid;
                        var gridId = grid.id;
                        var cm = grid.getColumnModel();
                        var cols = cm.config;
                        var col = cols[columNumber];
                        col.filterInput = editor;
                        if (Ext.isIE) {
                            col.filterInput = editor = editor.cloneConfig({
                                value : editor.getValue(),
                                id : editor.getId()
                            });
                        }
                        editor.on("keyup", function(editor, e) {
                            var keys = e.getKey();
                            if ((keys >= 48 && keys <= 57)
                                    || (keys >= 96 && keys <= 105) || keys == 8
                                    || keys == 46) {
                                filterRow.curEditFieldId = editor.getId();
                                filterRow.filterquery();
                                editor.focus();
                            }
                            return false;
                        });
                        editor.on("specialkey", function(editor, e) {
                            var keys = e.getKey();
                            if (keys == Ext.EventObject.ENTER || keys == 8
                                    || keys == 46) {
                                filterRow.curEditFieldId = editor.getId();
                                filterRow.filterquery();
                            }
                            return false;
                        });
                        var filterDivId = gridId + "-filter-" + columNumber;
                        grid.filter[filterDivId].removeAll();
                        grid.filter[filterDivId].add(col.filterInput);
                        grid.filter[filterDivId].doLayout();
                    },

                    getFilterEditor : function(columNumber) {
                        var grid = this.grid;
                        var cm = grid.getColumnModel();
                        var cols = cm.config;
                        var col = cols[columNumber];
                        return col.filterInput;
                    },

                    getData : function() {
                        var grid = this.grid;
                        var cm = grid.getColumnModel();
                        var cols = cm.config;
                        var data = {};
                        var value = '';
                        var dataIndex = '';
                        Ext
                                .each(
                                        cols,
                                        function(col) {
                                            if (!col.hidden) {
                                                var editor = col.filterInput;
                                                if (editor) {
                                                    value = editor.getValue();
                                                    if (editor.getXType() == 'datefield'
                                                            && value.format) {
                                                        value = value
                                                                .format(editor.format);
                                                    }
                                                    dataIndex = editor.dataIndex ? editor.dataIndex
                                                            : col.dataIndex;
                                                    data[dataIndex] = value;
                                                }
                                            }
                                        });
                        return data;
                    },
                    syncFields : function() {
                        var grid = this.grid;
                        var cm = grid.getColumnModel();
                        var cols = cm.config;
                        Ext.each(cols, function(col) {
                            if (!col.hidden) {
                                var editor = col.filterInput;
                                editor.setSize(col.width - 18);
                            }
                        });
                    }
                });

Ext.namespace('com.jsjn.ext.extend');
com.jsjn.ext.extend.ComboBoxTable = Ext.extend(Ext.form.ComboBox, {
    Gridstore : new Ext.data.Store({
        reader : new Ext.data.JsonReader({
            totalProperty : "total",
            root : "root",
            id : "id"
        }, [ {
            mapping : "name",
            name : "name"
        }, {
            mapping : "age",
            type : "int",
            name : "age"
        } ]),
        proxy : new Ext.data.HttpProxy({})
    }),
    columns : [ {
        hidden : false,
        header : "name",
        dataIndex : "name",
        sortable : true
    }, {
        hidden : false,
        header : "age",
        dataIndex : "age",
        sortable : true
    } ],
    gridPageSize : 10,
    store : new Ext.data.SimpleStore({
        fields : [],
        data : [ [] ]
    }),
    listHeight : 300,
    listWidth : 250,
    shadow : false,
    editable : false,
    mode : 'local',

    name : "test",
    triggerAction : 'all',
    shadow : false,
    valueField : "name",
    displayField : "age",
    maxHeight : 500,
    selectedClass : '',
    emptyText : '--请选择--',
    onSelect : Ext.emptyFn,

    /**
     * 
     * Init
     */
    initComponent : function() {
        var combo = this;
        com.jsjn.ext.extend.ComboBoxTable.superclass.initComponent.call(this);
        this.tplId = Ext.id();
        this.tpl = '<div id="' + this.tplId + '" style="height:'
                + this.listHeight + 'px;overflow:hidden;"></div>';
        var filterRow = new Ext.ux.grid.FilterRow();
        this.filterRow = filterRow;
        var grid = new Ext.grid.GridPanel({
            store : this.Gridstore,
            autoScroll : true,
            width : this.listWidth,
            loadMask : "请稍等",
            border : false,
            columns : this.columns,
            plugins : [ filterRow ],
            stripeRows : true,
            height : this.listHeight,
            enableHdMenu : false
        });
        grid.on('rowdblclick', function(grid, rowIndex, event) {

            var record = grid.getSelectionModel().getSelected();
            combo.fireEvent("selectRow", combo, record.get(combo.valueField),
                    combo.hiddenField.value);
            combo.setValue(record.get(combo.displayField));

            combo.hiddenField.value = record.get(combo.valueField);
            combo.collapse();
        });
        this.Gridstore.on('datachanged', function() {

        });
        this.Gridstore.on('load', function(store, records, options) {
            var cols = grid.getColumnModel().config;
            Ext.each(cols, function(col) {
                if (!col.hidden) {
                    var editor = col.filterInput;
                    col.renderer = function(value, cellmeta, record, rowIndex,
                            columnIndex, store) {
                        if (value != "") {
                            // 增加鼠标移上去有提示信息
                            cellmeta.attr = 'ext:qtitle="" ext:qtip="' + value
                                    + '"';
                        }
                        ;
                        return value;
                    };
                    // 该组件IE下卡顿的最大瓶颈
                    var t1 = new Date().getTime();
                    if (editor != undefined
                            && editor.getId() == filterRow.curEditFieldId) {
                        /**
                         * 修正此控件在IE下光标失焦 效率很低 在低版本浏览器中十分影响性能
                         */
                        var sel = editor.getEl().dom;
                        sel.focus();
                        var length = sel.value.length;
                        if (sel.setSelectionRange) {
                            sel.focus();
                            sel.setSelectionRange(length, length);
                        } else if (sel.createTextRange) {
                            var range = sel.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', length);
                            range.moveStart('character', length);
                            range.select();
                        }
                        var t2 = new Date().getTime();
                        // console.log("处理IE下输入框失焦的时间"+(t2-t1)+"ms");
                    }

                }
            });
        });
        this.grid = grid;
        this.panel = new Ext.Panel({
            autoScroll : true,
            border : false,
            height : this.listHeight,
            width : this.listWidth,
            items : [ grid ]
        });

    },

    setFilterEditor : function(columNumber, editor) {
        this.grid.setFilterEditor(columNumber, editor);
    },

    onViewClick : function(doFocus) {
        this.el.blur();
        var index = this.view.getSelectedIndexes()[0], s = this.store, r = s
                .getAt(index);
        if (r) {
            this.onSelect(r, index);
        }

    },

    /**
     * ------------------ Listener ------------------
     */
    listeners : {
        'expand' : {
            fn : function() {
                if (!this.panel.rendered && this.tplId) {
                    this.panel.render(this.tplId);
                }
                var cols = this.grid.getColumnModel().config;
                if (cols != undefined) {
                    Ext.each(cols, function(col) {
                        if (!col.hidden) {
                            var editor = col.filterInput;
                            editor.setValue("");
                        }
                    });
                    this.filterRow.filterquery();
                }
                this.panel.show();
            }
        },
        'render' : {
            fn : function() {
                this.hiddenField = this.el.insertSibling({
                    tag : 'input',
                    type : 'hidden',
                    name : this.getName()
                }, 'before', true);
                this.el.dom.removeAttribute('name');
            }

        }
    }
});

/**
 * 
 * 
 */
Ext.reg('combotable', com.jsjn.ext.extend.ComboBoxTable);
