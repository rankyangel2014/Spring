/**	
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';
var rspFaRenInfo='{"success":true,"data":{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"000000","_rspMsg":"交易执行成功","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","contact":"13812818948,杭州云桂花园","frCustName":"周江平","frCustNo":"374378","frPaperNo":"330725196802163514","frPaperType":"0","frPhone":"","noRecNotice":false,"optFlagInter":"","orgNo":"","resultList":[],"useCurOrgNo":true,"userId":""},"errMsg":"交易执行成功"}';
var rspCaiWuInfo='{"success":true,"data":{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"000000","_rspMsg":"交易执行成功","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","contact":"13213213212,详细地址不知道","cwCustName":"李志玲","cwCustNo":"374378","cwPaperNo":"120225197701266029","cwPaperType":"0","cwPhone":"13213213212","noRecNotice":false,"optFlagInter":"","orgNo":"","resultList":[],"useCurOrgNo":true,"userId":""},"errMsg":"交易执行成功"}';
var rspCustRelationInfos='{"success":true,"errMsg":"交易执行成功","total":8,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"江苏嘉宝再生资源科技有限公司","linkCustNo":"374165","linkCustType":"1","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"68161161-5","paperType":"11","phoneNo":"","recId":28323949,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"李志玲","linkCustNo":"374355","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"16","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"120225197701266029","paperType":"0","phoneNo":"请填写联系电话","recId":28324348,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"苏州阳新餐具有限公司","linkCustNo":"385157","linkCustType":"1","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"75968631-9","paperType":"11","phoneNo":"","recId":28323948,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"北京","linkCustNo":"621087","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"24","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"110101198212014839","paperType":"0","phoneNo":"","recId":46745928,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":10000,"sharePct":50,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"北京","linkCustNo":"621087","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"25","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"110101198212014839","paperType":"0","phoneNo":"","recId":46745926,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"陈继法","custNo":"384537","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"黄莹芝","linkCustNo":"376416","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"16","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"370826195203165133","paperType":"0","phoneNo":"","recId":31128471,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"常熟市中发建材有限公司","custNo":"384575","custRelationList":[],"custType":"1","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"黄莹芝","linkCustNo":"376416","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"72800520-X","paperType":"11","phoneNo":"","recId":28324419,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"常熟联嘉实业有限公司","custNo":"386223","custRelationList":[],"custType":"1","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"黄莹芝","linkCustNo":"376416","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"79384579-0","paperType":"11","phoneNo":"","recId":28324400,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""}]}';
var rspAssignHistoryInfos='{"success":true,"errMsg":"交易执行成功","total":2,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","afCustManagerName":"姚静","afCustManagerNo":"J3205810010021","asgnDate":"20150731","asgnDateBegin":"","asgnDateEnd":"","bfCustManagerName":"金浩达","bfCustManagerNo":"J3205810010033","crtDateBegin":"","crtDateEnd":"","custAssignFlowList":[],"custManagerNo":"","custName":"黄莹芝","custNo":"376416","custType":"0","flowNo":"","noRecNotice":false,"operNo":"张建涵","optFlagInter":"","orgNo":"","remark":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","afCustManagerName":"姚静","afCustManagerNo":"J3205810010021","asgnDate":"20150731","asgnDateBegin":"","asgnDateEnd":"","bfCustManagerName":"金浩达","bfCustManagerNo":"J3205810010033","crtDateBegin":"","crtDateEnd":"","custAssignFlowList":[],"custManagerNo":"","custName":"黄莹芝","custNo":"376416","custType":"0","flowNo":"","noRecNotice":false,"operNo":"张建涵","optFlagInter":"","orgNo":"","remark":"","useCurOrgNo":true,"userId":""}]}';
var rspPB='{"success":true,"errMsg":"交易执行成功","rspCode":"000000","data":{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","account":"","accountName":"","adTitle":"","adTypeId":"","agricultureType":"1","bankAddr":"","bankCd":"","birthday":"1974-06-30","companyType":"","contact":"13813913912,仙桥永安居委内洋1930线西18号","crtDate":"","crtOper":"","custAddr":"","custClass":"0","custManagerName":"","custManagerNo":"","custName":"黄莹芝","custNo":"376416","custType":"0","deleteList":[],"domain":"","grade":"","grntFlag":"","inTrade":"","industrySort":"","investAmt":0,"investPct":0,"isAutoBlackList":"","isBlack":"","liceNo":"","linkCustNo":"","linkType":"","loanFlag":"","loiFlag":"","marryStatus":"10","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"440509197406304820","paperType":"0","phoneNo":"","recId":0,"referrer":"","remark":"","resultList":[],"scienceType":"","sex":"F","typeName":"","useCurOrgNo":true,"userId":""}}';
var rspCustEvent='{"success":true,"errMsg":"交易执行成功","total":2,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150703","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"李志玲","custNo":"374355","custNoNew":"","custNoOld":"","custType":"1","eventDes":"尊敬的姚静，您为李志玲办理的贷款常康农贷个借字2015第111号（贷款本金：3000000.00）在2015-06-26已逾期7天，逾期金额：3026250.00，特此提醒，请在系统相关菜单中查询贷款详情。","eventId":"35032053","eventResult":"","eventStatus":"0","eventTitle":"逾期贷款提醒-李志玲-常康农贷个借字2015第111号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150619","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"李志玲","custNo":"374355","custNoNew":"","custNoOld":"","custType":"1","eventDes":"尊敬的姚静，您为李志玲办理的贷款常康农贷个借字2015第111号（贷款本金：3000000.00）将在7日后（即 2015-06-26）到期，将到期金额：3026250.00，特此提醒，请在系统相关菜单中查询贷款详情。","eventId":"33728022","eventResult":"","eventStatus":"0","eventTitle":"将到期贷款预警提醒-李志玲-常康农贷个借字2015第111号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""}]}';

function test($q,url,params,rsp){
    var t={
    		post:function(){
    			var deferred= $q.defer();
    			if(typeof rsp!="object") 
    			rsp=JSON.parse(rsp);
    			deferred.resolve(rsp);
    			var promise = deferred.promise;
    			return promise;
    		}
    };
    return t;

}

angular
    .module('entCustOtherList')
    .factory('entCustOtherSer',
        ['jnHttp', 'jnUser', 'jnForm','$q',
        function (jnHttp, jnUser, jnForm,$q) {
            return {
                readList: function (params) {
                    params.orgNo = jnUser.insttuId;
                    params.isUseCurOrgNo = 'true';

                    if (jnUser.hasStation('400')) {
                        params.custManagerNo = jnUser.userId;
                    }
                    
                    if(params.actionFlag==='custRelationInfos'){
                    	return  test($q, '/mlsp/router/rest.do?_transCode=QRY252', params,rspCustRelationInfos).post().then(
                    			function (rsp) {
                    				return {
                    					items: rsp.root,
                    					total: rsp.total,
                    				};
                    			}  
                    	);
                    }
                    if(params.actionFlag==='assignHistoryInfos'){
                    	return  test($q, '/mlsp/router/rest.do?_transCode=QRY252', params,rspAssignHistoryInfos).post().then(
                    			function (rsp) {
                    				return {
                    					items: rsp.root,
                    					total: rsp.total,
                    				};
                    			}  
                    	);
                    }
                    if(params.actionFlag==='custEventInfos'){
                    	return  test($q, '/mlsp/router/rest.do?_transCode=QRY252', params,rspCustEvent).post().then(
                    			function (rsp) {
                    				return {
                    					items: rsp.root,
                    					total: rsp.total,
                    				};
                    			}  
                    	);
                    }
                
                },
                
                qryDetail: function(params){
                	
                	  return  test($q, '/qryDetail', params,rspPB)
                	  			 .post();
                	
                }
                
                
            };
        }]
    );

})();


