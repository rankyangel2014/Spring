cordova.define("com.jsjn.cordova.hanvonOCR.HanvonOCR", function(require, exports, module) { var exec = require('cordova/exec');

var hanvonOCR = {
		scanID:function(success, fail, param) {
        exec(success, fail, "HanvonOCR", "scanID", [param]);
    },
    scanVC:function(success, fail, param) {
        exec(success, fail, "HanvonOCR", "scanVC", [param]);
    },
    setKey:function(success, fail, param) {
        exec(success, fail, "HanvonOCR", "setKey", [param]);
    },
};

module.exports = hanvonOCR;

});
