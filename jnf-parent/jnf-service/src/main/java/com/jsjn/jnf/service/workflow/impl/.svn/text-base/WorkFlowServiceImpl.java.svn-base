package com.jsjn.jnf.service.workflow.impl;

import org.codehaus.xfire.client.XFireProxyFactory;
import org.codehaus.xfire.service.Service;
import org.codehaus.xfire.service.binding.ObjectServiceFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.bean.dto.withhold.SignDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.bean.dto.workflow.WorkflowDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.linkq.LinkQHandler;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.service.assist.ChannelBankService;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.sign.SignService;
import com.jsjn.jnf.service.withhold.SignTempInfoService;
import com.jsjn.jnf.service.workflow.WorkFlowService;
import com.jsjn.panda.setup.ParseSpring;
import com.jsjn.pubsys.webservice.IService;

@org.springframework.stereotype.Service("workFlowService")
public class WorkFlowServiceImpl implements WorkFlowService {
	/**
	 * 日志库对象
	 */
	private final static Logger logger = LoggerFactory.getLogger(WorkFlowServiceImpl.class);
	/**
	 * 数据库对象
	 */
	private static DictService dictService = (DictService) ParseSpring.context.getBean("dictServiceImpl");
	private static SignTempInfoService signTempInfoService = (SignTempInfoService) ParseSpring.context.getBean("signTempInfoService");
	private static SignService signService = (SignService) ParseSpring.context.getBean("signService");
	private static ChannelBankService channelBankService = (ChannelBankService) ParseSpring.context.getBean("channelBankServiceImpl");
	private Service serviceModel = new ObjectServiceFactory().create(IService.class);

	/**
	 * 新增待办代扣签约
	 * 
	 * @param workflowDto
	 * @return
	 * @throws Exception
	 */
	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public String addApprove(SignTempInfoDto stid, WorkflowDto workflowDto) throws Exception {

		//1,验证添加临时表
		stid = signTempInfoService.saveSignTempInfo(stid);
		String retCode = stid.getResCode();
		String resMsg = stid.getResMsg();
		if (!StringUtils.equals(ReturnCode.SUCCESS, retCode)) {
			logger.error(resMsg);
			throw new BussinessException(ReturnCode.FAIL, resMsg);
		}
		//2，发送待办
		String signRecordId = stid.getSignRecordId();
		String params = signRecordId + "|" + workflowDto.getUserId() + "|" + workflowDto.getInsttuId() + "|"
				+ workflowDto.getInsttuTy();
		workflowDto.setParams(params);
		workflowDto.setUserName(stid.getCustName());
		workflowDto.setPs("代扣签约");
		workflowDto.setChannel(stid.getChannel());
		workflowDto.setLoanNo(stid.getLoanNo());
		logger.info("==========新增待办==========");
		logger.info("==========传入参数：" + workflowDto + "==========");

		String result = null;
		IService service = null;
		String COMMON_WS_URL = dictService.findByType("COMMON_WS_URL");//公共管理平台WebService地址
		logger.info("公共管理平台webserivice地址：" + COMMON_WS_URL);
		service = (IService) new XFireProxyFactory().create(serviceModel, COMMON_WS_URL);
		result = service.submit(assembleParams(workflowDto).toJSONString());
		logger.info("公共管理平台webserivice结果返回：" + result);
		JSONObject res = JSONObject.parseObject(result);
		String resCode = res.getString("rspCode");
		if (!resCode.equals(Global.RES_SUCCESS)) {
			logger.error("公共管理平台新增审批失败！");
			throw new BussinessException(Global.RES_FAILTURE, "公共管理平台新增审批失败！");
		}

		//3，更新临时表流程ID
		stid.setFlowId((String) res.getString("taskinstanceId"));
		stid = signTempInfoService.updateTaskinstanceId(stid);
		if (!StringUtils.equals(ReturnCode.SUCCESS, stid.getResCode())) {
			logger.error(stid.getResMsg());
			throw new BussinessException(ReturnCode.FAIL, stid.getResMsg());
		}

		//4，同步签约状态，2-等待审批
		syncState(stid, "2");
		logger.info("==========返回结果：" + result + "==========");
		return res.toJSONString();
	}

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public String submitApprove(WorkflowDto workflowDto) throws Exception {
		logger.info("==========提交审批==========");
		logger.info("==========传入参数：" + workflowDto + "==========");
		String result = null;
		IService service = null;
		JSONObject json = new JSONObject();
		json.put("operation", workflowDto.getOperation());// (0-同意，1-拒绝，2-退回)
		json.put("userId", workflowDto.getUserId());// 用户ID
		json.put("taskinstanceId", workflowDto.getTaskinstanceId());// 流程实例ID
		json.put("params", workflowDto.getParams());// 参数
		json.put("idea", workflowDto.getIdea());// 审批意见
		json.put("flowType", "99");// 审批类型
		String COMMON_WS_URL = dictService.findByType("COMMON_WS_URL");//公共管理平台WebService地址
		logger.info("公共管理平台webserivice地址：" + COMMON_WS_URL);
		service = (IService) new XFireProxyFactory().create(serviceModel, COMMON_WS_URL);
		result = service.exam(json.toJSONString());
		logger.info("==========返回结果：" + result + "==========");
		JSONObject res = JSONObject.parseObject(result);
		String resCode = (String) res.get("rspCode");
		if (resCode != null && resCode.equals(Global.RES_FAILTURE)) {
			return result;
		}

		SignTempInfoDto tempDto = signTempInfoService.querySignTempInfoById(workflowDto.getSignRecordId());
		tempDto.setState(workflowDto.getState());
		result = signService.sign(tempDto);
		return result;
	}

	public JSONObject assembleParams(WorkflowDto workflowDto) {
		String JNF_WITHHOLD_MODID = dictService.findByType("JNF_WITHHOLD_MODID");
		logger.info("jnf-withhold模块ID：" + JNF_WITHHOLD_MODID);
		JSONObject json = new JSONObject();
		JSONObject wfvariable = new JSONObject();
		wfvariable.put("custNO", workflowDto.getCustNo());// 客户号
		wfvariable.put("bankCd", workflowDto.getInsttuId());// 机构号
		wfvariable.put("startUser", workflowDto.getUserId());// 审批发起人id
		wfvariable.put("ps", workflowDto.getPs());// 备注
		wfvariable.put("params", workflowDto.getParams());// 业务参数
		wfvariable.put("custType", "1");// 客户类型
		wfvariable.put("flowType", "99");// 流程类型
		wfvariable.put("modId", JNF_WITHHOLD_MODID);// 模块id(4为数字)
		wfvariable.put("examAmt", "0");// 金额
		wfvariable.put("allowBatchExam", "1");// 不允许批量审批
		wfvariable.put("commonExam", "1");// 0表示使用公共管理平台的审批页面， 1表示使用自定义的审批页面

		JSONObject wfinstance = new JSONObject();
		wfinstance.put("userName", workflowDto.getUserName());// 用户名称
		wfinstance.put("actorId", "");// (非短信不要填)
		wfinstance.put("insttuTy", workflowDto.getInsttuTy());// 机构类型
		wfinstance.put("insttuId", workflowDto.getInsttuId());// 机构号
		wfinstance.put("flowType", "99");// 流程类型
		wfinstance.put("checkType", "1");// 0(个人审批) or 1(岗位审批)
		wfinstance.put("userNO", "");// 客户号
		wfinstance.put("swimlan", "700");// 岗位ID（岗位审批）
		wfinstance.put("smFlag", "1");// 非短信
		wfinstance.put("oActorId", "");// 同actorId(非短信不要填)
		wfinstance.put("smsendActorId", "");// 短信发送者id(非短信不要填)
		wfinstance.put("step", "1");// 1(第几步，从1开始)
		wfinstance.put("deptId", "");// 部门ID

		json.put("wfvariable", wfvariable);
		json.put("wfinstance", wfinstance);
		return json;
	}

	/**
	 * 调用Linkq接口同步更新微贷贷款签约状态
	 * 
	 * @param tempDto
	 * @param state
	 *            2-等待审批 3-已签约，4-已解约 ，5-拒绝
	 * @throws BussinessException
	 */
	public void syncState(SignTempInfoDto tempDto, String state) throws BussinessException {
		String LINKQ_USERID = dictService.findByType("LINKQ_USERID");
		String LINKQ_INSTTUID = dictService.findByType("LINKQ_INSTTUID");

		ChannelBankDto bankInfo = channelBankService.queryBankInfo(tempDto.getChannel(), tempDto.getCardBankCode());

		String isBatchPay = tempDto.getIsBatchPay();
		String PayStartDay = tempDto.getPayStartDay();

		SignDto signDto = new SignDto();
		signDto.set_transCode("MNG110");
		signDto.set_userId(LINKQ_USERID);
		signDto.set_insttuId(LINKQ_INSTTUID);
		//签约用户名
		signDto.setCustName(tempDto.getCustName());
		//签约银行卡号
		signDto.setBankCardNo(tempDto.getCardNo());
		//手机号
		signDto.setMobile(tempDto.getMobile());
		//银行名称
		signDto.setBankName(bankInfo.getBankName());

		signDto.setOrgNo(tempDto.getInsttuId());
		signDto.setLoanNo(tempDto.getLoanNo());
		signDto.setSignStatus(state);
		signDto.setCardSignNo(StringUtils.EMPTY);//签约协议号 (待审批没有签约协议号)
		signDto.setPayStartDay(StringUtils.defaultIfBlank(PayStartDay, "0"));//扣款启动日
		signDto.setIsBatchPay(isBatchPay);
		signDto.setPayChannel(tempDto.getChannel());
		net.sf.json.JSONObject res = LinkQHandler.getJsonNoLogin(signDto);
		if (!StringUtils.equals("true", res.getString("success"))) {
			logger.error("LinkQ:同步签约状态失败," + res.getString("errMsg"));
			throw new BussinessException(ReturnCode.FAIL, "LinkQ:同步签约状态失败," + res.getString("errMsg"));
		}
	}
}
