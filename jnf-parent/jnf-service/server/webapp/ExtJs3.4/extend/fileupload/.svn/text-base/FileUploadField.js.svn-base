/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
 
 /**
  * 动态增加css
  */
Ext.ns('Ext.ux.form');
appframe.loadCss("/ExtJs3.4/extend/fileupload/fileuploadfield.css","uploadcss");


/**
 * @class Ext.ux.form.FileUploadField
 * @extends Ext.form.TextField
 * Creates a file upload field.
 * @xtype fileuploadfield
 */
Ext.ux.form.FileUploadField = Ext.extend(Ext.form.TextField,  {
    /**
     * @cfg {String} buttonText The button text to display on the upload button (defaults to
     * 'Browse...').  Note that if you supply a value for {@link #buttonCfg}, the buttonCfg.text
     * value will be used instead if available.
     */
    buttonText: 'Browse...',
    /**
     * @cfg {Boolean} buttonOnly True to display the file upload field as a button with no visible
     * text field (defaults to false).  If true, all inherited TextField members will still be available.
     */
    buttonOnly: false,
    /**
     * @cfg {Number} buttonOffset The number of pixels of space reserved between the button and the text field
     * (defaults to 3).  Note that this only applies if {@link #buttonOnly} = false.
     */
    buttonOffset: 3,
    /**
     * @cfg {Object} buttonCfg A standard {@link Ext.Button} config object.
     */

    // private
    readOnly: true,

    /**
     * @hide
     * @method autoSize
     */
    autoSize: Ext.emptyFn,

    // private
    initComponent: function(){
        Ext.ux.form.FileUploadField.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event fileselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {Ext.ux.form.FileUploadField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'fileselected'
        );
    },

    // private
    onRender : function(ct, position){
        Ext.ux.form.FileUploadField.superclass.onRender.call(this, ct, position);

        this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'});
        this.el.addClass('x-form-file-text');
        this.el.dom.removeAttribute('name');
        this.createFileInput();

        var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
            text: this.buttonText
        });
        this.button = new Ext.Button(Ext.apply(btnCfg, {
            renderTo: this.wrap,
            cls: 'x-form-file-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '')
        }));

        if(this.buttonOnly){
            this.el.hide();
            this.wrap.setWidth(this.button.getEl().getWidth());
        }

        this.bindListeners();
        this.resizeEl = this.positionEl = this.wrap;
    },
    
    bindListeners: function(){
        this.fileInput.on({
            scope: this,
            mouseenter: function() {
                this.button.addClass(['x-btn-over','x-btn-focus'])
            },
            mouseleave: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            mousedown: function(){
                this.button.addClass('x-btn-click')
            },
            mouseup: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            change: function(){
                var v = this.fileInput.dom.value;
                this.setValue(v);
                this.fireEvent('fileselected', this, v);    
            }
        }); 
    },
    
    createFileInput : function() {
        this.fileInput = this.wrap.createChild({
            id: this.getFileInputId(),
            name: this.name||this.getId(),
            cls: 'x-form-file',
            tag: 'input',
            type: 'file',
            size: 1
        });
    },
    
    reset : function(){
        if (this.rendered) {
            this.fileInput.remove();
            this.createFileInput();
            this.bindListeners();
        }
        Ext.ux.form.FileUploadField.superclass.reset.call(this);
    },

    // private
    getFileInputId: function(){
        return this.id + '-file';
    },

    // private
    onResize : function(w, h){
        Ext.ux.form.FileUploadField.superclass.onResize.call(this, w, h);

        this.wrap.setWidth(w);

        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },

    // private
    onDestroy: function(){
        Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
        Ext.destroy(this.fileInput, this.button, this.wrap);
    },
    
    onDisable: function(){
        Ext.ux.form.FileUploadField.superclass.onDisable.call(this);
        this.doDisable(true);
    },
    
    onEnable: function(){
        Ext.ux.form.FileUploadField.superclass.onEnable.call(this);
        this.doDisable(false);

    },
    
    // private
    doDisable: function(disabled){
        this.fileInput.dom.disabled = disabled;
        this.button.setDisabled(disabled);
    },


    // private
    preFocus : Ext.emptyFn,

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    }

});

Ext.reg('fileuploadfield', Ext.ux.form.FileUploadField);

// backwards compat
Ext.form.FileUploadField = Ext.ux.form.FileUploadField;



 var msg = function(title, msg){
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
  };


Ext.namespace('com.jsjn.ext.extend');
com.jsjn.ext.extend.UploadWindow =  function(config) {
	Ext.apply(this, config);
	this.initUIComponents();
	com.jsjn.ext.extend.UploadWindow.superclass.constructor.call(this);
	return this;
};
Ext.extend(com.jsjn.ext.extend.UploadWindow,Ext.Window, {
	fileSize : 1024*1024,
	Panelheight : 280,
	fileTypesDescription : '所有文件',
	fileFolder:"ff",
	afterUpload:function(result){
	},
	title : '文件上传',
	width : 600,
	height : 150,
	resizable : false,
	layout : 'fit',
	reset:function(){
		this.panel.getForm().reset ();
		this.panel.getForm().findField("path").setValue(this.fileFolder);
		this.panel.getForm().findField("maxSize").setValue(this.fileSize);
	},
	initUIComponents : function() {
		var win=this;
		var fp = new Ext.FormPanel({
		        fileUpload: true,
		        frame: true,
		        bodyStyle: 'padding: 10px 10px 0 10px;',
		        labelWidth: 50,
		        defaults: {
		            anchor: '95%',
		            allowBlank: false,
		            msgTarget: 'side'
		        },
		        items: [{
		        	name:'path',
		            xtype: 'hidden',
		            fieldLabel: 'path',
		            value:win.fileFolder
		        },{
		        	name:'maxSize',
		            xtype: 'hidden',
		            fieldLabel: 'maxSize',
		            value:win.fileSize
		        },{
		            xtype: 'fileuploadfield',
		            emptyText: '选择一个附件',
		            fieldLabel: '附件',
		            name: 'file',
		            buttonText: ' ',
		            buttonCfg: {
		                iconCls: 'upload-icon'
		            }
		        }],
		        buttons: [{
		            text: '保存',
		            handler: function(){
		                if(fp.getForm().isValid()){
			                fp.getForm().submit({
			                    url: appConfig.baseUrl + '/com.jsjn.platform.file.FileUploader.do?method=upLoadFile',
			                    waitMsg: '正在上传附件.........',
			                    success: function(fp, o){
			                        win.afterUpload(o.result);
			                    },
			                    failure: function(fp, o) {
									msg("上传失败",o.result.msg);
			                    }
			                });
		                }
		            }
		        },{
		            text: '撤销',
		            handler: function(){
		                fp.getForm().reset ();
		                fp.getForm().findField("path").setValue(win.fileFolder);
						fp.getForm().findField("maxSize").setValue(win.fileSize);
		            }
		        }]
		    });
		this.items=[ fp]; 
		this.panel =  fp;
	}
});
