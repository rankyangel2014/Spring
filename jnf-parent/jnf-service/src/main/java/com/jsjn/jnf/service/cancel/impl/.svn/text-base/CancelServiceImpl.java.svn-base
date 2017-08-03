package com.jsjn.jnf.service.cancel.impl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.dto.withhold.SignDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.linkq.LinkQHandler;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.dao.assist.DictDao;
import com.jsjn.jnf.dao.withhold.SignInfoDao;
import com.jsjn.jnf.dao.withhold.SignTempInfoDao;
import com.jsjn.jnf.integration.interfaces.SendMessage;
import com.jsjn.jnf.service.cancel.CancelService;
import com.jsjn.panda.setup.ParseSpring;

@Service("cancelService")
public class CancelServiceImpl implements CancelService {

	private final static Logger logger = Logger.getLogger(CancelServiceImpl.class);
	/**
	 * jnf_t22
	 */
	private SignInfoDao signInfoDao = (SignInfoDao) ParseSpring.context.getBean("signInfoDao");

	/**
	 * JNF_T20
	 */
	private SignTempInfoDao signTempInfoDao = (SignTempInfoDao) ParseSpring.context.getBean("signTempInfoDao");
	/**
	 * 数据库对象
	 */
	private static DictDao dictDao = (DictDao) ParseSpring.context.getBean("dictDao");

	@Override
	@Transactional(rollbackFor = { Throwable.class })
	public int cancelSign(SignTempInfoDto signTempInfoDto) throws Exception {
		/**
		 * 解约流程： 1、修改t20表中的状态 2、修改t22表中的状态 3、回调用linkQ接口，返回业务系统状态
		 */

		SignTempInfoDto resDto = signTempInfoDao.querySignTempInfoById(signTempInfoDto);

		int count = signInfoDao.cancelSign(signTempInfoDto.getAid());
		if (count != 1) {
			logger.error("解约流程，更改正式签约表失败！");
			return 0;
		}

		int num = signTempInfoDao.cancelSignTemp(signTempInfoDto.getSignRecordId());
		if (num != 1) {
			logger.error("解约流程，更改临时签约表失败！");
			return 0;
		}
		//同步微贷签约状态 已解约
		syncState(resDto, "4");
		//发送短信 如果失败不回滚
		sendMessage(signTempInfoDto);
		return 1;
	}

	/**
	 * 发送短信
	 * 
	 * @param tempDto
	 * @throws BussinessException
	 */
	public void sendMessage(SignTempInfoDto signTempInfoDto) {
		String insttuName = signTempInfoDto.getInsttuName();
		String custName = signTempInfoDto.getCustName();
		String cardNo = signTempInfoDto.getCardNo();
		String contNo = signTempInfoDto.getContNo();
		String mobile = signTempInfoDto.getMobile();

		String[] parameters = new String[] { insttuName, custName, cardNo, contNo };
		String[] replaceParameters = new String[] { "{INSTTUNAME}", "{CUSTNAME}", "{CARDNO}", "{CONTNO}" };
		String template = dictDao.findByType("CANCEL_CODE_TEMPLET");//解约短信模板

		String smsMessage = StringUtils.replaceEach(template, replaceParameters, parameters);
		SendMessage sendMessage = new SendMessage();
		boolean result = sendMessage.send(mobile, smsMessage);
		if (!result) {
			logger.error("短信发送失败!");
		}
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
		String LINKQ_USERID = dictDao.findByType("LINKQ_USERID");
		String LINKQ_INSTTUID = dictDao.findByType("LINKQ_INSTTUID");

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
		signDto.setBankName(tempDto.getBankName());

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
