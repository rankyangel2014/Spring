cordova.define("com.jsjn.cordova.download.Download", function(require, exports, module) { var exec = require('cordova/exec');

var download = {
	download:function(success, fail, param) {
        exec(success, fail, "Download", "download", [param]);
    },
    getVersion:function() {
    	exec(function(msg){alert(msg.version);}, null, "Download", "getVersion", []);
    },
    gen:function(success) {
    	exec(success, null, "Download", "gen", []);
    },
    getBasePath:function(success) {
    	exec(function(msg){ 
    			success(msg.path);
    		}, null, "Download", "getBasePath", []);
    }
};

module.exports = download;

});
