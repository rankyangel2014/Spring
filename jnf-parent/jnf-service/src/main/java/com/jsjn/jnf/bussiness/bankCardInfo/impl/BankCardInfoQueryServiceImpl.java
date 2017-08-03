package com.jsjn.jnf.bussiness.bankCardInfo.impl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateReqBO;
import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateReqDataBO;
import com.jsjn.jnf.bean.bo.bankCard.BankCardValidateResBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryReqBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryReqDataBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryResBO;
import com.jsjn.jnf.bean.bo.bankCard.CardInfoQueryResDataBO;
import com.jsjn.jnf.bean.bo.integration.CardBinRspDto;
import com.jsjn.jnf.bean.bo.integration.SocialCreditRspDto;
import com.jsjn.jnf.bean.dto.assist.ChannelBankDto;
import com.jsjn.jnf.bussiness.bankCardInfo.BankCardInfoQueryService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.integration.interfaces.CreditSystem;
import com.jsjn.jnf.integration.realname.CardBinInterface;
import com.jsjn.jnf.service.assist.ChannelBankService;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class BankCardInfoQueryServiceImpl implements BankCardInfoQueryService {

	private final static Logger logger = Logger.getLogger(BankCardInfoQueryServiceImpl.class);
	private CardBinInterface cardBinInterface = (CardBinInterface) ParseSpring.context.getBean("cardBinInterfaceImpl");
	private ChannelBankService channelBankService = (ChannelBankService) ParseSpring.context.getBean("channelBankServiceImpl");
	private MemberService memberService = (MemberService) ParseSpring.context.getBean("memberServiceImpl");

	@Override
	public CardInfoQueryResBO bankCardInfoQuery(CardInfoQueryReqBO dto) throws BussinessException {

		CardInfoQueryReqDataBO reqDataDto = dto.getReqData();
		CardInfoQueryResBO resDto = new CardInfoQueryResBO();
		CardInfoQueryResDataBO resDataDto = new CardInfoQueryResDataBO();

		String[] propertys = { "orgNo", "bankCardNo" };

		String errMsg = ValidatorUtil.validpropertys(reqDataDto, propertys);
		if (StringUtils.isNotBlank(errMsg)) {
			logger.error("请求参数错误！" + errMsg);
			throw new BussinessException(ReturnCode.FAIL, "请求参数错误！" + errMsg);
		}
		String mid = dto.getMid();
		String orgNo = reqDataDto.getOrgNo();
		memberService.queryMemberByInsttuId(orgNo, mid);

		CardBinRspDto cardBinResDto = new CardBinRspDto();
		try {
			cardBinResDto = cardBinInterface.query(reqDataDto.getBankCardNo());
		} catch (Exception e) {
			logger.error("查询卡BIN失败！" + errMsg, e);
			throw new BussinessException(ReturnCode.FAIL, errMsg);
		}

		String cardKind = cardBinResDto.getCardKind();//卡类型
		String bankCode = cardBinResDto.getBankCode();
		String bankName = cardBinResDto.getBankName();

		ChannelBankDto channelBankDto = new ChannelBankDto();
		channelBankDto = channelBankService.queryMaxAmount(orgNo, StringUtils.EMPTY, bankCode);
		if (null == channelBankDto) {
			logger.error("不支持该银行," + bankName);
			throw new BussinessException(ReturnCode.FAIL_UNSUPPORTBANK, "不支持该银行," + bankName);
		}

		String maxAmount = channelBankDto.getMaxAmount();//单笔限额
		String maxAmountDay = channelBankDto.getMaxAmountDay();//日限额
		String channel = channelBankDto.getChannelId();
		if (StringUtils.equals(TabsConstant.CARD_KIND_DEBIT.val(), cardKind)) {
			resDataDto.setChannel(channel);
			resDataDto.setBankCode(bankCode);
			resDataDto.setBankName(bankName);
			resDataDto.setMaxAmount(StringUtils.defaultString(maxAmount, "0"));
			resDataDto.setMaxAmountDay(StringUtils.defaultString(maxAmountDay, "0"));
			resDto.setResCode(ReturnCode.SUCCESS);
			resDto.setResMsg("查询卡BIN成功！");
			resDto.setResData(resDataDto);
			return resDto;
		} else if (StringUtils.equals(TabsConstant.CARD_KIND_CREDIT.val(), cardKind)) {
			logger.error("不支持信用卡！");
			throw new BussinessException(ReturnCode.FAIL_UNSUPPORTCARD, "不支持信用卡！");
		} else {
			logger.error("不支持的卡类型！");
			throw new BussinessException(ReturnCode.FAIL_UNSUPPORTCARDKIND, "不支持的卡类型！");
		}

	}

	@Override
	public BankCardValidateResBO bankCardValidate(BankCardValidateReqBO dto) throws BussinessException {
		BankCardValidateReqDataBO reqData = dto.getReqData();

		String[] propertys = { "orgNo", "name", "idNo", "cardNo", "mobile" };

		String errMsg = ValidatorUtil.validpropertys(reqData, propertys);
		if (StringUtils.isNotBlank(errMsg)) {
			logger.error("传入参数不合法！" + errMsg);
			throw new BussinessException(ReturnCode.FAIL, "传入参数不合法！" + errMsg);
		}

		String idNo = reqData.getIdNo();
		String name = reqData.getName();
		String accountNo = reqData.getCardNo();
		String preMobile = reqData.getMobile();
		String orgNo = reqData.getOrgNo();
		String mid = dto.getMid();

		memberService.queryMemberByInsttuId(orgNo, mid);

		SocialCreditRspDto result = new SocialCreditRspDto();
		try {
			result = CreditSystem.bankCardValidate(idNo, name, accountNo, preMobile, orgNo, mid);
		} catch (Exception e) {
			logger.error("四要素验证异常，" + e.getMessage(), e);
			throw new BussinessException(ReturnCode.FAIL, "四要素验证异常，" + e.getMessage());
		}
		String retMsg = result.getReturnMsg();
		Boolean valid = result.getValid();
		BankCardValidateResBO resBO = new BankCardValidateResBO();
		resBO.setResCode(valid ? ReturnCode.SUCCESS : ReturnCode.FAIL_AUTH);
		resBO.setResMsg(retMsg);
		return resBO;
	}

}
