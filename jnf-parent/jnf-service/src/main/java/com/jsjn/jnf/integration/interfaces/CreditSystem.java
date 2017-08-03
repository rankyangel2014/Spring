package com.jsjn.jnf.integration.interfaces;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;
import com.jsjn.jnf.bean.dto.assist.InterfaceXmlDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.Encodes;
import com.jsjn.jnf.common.utils.network.WebServiceUtil;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.service.assist.InterfaceXmlService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.panda.setup.ParseSpring;

/**
 * 征信系统提供的接口
 * 
 * @author xiekaixiang
 * 
 */
public class CreditSystem {

	private final static Logger logger = Logger.getLogger(CreditSystem.class);

	private static DictDao dao = (DictDao) ParseSpring.context.getBean("dictDao");

	private static InterfaceXmlService ixs = (InterfaceXmlService) ParseSpring.context.getBean("interfaceXmlServiceImpl");

	/**
	 * 银行卡四元素实名认证
	 * 
	 * @param idNo
	 *            身份证信息
	 * @param name
	 *            姓名
	 * @param accountNo
	 *            银行卡号
	 * @param preMobile
	 *            银行预留手机号码
	 * @param orgNo
	 *            机构码
	 * @return
	 * @throws Exception
	 */
	public static SocialCreditRspDto bankCardValidate(String idNo, String name, String accountNo, String preMobile,
			String orgNo, String mid) throws Exception {
		//TODO 要改回来
		String inputXml = " method:bankCardValidate-->input :" + "[idNo=" + idNo + ",name=" + name + ",accountNo="
				+ accountNo + ",preMobile=" + preMobile + ",orgNo=" + orgNo + "]";
		// TODO 把进入的参数和输出的参数都要打印到日志 info级别
		logger.info(inputXml);
		SocialCreditRspDto requestDto = new SocialCreditRspDto();
		String returnMsg = null;
		String wsUrl = dao.findByType("WS_URL_CREDIT_SYSTEM");
		String userName = Cryptos.aesDecrypt(dao.findByType("CREDIT_SYSTEM_USER_NAME"));
		String password = Cryptos.aesDecrypt(dao.findByType("CREDIT_SYSTEM_PASSWORD"));
		/**
		 * 征信接口调整新增参数 默认为NULL的话就是借记卡,需设定账户类型可赋值为【1-借记卡 2-贷记卡】
		 */
		String cardType = "1";

		// 校验参数的合法性
		// TODO 这个换成ValidatorUtil.validpropertys
		if (StringUtils.isNotBlank(idNo) && StringUtils.isNotBlank(name) && StringUtils.isNotBlank(accountNo)
				&& StringUtils.isNotBlank(preMobile) && StringUtils.isNotBlank(orgNo)) {

			// 加密参数
			idNo = Encodes.encodeBase64(idNo.getBytes("UTF-8"));
			name = Encodes.encodeBase64(name.getBytes("UTF-8"));
			accountNo = Encodes.encodeBase64(accountNo.getBytes("UTF-8"));
			preMobile = Encodes.encodeBase64(preMobile.getBytes("UTF-8"));
			//默认由金农公司付费 ，解决征信系统扣费校验问题 
			String defaultOrgNo = "990000001";
			orgNo = Encodes.encodeBase64(defaultOrgNo.getBytes("UTF-8"));
			cardType = Encodes.encodeBase64(cardType.getBytes("UTF-8"));

			/**
			 * 记录发送请求报文
			 */
			String id = SequenceUtils.getInterfaceXmlSeq();
			InterfaceXmlDto inDto = buildInput(id, "四要素验证", Encodes.decodeBase64String(orgNo), inputXml, mid);
			boolean insertFlag = ixs.insertXml(inDto);
			if (!insertFlag) {
				throw new Exception("服务器繁忙，请稍后再试！");
			}

			// 调用webservice接口返回结果
			returnMsg = WebServiceUtil.invoke(wsUrl, userName, password, "qryBankCardBy4Element", new Object[] { idNo,
					name, accountNo, preMobile, orgNo, cardType });
			logger.info("获取征信返回银行卡四元素实名认证信息" + returnMsg);

			/**
			 * 记录收到返回报文
			 */
			JSONObject returnObject = JSONObject.parseObject(returnMsg);
			String state = "";
			String exception = "";
			String bflag = "";
			String reason = "";
			String feeFlag = "";

			if (StringUtils.equals("000000", returnObject.getString("returnCode"))) {
				state = "0";
				exception = "接口调用成功！";
				boolean valid = JSONObject.parseObject(returnObject.getString("returnMsg")).getBooleanValue("valid");
				if (valid) {
					bflag = "0";
					reason = returnObject.getString("returnMsg");
				} else {
					bflag = "1";
					reason = JSONObject.parseObject(returnObject.getString("returnMsg")).getString("message");
					if (StringUtils.equals(reason, "其它错误,api.reapal.com")) {
						reason = reason.replace("api.reapal.com", "请联系合作机构");
					}
					boolean tempFlag = ChkIsFee(reason);
					if (tempFlag) {
						feeFlag = "0"; //计费
					} else {
						feeFlag = "1"; //不计费
					}
				}

			} else {
				state = "1";
				exception = "接口调用失败！";
				feeFlag = "1";
			}
			InterfaceXmlDto outDto = buildOutput(id, returnMsg, state, exception, bflag, reason, feeFlag);
			boolean outFlag = ixs.updateXml(outDto);
			if (!outFlag) {
				throw new Exception("服务器繁忙，请稍后再试！");
			}

			// 组装返回的报文
			if (StringUtils.equals("000000", returnObject.getString("returnCode"))) {
				boolean valid = JSONObject.parseObject(returnObject.getString("returnMsg")).getBooleanValue("valid");
				requestDto.setValid(valid);
				requestDto.setReturnCode(returnObject.getString("returnCode"));
				/**
				 * valid = true;取returnMsg的值，valid = false;取message的值
				 */
				if (valid) {
					requestDto.setReturnMsg(returnObject.getString("returnMsg"));
				} else {
					requestDto.setReturnMsg(JSONObject.parseObject(returnObject.getString("returnMsg"))
							.getString("message"));
				}
			} else {
				requestDto.setValid(false);
				requestDto.setReturnMsg(returnObject.getString("returnMsg"));
				//					throw new Exception("服务器繁忙，请稍后再试！");
			}

		} else {
			// 组装返回的报文
			requestDto.setValid(false);
			requestDto.setReturnCode(ReturnCode.FAIL);
			requestDto.setReturnMsg("参数非法！");
		}

		logger.info("method:bankCardValidate-->output :" + requestDto);
		return requestDto;
	}

	/**
	 * 身份证信息校验
	 * 
	 * @param idNo
	 *            身份证号码
	 * @param name
	 *            姓名
	 * @param orgNo
	 *            机构码
	 * @return
	 * @throws Exception
	 */
	public static SocialCreditRspDto idValidate(String idNo, String name, String orgNo, String mid) throws Exception {
		//TODO 要改回来
		String inputXml = "method:idValidate-->input :" + "[idNo=" + idNo + ",name=" + name + ",orgNo=" + orgNo + "]";
		logger.info(inputXml);
		String returnMsg = "";
		SocialCreditRspDto requestDto = new SocialCreditRspDto();
		String wsUrl = dao.findByType("WS_URL_CREDIT_SYSTEM");
		String userName = Cryptos.aesDecrypt(dao.findByType("CREDIT_SYSTEM_USER_NAME"));
		String password = Cryptos.aesDecrypt(dao.findByType("CREDIT_SYSTEM_PASSWORD"));
		/**
		 * 征信系统接口调整新增参数 默认为NULL的话就是无照片返回，需返回照片isPhoto赋值为["true"]
		 */
		String isPhoto = "false";

		// 校验参数的合法性
		if (StringUtils.isNotBlank(idNo) && StringUtils.isNotBlank(name) && StringUtils.isNotBlank(orgNo)) {
			// 加密参数
			idNo = Encodes.encodeBase64(idNo.getBytes("UTF-8"));
			name = Encodes.encodeBase64(name.getBytes("UTF-8"));
			//解决征信系统扣费校验问题  begin
			//			orgNo 		= Encodes.encodeBase64(orgNo.getBytes("UTF-8"));
			String defaultOrgNo = "990000001";
			orgNo = Encodes.encodeBase64(defaultOrgNo.getBytes("UTF-8"));
			//解决征信系统扣费校验问题  end
			isPhoto = Encodes.encodeBase64(isPhoto.getBytes("UTF-8"));

			/**
			 * 记录请求报文
			 */
			String id = SequenceUtils.getInterfaceXmlSeq();
			InterfaceXmlDto inDto = buildInput(id, "身份证鉴权", orgNo, inputXml, mid);
			boolean insertFlag = ixs.insertXml(inDto);
			if (!insertFlag) {
				throw new Exception("服务器繁忙，请稍后再试！");
			}

			// 调用webservice接口返回结果
			returnMsg = WebServiceUtil.invoke(wsUrl, userName, password, "idInfoVerif", new Object[] { idNo, name,
					orgNo, isPhoto });
			logger.info("获取征信返回身份证信息校验信息" + returnMsg);

			/**
			 * 记录返回报文
			 */
			JSONObject returnObject = JSONObject.parseObject(returnMsg);

			String state = "";
			String exception = "";
			String bflag = "";
			String reason = "";
			String feeFlag = "";

			if (StringUtils.equals("000000", returnObject.getString("returnCode"))) {
				state = "0";
				exception = "接口调用成功！";
				boolean valid = JSONObject.parseObject(returnObject.getString("returnMsg")).getBooleanValue("valid");
				if (valid) {
					bflag = "0";
					reason = returnObject.getString("returnMsg");
				} else {
					bflag = "1";
					reason = JSONObject.parseObject(returnObject.getString("returnMsg")).getString("message");
				}

			} else {
				state = "1";
				exception = "接口调用失败！";
			}
			InterfaceXmlDto outDto = buildOutput(idNo, returnMsg, state, exception, bflag, reason, feeFlag);
			boolean outFlag = ixs.updateXml(outDto);
			if (!outFlag) {
				throw new Exception("服务器繁忙，请稍后再试！");
			}

			// 组装返回的报文
			if (StringUtils.equals("000000", returnObject.getString("returnCode"))) {
				requestDto.setValid(JSONObject.parseObject(returnObject.getString("returnMsg"))
						.getBooleanValue("valid"));
				requestDto.setReturnCode(returnObject.getString("returnCode"));
				requestDto.setReturnMsg(returnObject.getString("returnMsg"));
			} else {
				throw new Exception("服务器繁忙，请稍后再试！");
			}

		} else {
			// 组装返回的报文
			requestDto.setValid(false);
			requestDto.setReturnCode(ReturnCode.FAIL);
			requestDto.setReturnMsg("参数非法！");
		}

		logger.info("method:idValidate-->output :" + requestDto);
		return requestDto;
	}

	/**
	 * 构造接口请求数据Dto
	 * 
	 * @param id
	 * @param method
	 * @param orgNo
	 * @param inputXml
	 * @return
	 */
	private static InterfaceXmlDto buildInput(String id, String method, String orgNo, String inputXml, String mid) {
		InterfaceXmlDto input = new InterfaceXmlDto();
		input.setId(id);
		input.setMethod(method);
		input.setOrgNo(orgNo);
		input.setInputXml(inputXml);
		input.setMid(mid);
		return input;
	}

	/**
	 * 构造接口相应数据Dto
	 * 
	 * @param id
	 * @param outputXml
	 * @param state
	 * @param exception
	 * @param bflag
	 * @param reason
	 * @return
	 */
	private static InterfaceXmlDto buildOutput(String id, String outputXml, String state, String exception,
			String bflag, String reason, String feeFlag) {
		InterfaceXmlDto output = new InterfaceXmlDto();
		output.setId(id);
		output.setOutputXml(outputXml);
		output.setState(state);
		output.setException(exception);
		output.setBflag(bflag);
		output.setReason(reason);
		output.setFeeFlag(feeFlag);
		return output;
	}

	private static boolean ChkIsFee(String reason) {
		String result = "此卡号您已认证错误超过6次，请次日再试|银行卡未开通认证支付，请到银联开通此功能|商户不支持该卡交易|"
				+ "系统异常,请联系合作机构|签约失败，请重新签约或更换其他银行卡签约|其它错误,api.reapal.com";
		String[] messages = result.split("\\|");
		int a = messages.length;
		for (int i = 0; i < a; i++) {
			if (StringUtils.equals(reason, messages[i])) {
				return true;
			}
		}
		return false;
	}

}
