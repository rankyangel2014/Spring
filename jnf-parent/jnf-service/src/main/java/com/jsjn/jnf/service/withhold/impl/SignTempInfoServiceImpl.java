package com.jsjn.jnf.service.withhold.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;
import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.bean.dto.member.BussinessDto;
import com.jsjn.jnf.bean.dto.member.FeeRealNameDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.common.config.Global;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.dao.member.RealNameFlowDao;
import com.jsjn.jnf.dao.withhold.SignTempInfoDao;
import com.jsjn.jnf.integration.interfaces.CreditSystem;
import com.jsjn.jnf.integration.interfaces.SendMessage;
import com.jsjn.jnf.integration.realname.CardBinInterface;
import com.jsjn.jnf.service.assist.ChannelBankService;
import com.jsjn.jnf.service.assist.ChannelService;
import com.jsjn.jnf.service.assist.DictService;
import com.jsjn.jnf.service.assist.utils.SequenceUtils;
import com.jsjn.jnf.service.member.RealNameFlowService;
import com.jsjn.jnf.service.withhold.SignTempInfoService;
import com.jsjn.panda.setup.ParseSpring;

@Service("signTempInfoService")
public class SignTempInfoServiceImpl implements SignTempInfoService {

	// 渠道表T23
	private final ChannelService channelService = (ChannelService) ParseSpring.context.getBean("channelServiceImpl");
	private final RealNameFlowDao realNameFlowDao = (RealNameFlowDao) ParseSpring.context.getBean("realNameFlowDao");

	private final SignTempInfoDao signTempInfoDao = (SignTempInfoDao) ParseSpring.context.getBean("signTempInfoDao");
	private final RealNameFlowService realNameFlowService = (RealNameFlowService) ParseSpring.context.getBean("realNameFlowServiceImpl");
	private static DictService service = (DictService) ParseSpring.context.getBean("dictServiceImpl");
	private final static Logger logger = Logger.getLogger(SignTempInfoServiceImpl.class);
	private final CardBinInterface ci = (CardBinInterface) ParseSpring.context.getBean("cardBinInterfaceImpl");
	private final ChannelBankService cbif = (ChannelBankService) ParseSpring.context.getBean("channelBankServiceImpl");

	@Override
	public SignTempInfoDto getSignTempInfoList(SignTempInfoDto signTempInfoDto) {
		List<SignTempInfoDto> list = this.signTempInfoDao.querySignTempInfoList(signTempInfoDto);
		signTempInfoDto.setRecList(list);
		return signTempInfoDto;
	}

	/**
	 * 验证用户身份信息 1、在实名认证之前，根据借据号查询t20表，判断该笔借据是否有中间状态。如果有1笔，说明在签约中，不允许再签约。 2、数据校验
	 * 2、4要素验证 3、验证成功后，插入临时表
	 * 
	 * @throws Exception
	 */
	//TODO service改造。
	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public SignTempInfoDto saveSignTempInfo(SignTempInfoDto signTempInfoDto) throws Exception {

		//一段时间内限制增加签约代扣的次数
		Map<String, Object> map = realNameFlowService.controlTimes(signTempInfoDto.getIdNo(), new Date());
		if (!map.get("result").toString().equals("111111")) {
			if (map.get("result").toString().equals(Global.RES_FAILTURE)) {
				signTempInfoDto.setResCode(Global.RES_FAILTURE);
				String Message = "您在" + map.get("hour").toString() + "小时内已经添加代扣签约" + map.get("times").toString()
						+ "次，请稍后再试！";
				signTempInfoDto.setResMsg(Message);
				return signTempInfoDto;
			}
		}
		// 1、查询t20表，防止重复提交
		int count = this.signTempInfoDao.querySignInfoByLoanNo(signTempInfoDto);
		if (count == 1) {
			logger.error("该笔贷款已在签约处理中，请勿重复提交！");
			signTempInfoDto.setResCode(Global.RES_FAILTURE);
			signTempInfoDto.setResMsg("该笔贷款已在签约处理中，请勿重复提交！");
			return signTempInfoDto;
		}

		// 2、数据合法性校验
		String idNo = signTempInfoDto.getIdNo();
		String custName = signTempInfoDto.getCustName();
		String cardNo = signTempInfoDto.getCardNo();
		String mobile = signTempInfoDto.getMobile();
		String orgNo = signTempInfoDto.getInsttuId();
		String mid = signTempInfoDto.getMid();
		String channel = signTempInfoDto.getChannel();
		String loanNo = signTempInfoDto.getLoanNo();

		String[] propertys = { "custName", "idNo", "cardNo", "mobile" };
		String errMsg = ValidatorUtil.validpropertys(signTempInfoDto, propertys);
		if (!StringUtils.isBlank(errMsg)) {
			logger.error("请求参数格式有误：" + errMsg);
			signTempInfoDto.setResMsg("请求参数格式有误：" + errMsg);
			signTempInfoDto.setResCode(Global.RES_FAILTURE);
			return signTempInfoDto;
		}

		// 3、检查该渠道是否支持该银行 
		CardBinRspDto cardbinObj = this.ci.query(cardNo);
		String bankCode = cardbinObj.getBankCode();
		ChannelBankDto channelBankDto = new ChannelBankDto();
		/**
		 * CH12 为金农征信平台卡宾接口银行对应编码
		 */
		channelBankDto.setChannelId("CH12");
		channelBankDto.setChannelBankCode(bankCode);
		ChannelBankDto bankDto = this.cbif.queryJnBankCode(channelBankDto);
		if (bankDto == null) {
			logger.error("不支持该银行！");
			signTempInfoDto.setResMsg("不支持该银行！" + errMsg);
			signTempInfoDto.setResCode(Global.RES_FAILTURE);
			return signTempInfoDto;
		}
		String jnBankCode = bankDto.getJnBankCode();
		ChannelBankDto jnBankDto = null;
		try {
			jnBankDto = this.cbif.queryBankInfo(channel, jnBankCode);
		} catch (Exception e) {
			logger.error("该渠道暂不支持该银行卡！", e);
			signTempInfoDto.setResMsg(e.getMessage());
			signTempInfoDto.setResCode(Global.RES_FAILTURE);
			return signTempInfoDto;
		}

		// TODO 4、查询实名认证费用 add by xiekx
		ChannelDto channelDto = this.channelService.queryChannelById(channel);
		String fee = StringUtils.defaultIfBlank(channelDto.getFee(), "0.00");

		// 4.1、插入实名认证交易流水 T14 add by xiekx
		int id = this.realNameFlowService.insertFlow(mid,
				custName,
				idNo,
				cardNo,
				mobile,
				jnBankDto.getBankName(),
				jnBankCode,
				orgNo);

		//外部系统标识
		String channelSign = signTempInfoDto.getChannelSign();
		if (StringUtils.isBlank(channelSign)) {//只有金农付系统页面发起的请求需要四要素认证
			//4.2、发4要素认证
			SocialCreditRspDto resultDto = CreditSystem.bankCardValidate(idNo, custName, cardNo, mobile, orgNo, mid);
			if (!resultDto.getValid()) {
				logger.error(resultDto.getReturnMsg());
				String message = "四要素认证，" + resultDto.getReturnMsg();
				signTempInfoDto.setResMsg(message);
				signTempInfoDto.setResCode(Global.RES_FAILTURE);
				return signTempInfoDto;
			}
			//4.3、更新实名认证费用 add by xiekx 
			//TODO 事务
			FeeRealNameDto feeRealNameDto = new FeeRealNameDto();
			feeRealNameDto.setId(id);
			feeRealNameDto.setFee(Double.valueOf(fee));
			this.realNameFlowDao.updateFee(feeRealNameDto);//更新实名认证费用
		}

		// 5、 插入数据库
		String key = SequenceUtils.getSignTempSeq(mid);
		signTempInfoDto.setSignRecordId(key);
		signTempInfoDto.setCardBankCode(jnBankCode);
		int resultInfo = this.signTempInfoDao.saveSignTempInfo(signTempInfoDto);
		if (resultInfo == 1) {
			signTempInfoDao.updateSignState(mid, loanNo, orgNo);
			signTempInfoDto.setResMsg("实名认证成功！");
			signTempInfoDto.setResCode(Global.RES_SUCCESS);
			return signTempInfoDto;
		}
		signTempInfoDto.setResMsg("实名认证失败！");
		signTempInfoDto.setResCode(Global.RES_FAILTURE);
		return signTempInfoDto;
	}

	@Override
	public Long querySignTempInfoCount(SignTempInfoDto signTempInfoDto) {
		return this.signTempInfoDao.querySignTempInfoCount(signTempInfoDto);
	}

	@Override
	public SignTempInfoDto querySignTempInfoById(String signRecordId) {
		return this.signTempInfoDao.querySignTempInfoById(signRecordId);
	}

	@Override
	@Transactional(readOnly = false)
	public SignTempInfoDto updateTaskinstanceId(SignTempInfoDto signTempInfoDto) {
		if (this.signTempInfoDao.updateTaskinstanceId(signTempInfoDto) > 0) {
			signTempInfoDto.setResCode(Global.RES_SUCCESS);
			signTempInfoDto.setResMsg("签约信息临时表更新审批流程ID成功！");
		} else {
			signTempInfoDto.setResCode(Global.RES_FAILTURE);
			signTempInfoDto.setResMsg("签约信息临时表更新审批流程ID失败！");
		}
		return signTempInfoDto;
	}

	@Override
	public boolean sendSmsVerifyCode(String signRecordId, String cradNo, String mobile) {

		// 1、生成4位数字验证码
		String code = this.buildCode(Global.SMSVERIFYCODE);

		// 更新验证码到临时表
		int updateFlag = this.signTempInfoDao.updateSmsVerifyCode(code, signRecordId);
		if (updateFlag <= 0) {
			return false;
		}

		// 通过之后发送短信
		SendMessage message = new SendMessage();
		// 定义一个消息模板
		String plant = this.messageTemplet(code, cradNo);
		boolean flag = message.send(mobile, plant);
		return flag;
	}

	/**
	 * 生成验证码
	 * 
	 * @param 长度
	 * @return
	 */
	private String buildCode(int num) {
		String[] str = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" };
		Random rand = new Random();// 创建Random类的对象rand
		String code = "";
		int index = 0;
		for (int i = 0; i < num; ++i) {
			index = rand.nextInt(str.length - 1);// 在0到str.length-1生成一个伪随机数赋值给index
			code += str[index];// 将对应索引的数组与code的变量值相连接
		}
		return code;
	}

	/**
	 * 获取短信模板
	 * 
	 * @return "code","cardNo"
	 */
	private String messageTemplet(String code, String cardNo) {
		String message = service.findByType(Global.MESSAGETYPE);
		String lastCardNo = cardNo.substring(cardNo.length() - 4, cardNo.length());
		String str = message.replace("{VALIDATECODE}", code);
		str = str.replace("{BANKCARD}", lastCardNo);
		return str;
	}

	/**
	 * 更新用户签约信息 1、根据signRecordId查询当前记录 2、比较提交数据与保存数据是否一致，不一致，提示错误 3、如果一致，更新提交信息
	 * 4、更新信息成功后，调用linkQ接口，回传状态给业务系统。
	 * 
	 * @throws Exception
	 */
	@Override
	@Transactional(readOnly = false)
	public SignTempInfoDto updateSignTempFilesInfo(SignTempInfoDto signTempInfoDto) {
		String signRecordId = signTempInfoDto.getSignRecordId();
		SignTempInfoDto tempDto = this.signTempInfoDao.querySignTempInfoById(signRecordId);
		/**
		 * 4、如果重新签约，修改t20表中前一笔贷款状态(已解约)为无效：6
		 */
		String mId = tempDto.getMid();
		String loanNo = tempDto.getLoanNo();
		String insttuId = tempDto.getInsttuId();
		this.signTempInfoDao.updateSignState(mId, loanNo, insttuId);

		// 更新用户信息
		int count = this.signTempInfoDao.updateSignTempFilesInfo(signTempInfoDto);
		if (count < 1) {
			signTempInfoDto.setResCode(Global.RES_FAILTURE);
			signTempInfoDto.setResMsg("更新签约信息失败！");
			return signTempInfoDto;
		}
		signTempInfoDto.setResCode(Global.RES_SUCCESS);
		signTempInfoDto.setResMsg("更新签约信息成功！");
		return signTempInfoDto;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.jsjn.jnf.service.withhold.SignTempInfoService#querySignTempInfoByIds
	 * (java.util.List)
	 */
	@Override
	public List<SignTempInfoDto> querySignTempInfoByIds(String InstuuId, List<String> ids, String state) {
		return this.signTempInfoDao.querySignTempInfoByIds(InstuuId, ids, state);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.jsjn.jnf.service.withhold.SignTempInfoService#getCommercial()
	 */
	@Override
	public List<BussinessDto> getCommercial() {
		return this.signTempInfoDao.getCommercial();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.jsjn.jnf.service.withhold.SignTempInfoService#geTinstitution()
	 */
	@Override
	public List<MemberDto> geTinstitution(String mid) {
		List<MemberDto> list = this.signTempInfoDao.geTinstitution(mid);
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				MemberDto memberDto = list.get(i);
				memberDto.setCustName(Cryptos.aesDecrypt(memberDto.getCustName()));
			}
		}
		return list;
	}

	/**
	 * 查询协议的信息
	 */
	@Override
	public List<SignTempInfoDto> queryWithholdInfos(SignTempInfoDto signTempInfoDto) {
		List<SignTempInfoDto> list = this.signTempInfoDao.queryWithholdInfos(signTempInfoDto);
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				SignTempInfoDto sign = list.get(i);
				sign.setTotal(sign.getTotal());
				sign.setUserName(Cryptos.aesDecrypt(sign.getUserName()));
			}
		}
		return list;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.jsjn.jnf.service.withhold.SignTempInfoService#queryWithDetails(java
	 * .lang.String) 查询临时签约的详细信息
	 */
	@Override
	public SignTempInfoDto queryWithDetails(String signRecordId) {
		SignTempInfoDto signTempInfoDto = this.signTempInfoDao.queryWithDetails(signRecordId);
		signTempInfoDto.setUserName(Cryptos.aesDecrypt(signTempInfoDto.getUserName()));
		return signTempInfoDto;
	}

	@Override
	public int querySignInfoByLoanNo(SignTempInfoDto signTempInfoDto) {
		return signTempInfoDao.querySignInfoByLoanNo(signTempInfoDto);
	}
}
