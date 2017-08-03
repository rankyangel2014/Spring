// BEGIN OF IMPORTJS BY JSJN
Ext.namespace('com.jsjn.jnf.withhold.sign.query');
com.jsjn.jnf.withhold.sign.query.LoadWithholdInfo = function(config) {
	if (typeof(com.jsjn.jnf.withhold.sign.query.LoadWithholdInfo.PANEL) == 'undefined') {
		Ext.applyIf(this, config);
		this.initUIComponents();
		com.jsjn.jnf.withhold.sign.query.LoadWithholdInfo.superclass.constructor
				.call(this);
		appframe
				.loadScripts(appframe.importJses['com.jsjn.jnf.withhold.sign.query.LoadWithholdInfo']);
		com.jsjn.jnf.withhold.sign.query.LoadWithholdInfo.PANEL = this;
	}
	return com.jsjn.jnf.withhold.sign.query.LoadWithholdInfo.PANEL;
};
Ext.extend(com.jsjn.jnf.withhold.sign.query.LoadWithholdInfo, Ext.Panel, {
	initUIComponents : function() {
		// BEGIN OF CODE GENERATION PARTS, DON'T DELETE CODE BELOW
		this.panel1047400907 = new Ext.Panel({
            id : "LoadWithholdInfo",
            layoutConfig : {},
            height : "100%",
            region : "center",
            layout : "fit",
            autoLoad: {
            	url:"com/jsjn/jnf/withhold/sign/query/form/form_load.html",
//            	url:"com/jsjn/jnf/withhold/sign/query/ApproveWithHoldInfo.view",
            	scripts:true,
            	callback:function(){
                	querySignTempInfoById();
                	initFrontUploer();
                	initBackUploder();
                	initOtherUploder();
                }
            }
        });
		Ext.apply(this, {
            layoutConfig : {},
            items : [this.panel1047400907],
            layout : "border",
            autoScroll : true,
        });
		// END OF CODE GENERATION PARTS, DON'T DELETE CODE ABOVE
	}
});
// BEGING OF CODE  MAIN FOR JAVA METHOD
