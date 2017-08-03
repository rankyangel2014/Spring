/**	
 * 提供客户查询部分的后台交互服务
 */

(function () {
'use strict';
var rspRelations='{"success":true,"errMsg":"交易执行成功","total":2,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":",","crtDate":"","crtOper":"","custName":"北京","custNo":"376416","custRelationList":[],"custType":"","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"","linkCustNo":"621087","linkCustType":"","linkRecId":"","linkStatus":"","linkType":"25","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"110101198212014839","paperType":"0","phoneNo":"1233333333","recId":46745926,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":",","crtDate":"","crtOper":"","custName":"上海","custNo":"376416","custRelationList":[],"custType":"","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"","linkCustNo":"621087","linkCustType":"","linkRecId":"","linkStatus":"","linkType":"25","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"110101198212014839","paperType":"0","phoneNo":"","recId":46745926,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""}]}';
var rspShares='{"success":true,"errMsg":"交易执行成功","total":1,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"北京","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":10000,"investPct":50,"isQuery":"","liceNo":"X","linkCustName":"","linkCustNo":"621087","linkCustType":"","linkRecId":"","linkStatus":"","linkType":"24","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"110101198212014839","paperType":"0","phoneNo":"123312333","recId":46745928,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""}]}';
var rspCustRelationInfos='{"success":true,"errMsg":"交易执行成功","total":8,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"江苏嘉宝再生资源科技有限公司","linkCustNo":"374165","linkCustType":"1","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"68161161-5","paperType":"11","phoneNo":"","recId":28323949,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"李志玲","linkCustNo":"374355","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"16","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"120225197701266029","paperType":"0","phoneNo":"请填写联系电话","recId":28324348,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"苏州阳新餐具有限公司","linkCustNo":"385157","linkCustType":"1","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"75968631-9","paperType":"11","phoneNo":"","recId":28323948,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"北京","linkCustNo":"621087","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"24","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"110101198212014839","paperType":"0","phoneNo":"","recId":46745928,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":10000,"sharePct":50,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"黄莹芝","custNo":"376416","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"北京","linkCustNo":"621087","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"25","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"110101198212014839","paperType":"0","phoneNo":"","recId":46745926,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"陈继法","custNo":"384537","custRelationList":[],"custType":"0","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"黄莹芝","linkCustNo":"376416","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"16","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"370826195203165133","paperType":"0","phoneNo":"","recId":31128471,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"常熟市中发建材有限公司","custNo":"384575","custRelationList":[],"custType":"1","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"黄莹芝","linkCustNo":"376416","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"72800520-X","paperType":"11","phoneNo":"","recId":28324419,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","addressInfoList":[],"contact":"","crtDate":"","crtOper":"","custName":"常熟联嘉实业有限公司","custNo":"386223","custRelationList":[],"custType":"1","defFlag":"","deleteList":[],"flag":"","investAmt":0,"investPct":0,"isQuery":"","liceNo":"","linkCustName":"黄莹芝","linkCustNo":"376416","linkCustType":"0","linkRecId":"","linkStatus":"0","linkType":"17","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"79384579-0","paperType":"11","phoneNo":"","recId":28324400,"remark":"","resultList":[],"sOwnedClient":0,"shareAmt":0,"sharePct":0,"useCurOrgNo":true,"userId":""}]}';
var rspAssignHistoryInfos='{"success":true,"errMsg":"交易执行成功","total":2,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","afCustManagerName":"姚静","afCustManagerNo":"J3205810010021","asgnDate":"20150731","asgnDateBegin":"","asgnDateEnd":"","bfCustManagerName":"金浩达","bfCustManagerNo":"J3205810010033","crtDateBegin":"","crtDateEnd":"","custAssignFlowList":[],"custManagerNo":"","custName":"黄莹芝","custNo":"376416","custType":"0","flowNo":"","noRecNotice":false,"operNo":"张建涵","optFlagInter":"","orgNo":"","remark":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","afCustManagerName":"姚静","afCustManagerNo":"J3205810010021","asgnDate":"20150731","asgnDateBegin":"","asgnDateEnd":"","bfCustManagerName":"金浩达","bfCustManagerNo":"J3205810010033","crtDateBegin":"","crtDateEnd":"","custAssignFlowList":[],"custManagerNo":"","custName":"黄莹芝","custNo":"376416","custType":"0","flowNo":"","noRecNotice":false,"operNo":"张建涵","optFlagInter":"","orgNo":"","remark":"","useCurOrgNo":true,"userId":""}]}';
var rspPB='{"success":true,"errMsg":"交易执行成功","rspCode":"000000","data":{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","account":"","accountName":"","adTitle":"","adTypeId":"","agricultureType":"1","bankAddr":"","bankCd":"","birthday":"1974-06-30","companyType":"","contact":"13813913912,仙桥永安居委内洋1930线西18号","crtDate":"","crtOper":"","custAddr":"","custClass":"0","custManagerName":"","custManagerNo":"","custName":"黄莹芝","custNo":"376416","custType":"0","deleteList":[],"domain":"","grade":"","grntFlag":"","inTrade":"","industrySort":"","investAmt":0,"investPct":0,"isAutoBlackList":"","isBlack":"","liceNo":"","linkCustNo":"","linkType":"","loanFlag":"","loiFlag":"","marryStatus":"10","modifyDate":"","modifyOper":"","noRecNotice":false,"operate":"","optFlagInter":"","orgNo":"","orgRelCustFlg":"","paperNo":"440509197406304820","paperType":"0","phoneNo":"","recId":0,"referrer":"","remark":"","resultList":[],"scienceType":"","sex":"F","typeName":"","useCurOrgNo":true,"userId":""}}';
var rspCustEvent='{"success":true,"errMsg":"交易执行成功","total":13,"root":[{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150428","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"尊敬的张俊，您为常熟市招商城商务中心有限公司办理的贷款3205810012014001031（贷款本金：3000000.00）在2015-04-21已逾期7天，逾期金额：3040000.00，特此提醒，请在系统相关菜单中查询贷款详情。     [江苏金农]","eventId":"28884281","eventResult":"","eventStatus":"0","eventTitle":"逾期贷款提醒-常熟市招商城商务中心有限公司-3205810012014001031","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150513","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"尊敬的姚静，您为常熟市招商城商务中心有限公司办理的贷款常康农贷借字2015第082号（贷款本金：3000000.00）将在7日后（即 2015-05-20）到期，将到期金额：26250.00，特此提醒，请在系统相关菜单中查询贷款详情。","eventId":"30291998","eventResult":"","eventStatus":"0","eventTitle":"将到期贷款预警提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150527","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"尊敬的姚静，您为常熟市招商城商务中心有限公司办理的贷款常康农贷借字2015第082号（贷款本金：3000000.00）在2015-05-20已逾期7天，逾期金额：26250.00，特此提醒，请在系统相关菜单中查询贷款详情。","eventId":"31597496","eventResult":"","eventStatus":"0","eventTitle":"逾期贷款提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150613","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"尊敬的姚静，您为常熟市招商城商务中心有限公司办理的贷款常康农贷借字2015第082号（贷款本金：3000000.00）将在7日后（即 2015-06-20）到期，将到期金额：38750.00，特此提醒，请在系统相关菜单中查询贷款详情。","eventId":"33154150","eventResult":"","eventStatus":"0","eventTitle":"将到期贷款预警提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150627","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"尊敬的姚静，您为常熟市招商城商务中心有限公司办理的贷款常康农贷借字2015第082号（贷款本金：3000000.00）在2015-06-20已逾期7天，逾期金额：38750.00，特此提醒，请在系统相关菜单中查询贷款详情。","eventId":"34455721","eventResult":"","eventStatus":"0","eventTitle":"逾期贷款提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150713","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"【常熟市招商城商务中心有限公司】的贷款【常康农贷借字2015第082号】（本金：【3000000.00】）将在【7】日后（即 【2015-07-20】）到期，将到期金额：【37500.00】，特此提醒，请在系统相关菜单中查询贷款详情。    [江苏金农]","eventId":"35929673","eventResult":"","eventStatus":"0","eventTitle":"将到期贷款预警提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150727","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"【常熟市招商城商务中心有限公司】的贷款【常康农贷借字2015第082号】（本金：【3000000.00】）在【2015-07-20】已逾期【7】天，逾期金额：【37500.00】，特此提醒，请在系统相关菜单中查询贷款详情。     [江苏金农]","eventId":"37217969","eventResult":"","eventStatus":"0","eventTitle":"逾期贷款提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150813","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"【常熟市招商城商务中心有限公司】的贷款【常康农贷借字2015第082号】（本金：【3000000.00】）将在【7】日后（即 【2015-08-20】）到期，将到期金额：【38750.00】，特此提醒，请在系统相关菜单中查询贷款详情。    [江苏金农]","eventId":"38842066","eventResult":"","eventStatus":"0","eventTitle":"将到期贷款预警提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150827","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"【常熟市招商城商务中心有限公司】的贷款【常康农贷借字2015第082号】（本金：【3000000.00】）在【2015-08-20】已逾期【7】天，逾期金额：【38750.00】，特此提醒，请在系统相关菜单中查询贷款详情。     [江苏金农]","eventId":"40187561","eventResult":"","eventStatus":"0","eventTitle":"逾期贷款提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""},{"_SQL_CODE":0,"_areaId":"","_fileName":"","_id":0,"_insttuId":"","_isUnLoad":"","_pageLimit":0,"_pageStart":0,"_rspCode":"","_rspMsg":"","_sqlListName":"","_sqlTxt":"","_total":0,"_transCode":"","_userId":"","_uuid":"","alertEndDate":"","alertEndTime":"","alertMobile":"","alertStatus":"","alertStrDate":"20150913","alertStrTime":"08:00:00","alertType":"1","crtDate":"","crtDateBegin":"","crtDateEnd":"","crtOper":"","custEventInfoList":[],"custManagerNo":"J3205810010021","custName":"常熟市招商城商务中心有限公司","custNo":"374378","custNoNew":"","custNoOld":"","custType":"1","eventDes":"【常熟市招商城商务中心有限公司】的贷款【常康农贷借字2015第082号】（本金：【3000000.00】）将在【7】日后（即 【2015-09-20】）到期，将到期金额：【38750.00】，特此提醒，请在系统相关菜单中查询贷款详情。    [江苏金农]","eventId":"41813884","eventResult":"","eventStatus":"0","eventTitle":"将到期贷款预警提醒-常熟市招商城商务中心有限公司-常康农贷借字2015第082号","forwardTime":"0m","modifyDate":"","modifyOper":"","noRecNotice":false,"nullifyEventList":[],"operate":"","optFlagInter":"","orgNo":"","smsModelNo":"","sysAlertModelNo":"","useCurOrgNo":true,"userId":""}]}';

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
    .module('custOtherList')
    .factory('custOtherSer',
        ['jnHttp', 'jnUser', 'jnForm','$q',
        function (jnHttp, jnUser, jnForm,$q) {
            return {
                readList: function (params) {
                //联系人
                    if(params.actionFlag==='relations'){
                    	params.userId = jnUser.userId;
                    	return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=QRY103', params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                    }
                    //合伙人
                    if(params.actionFlag==='shares'){
                    	params.userId = jnUser.userId;
                    	return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=QRY104', params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                    }
                    //客户关系列表
                    if(params.actionFlag==='custRelationInfos'){
                    	params.userId = jnUser.userId;
                    	return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=QRY253', params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                    }
                  
                    //客户事件列表
                    if(params.actionFlag==='custEventInfos'){
                    	params.userId = jnUser.userId;
                    	return jnHttp.post(
                        '/mlsp/router/rest.do?_transCode=CIM168', params)
                        .then(function (rsp) {
                            return {
                                items: rsp.root,
                                total: rsp.total,
                            };
                        });
                    }
                    //分配历史
                    if(params.actionFlag==='assignHistoryInfos'){
                    	params.userId = jnUser.userId;
                    	params.custType = "1";
	                    return jnHttp.post(
	                        '/mlsp/router/rest.do?_transCode=CIM170', params)
	                        .then(function (rsp) {
	                            return {
	                                items: rsp.root,
	                                total: rsp.total,
	                            };
	                      });
                    }
                },
                //获取姓名
                getName : function(self) {
                	if(self.myForm.paperNo.$modelValue==""||self.myForm.paperNo.$modelValue==null){
                		self.nameDisable=false;
                		self.myForm.custName.$viewValue = "";
                		self.myForm.custName.$commitViewValue();
                		self.myForm.custName.$render();
                		self.myForm.phoneNo.$viewValue = "";
                		self.myForm.phoneNo.$commitViewValue();
                		self.myForm.phoneNo.$render();
                		return;
                	}
                	return jnHttp
                    .post(
                            '/mlsp/router/rest.do?_transCode=QRY101',
                            {
                            	paperNo:self.myForm.paperNo.$modelValue
                            })
                            .then(
                                    function(rsp) {
                                    	if(rsp.root.length!=1){
                                    		self.nameDisable=false;
                                    	}else{
                                    		self.nameDisable=true;
                                    		self.myForm.custName.$viewValue = rsp.root[0].custName;
                                    		self.myForm.custName.$commitViewValue();
                                    		self.myForm.custName.$render();
                                    		self.myForm.phoneNo.$viewValue = rsp.root[0].phoneNo;
                                    		self.myForm.phoneNo.$commitViewValue();
                                    		self.myForm.phoneNo.$render();
                                    	}
                                    });
                },
                //合伙人信息新增
                addPartnerInfo : function(params) {
                	params.userId = jnUser.userId;
                    return jnHttp
                    .post(
                            '/mlsp/router/rest.do?_transCode=CIM113',
                            params)
                            .then(
                                    function(rsp) {
                                        return rsp;
                                    });
                },
                //合伙人信息修改
                editPartnerInfo : function(params) {
                	params.userId = jnUser.userId;
                	params.orgNo = jnUser.userId;
                    return jnHttp
                    .post(
                            '/mlsp/router/rest.do?_transCode=CIM113',
                            params)
                            .then(
                                    function(rsp) {
                                        return rsp;
                                    });
                },
                rmSHA: function (item) {
                	var obj={
                			custNo:item.custNo,
                			linkCustNo:item.linkCustNo,
                			linkType:item.linkType,
                			custName:item.custName,
                			paperType:item.paperType,
                			paperNo:item.paperNo,
                			investAmt:item.investAmt,
                			investPct:item.investPct,
                			phoneNo:item.phoneNo,
                			recId:item.recId,
                			custType : "1"
                			};
                	var array=[];
                	array.push(obj);
                	var params = {
                			userId : jnUser.userId,
                			custNo:item.custNo,
                			deleteListString:angular.toJson(array),
                			orgNo:jnUser.insttuId,
                			_insttuId:jnUser.insttuId
                			
                    };
                    
                    return jnHttp .post(
                    		'/mlsp/router/rest.do?_transCode=CIM112', params)
                            .then(function(rsp) {
                                return rsp;
                            });
                },
            };
        }]
    );

})();


