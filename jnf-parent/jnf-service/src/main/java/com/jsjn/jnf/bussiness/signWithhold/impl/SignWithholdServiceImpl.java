package com.jsjn.jnf.bussiness.signWithhold.impl;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.alibaba.fastjson.JSONObject;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdReqBO;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdReqDataBO;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdResBO;
import com.jsjn.jnf.bean.bo.signWithhold.SignWithholdResDataBO;
import com.jsjn.jnf.bean.dto.assist.ChannelDto;
import com.jsjn.jnf.bean.dto.member.MemberDto;
import com.jsjn.jnf.bean.dto.withhold.SignTempInfoDto;
import com.jsjn.jnf.bussiness.signWithhold.SignWithholdService;
import com.jsjn.jnf.common.config.ReturnCode;
import com.jsjn.jnf.common.config.TabsConstant;
import com.jsjn.jnf.common.exception.BussinessException;
import com.jsjn.jnf.common.security.Cryptos;
import com.jsjn.jnf.common.utils.StringUtils;
import com.jsjn.jnf.common.utils.ValidatorUtil;
import com.jsjn.jnf.service.assist.ChannelService;
import com.jsjn.jnf.service.member.MemberService;
import com.jsjn.jnf.service.sign.SignService;
import com.jsjn.jnf.service.withhold.SignTempInfoService;
import com.jsjn.panda.setup.ParseSpring;

@Service
@Transactional(readOnly = true)
public class SignWithholdServiceImpl implements SignWithholdService {

	private final static Logger logger = Logger.getLogger(SignWithholdServiceImpl.class);
	private SignTempInfoService signTempInfoService = (SignTempInfoService) ParseSpring.context.getBean("signTempInfoService");
	private SignService signService = (SignService) ParseSpring.context.getBean("signService");
	private ChannelService channelService = (ChannelService) ParseSpring.context.getBean("channelServiceImpl");
	private MemberService memberService = (MemberService) ParseSpring.context.getBean("memberServiceImpl");

	@Override
	@Transactional(readOnly = false, rollbackFor = Exception.class)
	public SignWithholdResBO signWithhold(SignWithholdReqBO dto) throws BussinessException {
		SignWithholdReqDataBO reqData = dto.getReqData();

		String[] propertys = { "orgNo", "loanNo", "contNo", "custName", "idNo", "cardNo", "mobile", "signFile",
				"idFrontFile", "idBackFile", "channelSign", "isBatchPay", "payStartDay", "osPrcp" };
		String errMsg = ValidatorUtil.validpropertys(reqData, propertys);
		if (StringUtils.isNotBlank(errMsg)) {
			logger.error("请求参数不合法！" + errMsg);
			throw new BussinessException(ReturnCode.FAIL, "请求参数不合法！" + errMsg);
		}

		SignWithholdResBO resBO = new SignWithholdResBO();
		SignWithholdResDataBO resDataBO = new SignWithholdResDataBO();
		String mid = dto.getMid();
		String loanNo = reqData.getLoanNo();
		String idNo = reqData.getIdNo();
		String cardNo = reqData.getCardNo();
		String custName = reqData.getCustName();
		String mobile = reqData.getMobile();
		String orgNo = reqData.getOrgNo();
		String idFrontFile = reqData.getIdFrontFile();
		String idBackFile = reqData.getIdBackFile();
		String signFile = reqData.getSignFile();
		String contNo = reqData.getContNo();
		String osPrcp = reqData.getOsPrcp();
		String repayTyp = reqData.getRepayTyp();
		String cancelAble = reqData.getCancelAble();
		String channelSign = reqData.getChannelSign();//外部系统标识 例如：微贷
		String isBatchPay = reqData.getIsBatchPay();//是否批量代扣
		String payStartDay = reqData.getPayStartDay();//扣款启动日

		MemberDto memberDto = memberService.queryMemberByInsttuId(orgNo, mid);
		String insttuName = memberDto.getCustName();
		insttuName = Cryptos.aesDecrypt(insttuName);

		ChannelDto channelDto = new ChannelDto();
		try {
			channelDto = channelService.queryChannelByOrgNo(orgNo);
		} catch (Exception e) {
			logger.error("查询机构默认渠道失败，" + e.getMessage(), e);
			throw new BussinessException(ReturnCode.FAIL, "查询机构默认渠道失败!");
		}
		String channel = channelDto.getChannelId();

		SignTempInfoDto signTempInfoDto = new SignTempInfoDto();
		signTempInfoDto.setIdNo(idNo);
		signTempInfoDto.setCustName(custName);
		signTempInfoDto.setCardNo(cardNo);
		signTempInfoDto.setMobile(mobile);
		signTempInfoDto.setInsttuId(orgNo);
		signTempInfoDto.setInsttuName(insttuName);
		signTempInfoDto.setMid(mid);
		signTempInfoDto.setChannel(channel);
		signTempInfoDto.setLoanNo(loanNo);
		signTempInfoDto.setIdType("0");
		signTempInfoDto.setContNo(contNo);
		signTempInfoDto.setIdFiles(idFrontFile + TabsConstant.SPLIT_CHAR.val() + idBackFile);
		signTempInfoDto.setSignFiles(signFile);
		signTempInfoDto.setRepayType(StringUtils.defaultIfBlank(repayTyp, StringUtils.EMPTY));
		signTempInfoDto.setOsPrcp(osPrcp);
		signTempInfoDto.setState("3");//已签约
		signTempInfoDto.setCancelAble(cancelAble);//是否允许解约
		signTempInfoDto.setChannelSign(channelSign);//外部系统标识 例如：微贷
		signTempInfoDto.setIsBatchPay(StringUtils.defaultIfBlank(isBatchPay, "Y"));
		signTempInfoDto.setPayStartDay(StringUtils.defaultIfBlank(payStartDay, "0"));

		try {
			signTempInfoDto = signTempInfoService.saveSignTempInfo(signTempInfoDto);
		} catch (Exception e) {
			logger.error("保存临时签约信息失败，" + e.getMessage(), e);
			throw new BussinessException(ReturnCode.FAIL, "保存临时签约信息失败!");
		}

		String resCode = signTempInfoDto.getResCode();
		String resMsg = signTempInfoDto.getResMsg();
		if (!StringUtils.equals(ReturnCode.SUCCESS, resCode)) {
			logger.error("保存临时签约信息失败，" + resMsg);
			throw new BussinessException(ReturnCode.FAIL, "保存临时签约信息失败，" + resMsg);
		}
		//保存正式表信息
		String result = StringUtils.EMPTY;
		String retMsg = StringUtils.EMPTY;
		String retCode = StringUtils.EMPTY;

		try {
			result = signService.sign(signTempInfoDto);
		} catch (Exception e) {
			logger.error("签约异常，" + e.getMessage(), e);
			throw new BussinessException(ReturnCode.FAIL, "签约异常，" + e.getMessage());
		}

		JSONObject json = JSONObject.parseObject(result);
		retMsg = json.getString("rspMsg");
		String aid = json.getString("aid");
		retCode = json.getString("rspCode");

		if (!StringUtils.equals(ReturnCode.SUCCESS, retCode)) {
			logger.error("签约失败，" + retMsg);
			throw new BussinessException(ReturnCode.FAIL, "签约失败，" + retMsg);
		} else {
			resDataBO.setAid(aid);
			resDataBO.setPayChannel(channel);//代扣结果返回代扣渠道
			resBO.setResData(resDataBO);
			resBO.setResCode(retCode);
			resBO.setResMsg(retMsg);
			return resBO;
		}

	}
}
