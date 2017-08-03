package com.jsjn.jnf.service.sign.impl;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.SignDto;
import com.jsjn.jnf.bean.dto.withhold.SignInfoDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.bean.dto.withhold.UserThirdAccountDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.linkq.LinkQHandler;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.dao.member.MemberDao;
import com.jsjn.jnf.dao.withhold.SignInfoDao;
import com.jsjn.jnf.dao.withhold.SignTempInfoDao;
import com.jsjn.jnf.dao.withhold.UserThirdAccountDao;
import com.jsjn.jnf.integration.interfaces.SendMessage;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.sign.SignService;
import com.jsjn.panda.setup.ParseSpring;

@Service("signService")
public class SignServiceImpl implements SignService {
	private final static Logger logger = Logger.getLogger(SignServiceImpl.class);
	/**
	 * JNF_T2
	 */
	private MemberDao memberDao = (MemberDao) ParseSpring.context.getBean("memberDao");
	/**
	 * JNF_T20
	 */
	private SignTempInfoDao signTempInfoDao = (SignTempInfoDao) ParseSpring.context.getBean("signTempInfoDao");
	/**
	 * JNF_T21
	 */
	private UserThirdAccountDao userThirdAccountDao = (UserThirdAccountDao) ParseSpring.context.getBean("userThirdAccountDao");
	/**
	 * JNF_T22
	 */
	private SignInfoDao signInfoDao = (SignInfoDao) ParseSpring.context.getBean("signInfoDao");

	private static DictDao dictDao = (DictDao) ParseSpring.context.getBean("dictDao");

	/**
	 * 签约和重新签约流程 提交审批之后 1、根据签约记录号查询该笔记录是否存在。不存在提示错误
	 * 2、查询t2表，查看该用户是否存在。如果存在，修改手机号，银行卡号。不存在，就新增
	 * 3、查询t21表，查看该用户是否存在。如果存在，修改手机号，银行卡号等相关信息。不存在，就新增
	 * 4、查询t22表，该笔借据号，只能有0笔已签约的贷款。否则提示错误 5、修改t20表中前一笔贷款状态为无效：6
	 * 6、修改t22表中前一笔贷款(已解约)状态为无效：6 7、
	 * 
	 */
	@Transactional(rollbackFor = { Throwable.class })
	public String sign(SignTempInfoDto tempDto) throws Exception {
		/**
		 * 1、查询临时表信息
		 * 
		 */
		SignTempInfoDto signTempInfoDto = signTempInfoDao.querySignTempInfoById(tempDto);
		logger.info("临时表信息:" + JSONObject.toJSONString(signTempInfoDto));

		if (null == signTempInfoDto) {
			logger.error("临时表信息记录不存在！");
			JSONObject json = new JSONObject();
			json.put("rspCode", Global.RES_FAILTURE);
			json.put("rspMsg", "临时表信息记录不存在！");
			return json.toJSONString();
		}

		String mId = signTempInfoDto.getMid();
		String bindChannel = signTempInfoDto.getChannel();
		String insttuId = signTempInfoDto.getInsttuId();
		String idNo = signTempInfoDto.getIdNo();
		String custName = signTempInfoDto.getCustName();
		String idType = signTempInfoDto.getIdType();
		String mobile = signTempInfoDto.getMobile();
		String cardNo = signTempInfoDto.getCardNo();
		String loanNo = signTempInfoDto.getLoanNo();

		// 查询T2用户信息custId 投资人对应payeeUserId 投资人信息
		MemberDto payeeUserDto = memberDao.findCustByInsttuId(mId, insttuId);
		logger.info("投资人信息:" + JSONObject.toJSONString(payeeUserDto));
		// 查询T2用户信息custId 贷款人payerUserId
		MemberDto payerUserDto = memberDao.findCust(mId, Cryptos.aesEncrypt(idNo));

		String payerUserId = "";// 付款方用户编号
		/**
		 * 2、借款人不存在则新增。借款人存在，则更新
		 */
		if (null == payerUserDto) {
			payerUserDto = new MemberDto();
			payerUserId = SequenceUtils.getMemberInfo(mId);
			payerUserDto.setCustId(payerUserId);// 生成用户序列号
			payerUserDto.setMId(mId);
			payerUserDto.setCustType("2");// 用户类型：1=投资人 2=借款人
			payerUserDto.setState("1");
			payerUserDto.setIsReal("1");
			payerUserDto.setRemark("备注：名称=" + custName + " 类型=借款人");
			payerUserDto.setIdType(idType);

			// 加密
			payerUserDto.setCustName(Cryptos.aesEncrypt(custName));
			payerUserDto.setMobile(Cryptos.aesEncrypt(mobile));
			payerUserDto.setIdNo(Cryptos.aesEncrypt(idNo));
			// 摘要
			payerUserDto.setDigest(payerUserDto.buildDigest());
			int result = memberDao.insert(payerUserDto);
			if (result == 1) {
				logger.info("新增借款人信息成功:" + JSONObject.toJSONString(payerUserDto));
			}
		} else {
			payerUserId = payerUserDto.getCustId();
			payerUserDto.setMobile(Cryptos.aesEncrypt(mobile));//覆盖电话号码
			String digest = payerUserDto.buildDigest();
			int count = memberDao.updateMobile(payerUserId, Cryptos.aesEncrypt(mobile), digest);
			if (count == 1) {
				logger.info("修改借款人信息成功:" + JSONObject.toJSONString(payerUserDto));
			}
			logger.info("贷款人信息:" + JSONObject.toJSONString(payerUserDto));
		}

		/**
		 * 3、查询用户第三方账户，不存在则新增。存在，则更新
		 */
		// 查出accNo 对应T22中的 payerBindAccId
		UserThirdAccountDto userThirdAccountDto = userThirdAccountDao.queryUserThirdAcctByCardNo(payerUserId,
				mId,
				Cryptos.aesEncrypt(idNo));
		String payerBindAccId = "";// 付款方绑定第三方账户编号
		if (null == userThirdAccountDto) {
			payerBindAccId = SequenceUtils.getThirdAcctSeq(payerUserId);
			userThirdAccountDto = new UserThirdAccountDto();
			userThirdAccountDto.setAccNo(payerBindAccId);
			userThirdAccountDto.setStatus("1");
			userThirdAccountDto.setCustId(payerUserId);
			userThirdAccountDto.setmId(mId);
			userThirdAccountDto.setBindAccType("01");
			userThirdAccountDto.setBindAccNo(Cryptos.aesEncrypt(cardNo));
			userThirdAccountDto.setCustName(Cryptos.aesEncrypt(custName));
			userThirdAccountDto.setCustIdNo(Cryptos.aesEncrypt(idNo));
			userThirdAccountDto.setMobile(Cryptos.aesEncrypt(mobile));
			userThirdAccountDto.setCardBankCode(signTempInfoDto.getCardBankCode());
			userThirdAccountDto.setRemark("姓名= " + custName + "卡号= " + cardNo);
			userThirdAccountDto.setDigest(userThirdAccountDto.buildDigest());
			int result = userThirdAccountDao.insert(userThirdAccountDto);
			if (result == 1) {
				logger.info("新增第三方账户成功:" + JSONObject.toJSONString(payerUserDto));
			}
		} else {
			payerBindAccId = userThirdAccountDto.getAccNo();
			userThirdAccountDto.setBindAccNo(Cryptos.aesEncrypt(cardNo));
			userThirdAccountDto.setMobile(Cryptos.aesEncrypt(mobile));
			String digest = userThirdAccountDto.buildDigest();
			int count = userThirdAccountDao.updateThirdUserInfo(Cryptos.aesEncrypt(cardNo),
					Cryptos.aesEncrypt(mobile),
					signTempInfoDto.getCardBankCode(),
					digest,
					payerBindAccId);
			if (count == 1) {
				logger.info("付款方绑定第三方账户信息修改成功:" + JSONObject.toJSONString(userThirdAccountDto));
			}

		}

		/**
		 * 4、根据协议编号，查询t22正式表,判断该笔贷款是否是签约状态。 非签约状态才能签约或重新签约
		 */
		int num = signInfoDao.querySignStateByLoanNo(mId, loanNo, insttuId);
		if (num != 0) {
			logger.error("该笔贷款处于签约状态，不能重复签约！");
			JSONObject json = new JSONObject();
			json.put("rspCode", Global.RES_FAILTURE);
			json.put("rspMsg", "该笔贷款处于签约状态，不能重复签约！");
			return json.toJSONString();
		}

		/**
		 * 5、根据tempDto中协议号判断是新增还是重新签约 签约：则在正式表t20中新增 重新签约：修改t20表，t22表，回调用业务系统
		 * 
		 */
		String state = tempDto.getState();

		//新增操作
		SignInfoDto inDto = new SignInfoDto();
		String aidNo = SequenceUtils.getSignInfoSeq(mId);// 协议编号
		String payeeUserId = payeeUserDto.getCustId();// 收款方用户编号
		inDto.setAid(aidNo);// 协议编号
		inDto.setmId(mId);// 商户编号
		inDto.setBindChannel(bindChannel);// 收款方渠道类型
		inDto.setPayeeUserId(payeeUserId);// 收款方用户编号
		inDto.setPayerUserId(payerUserId);// 付款方用户编号
		inDto.setPayerBindAccId(payerBindAccId);// 付款方绑定第三方账户编号
		inDto.setType("1");
		inDto.setState(state);
		inDto.setPayerIdFiles(signTempInfoDto.getIdFiles());
		inDto.setPayerFiles(signTempInfoDto.getSignFiles());
		inDto.setJnfFileHash(signTempInfoDto.getJnfFileHash());
		inDto.setLoanNo(signTempInfoDto.getLoanNo());
		inDto.setChannelSign(signTempInfoDto.getChannelSign());//新增外部系统标识
		inDto.setDigest(inDto.buildDigest());
		//审批拒绝，jnf_t22不新增
		if (!"5".equals(state)) {
			if (signInfoDao.insert(inDto) == 1) {
				logger.info("签约信息新增成功:" + JSONObject.toJSONString(inDto));
			}
			signTempInfoDto.setAid(aidNo);
		}
		signTempInfoDto.setState(state);
		if (signTempInfoDao.updateSignTempInfo(signTempInfoDto) == 1) {
			logger.info("操作成功:" + JSONObject.toJSONString(inDto));
		}

		/**
		 * 6、修改t20表中前一笔贷款状态(已解约)为无效：6
		 */
		signTempInfoDao.updateSignState(mId, loanNo, insttuId);

		/**
		 * 7、修改t22表中前一笔贷款(已解约)状态为无效：6
		 */
		signInfoDao.updateSiganInfoSignState(mId, loanNo, insttuId);

		/**
		 * 8,同步签约状态 3-已签约，4-已解约 ，5-拒绝
		 */
		final String LINKQ_USERID = dictDao.findByType("LINKQ_USERID");
		final String LINKQ_INSTTUID = dictDao.findByType("LINKQ_INSTTUID");
		String isBatchPay = signTempInfoDto.getIsBatchPay();
		String PayStartDay = signTempInfoDto.getPayStartDay();
		SignDto signDto = new SignDto();
		signDto.set_transCode("MNG110");
		signDto.set_userId(LINKQ_USERID);
		signDto.set_insttuId(LINKQ_INSTTUID);
		//签约用户名
		signDto.setCustName(signTempInfoDto.getCustName());
		//签约银行卡号
		signDto.setBankCardNo(signTempInfoDto.getCardNo());
		//手机号
		signDto.setMobile(signTempInfoDto.getMobile());
		//银行名称
		String bankName = signTempInfoDto.getBankName();
		signDto.setBankName(bankName);
		signDto.setOrgNo(insttuId);
		signDto.setLoanNo(loanNo);
		signDto.setSignStatus(state);// 3-已签约，4-已解约 ，5-拒绝
		signDto.setCardSignNo(aidNo);//签约协议号
		signDto.setPayStartDay(StringUtils.defaultIfBlank(PayStartDay, "0"));//扣款启动日
		signDto.setIsBatchPay(isBatchPay);
		signDto.setPayChannel(bindChannel);
		net.sf.json.JSONObject res = LinkQHandler.getJsonNoLogin(signDto);
		if (!StringUtils.equals("true", res.getString("success"))) {
			logger.error("更新签约状态失败！");
			throw new BussinessException(ReturnCode.FAIL, "更新签约状态失败！");
		}

		/**
		 * 9,签约成功后发送短信
		 */
		if (StringUtils.equals(state, "3")) {
			logger.info("=================发送短信=================");
			SendMessage sendMessage = new SendMessage();
			String template = dictDao.findByType("SIGN_CODE_TEMPLET");// 短信签约模板
			String smsMessage = StringUtils.replaceEach(template,
					new String[] { "{INSTTUNAME}", "{CUSTNAME}", "{CARDNO}", "{CONTNO}" },
					new String[] { signTempInfoDto.getInsttuName(), signTempInfoDto.getCustName(),
							signTempInfoDto.getCardNo(), signTempInfoDto.getContNo() });
			logger.info("=================短信内容：" + smsMessage + "=================");
			Boolean result = sendMessage.send(signTempInfoDto.getMobile(), smsMessage);
			if (result) {
				logger.info("短信发送成功！");
			} else {
				logger.info("短信发送失败！");
			}
		}
		/**
		 * 返回结果
		 */
		JSONObject json = new JSONObject();
		json.put("rspCode", "000000");
		json.put("rspMsg", "操作成功！");
		json.put("aid", aidNo);
		return json.toJSONString();

	}
}
